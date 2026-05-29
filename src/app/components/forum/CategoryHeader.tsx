"use client";

import { useLang } from "@/lib/lang";

type C = {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string | null;
  restricted: boolean;
};

export default function CategoryHeader({
  category,
  threadCount,
}: {
  category: C;
  threadCount: number;
}) {
  const { lang, t } = useLang();
  return (
    <section className="panel p-4 flex items-start gap-4">
      <div className="w-14 h-14 border border-[color:var(--color-accent)] flex items-center justify-center text-[color:var(--color-accent)] font-bold glow-red">
        {category.icon ?? "##"}
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          // {t("Раздел", "Board")}
        </div>
        <h1 className="mt-0.5">
          {lang === "ru" ? category.name : category.nameEn}
          {category.restricted && (
            <span className="chip chip-red ml-3 align-middle">
              {t("ЗАКРЫТО", "RESTRICTED")}
            </span>
          )}
        </h1>
        <p className="text-sm text-[color:var(--color-muted)] mt-1 max-w-3xl">
          {lang === "ru" ? category.description : category.descriptionEn}
        </p>
      </div>
      <div className="text-right text-xs">
        <div className="text-[color:var(--color-ink)] font-mono text-2xl">{threadCount}</div>
        <div className="text-[10px] uppercase text-[color:var(--color-muted)]">
          {t("тем всего", "threads total")}
        </div>
      </div>
    </section>
  );
}
