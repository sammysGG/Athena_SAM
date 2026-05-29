#!/usr/bin/env bash
set -euo pipefail

echo "[+] Stopping services..."
systemctl stop sam.service 2>/dev/null || true
systemctl disable sam.service 2>/dev/null || true
systemctl stop nginx 2>/dev/null || true

echo "[+] Removing SAM install..."
rm -rf /opt/sam

echo "[+] Removing systemd service..."
rm -f /etc/systemd/system/sam.service
rm -f /etc/systemd/system/sam-update.service
rm -f /usr/local/bin/sam-update.sh
systemctl daemon-reload

echo "[+] Removing nginx config..."
rm -f /etc/nginx/sites-available/sam.conf
rm -f /etc/nginx/sites-enabled/sam.conf
ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default 2>/dev/null || true
systemctl restart nginx 2>/dev/null || true

echo "[+] Removing TLS certs..."
rm -rf /etc/ssl/range

echo "[+] Removing Node binary..."
rm -f /usr/local/bin/node /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack
rm -rf /usr/local/lib/node_modules
rm -rf /usr/local/include/node
rm -rf /usr/local/share/doc/node
rm -rf /usr/local/share/systemtap/tapset/node.stp
rm -rf /usr/local/share/man/man1/node.1

echo "[+] Done. SAM fully removed."
