"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingScreen from "@/components/anniversary/LoadingScreen";
import EnvelopeIntro from "@/components/anniversary/EnvelopeIntro";
import AnniversaryHero from "@/components/anniversary/AnniversaryHero";
import CelebrationCounter from "@/components/anniversary/CelebrationCounter";
import IntroCover, { hideIntroCover } from "@/components/anniversary/IntroCover";
import { Sparkles, Heart } from "lucide-react";
import Link from "next/link";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function AnniversaryPage() {
  // Selalu mulai dari "loading" agar SSR sama persis dengan first-render
  // client. JANGAN baca window.matchMedia di initializer: server selalu
  // "loading" sedangkan client reduced-motion "story" → hydration mismatch
  // → React membuang SSR HTML → kilasan konten yang salah.
  const [phase, setPhase] = useState<"loading" | "envelope" | "story">("loading");

  // Reduced-motion dibaca via useSyncExternalStore (hydration-safe by design:
  // saat hydration dipakai snapshot server=false, setelah itu sync otomatis).
  // Tanpa setState di effect → lolos lint + tanpa mismatch.
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  // Reduced-motion langsung ke story (tombol replay sengaja non-aktif visual
  // dalam mode ini — sesuai prinsip kurangi gerak).
  const visiblePhase = reduceMotion ? "story" : phase;

  useEffect(() => {
    hideIntroCover();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--accent-soft)]">
      <IntroCover />
      <AnimatePresence mode="wait">
        {/* Step 1: Loading Screen */}
        {visiblePhase === "loading" && (
          <LoadingScreen
            key="loading"
            onDone={() => setPhase("envelope")}
          />
        )}

        {/* Step 2: Envelope Intro */}
        {visiblePhase === "envelope" && (
          <EnvelopeIntro
            key="envelope"
            onOpen={() => {
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

          {/* Placeholder / Bridge for Chapters 3–5 (Fase 3–5) */}
          <section className="mx-auto max-w-3xl px-6 py-16 text-center">
            <div className="p-8 sm:p-10 rounded-3xl border border-dashed border-accent/40 bg-surface/50">
              <div className="w-10 h-10 rounded-full bg-accent-soft text-accent-deep flex items-center justify-center mx-auto mb-4">
                <Sparkles size={20} />
              </div>
              <p className="font-serif text-2xl text-ink">
                Cerita 2 Tahun Kita Berlanjut...
              </p>
              <p className="font-hand text-lg text-muted mt-2 max-w-md mx-auto">
                Babak timeline kenangan, kartu cinta, kuis rahasia, dan surat spesial sedang disiapkan untukmu ♡
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/story"
                  className="px-5 py-2.5 rounded-full bg-surface border border-line text-xs uppercase tracking-widest text-muted hover:text-accent-deep hover:border-accent transition-colors min-h-[44px] flex items-center"
                >
                  Lihat Our Story →
                </Link>
                <Link
                  href="/memories"
                  className="px-5 py-2.5 rounded-full bg-surface border border-line text-xs uppercase tracking-widest text-muted hover:text-accent-deep hover:border-accent transition-colors min-h-[44px] flex items-center"
                >
                  Lihat Scrapbook Foto →
                </Link>
              </div>
            </div>

            {/* Replay Intro button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={() => {
                  setPhase("loading");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent-deep transition-colors cursor-pointer"
              >
                <Heart size={14} />
                <span>Ulangi Pembuka Animasi</span>
              </button>
            </div>
          </section>
        </motion.div>
      )}
    </main>
  );
}
