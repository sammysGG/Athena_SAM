"use client";

import { useLang } from "@/lib/lang";
import { relativeTime } from "@/lib/format";

type Op = {
  id: string;
  codename: string;
  codenameEn: string;
  summary: string;
  summaryEn: string;
  targetCountry: string | null;
  targetSector: string | null;
  status: string;
  claimedAt: Date;
};

const statusClass = (s: string) => {
  if (s === "ACTIVE") return "chip chip-red";
  if (s === "PLANNED") return "chip chip-warn";
  if (s === "FAILED") return "chip";
  return "chip chip-green";
};

export default function OpsTicker({ ops }: { ops: Op[] }) {
  const { lang, t } = useLang();
  return (
    <section className="panel">
      <div className="hrule px-4 py-2 flex items-center justify-between bg-black/30">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
          // {t("Лента операций", "Operations Feed")}
        </h2>
        <span className="text-[10px] text-[color:var(--color-muted)] blink">LIVE</span>
      </div>
      <div className="divide-y divide-[color:var(--color-line)]">
        {ops.map((op) => (
          <div key={op.id} className="px-4 py-2.5 grid grid-cols-[140px_1fr_120px_120px] gap-3 text-xs items-start">
            <div>
              <div className="text-[color:var(--color-accent)] font-bold font-mono glow-red">
                {lang === "ru" ? op.codename : op.codenameEn}
              </div>
              <div className="text-[10px] text-[color:var(--color-muted)]">
                {relativeTime(op.claimedAt, lang)}
              </div>
            </div>
            <div className="text-[color:var(--color-ink)]/90 leading-snug">
              {lang === "ru" ? op.summary : op.summaryEn}
            </div>
            <div className="text-[color:var(--color-muted)] uppercase tracking-wider text-[10px]">
              <div>{op.targetCountry ?? "—"}</div>
              <div>{op.targetSector ?? "—"}</div>
            </div>
            <div className="text-right">
              <span className={statusClass(op.status)}>{op.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
