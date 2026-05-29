import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostCard from "@/app/components/forum/PostCard";
import ReplyForm from "@/app/components/forum/ReplyForm";
import ThreadHeader from "@/app/components/forum/ThreadHeader";

export const dynamic = "force-dynamic";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thread = await prisma.thread.findUnique({
    where: { slug },
    include: {
      category: true,
      author: { select: { username: true, affiliation: true } },
    },
  });
  if (!thread) notFound();

  // Best-effort view counter — non-atomic, that's fine for a forum.
  await prisma.thread.update({
    where: { id: thread.id },
    data: { views: { increment: 1 } },
  });

  const posts = await prisma.post.findMany({
    where: { threadId: thread.id },
    orderBy: { createdAt: "asc" },
    include: {
      author: {
        select: {
          username: true,
          displayName: true,
          affiliation: true,
          role: true,
          reputation: true,
          postCount: true,
          signature: true,
          avatarUrl: true,
          location: true,
          createdAt: true,
        },
      },
    },
  });

  return (
    <div className="container py-6 space-y-4">
      <nav className="text-xs text-[color:var(--color-muted)] flex items-center gap-2">
        <Link href="/" className="hover:text-[color:var(--color-accent)]">SAM</Link>
        <span>/</span>
        <Link href={`/c/${thread.category.slug}`} className="hover:text-[color:var(--color-accent)]">
          {thread.category.name}
        </Link>
        <span>/</span>
        <span className="text-[color:var(--color-ink)] truncate">{thread.title}</span>
      </nav>

      <ThreadHeader thread={thread} postCount={posts.length} />

      <div className="space-y-3">
        {posts.map((p, i) => (
          <PostCard key={p.id} post={p} index={i + 1} />
        ))}
      </div>

      {thread.locked ? (
        <div className="panel p-4 text-sm text-[color:var(--color-warn)] flex items-center gap-2">
          <span>⨯</span>
          Тема закрыта администрацией. Ответы запрещены.
        </div>
      ) : (
        <ReplyForm threadId={thread.id} threadSlug={thread.slug} />
      )}
    </div>
  );
}
