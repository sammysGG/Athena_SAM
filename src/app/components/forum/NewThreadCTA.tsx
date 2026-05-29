"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useLang } from "@/lib/lang";

export default function NewThreadCTA({ categorySlug }: { categorySlug: string }) {
  const { data: session } = useSession();
  const { t } = useLang();

  if (!session?.user) {
    return (
      <div className="panel p-3 flex items-center justify-between text-xs">
        <span className="text-[color:var(--color-muted)]">
          {t(
            "Для создания темы требуется вход в систему.",
            "You must log in to start a thread.",
          )}
        </span>
        <Link
          href="/sign-in"
          className="px-3 py-1.5 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black"
        >
          {t("Вход", "Login")}
        </Link>
      </div>
    );
  }

  return (
    <div className="panel p-3 flex items-center justify-between text-xs">
      <span className="text-[color:var(--color-muted)]">
        {t("Создать тему в этом разделе:", "Open a new thread here:")}
      </span>
      <Link
        href={`/c/${categorySlug}/new`}
        className="px-3 py-1.5 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black"
      >
        + {t("Новая тема", "New Thread")}
      </Link>
    </div>
  );
}
