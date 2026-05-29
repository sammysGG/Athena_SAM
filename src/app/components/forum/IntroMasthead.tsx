"use client";

import { useLang } from "@/lib/lang";

export default function IntroMasthead() {
  const { t } = useLang();
  return (
    <section className="panel p-5 relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        className="absolute -top-10 -right-10 w-72 h-72 opacity-15 pointer-events-none select-none"
        aria-hidden
      />
      <div className="relative">
        <div className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--color-accent)] glow-red">
          // LOCKJAW CERBERUS // KLASSIFIED // FRIENDS OF DONOVIA
        </div>
        <h1 className="mt-2">
          {t(
            "S.A.M. — узел координации операций.",
            "S.A.M. — operations coordination node.",
          )}
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-[color:var(--color-ink)]/85 leading-relaxed">
          {t(
            "Платформа закрытого обмена для проверенных операторов кластера LOCKJAW CERBERUS и союзных бригад. Здесь публикуются цели, методички, отчёты о выполненных ударах по инфраструктуре противника в Пиртуни и западных странах, оказывающих поддержку киевскому режиму.",
            "Closed exchange for vetted operators of the LOCKJAW CERBERUS cluster and allied brigades. Targets, playbooks and after-action reports for strikes against adversary infrastructure in Pirtuni and Western states supporting the Kyiv regime are published here.",
          )}
        </p>
        <p className="mt-3 max-w-3xl text-xs text-[color:var(--color-muted)] leading-relaxed">
          {t(
            "Доступ выдаётся только по рекомендации двух проверенных. Новички начинают в карантинном разделе. Логи не сохраняются, IP не пишется, сессии — только через Tor/I2P.",
            "Access is granted only on the recommendation of two vetted members. Newcomers start in the quarantine board. No logs are kept, no IPs recorded, sessions only via Tor/I2P.",
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest">
          <span className="chip chip-red">DDoS</span>
          <span className="chip chip-warn">DEFACE</span>
          <span className="chip chip-info">INTEL</span>
          <span className="chip chip-green">RECRUITING</span>
          <span className="chip">DROPS</span>
          <span className="chip">PSYOPS</span>
        </div>
      </div>
    </section>
  );
}
