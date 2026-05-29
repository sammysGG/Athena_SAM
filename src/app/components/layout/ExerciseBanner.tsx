// Athena exercise notice. Pinned to the bottom of every page so it's clear the
// site is training material, not a real underground board.
export default function ExerciseBanner() {
  return (
    <div className="bg-amber-400 text-amber-950 border-t border-amber-500">
      <div className="container py-3 flex items-start gap-2 text-sm leading-snug">
        <span aria-hidden className="font-bold">⚠</span>
        <p>
          <span className="font-semibold">Exercise Athena Strike 2026.</span> All accounts,
          posts, group names and operations on this site are{" "}
          <strong>purely fictional</strong> and form part of a training exercise. This is
          not a real platform.
        </p>
      </div>
    </div>
  );
}
