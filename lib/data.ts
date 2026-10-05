// Kompatibilitas: seluruh komponen lama mengimpor dari "@/lib/data".
// Sumber kebenaran sudah pindah ke /data/* — file ini hanya re-export
// agar tidak ada impor yang rusak selama migrasi bertahap (Fase 1).
// Kode baru disarankan mengimpor langsung dari "@/data/...".

export { couple, aboutUs, homeQuote, reasonsILoveYou } from "@/data/couple";
export type { Person } from "@/data/couple";

export { timeline } from "@/data/timeline";
export type { TimelineEntry } from "@/data/timeline";

export {
  TAG_LABELS,
  memories,
  highlights,
  albums,
  randomMemories,
} from "@/data/memories";
export type { MemoryTag, Memory, Photo, Album } from "@/data/memories";

export { playlist, favoriteThings } from "@/data/favorites";
export type { Song, FavoriteThing } from "@/data/favorites";

export { quizQuestions, moreLikelyQuestions } from "@/data/questions";
export type { QuizQuestion, MoreLikelyQuestion } from "@/data/questions";

export { insideJokes } from "@/data/insideJokes";
export type { InsideJoke } from "@/data/insideJokes";

export { letters, anniversaryLetter } from "@/data/loveLetter";
export type { LoveLetter } from "@/data/loveLetter";
