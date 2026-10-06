"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import LoadingScreen from "@/components/anniversary/LoadingScreen";
import EnvelopeIntro from "@/components/anniversary/EnvelopeIntro";
import AnniversaryHero from "@/components/anniversary/AnniversaryHero";
import CelebrationCounter from "@/components/anniversary/CelebrationCounter";
import CinematicTimeline from "@/components/anniversary/CinematicTimeline";
import LoveCards from "@/components/anniversary/LoveCards";
import FavoriteThings from "@/components/anniversary/FavoriteThings";
import LoveLetterMain from "@/components/anniversary/LoveLetterMain";
import MusicPlayer from "@/components/anniversary/MusicPlayer";
import EasterEggs from "@/components/anniversary/EasterEggs";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import IntroCover, { hideIntroCover } from "@/components/anniversary/IntroCover";
// Chapter berat (canvas-confetti) di-split agar JS awal ringan — keduanya
// di bawah lipatan, jadi dimuat terpisah tanpa first-paint ikut besar.
const Celebration = dynamic(
  () => import("@/components/anniversary/Celebration"),
  { ssr: false }
);
const FinalSurprise = dynamic(
  () => import("@/components/anniversary/FinalSurprise"),
  { ssr: false }
);
import {
  readPersistedStep,
  writePersistedStep,
  subscribeIntroStorage,
  type IntroStep,
} from "@/lib/introState";

const persistedToPhase = (
  step: IntroStep
): "loading" | "envelope" | "story" => (step === "done" ? "story" : step);

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function AnniversaryPage() {
  // null = belum ada keputusan in-memory → ikuti status persisted (shared
  // dengan beranda). SSR & first-render client identik karena snapshot
  // server = "loading" → tetap render LoadingScreen dulu, lalu setelah
  // hydration baca status sesungguhnya.
  // Penting: phase AWAL harus null, bukan "loading" — kalau sama, tombol
  // Replay (setPhase("loading")) diabaikan React (bailout, tak ada
  // re-render) sehingga loading screen tak pernah tampil setelah reload.
  // JANGAN baca window.matchMedia di initializer: server selalu "loading"
  // sedangkan client reduced-motion "story" → hydration mismatch.
  const [phase, setPhase] = useState<"loading" | "envelope" | "story" | null>(
    null
  );

  // Intro SEKALI per sesi — statusnya dibagi dengan beranda (/) via
  // sessionStorage (lib/introState). Kalau datang dari intro beranda
  // (status "done"), langsung ke story: jangan putar Loading/Envelope
  // dua kali. Kalau URL ini dibuka langsung di sesi baru, intro jalan di sini.
  const persistedStep = useSyncExternalStore(
    subscribeIntroStorage,
    readPersistedStep,
    (): IntroStep => "loading"
  );

  // Reduced-motion dibaca via useSyncExternalStore (hydration-safe by design:
  // saat hydration dipakai snapshot server=false, setelah itu sync otomatis).
  // Tanpa setState di effect → lolos lint + tanpa mismatch.
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  // Reduced-motion langsung ke story (tombol replay sengaja non-aktif visual
  // dalam mode ini — sesuai prinsip kurangi gerak). Fase in-memory menang
  // begitu bergerak (replay menulis "loading" ke store, tetap tampil).
  const visiblePhase = reduceMotion
    ? "story"
    : (phase ?? persistedToPhase(persistedStep));

  useEffect(() => {
    hideIntroCover();
  }, []);

  const replayIntro = () => {
    // Tulis "loading" ke store bersama supaya replay menang juga kalau
    // React me-remount tree (fallback persisted ikut melanjutkan replay).
    writePersistedStep("loading");
    setPhase("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--accent-soft)]">
      <IntroCover />
      <AnimatePresence mode="wait">
        {/* Step 1: Loading Screen */}
        {visiblePhase === "loading" && (
          <LoadingScreen
            key="loading"
            onDone={() => {
              writePersistedStep("envelope");
              setPhase("envelope");
            }}
          />
        )}

        {/* Step 2: Envelope Intro */}
        {visiblePhase === "envelope" && (
          <EnvelopeIntro
            key="envelope"
            onOpen={() => {
              writePersistedStep("done");
              setPhase("story");
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Step 3: Anniversary Story Content */}
      {visiblePhase === "story" && (
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Chapter 1: Hero */}
          <AnniversaryHero />

          {/* Chapter 2: Celebration Counter */}
          <CelebrationCounter />

          {/* Chapter 3: Our Story timeline */}
          <section className="mx-auto max-w-5xl px-6 py-4">
            <ChapterHeading
              chapter="Chapter 3 · Our Story"
              title="Two Years in Scenes"
              subtitle="scroll pelan-pelan ya ♡"
            />
            <CinematicTimeline />
          </section>

          {/* Chapter 4: Things I Love About You */}
          <LoveCards />

          {/* Chapter 5: Our Favorite Things */}
          <FavoriteThings />

          {/* Chapter 6: Love Letter utama */}
          <LoveLetterMain />

          {/* Chapter 7: 2 Years Celebration */}
          <Celebration />

          {/* Chapter 8: Final Surprise (replay + one more surprise) */}
          <FinalSurprise onReplay={replayIntro} />

          {/* Global: floating music player (default OFF) + easter eggs */}
          <MusicPlayer />
          <EasterEggs />
        </motion.div>
      )}
    </main>
  );
}
