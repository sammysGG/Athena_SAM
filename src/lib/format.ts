// Forum-style relative timestamps. We default to UTC because the in-scenario
// crew operates across timezones and we don't want the box's locale leaking.
export function relativeTime(d: Date | string, lang: "ru" | "en" = "ru"): string {
  const date = typeof d === "string" ? new Date(d) : d;
  const diffMs = Date.now() - date.getTime();
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (lang === "en") {
    if (sec < 30) return "just now";
    if (min < 1) return `${sec}s ago`;
    if (hr < 1) return `${min}m ago`;
    if (day < 1) return `${hr}h ago`;
    if (day < 30) return `${day}d ago`;
    return date.toISOString().slice(0, 10);
  }
  if (sec < 30) return "только что";
  if (min < 1) return `${sec} сек. назад`;
  if (hr < 1) return `${min} мин. назад`;
  if (day < 1) return `${hr} ч. назад`;
  if (day < 30) return `${day} дн. назад`;
  return date.toISOString().slice(0, 10);
}

export function fullTimestamp(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  // ISO-ish in UTC, e.g. "2024-03-14 09:32 UTC".
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}
