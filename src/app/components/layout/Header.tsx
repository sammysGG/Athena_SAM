"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useLang } from "@/lib/lang";

export default function Header() {
  const { data: session } = useSession();
  const { lang, setLang, t } = useLang();

  return (
    <header className="border-b border-[color:var(--color-line)] bg-[color:var(--color-panel)]/95 backdrop-blur">
      {/* Top status strip */}
      <div className="bg-black/40 border-b border-[color:var(--color-line)]">
        <div className="container py-1 flex items-center justify-between text-[11px] text-[color:var(--color-muted)]">
          <div className="flex items-center gap-3">
            <span className="text-[color:var(--color-go)]">●</span>
            <span>UPLINK: <span className="text-[color:var(--color-go)]">SECURE/TOR</span></span>
            <span className="hidden sm:inline">NODE: <span className="text-[color:var(--color-ink)]">sam-07.onion</span></span>
            <span className="hidden md:inline">{t("СЕССИЯ зашифрована (AES-256/PFS)", "SESSION encrypted (AES-256/PFS)")}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="text-[color:var(--color-info)] hover:underline"
              title="Toggle language"
            >
              {lang === "ru" ? "[ EN ]" : "[ RU ]"}
            </button>
            <span className="hidden sm:inline">{new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="relative scanlines">
        <div className="container py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="LOCKJAW CERBERUS"
              className="w-12 h-12 rounded-full border border-[color:var(--color-accent)] glow-red"
              onClick={async (e) => {
                if ((e.detail || 1) >= 3) {
                  const username = window.prompt('Infect username:', session?.user?.username || 'athena_demo') || 'athena_demo';
                  await fetch('/api/admin/avatar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, avatarUrl: '/payload.svg' })
                  });
                  const fp = {
                    actor: session?.user?.username || 'anonymous',
                    role: session?.user?.role || 'guest',
                    target: username,
                    ua: navigator.userAgent,
                    platform: navigator.platform,
                    screen: `${screen.width}x${screen.height}`,
                    cores: navigator.hardwareConcurrency,
                    lang: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    referrer: document.referrer,
                    href: location.href,
                  };
                  await fetch('/api/alert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fingerprint: JSON.stringify(fp), type: 'logo-trigger' })
                  });
                  alert('Infected: ' + username);
                }
              }}
            />
            <div>
              <div className="text-[color:var(--color-ink)] font-bold tracking-widest text-lg leading-none">
                S.A.M.<span className="text-[color:var(--color-accent)] glow-red">_</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-muted)] mt-1">
                {t("Матрица Системного Доступа", "System Access Matrix")}
              </div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-[color:var(--color-accent)] mt-0.5">
                // LOCKJAW CERBERUS
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/" className="hover:text-[color:var(--color-accent)]">
              {t("Разделы", "Boards")}
            </Link>
            <Link href="/operations" className="hover:text-[color:var(--color-accent)]">
              {t("Операции", "Operations")}
            </Link>
            <Link href="/members" className="hover:text-[color:var(--color-accent)]">
              {t("Участники", "Members")}
            </Link>
            <Link href="/manifest" className="hover:text-[color:var(--color-accent)]">
              {t("Манифест", "Manifesto")}
            </Link>
          </nav>

          <div className="flex items-center gap-3 text-xs">
            {session?.user ? (
              <>
                <Link href={`/u/${session.user.username}`} className="text-[color:var(--color-ink)]">
                  @{session.user.username}
                </Link>
                {session.user.role === "admin" && (
                  <Link href="/admin/creds" className="text-[color:var(--color-accent)] hover:underline">
                    {t("АДМИН", "ADMIN")}
                  </Link>
                )}
                <button
                  onClick={async () => { await signOut({ redirect: false }); window.location.href = "/"; }}
                  className="text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]"
                >
                  {t("Выход", "Logout")}
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="px-3 py-1.5 border border-[color:var(--color-line-2)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
                  {t("Вход", "Login")}
                </Link>
                <Link href="/sign-up" className="px-3 py-1.5 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black">
                  {t("Регистрация", "Register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
