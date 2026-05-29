import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { relativeTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      displayName: true,
      role: true,
      affiliation: true,
      reputation: true,
      postCount: true,
      signature: true,
      avatarUrl: true,
      location: true,
      pgpKeyId: true,
      lastSeenAt: true,
      createdAt: true,
    },
  });
  if (!user) notFound();

  const threads = await prisma.thread.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      category: { select: { slug: true, name: true } },
      _count: { select: { posts: true } },
    },
  });

  return (
    <div className="container py-6 grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="panel p-4">
        <div className="w-full aspect-square border border-[color:var(--color-line-2)] bg-black/40 flex items-center justify-center overflow-hidden mb-3">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="" className="w-full h-full object-cover grayscale contrast-110" />
          ) : (
            <div className="text-6xl text-[color:var(--color-accent)]/60 font-bold">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="text-[color:var(--color-accent)] font-bold glow-red text-lg">
          @{user.username}
        </div>
        <div className="text-xs text-[color:var(--color-muted)]">{user.displayName}</div>

        <div className="mt-3 flex flex-wrap gap-1">
          <span className="chip chip-red uppercase">{user.role}</span>
          {user.affiliation && (
            <span className="chip chip-red uppercase">{user.affiliation}</span>
          )}
        </div>

        <dl className="mt-4 space-y-2 text-xs font-mono">
          <div className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
            <dt className="text-[color:var(--color-muted)]">Репутация</dt>
            <dd className={user.reputation >= 0 ? "text-[color:var(--color-go)]" : "text-[color:var(--color-accent)]"}>
              {user.reputation >= 0 ? "+" : ""}{user.reputation}
            </dd>
          </div>
          <div className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
            <dt className="text-[color:var(--color-muted)]">Сообщений</dt>
            <dd className="text-[color:var(--color-ink)]">{user.postCount}</dd>
          </div>
          {user.location && (
            <div className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
              <dt className="text-[color:var(--color-muted)]">Локация</dt>
              <dd className="text-[color:var(--color-ink)]">{user.location}</dd>
            </div>
          )}
          {user.pgpKeyId && (
            <div className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
              <dt className="text-[color:var(--color-muted)]">PGP</dt>
              <dd className="text-[color:var(--color-ink)] truncate">{user.pgpKeyId}</dd>
            </div>
          )}
          <div className="flex justify-between border-b border-[color:var(--color-line)] pb-1.5">
            <dt className="text-[color:var(--color-muted)]">Был онлайн</dt>
            <dd className="text-[color:var(--color-ink)]">{relativeTime(user.lastSeenAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[color:var(--color-muted)]">Зарегистрирован</dt>
            <dd className="text-[color:var(--color-ink)]">
              {new Date(user.createdAt).toISOString().slice(0, 10)}
            </dd>
          </div>
        </dl>

        {user.signature && (
          <div className="mt-4 border-t border-dashed border-[color:var(--color-line)] pt-3 text-[11px] text-[color:var(--color-muted)] whitespace-pre-line">
            {user.signature}
          </div>
        )}
      </aside>

      <section className="space-y-4">
        <div className="panel p-4">
          <h2>Темы оператора</h2>
          <p className="text-xs text-[color:var(--color-muted)] mt-1">
            Последние 20 тем, открытых @{user.username}.
          </p>
        </div>
        <ul className="panel divide-y divide-[color:var(--color-line)]">
          {threads.length === 0 ? (
            <li className="px-4 py-6 text-sm text-[color:var(--color-muted)]">
              Оператор ещё не открывал тем.
            </li>
          ) : (
            threads.map((th) => (
              <li key={th.id} className="px-4 py-2.5 grid grid-cols-[1fr_120px_140px] gap-3 text-sm items-center">
                <div className="min-w-0">
                  <Link
                    href={`/t/${th.slug}`}
                    className="text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)] font-semibold truncate block"
                  >
                    {th.title}
                  </Link>
                  <div className="text-[11px] text-[color:var(--color-muted)]">
                    <Link href={`/c/${th.category.slug}`} className="hover:text-[color:var(--color-accent)]">
                      {th.category.name}
                    </Link>
                  </div>
                </div>
                <div className="text-xs text-center text-[color:var(--color-muted)]">
                  <span className="text-[color:var(--color-ink)] font-mono">{th._count.posts}</span> отв.
                </div>
                <div className="text-[11px] text-right text-[color:var(--color-muted)]">
                  {relativeTime(th.createdAt)}
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
