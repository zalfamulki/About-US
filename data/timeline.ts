// Timeline cerita — dipakai halaman /story sekarang dan
// CinematicTimeline (halaman /anniversary) nanti.
// Field foto/quote/doodle opsional agar data lama tetap jalan;
// isi bertahap saat foto asli sudah ada di public/memories/.

export type TimelineDoodle = "coffee" | "mail" | "moon" | "plane";

export type TimelineEntry = {
  date: string;
  title: string;
  description: string;
  /** Path next/image, mis. "/memories/first-meet.webp" */
  photo?: string;
  quote?: string;
  /** Stiker doodle kecil (di-render sebagai SVG lucide di CinematicTimeline) */
  doodle?: TimelineDoodle;
};

export const timeline: TimelineEntry[] = [
  {
    date: "15 Juni 2024",
    title: "Pertama ketemu",
    description:
      "Sebuah kafe, kaos yang di-judge, dan percakapan yang nggak mau berhenti.",
    quote: "\u201ckaosnya lucu juga ternyata\u201d",
    doodle: "coffee",
  },
  {
    date: "6 Oktober 2024",
    title: "Resmi jadi kita",
    description:
      "Hari ini tanggalnya disimpen. Nggak perlu alasan tambahan.",
    quote: "\u201csejak hari ini, kita\u201d",
    doodle: "mail",
  },
  {
    date: "Desember 2024",
    title: "LDR dimulai",
    description:
      "Jarak ikut campur, tapi video call tiap malam jadi ritual baru.",
    quote: "\u201cjangan lupa makan tepat waktu\u201d",
    doodle: "moon",
  },
  {
    date: "2025",
    title: "Liburan pertama",
    description:
      "Baterai kamera habis duluan, tapi kenangannya ke-save semua.",
    quote: "\u201cnyasar sedikit, ketawa banyak\u201d",
    doodle: "plane",
  },
];
