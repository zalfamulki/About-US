// Data utama pasangan — satu-satunya tempat untuk mengganti nama,
// tanggal anniversary, quote, dan lagu. Sinkron dengan lib/counter.ts
// (ANNIVERSARY = 6 Oktober 2024).
//
// NOTE nama: ejaan RESMI = "Zall" (keputusan 6 Okt 2026). Prompt asli
// menulis "Zalfa", tapi seluruh data & komponen memakai "Zall" — jangan
// pakai "Zalfa" lagi (lihat LANJUTAN-ANNIVERSARY.md §6).

export const couple = {
  person1: "Zall",
  person2: "Kia",

  anniversaryDate: "2024-10-06",

  song: {
    title: "Our Song",
    artist: "Artist",
    // Taruh file asli di public/audio/our-song.mp3 lalu biarkan path ini.
    url: "/audio/our-song.mp3",
  },
};

export type Person = {
  name: string;
  initial: string;
  facts: string[];
};

export const aboutUs = {
  people: [
    {
      name: "Zall",
      initial: "Z",
      facts: ["paling cepet ngantuk", "playlist-nya dia yang bikin"],
    },
    {
      name: "Kia",
      initial: "K",
      facts: ["tim matcha", "bisa nyanyi salah lirik dengan percaya diri"],
    },
  ] satisfies Person[],
  note: "Situs ini cuma tempat naruh hal-hal yang sayang buat dilupain. Foto bakal ditambahin pelan-pelan, ceritanya juga.",
};

export const homeQuote = {
  text: "kalau nanti ditanya rumahnya di mana, jawabannya di sini.",
  from: "chat, 2 November 2025",
};

// Dipakai oleh ReasonsJar (halaman umum) dan LoveCards (halaman anniversary).
export const reasonsILoveYou: string[] = [
  "Cara kamu ketawa saat hal konyol terjadi.",
  "Kamu selalu tahu kapan aku butuh didengarkan tanpa dipotong.",
  "Momen saat kamu nyanyi salah lirik dengan penuh percaya diri.",
  "Ekspresi kamu pas pesan matcha kesukaanmu.",
  "Kamu buat hari paling biasa terasa jadi momen spesial.",
  "Semua pesan singkat 'hati-hati ya' yang selalu kamu kirim.",
  "Gaya kamu nge-judge kaosku pas pertama kali ketemu.",
  "Karena sama kamu, aku nggak perlu pura-pura jadi orang lain.",
  "Cara kamu memegang tanganku saat menyeberang jalan.",
  "Setiap obrolan random jam 12 malam yang nggak ada ujungnya.",
  "Karena kamu adalah alasan aku selalu pengen cepat pulang.",
  "Senyum kamu saat pertama kali buka mata di pagi hari.",
];
