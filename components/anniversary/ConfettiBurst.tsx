"use client";

import confetti from "canvas-confetti";

type BurstOptions = {
  /** Jumlah partikel — dibatasi agar tetap mulus di HP */
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
};

function shouldReduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Ledakan confetti satu kali — hormati prefers-reduced-motion. */
export function confettiBurst({
  particleCount = 120,
  spread = 75,
  origin = { x: 0.5, y: 0.6 },
}: BurstOptions = {}) {
  if (shouldReduceMotion()) return;
  confetti({
    particleCount: Math.min(particleCount, 150),
    spread,
    origin,
    // Palet anniversary: dusty rose / peach / lavender / cream
    colors: ["#d9a6a0", "#c08b84", "#f0dcd8", "#e8b4a0", "#c3b2d6", "#fff6ec"],
    disableForReducedMotion: true,
  });
}

/** Rayakan dengan 2 ledakan kiri-kanan (dipakai Quiz & Celebration). */
export function confettiCelebration() {
  if (shouldReduceMotion()) return;
  const end = Date.now() + 600;
  confettiBurst({ particleCount: 90, origin: { x: 0.2, y: 0.7 } });
  confettiBurst({ particleCount: 90, origin: { x: 0.8, y: 0.7 } });
  const timer = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(timer);
      return;
    }
    confetti({
      particleCount: 20,
      spread: 100,
      startVelocity: 35,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
      colors: ["#d9a6a0", "#f0dcd8", "#c3b2d6"],
      disableForReducedMotion: true,
    });
  }, 200);
}

export default function ConfettiBurst({ onFire }: { onFire?: boolean }) {
  // Komponen placeholder — kebanyakan kasus cukup panggil
  // confettiBurst() / confettiCelebration() dari event handler.
  // Props onFire disediakan agar bisa dipakai deklaratif nanti.
  if (onFire) {
    confettiBurst();
  }
  return null;
}
