// Soal quiz + who-is-more-likely — baru di Fase 1, dipakai Fase 4.
// Ganti jawaban dengan versi asli kalian sebelum dikirim ke pasangan.

export type QuizQuestion = {
  question: string;
  options: string[];
  /** Index jawaban benar di dalam options */
  answer: number;
};

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Where was our first date?",
    options: ["Downtown cinema", "Suatu kafe di Bandung", "Alfamart sebelah", "Stasiun yang salah"],
    answer: 0,
  },
  {
    question: "Who said I love you first?",
    options: ["Zall", "Kia", "Barengan", "Rahasia"],
    answer: 0,
  },
  {
    question: "Who falls asleep first?",
    options: ["Zall", "Kia", "Tergantung harinya", "Dua-duanya melek"],
    answer: 0,
  },
  {
    question: "What's our most random memory?",
    options: [
      "Es krim di trotoar",
      "Nyasar satu jam",
      "Matcha yang ketuker",
      "Semua di atas",
    ],
    answer: 3,
  },
  {
    question: "Who is more annoying?",
    options: ["Zall", "Kia", "Seimbang", "Nggak ada yang ngaku"],
    answer: 2,
  },
];

export type MoreLikelyQuestion = {
  question: string;
};

export const moreLikelyQuestions: MoreLikelyQuestion[] = [
  { question: "Fall asleep during a movie?" },
  { question: "Say sorry first?" },
  { question: "Get hungry first?" },
  { question: "Forget where they put their phone?" },
  { question: "Randomly say something weird?" },
  { question: "Spend too long choosing food?" },
];
