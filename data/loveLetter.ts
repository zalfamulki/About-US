// Surat — arsip (halaman /letters) + surat utama anniversary (Fase 5).

export type LoveLetter = {
  id: string;
  from: "Zall" | "Kia";
  to: "Zall" | "Kia";
  title: string;
  date: string;
  body: string;
  preview: string;
};

export const letters: LoveLetter[] = [
  {
    id: "letter-1",
    from: "Zall",
    to: "Kia",
    title: "Untuk Hari-Hari Yang Sunyi",
    date: "12 Oktober 2024",
    preview: "Kadang aku heran kenapa hal-hal sederhana bisa terasa begitu ramai kalau sama kamu...",
    body: "Kadang aku heran kenapa hal-hal sederhana bisa terasa begitu ramai kalau sama kamu. Duduk berjam-jam tanpa bicara banyak pun nggak terasa canggung. Terima kasih ya sudah jadi tempat pulang paling tenang di antara bisingnya dunia.",
  },
  {
    id: "letter-2",
    from: "Kia",
    to: "Zall",
    title: "Catatan Kecil Pas LDR",
    date: "18 Desember 2024",
    preview: "Jangan lupa makan tepat waktu. Walaupun jauh, aku tahu kamu suka lupa...",
    body: "Jangan lupa makan tepat waktu! Walaupun jauh, aku tahu kamu suka lupa kalau lagi sibuk. Video call semalem lucu banget, kamu ketiduran duluan padahal katanya mau nemenin. Tapi Nggak apa-apa, selamat tidur tempat curhat favoritku.",
  },
  {
    id: "letter-3",
    from: "Zall",
    to: "Kia",
    title: "Tentang Matcha Dan Salah Lirik",
    date: "14 Februari 2025",
    preview: "Setiap kali dengar lagu The Beatles, aku pasti senyum-senyum sendiri...",
    body: "Setiap kali dengar lagu The Beatles, aku pasti senyum-senyum sendiri ingat kamu yang nyanyi salah lirik sepanjang jalan. Jangan pernah berubah ya, salah lirikmu itu bagian favoritku.",
  },
];

// Surat utama yang dibuka via envelope di halaman anniversary.
// Ganti dengan surat asli sebelum dikirim ke pasangan.
export const anniversaryLetter = {
  from: "Zall",
  to: "Kia",
  greeting: "Dear Kia,",
  body: "Dua tahun berlalu dan aku masih memilih kamu — hari ini, besok, dan semua hari biasa di antaranya. Terima kasih sudah jadi tempat pulang paling tenang.",
  signature: "Love, Zall ♡",
};
