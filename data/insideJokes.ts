// Inside jokes — dipakai Fase 4 (InsideJokes).
// Tipe "hidden" baru terungkap setelah diklik, sesuai prompt §6.

export type InsideJoke = {
  id: string;
  title: string;
  text: string;
  kind: "chat" | "note" | "meme" | "photo";
  hidden?: boolean;
};

export const insideJokes: InsideJoke[] = [
  {
    id: "joke-1",
    title: "Remember when...",
    text: "Kita turun di stasiun yang salah dan tidak ada yang mau ngaku capek duluan.",
    kind: "chat",
  },
  {
    id: "joke-2",
    title: "Why did we even do that",
    text: "Beli es krim terus duduk di trotoar sampai lampu jalan mati sendiri.",
    kind: "note",
  },
  {
    id: "joke-3",
    title: "That one stupid joke",
    text: "Klik untuk membuka... hanya kita yang ngerti.",
    kind: "meme",
    hidden: true,
  },
  {
    id: "joke-4",
    title: "POV: nobody else understands this",
    text: "\"kaosnya lucu juga ternyata\" — dan sejak itu jadi bahan tiap minggu.",
    kind: "chat",
  },
];
