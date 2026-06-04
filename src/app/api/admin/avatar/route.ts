import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { username, avatarUrl } = body;

  if (!username || !avatarUrl) {
    return NextResponse.json({ error: "username and avatarUrl required" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { username },
    data: { avatarUrl },
  });

  return NextResponse.json({ ok: true, user: { username: user.username, avatarUrl: user.avatarUrl } });
}
