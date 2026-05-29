import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const {
    threadId,
    body,
    bodyEn,
  }: { threadId?: string; body?: string; bodyEn?: string } = payload;

  if (!threadId || !body?.trim()) {
    return NextResponse.json({ error: "Пустое сообщение" }, { status: 400 });
  }

  const thread = await prisma.thread.findUnique({ where: { id: threadId } });
  if (!thread) {
    return NextResponse.json({ error: "Тема не найдена" }, { status: 404 });
  }
  if (thread.locked) {
    return NextResponse.json({ error: "Тема закрыта" }, { status: 403 });
  }

  const post = await prisma.post.create({
    data: {
      threadId,
      authorId: session.user.id,
      body: body.trim(),
      bodyEn: (bodyEn ?? body).trim(),
    },
  });

  await prisma.thread.update({
    where: { id: threadId },
    data: { lastReplyAt: new Date(), lastReplyBy: session.user.username },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { postCount: { increment: 1 }, lastSeenAt: new Date() },
  });

  return NextResponse.json({ id: post.id });
}
