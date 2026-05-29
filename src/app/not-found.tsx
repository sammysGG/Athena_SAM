import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-accent)] glow-red">
        // 404 / NODE_NOT_FOUND
      </div>
      <h1 className="mt-3">Ресурс изъят или никогда не существовал.</h1>
      <p className="text-sm text-[color:var(--color-muted)] mt-2">
        Возможно, тема удалена администрацией или зеркало временно недоступно.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 px-4 py-2 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-black text-xs uppercase tracking-widest"
      >
        ← Назад
      </Link>
    </div>
  );
}
