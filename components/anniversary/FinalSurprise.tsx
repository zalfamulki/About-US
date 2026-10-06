"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Heart, PartyPopper, RotateCcw, Sparkles } from "lucide-react";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import Reveal from "@/components/ui/Reveal";
import {
  confettiBurst,
  confettiCelebration,
} from "@/components/anniversary/ConfettiBurst";
import { couple } from "@/data/couple";
import { formatOrdinal, yearWordEn } from "@/lib/counter";
import { useRelationshipDuration } from "@/lib/useRelationshipDuration";

type Props = {
  onReplay: () => void;
};

const STEPS = [
  "Wait...",
  "There's one more thing.",
  "I'd choose you again.",
  "Today. Tomorrow.\nAnd all the ordinary days in between.",
];

// Final Surprise (prompt §15): reveal berurutan → Zall ♡ Kia →
// Replay Our Story + One More Surprise (fireworks & confetti).
export default function FinalSurprise({ onReplay }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);
  const [surprised, setSurprised] = useState(false);
  // Realtime dari tanggal jadian.
  const years = Math.max(useRelationshipDuration().years, 1);
  // Reduced-motion: langsung tampilkan final tanpa reveal berurutan.
  const isFinal = reduce || step >= STEPS.length;

  // Reveal berurutan saat section masuk viewport.
  useEffect(() => {
    if (!inView || reduce || step >= STEPS.length) return;
    const timer = window.setTimeout(() => setStep((s) => s + 1), 1700);
    return () => window.clearTimeout(timer);
  }, [inView, reduce, step]);

  const fireSurprise = () => {
    if (surprised) return;
    setSurprised(true);
    if (reduce) return;
    confettiCelebration();
    for (let i = 0; i < 5; i++) {
      window.setTimeout(
        () =>
          confettiBurst({
            particleCount: 70,
            spread: 110,
            origin: {
              x: 0.15 + Math.random() * 0.7,
              y: 0.3 + Math.random() * 0.35,
            },
          }),
        i * 230
      );
    }
  };

  return (
    <section
      ref={ref}
      id="final-surprise"
      className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center scroll-mt-20"
    >
      <ChapterHeading
        chapter="Chapter 8 · One More Thing"
        title="The Last Page"
        subtitle="jangan ke mana-mana dulu ♡"
      />

      <div className="mt-14 min-h-[240px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isFinal ? (
            <motion.p
              key={`step-${step}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-pre-line font-serif text-3xl leading-snug text-ink sm:text-5xl"
            >
              {STEPS[step]}
            </motion.p>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <p
                data-secret-name="true"
                className="font-serif text-4xl tracking-wide sm:text-6xl"
                style={{ color: "var(--accent-deep)" }}
              >
                {couple.person1}{" "}
                <Heart
                  size={28}
                  className="mx-1 inline fill-accent-deep align-middle sm:size-9"
                />{" "}
                {couple.person2}
              </p>
              <p className="mt-3 font-hand text-xl text-muted">
                happy {yearWordEn(years).toLowerCase()} years, sayang ♡
              </p>

              {!surprised ? (
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onReplay}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium tracking-wide transition-colors cursor-pointer"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    <RotateCcw size={15} />
                    Replay Our Story
                  </button>
                  <button
                    type="button"
                    onClick={fireSurprise}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide shadow-md transition-all cursor-pointer"
                    style={{
                      background: "var(--accent-deep)",
                      color: "#fff",
                    }}
                  >
                    <Sparkles size={15} />
                    One More Surprise
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-9 flex flex-col items-center"
                >
                  <motion.span
                    initial={{ scale: 0.5 }}
                    animate={
                      reduce ? { scale: 1 } : { scale: [0.5, 1.15, 1] }
                    }
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent-deep)",
                    }}
                    aria-hidden
                  >
                    <Heart size={30} className="fill-accent-deep" />
                  </motion.span>
                  <p className="mt-5 font-serif text-2xl text-ink sm:text-3xl">
                    Happy {formatOrdinal(years)} Anniversary, my love.
                  </p>
                  <p className="mt-2 font-hand text-lg text-muted">
                    see you on year {yearWordEn(years + 1).toLowerCase()} ♡
                  </p>
                  <button
                    type="button"
                    onClick={onReplay}
                    className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium tracking-wide transition-colors cursor-pointer"
                    style={{
                      background: "var(--surface)",
                      borderColor: "var(--line)",
                      color: "var(--ink)",
                    }}
                  >
                    <RotateCcw size={15} />
                    Replay Our Story
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Reveal delay={0.2} className="mt-14">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
          made with love, dari {couple.person1} untuk {couple.person2}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-accent-deep/70">
          <PartyPopper size={14} />
          <span className="text-[10px] uppercase tracking-[0.2em]">
            the end... or not
          </span>
        </span>
      </Reveal>
    </section>
  );
}
