const TOKEN = /(\[[^\]]+\])/g;

/** True when the whole value is an organizer placeholder like "[VENUE]". */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /\[[^\]]+\]/.test(value);
}

/** Splits text into plain and placeholder segments for rendering. */
export function splitPlaceholders(value: string): { text: string; placeholder: boolean }[] {
  // With a capturing group, split() puts matches at odd indices.
  return value
    .split(TOKEN)
    .map((text, i) => ({ text, placeholder: i % 2 === 1 }))
    .filter((s) => s.text.length > 0);
}

/** Returns a usable href, or undefined if the value is still a placeholder. */
export function resolveHref(value: string | undefined | null): string | undefined {
  if (!value || isPlaceholder(value)) return undefined;
  return value;
}

export function resolveEmail(value: string | undefined | null): string | undefined {
  if (!value || isPlaceholder(value) || !value.includes('@')) return undefined;
  return `mailto:${value}`;
}
