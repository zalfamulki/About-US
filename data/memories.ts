// Kenangan, highlights, dan album — pindahan dari lib/data.ts.
// Foto asli: taruh WebP/AVIF di public/memories/ lalu isi field photo.

export type MemoryTag =
  | "first_meet"
  | "first_date"
  | "trip"
  | "funny"
  | "anniversary"
  | "random";

export type Memory = {
  slug: string;
  title: string;
  story: string;
  date: string;
  location: string;
  tag: MemoryTag;
  note?: string;
  quote?: string;
  /** Path foto, mis. "/memories/first-date.webp" */
  photo?: string;
};

export type Photo = {
  id: number;
  caption?: string;
  date?: string;
  location?: string;
  isHighlight?: boolean;
  /** Path foto, mis. "/memories/highlight-1.webp" */
  src?: string;
};

export type Album = {
  slug: string;
  title: string;
  description: string;
  photoCount: number;
  /** Cover opsional, mis. "/memories/album-first-date.webp" */
  cover?: string;
};

export const TAG_LABELS: Record<MemoryTag, string> = {
  first_meet: "first meet",
  first_date: "first date",
  trip: "trip",
  funny: "funny",
  anniversary: "anniversary",
  random: "random",
};

export const memories: Memory[] = [
  {
    slug: "first-meet",
    title: "First Meet",
    story:
      "Kami ketemu gak sengaja, dan kamu langsung nge-judge kaosku. Fair enough.",
    date: "2024-06-15",
    location: "Suatu kafe di Bandung",
    tag: "first_meet",
    quote: "\"kaosnya lucu juga ternyata\"",
  },
  {
    slug: "first-date",
    title: "First Date",
    story:
      "Nonton film tapi yang diingat malah perjalanan pulangnya. Kita turun di stasiun yang salah, jalan kaki hampir satu jam, dan nggak ada yang mau bilang capek duluan.",
    date: "2024-07-02",
    location: "Downtown",
    tag: "first_date",
    note: "kamu minum matcha, terakhir malah minum punyaku",
  },
  {
    slug: "random-tuesday",
    title: "Random Tuesday",
    story:
      "Nggak ada acara apa-apa. Beli es krim, duduk di trotoar, ngobrol sampai lampu jalan mati sendiri.",
    date: "2024-08-13",
    location: "Alfamart sebelah",
    tag: "random",
  },
];

// Caption playful untuk lightbox & strip — nada sesuai prompt:
// personal, sedikit malu-malu, tidak formal.
const HIGHLIGHT_CAPTIONS = [
  "you looked cute here ♡",
  "we had no idea this day would become a memory.",
  "one of my favorite ordinary days.",
  "why were we like this.",
  "kantin corner, as usual.",
  "foto ke-99 dari 100.",
  "that laugh. that day.",
  "disimpan baik-baik ♡",
];

export const highlights: Photo[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  caption: HIGHLIGHT_CAPTIONS[i % HIGHLIGHT_CAPTIONS.length],
  date: i % 3 === 0 ? "Okt 2024" : undefined,
  location: i % 4 === 0 ? "Bandung" : undefined,
  isHighlight: true,
}));

export const albums: Album[] = [
  {
    slug: "first-date",
    title: "Our First Date",
    description: "Turun di stasiun yang salah, pulangnya lupa waktu.",
    photoCount: 12,
  },
  {
    slug: "random-days",
    title: "Random Days",
    description: "Nggak penting-penting amat, tapi disimpen semua.",
    photoCount: 24,
  },
  {
    slug: "holiday-2025",
    title: "Holiday 2025",
    description: "Liburan pertama kita. Baterai kamera habis duluan.",
    photoCount: 31,
  },
];

// Dipakai RandomMemory nanti: memori singkat tanpa perlu foto.
export const randomMemories: string[] = [
  "Remember when we stayed up way too late talking?",
  "Remember when we took 100 photos and only liked 1?",
  "Remember when we laughed at something that wasn't even funny?",
  "Remember when we got lost and pretended it was the plan?",
  "Remember that ordinary day that somehow became a favorite memory?",
];
