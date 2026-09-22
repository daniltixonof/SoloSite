// Незаполненные места отмечаются прямо в тексте: [ЦИФРА: что нужно] или [ЗАПОЛНИТЬ: что нужно].
// Так их видно на странице, легко найти грепом и можно заменить обычной правкой текста.

const PATTERN = String.raw`\[(ЦИФРА|ЗАПОЛНИТЬ)(?::\s*([^\]]*))?\]`;

// Каждый вызов создаёт свежую регулярку: глобальная хранит lastIndex между вызовами.
const re = () => new RegExp(PATTERN, 'g');

export type MarkerKind = 'ЦИФРА' | 'ЗАПОЛНИТЬ';
export type Chunk =
  | { type: 'text'; value: string }
  | { type: 'marker'; kind: MarkerKind; hint: string };

/** Разбивает текст на обычные куски и маркеры — для разметки. */
export function splitMarkers(text: string): Chunk[] {
  const chunks: Chunk[] = [];
  let last = 0;
  for (const m of text.matchAll(re())) {
    const at = m.index ?? 0;
    if (at > last) chunks.push({ type: 'text', value: text.slice(last, at) });
    chunks.push({ type: 'marker', kind: m[1] as MarkerKind, hint: (m[2] ?? '').trim() });
    last = at + m[0].length;
  }
  if (last < text.length) chunks.push({ type: 'text', value: text.slice(last) });
  return chunks;
}

export const hasMarker = (text: string) => re().test(text);

/** Убирает маркеры из текста. Обязательно для title, description и структурированных данных. */
export const stripMarkers = (text: string) =>
  text.replace(re(), '…').replace(/\s+/g, ' ').trim();

export const countMarkers = (text: string) => (text.match(re()) ?? []).length;
