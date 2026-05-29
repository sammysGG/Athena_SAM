"use client";

import { useLang } from "@/lib/lang";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-[color:var(--color-panel)] mt-10">
      <div className="container py-6 text-xs text-[color:var(--color-muted)] grid gap-3 md:grid-cols-3">
        <div>
          <div className="text-[color:var(--color-ink)] font-bold tracking-widest text-sm mb-2">
            S.A.M._
          </div>
          <p className="leading-relaxed">
            {t(
              "Закрытая платформа. Доступ только по приглашениям проверенных участников. Логи не ведутся. Зеркала меняются еженедельно.",
              "Closed platform. Entry by vetted-member invite only. No logs are kept. Mirrors rotate weekly.",
            )}
          </p>
        </div>
        <div>
          <div className="uppercase tracking-widest text-[10px] mb-2">{t("Зеркала", "Mirrors")}</div>
          <ul className="space-y-1 font-mono">
            <li>sam-07.onion <span className="text-[color:var(--color-go)]">[online]</span></li>
            <li>sam-bk03.i2p <span className="text-[color:var(--color-go)]">[online]</span></li>
            <li>sam-fallback.lokinet <span className="text-[color:var(--color-warn)]">[degraded]</span></li>
            <li>sam-r4.onion <span className="text-[color:var(--color-accent)]">[seized 2024-08]</span></li>
          </ul>
        </div>
        <div>
          <div className="uppercase tracking-widest text-[10px] mb-2">{t("Правила", "Rules")}</div>
          <ul className="space-y-1 list-decimal pl-4">
            <li>{t("Без работы по СНГ. Никогда.", "No CIS-region work. Ever.")}</li>
            <li>{t("Никаких медицинских целей и АЭС.", "No medical or nuclear targets.")}</li>
            <li>{t("PGP обязателен для сделок > 0.5 BTC.", "PGP mandatory for deals > 0.5 BTC.")}</li>
            <li>{t("Запрещены деаноны участников.", "Doxxing of members is banned.")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-line)]">
        <div className="container py-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] flex justify-between">
          <span>SAM // build 7.04 // {new Date().getFullYear()}</span>
          <span className="blink">{t("СЕАНС АКТИВЕН", "SESSION ACTIVE")}</span>
        </div>
      </div>
    </footer>
  );
}
