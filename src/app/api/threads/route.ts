import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify, uniqueSlug } from "@/lib/slug";

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
    categoryId,
    title,
    titleEn,
    body,
    bodyEn,
    tag,
  }: {
    categoryId?: string;
    title?: string;
    titleEn?: string;
    body?: string;
    bodyEn?: string;
    tag?: string | null;
  } = payload;

  if (!categoryId || !title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return NextResponse.json({ error: "Раздел не найден" }, { status: 404 });
  }

  if (category.restricted) {
    const me = await prisma.user.findUnique({ where: { id: session.user.id } });
    const allowed = me?.role === "admin" || me?.role === "moderator" || me?.role === "vetted";
    if (!allowed) {
      return NextResponse.json({ error: "Доступ в этот раздел ограничен" }, { status: 403 });
    }
  }

  const slug = uniqueSlug(slugify(title));

  const thread = await prisma.thread.create({
    data: {
      slug,
      title: title.trim(),
      titleEn: (titleEn ?? title).trim(),
      categoryId,
      authorId: session.user.id,
      tag: tag && tag !== "NONE" ? tag : null,
      lastReplyAt: new Date(),
      lastReplyBy: session.user.username,
      posts: {
        create: {
          authorId: session.user.id,
          body: body.trim(),
          bodyEn: (bodyEn ?? body).trim(),
        },
      },
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { postCount: { increment: 1 }, lastSeenAt: new Date() },
  });

  return NextResponse.json({ id: thread.id, slug: thread.slug });
}
