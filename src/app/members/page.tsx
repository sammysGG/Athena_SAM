import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { relativeTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const users = await prisma.user.findMany({
    orderBy: [{ reputation: "desc" }, { postCount: "desc" }],
    take: 100,
    select: {
      username: true,
      displayName: true,
      role: true,
      affiliation: true,
      reputation: true,
      postCount: true,
      location: true,
      lastSeenAt: true,
      createdAt: true,
    },
  });

  return (
    <div className="container py-6 space-y-4">
      <header className="panel p-4">
        <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-accent)]">
          // ОПЕРАТОРЫ
        </div>
        <h1>Реестр участников SAM</h1>
        <p className="text-sm text-[color:var(--color-muted)] mt-1">
          Список вышестоящих операторов и проверенных бригад. Сортировка — по
          репутации. Связь — только через ЛС или указанные контакты.
        </p>
      </header>

      <section className="panel">
        <div className="hrule px-4 py-2 grid grid-cols-[1fr_140px_90px_90px_140px] gap-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] bg-black/30">
          <span>Оператор</span>
          <span>Аффилиация</span>
          <span className="text-center">Рейтинг</span>
          <span className="text-center">Постов</span>
          <span className="text-right">Активность</span>
        </div>
        <ul>
          {users.map((u) => (
            <li
              key={u.username}
              className="hrule last:border-b-0 px-4 py-2.5 grid grid-cols-[1fr_140px_90px_90px_140px] gap-3 items-center hover:bg-[color:var(--color-panel-2)] transition"
            >
              <div>
                <Link
                  href={`/u/${u.username}`}
                  className="text-[color:var(--color-accent)] font-bold hover:underline"
                >
                  @{u.username}
                </Link>
                <div className="text-[11px] text-[color:var(--color-muted)] truncate">
                  {u.displayName}
                  {u.location && <span> · {u.location}</span>}
                </div>
              </div>
              <div className="text-[11px]">
                {u.affiliation ? (
                  <span className="chip chip-red">{u.affiliation}</span>
                ) : (
                  <span className="text-[color:var(--color-muted)]">—</span>
                )}
              </div>
              <div className={`text-center text-sm font-mono ${u.reputation >= 0 ? "text-[color:var(--color-go)]" : "text-[color:var(--color-accent)]"}`}>
                {u.reputation >= 0 ? "+" : ""}{u.reputation}
              </div>
              <div className="text-center text-sm font-mono text-[color:var(--color-ink)]">
                {u.postCount}
              </div>
              <div className="text-right text-[11px] text-[color:var(--color-muted)]">
                {relativeTime(u.lastSeenAt)}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
