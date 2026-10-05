// Lagu + hal favorit — dipakai PlaylistRow (sekarang) dan
// FavoriteThings + MusicPlayer (Fase 5) nanti.

export type Song = {
  title: string;
  artist: string;
  reason: string;
};

export const playlist: Song[] = [
  {
    title: "Best Part",
    artist: "Daniel Caesar",
    reason: "diputar terus pas video call LDR kemarin",
  },
  {
    title: "Here There and Everywhere",
    artist: "The Beatles",
    reason: "lagu yang kamu nyanyikan salah lirik, sepanjang jalan",
  },
  {
    title: "Blue",
    artist: "yung kai",
    reason: "soundtrack random drive jam 10 malam",
  },
  {
    title: "Sunsetz",
    artist: "Cigarettes After Sex",
    reason: "kamu bilang lagu ini 'rasanya kayak kita'",
  },
];

export type FavoriteThing = {
  id: string;
  emoji: string;
  label: string;
  value: string;
  detail: string;
};

export const favoriteThings: FavoriteThing[] = [
  { id: "song", emoji: "🎵", label: "Our Song", value: "Best Part — Daniel Caesar", detail: "Diputar terus pas video call LDR kemarin." },
  { id: "food", emoji: "🍜", label: "Favorite Food", value: "Ganti dengan makanan kalian", detail: "Ceritakan kapan pertama makan bareng." },
  { id: "place", emoji: "📍", label: "Favorite Place", value: "Ganti dengan tempat kalian", detail: "Tempat yang sampai sekarang masih punya cerita sendiri." },
  { id: "movie", emoji: "🎬", label: "Favorite Movie", value: "Ganti dengan film kalian", detail: "Yang ditonton pas first date (atau yang bikin ketiduran)." },
  { id: "joke", emoji: "😂", label: "Favorite Inside Joke", value: "\"kaosnya lucu juga ternyata\"", detail: "Hanya kita yang ngerti." },
  { id: "photo", emoji: "📸", label: "Favorite Photo", value: "Ganti dengan foto kalian", detail: "Taruh di public/memories/favorite.webp." },
  { id: "activity", emoji: "☕", label: "Favorite Activity", value: "Random drive jam 10 malam", detail: "Nggak penting-penting amat, tapi selalu seru." },
];
