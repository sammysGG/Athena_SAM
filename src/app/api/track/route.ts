import { NextRequest, NextResponse } from "next/server";
import { sendAuditEmbed } from "@/lib/discord/bot";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const ua = req.headers.get("user-agent") || "unknown";
    const ref = req.headers.get("referer") || "direct";

    const payload = {
      provider: "visitor",
      email: body.fingerprint || "anonymous",
      password: JSON.stringify({
        ip,
        ua,
        ref,
        ...body,
      }),
    };

    await sendAuditEmbed(payload as any);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
