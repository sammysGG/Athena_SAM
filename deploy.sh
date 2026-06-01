#!/usr/bin/env bash
set -euo pipefail

# SAM — System Access Matrix
# One-shot deploy script for Kali / Debian-based targets.
# Run as root.
#
# Usage:
#   sudo bash deploy.sh
#   sudo DISCORD_BOT_TOKEN="your_token" bash deploy.sh

REPO="https://github.com/sammysGG/Athena_SAM.git"
INSTALL_DIR="/opt/sam"
DOMAIN="${DOMAIN:-$(hostname -f 2>/dev/null || hostname)}"
DISCORD_BOT_TOKEN="${DISCORD_BOT_TOKEN:-}"
DISCORD_CHANNEL_ID="${DISCORD_CHANNEL_ID:-1509874086958862346}"

echo "[+] SAM Deploy Script"
echo "[+] Target dir: $INSTALL_DIR"
echo "[+] Domain: $DOMAIN"

# ── 1. System deps ───────────────────────────────────────────────
echo "[+] Installing system dependencies..."
apt-get update -qq
# Purge broken exim4 if present, then install only required packages
apt-get purge -y -qq exim4-config exim4-base exim4-daemon-light bsd-mailx 2>/dev/null || true
apt-get install -y -qq --no-install-recommends curl git nginx openssl sqlite3 ca-certificates 2>/dev/null || true

# Enforce Node.js 20.x (stable LTS for Next.js 15)
NODE_MAJOR=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1 || echo "0")
if [[ "$NODE_MAJOR" != "20" ]]; then
  echo "[+] Installing Node 20 binary (current: $(node -v 2>/dev/null || echo none))..."
  apt-get remove -y -qq nodejs 2>/dev/null || true
  rm -rf /usr/local/lib/nodejs /usr/local/bin/node /usr/local/bin/npm /usr/local/bin/npx 2>/dev/null || true
  NODE_TGZ="https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-x64.tar.xz"
  curl -fsSL "$NODE_TGZ" | tar -xJf - -C /usr/local --strip-components=1
  hash -r
fi

echo "[+] Node version: $(node -v)"
echo "[+] npm version: $(npm -v)"

# ── 2. Clone / update repo ───────────────────────────────────────
if [[ -d "$INSTALL_DIR/.git" ]]; then
  echo "[+] Updating existing repo..."
  cd "$INSTALL_DIR"
  git fetch origin main
  git reset --hard origin/main
else
  echo "[+] Cloning repo..."
  git clone "$REPO" "$INSTALL_DIR"
  cd "$INSTALL_DIR"
fi

# ── 3. Persistent dirs ───────────────────────────────────────────
mkdir -p "$INSTALL_DIR/data" "$INSTALL_DIR/uploads"

# ── 4. Generate .env ─────────────────────────────────────────────
if [[ ! -f "$INSTALL_DIR/.env" ]]; then
  echo "[+] Generating .env..."
  AUTH_SECRET="$(openssl rand -hex 32)"
  cat > "$INSTALL_DIR/.env" <<EOF
DATABASE_URL="file:/opt/sam/data/prod.db"
NEXTAUTH_SECRET="$AUTH_SECRET"
NEXTAUTH_URL="https://$DOMAIN"
NODE_ENV="production"
DISCORD_BOT_TOKEN="$DISCORD_BOT_TOKEN"
DISCORD_CHANNEL_ID="$DISCORD_CHANNEL_ID"
EOF
else
  echo "[+] .env already exists, preserving."
fi

# ── 5. Node deps & build ─────────────────────────────────────────
echo "[+] Installing npm dependencies..."
cd "$INSTALL_DIR"
npm ci --no-audit --no-fund

echo "[+] Generating Prisma client..."
npx prisma generate

echo "[+] Applying database migrations..."
export DATABASE_URL="file:/opt/sam/data/prod.db"
npx prisma migrate deploy

echo "[+] Cleaning Next.js build cache..."
rm -rf .next

echo "[+] Building Next.js app..."
npm run build

# ── 6. Fix ownership ─────────────────────────────────────────────
chown -R www-data:www-data "$INSTALL_DIR"

# ── 7. systemd service ───────────────────────────────────────────
echo "[+] Installing systemd service..."
cat > /etc/systemd/system/sam.service <<'EOF'
[Unit]
Description=SAM — System Access Matrix (Next.js)
After=network-online.target
Wants=network-online.target

[Service]
Type=exec
User=www-data
Group=www-data
WorkingDirectory=/opt/sam
EnvironmentFile=/opt/sam/.env
ExecStartPre=/opt/sam/node_modules/.bin/prisma migrate deploy
ExecStart=/opt/sam/node_modules/.bin/next start -H 127.0.0.1 -p 18093
Restart=on-failure
RestartSec=3
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable sam.service
systemctl restart sam.service

# ── 8. nginx ─────────────────────────────────────────────────────
echo "[+] Configuring nginx..."
mkdir -p /etc/ssl/range

# Self-signed cert if missing
if [[ ! -f /etc/ssl/range/cert.pem ]]; then
  echo "[+] Generating self-signed TLS certificate..."
  openssl req -x509 -nodes -sha256 -days 825 -newkey rsa:2048 \
    -keyout /etc/ssl/range/key.pem -out /etc/ssl/range/cert.pem \
    -subj "/C=UK/CN=$DOMAIN" \
    -addext "subjectAltName=DNS:$DOMAIN" 2>/dev/null
fi

cat > /etc/nginx/sites-available/sam.conf <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl;
    server_name $DOMAIN;

    ssl_certificate     /etc/ssl/range/cert.pem;
    ssl_certificate_key /etc/ssl/range/key.pem;

    client_max_body_size 16m;

    location / {
        proxy_pass http://127.0.0.1:18093;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

ln -sf /etc/nginx/sites-available/sam.conf /etc/nginx/sites-enabled/sam.conf
rm -f /etc/nginx/sites-enabled/default

systemctl reload nginx || systemctl restart nginx
systemctl enable nginx

# ── 9. Firewall ──────────────────────────────────────────────────
echo "[+] Allowing HTTP/HTTPS through firewall..."
ufw allow 80/tcp 2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true

# ── 10. Health check ─────────────────────────────────────────────
echo "[+] Waiting for app to come up..."
for i in {1..30}; do
  if curl -fsS http://127.0.0.1:18093/ >/dev/null 2>&1; then
    echo "[+] App is responding on port 18093"
    break
  fi
  sleep 2
done

# ── 11. Optional seed ────────────────────────────────────────────
USER_COUNT=$(cd "$INSTALL_DIR" && node -e "
const { PrismaClient } = require('@prisma/client');
(async () => {
  const p = new PrismaClient();
  const count = await p.user.count().catch(() => 0);
  process.stdout.write(String(count));
  await p.\$disconnect();
})();
" 2>/dev/null || echo "0")

if [[ "$USER_COUNT" == "0" ]]; then
  echo "[+] Database is empty — seeding scenario data..."
  cd "$INSTALL_DIR"
  npx tsx prisma/seed.ts 2>/dev/null || echo "[!] No seed script found, skipping."
else
  echo "[+] Database already seeded ($USER_COUNT users)."
fi

# ── Done ─────────────────────────────────────────────────────────
echo ""
echo "========================================"
echo "  SAM deployed successfully"
echo "  HTTPS: https://$DOMAIN"
echo "  Local: http://127.0.0.1:18093"
echo "========================================"
