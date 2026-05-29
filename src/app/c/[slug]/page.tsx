import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ThreadRow from "@/app/components/forum/ThreadRow";
import NewThreadCTA from "@/app/components/forum/NewThreadCTA";
import CategoryHeader from "@/app/components/forum/CategoryHeader";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const threads = await prisma.thread.findMany({
    where: { categoryId: category.id },
    orderBy: [{ pinned: "desc" }, { lastReplyAt: "desc" }],
    include: {
      author: { select: { username: true, affiliation: true } },
      _count: { select: { posts: true } },
    },
  });

  return (
    <div className="container py-6 space-y-5">
      <CategoryHeader category={category} threadCount={threads.length} />
      <NewThreadCTA categorySlug={category.slug} />

      <section className="panel">
        <div className="hrule px-4 py-2 grid grid-cols-[1fr_90px_90px_160px] gap-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] bg-black/30">
          <span>Тема / Topic</span>
          <span className="text-center">Ответы</span>
          <span className="text-center">Просмотры</span>
          <span className="text-right">Последнее</span>
        </div>
        <ul>
          {threads.length === 0 ? (
            <li className="px-4 py-6 text-sm text-[color:var(--color-muted)]">
              В этом разделе пока пусто. Открой первую тему.
            </li>
          ) : (
            threads.map((th) => <ThreadRow key={th.id} thread={th} />)
          )}
        </ul>
      </section>

      <div className="text-xs text-[color:var(--color-muted)] flex justify-between">
        <Link href="/" className="hover:text-[color:var(--color-accent)]">
          ← Назад к разделам
        </Link>
        <span>// {category.slug}</span>
      </div>
    </div>
  );
}
