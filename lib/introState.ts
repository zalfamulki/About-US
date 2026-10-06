// Status intro anniversary dibagi SEMUA halaman (beranda & /anniversary):
// satu sesi = satu kali intro.
//
// Alur Opsi B (keputusan 6 Okt 2026): user buka web → intro (Loading →
// Envelope) jalan di beranda → selesai → langsung diarahkan ke /anniversary.
// /anniversary membaca status yang sama sehingga TIDAK memutar intro lagi,
// tapi tetap punya intro saat dikunjungi langsung (URL dibuka sendiri).

export type IntroStep = "loading" | "envelope" | "done";

const STEP_KEY = "anniversary_intro_step";
const LEGACY_SEEN_KEY = "anniversary_intro_seen";

export function readPersistedStep(): IntroStep {
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw === "loading" || raw === "envelope" || raw === "done") return raw;
    // Fallback flag versi lama: pernah selesai = langsung beranda/flow.
    if (sessionStorage.getItem(LEGACY_SEEN_KEY) === "true") return "done";
  } catch {
    // sessionStorage diblokir → anggap kunjungan baru.
  }
  return "loading";
}

export function writePersistedStep(step: IntroStep) {
  try {
    sessionStorage.setItem(STEP_KEY, step);
    if (step === "done") sessionStorage.setItem(LEGACY_SEEN_KEY, "true");
  } catch {
    // ignore — state in-memory tetap jalan untuk sesi ini.
  }
}

export function subscribeIntroStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}
