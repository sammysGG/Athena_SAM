// Slugify Cyrillic + Latin titles into URL-safe ASCII-ish forms.
const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh",
  щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function slugify(input: string): string {
  const lower = input.toLowerCase().trim();
  const transliterated = Array.from(lower)
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("");
  const ascii = transliterated
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return ascii || `t-${Math.random().toString(36).slice(2, 8)}`;
}

// Append a short random suffix to keep slugs unique.
export function uniqueSlug(base: string): string {
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}
