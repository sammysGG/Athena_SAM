import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CategoryList from "@/app/components/forum/CategoryList";
import OpsTicker from "@/app/components/forum/OpsTicker";
import StatsPanel from "@/app/components/forum/StatsPanel";
import RecentThreadList from "@/app/components/forum/RecentThreadList";
import IntroMasthead from "@/app/components/forum/IntroMasthead";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, recentThreads, recentOps, stats] = await Promise.all([
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: { select: { threads: true } },
        threads: {
          orderBy: { lastReplyAt: "desc" },
          take: 1,
          select: {
            id: true,
            slug: true,
            title: true,
            titleEn: true,
            lastReplyAt: true,
            lastReplyBy: true,
            author: { select: { username: true } },
          },
        },
      },
    }),
    prisma.thread.findMany({
      orderBy: [{ pinned: "desc" }, { lastReplyAt: "desc" }],
      take: 10,
      include: {
        category: { select: { slug: true, name: true, nameEn: true } },
        author: { select: { username: true, affiliation: true } },
        _count: { select: { posts: true } },
      },
    }),
    prisma.operation.findMany({
      orderBy: { claimedAt: "desc" },
      take: 6,
    }),
    {
      userCount: await prisma.user.count(),
      threadCount: await prisma.thread.count(),
      postCount: await prisma.post.count(),
      opsCount: await prisma.operation.count(),
    },
  ]);

  return (
    <div className="container py-6 space-y-6">
      <IntroMasthead />

      <OpsTicker ops={recentOps} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <CategoryList categories={categories} />
          <RecentThreadList threads={recentThreads} />
        </div>

        <aside className="space-y-6">
          <StatsPanel stats={stats} />

          <section className="panel p-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-2">
              // Связанные кластеры
            </div>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <span className="text-[color:var(--color-accent)]">LOCKJAW CERBERUS</span>
                <span className="chip chip-red">PRIMARY</span>
              </li>
              <li className="flex justify-between">
                <span>VECTOR CERBERUS</span>
                <span className="chip">ALLIED</span>
              </li>
              <li className="flex justify-between">
                <span>HOLLOW SCYTHE</span>
                <span className="chip">ALLIED</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[color:var(--color-muted)]">CRIMSON HEDGEHOG</span>
                <span className="chip">DORMANT</span>
              </li>
            </ul>
            <div className="mt-3 text-[10px] text-[color:var(--color-muted)]">
              Псевдонимы основного кластера:{" "}
              <span className="text-[color:var(--color-ink)]">FIN-73 / Black Lock Syndicate / Grim Broker</span>
            </div>
          </section>

          <section className="panel p-4">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-2">
              // Контакты администрации
            </div>
            <ul className="text-xs space-y-1.5 font-mono">
              <li><span className="text-[color:var(--color-muted)]">jabber:</span> admin@sam-07.onion</li>
              <li><span className="text-[color:var(--color-muted)]">PGP:</span> 4F1C 8A2E … 9D3B</li>
              <li><span className="text-[color:var(--color-muted)]">tox:</span> 8C1E2F…0A7B</li>
            </ul>
            <div className="mt-3 text-[10px] text-[color:var(--color-warn)]">
              Внимание: фишинг через Telegram. Не пишите там.
            </div>
          </section>

          <Link
            href="/manifest"
            className="block panel p-4 hover:border-[color:var(--color-accent)] transition"
          >
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-1">
              // Doctrine
            </div>
            <div className="text-sm text-[color:var(--color-ink)]">
              Манифест LOCKJAW CERBERUS →
            </div>
          </Link>
        </aside>
      </div>
    </div>
  );
}
