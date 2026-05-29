import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { relativeTime, fullTimestamp } from "@/lib/format";

export const dynamic = "force-dynamic";

const statusClass = (s: string) => {
  if (s === "ACTIVE") return "chip chip-red";
  if (s === "PLANNED") return "chip chip-warn";
  if (s === "FAILED") return "chip";
  return "chip chip-green";
};

export default async function OperationsPage() {
  const ops = await prisma.operation.findMany({
    orderBy: { claimedAt: "desc" },
  });

  return (
    <div className="container py-6 space-y-4">
      <header className="panel p-4">
        <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-accent)] glow-red">
          // РЕЕСТР ОПЕРАЦИЙ
        </div>
        <h1>Заявленные удары LOCKJAW CERBERUS</h1>
        <p className="text-sm text-[color:var(--color-muted)] mt-2 max-w-3xl">
          Хронология заявленных операций кластера и союзников. Каждая позиция
          подтверждается ссылкой на тему форума или PCAP-доказательством. Операции
          по СНГ в этот список не попадают — правила платформы.
        </p>
      </header>

      <section className="panel">
        <div className="hrule px-4 py-2 grid grid-cols-[160px_1fr_140px_120px_140px] gap-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] bg-black/30">
          <span>Кодовое имя</span>
          <span>Описание</span>
          <span>Цель</span>
          <span>Статус</span>
          <span className="text-right">Заявлено</span>
        </div>
        <ul>
          {ops.map((op) => (
            <li
              key={op.id}
              className="hrule last:border-b-0 px-4 py-3 grid grid-cols-[160px_1fr_140px_120px_140px] gap-3 items-start text-sm hover:bg-[color:var(--color-panel-2)] transition"
            >
              <div>
                <div className="text-[color:var(--color-accent)] font-bold font-mono glow-red">
                  {op.codename}
                </div>
                <div className="text-[10px] text-[color:var(--color-muted)]">
                  {op.codenameEn}
                </div>
              </div>
              <div className="text-[color:var(--color-ink)]/90 text-xs leading-relaxed">
                {op.summary}
                {op.coClaimants && (
                  <div className="mt-1 text-[10px] text-[color:var(--color-muted)]">
                    совместно с: <span className="text-[color:var(--color-accent)]">{op.coClaimants}</span>
                  </div>
                )}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
                <div className="text-[color:var(--color-ink)]">{op.targetCountry ?? "—"}</div>
                <div>{op.targetSector ?? "—"}</div>
              </div>
              <div>
                <span className={statusClass(op.status)}>{op.status}</span>
              </div>
              <div className="text-right text-[11px] text-[color:var(--color-muted)]">
                <div>{relativeTime(op.claimedAt)}</div>
                <div className="text-[10px]">{fullTimestamp(op.claimedAt)}</div>
                {op.threadId && (
                  <Link
                    href={`/t/${op.threadId}`}
                    className="text-[10px] text-[color:var(--color-info)] hover:underline"
                  >
                    подробнее →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
