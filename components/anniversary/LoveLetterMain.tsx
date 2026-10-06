"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import { anniversaryLetter } from "@/data/loveLetter";

// Surat utama anniversary (prompt §10): envelope → klik → kertas keluar →
// surat + handwritten signature. Isi 100% dari data/loveLetter.ts.
// Halaman /letters tetap sebagai arsip.
export default function LoveLetterMain() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<"closed" | "opening" | "reading">(
    "closed"
  );

  const open = () => {
    if (state !== "closed") return;
    if (reduce) {
      setState("reading");
      return;
    }
    setState("opening");
    window.setTimeout(() => setState("reading"), 1150);
  };

  const isFlapOpen = state !== "closed";

  return (
    <section
      id="love-letter"
      className="mx-auto max-w-5xl px-6 py-20 md:py-28 scroll-mt-20"
    >
      <ChapterHeading
        chapter="Chapter 6 · The Letter"
        title="There's something I want to tell you..."
        subtitle="buka pelan-pelan ya ♡"
      />

      <div className="mt-12 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {state !== "reading" ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div
                className="relative w-72 sm:w-80 h-48 sm:h-52"
                style={{ perspective: "1200px" }}
              >
                {/* Back wall — bisa diklik untuk membuka */}
                <button
                  type="button"
                  onClick={open}
                  aria-label="Buka surat anniversary"
                  className="absolute inset-0 rounded-2xl border shadow-lg cursor-pointer"
                  style={{
                    background: "var(--bg-secondary)",
                    borderColor: "var(--line)",
                    zIndex: 0,
                  }}
                />

                {/* Flap */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-32 origin-top pointer-events-none"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isFlapOpen ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    transformStyle: "preserve-3d",
                    background:
                      "linear-gradient(180deg, var(--bg-secondary) 0%, var(--surface) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    zIndex: isFlapOpen ? 0 : 30,
                  }}
                >
                  {!isFlapOpen && (
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border flex items-center justify-center shadow-sm"
                      style={{
                        background: "var(--surface)",
                        borderColor: "var(--accent)",
                        color: "var(--accent-deep)",
                      }}
                    >
                      <Heart size={16} className="fill-accent-deep" />
                    </div>
                  )}
                </motion.div>

                {/* Paper */}
                <motion.button
                  type="button"
                  onClick={open}
                  aria-label="Buka surat anniversary"
                  initial={{ y: 22, scale: 0.95, opacity: 0 }}
                  animate={
                    state === "closed"
                      ? { y: 22, scale: 0.95, opacity: 0 }
                      : { y: -28, scale: 1.05, opacity: 1 }
                  }
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-4 h-44 rounded-xl p-5 flex flex-col items-center justify-center text-center border border-line/70 cursor-pointer"
                  style={{
                    background: "var(--surface)",
                    zIndex: 40,
                    boxShadow: "0 18px 44px rgba(61,56,51,0.18)",
                  }}
                >
                  <span className="w-10 h-1 rounded-full bg-accent/40 mb-2" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-muted">
                    {anniversaryLetter.greeting}
                  </span>
                  <span className="font-serif text-xl text-ink mt-1">
                    A letter for you
                  </span>
                  <span className="font-hand text-lg text-accent-deep mt-0.5">
                    dari {anniversaryLetter.from} ♡
                  </span>
                </motion.button>

                {/* Front pocket */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--bg-secondary) 0%, var(--surface) 100%)",
                    clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
                    zIndex: 20,
                  }}
                />
              </div>

              <motion.button
                type="button"
                onClick={open}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.45 }}
                className="mt-8 inline-flex items-center gap-2.5 px-7 py-3 rounded-full border text-sm font-medium tracking-wide transition-all duration-300 min-h-[44px]"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--accent)",
                  color: "var(--accent-deep)",
                }}
              >
                <span>Buka Suratnya</span>
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 48, rotate: -1.2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl rounded-2xl border border-line px-6 py-9 sm:px-10 sm:py-12 shadow-[0_24px_60px_rgba(61,56,51,0.14)]"
              style={{ background: "var(--surface)" }}
            >
              {/* tape */}
              <span
                aria-hidden
                className="absolute -top-3 left-8 h-6 w-20 rotate-[-4deg] rounded-sm opacity-70"
                style={{ background: "var(--accent-soft)" }}
              />
              <span
                aria-hidden
                className="absolute -top-3 right-8 h-6 w-20 rotate-[3deg] rounded-sm opacity-70"
                style={{ background: "var(--accent-soft)" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="font-serif text-2xl text-ink"
              >
                {anniversaryLetter.greeting}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-5 font-hand text-[1.45rem] leading-relaxed whitespace-pre-line text-ink"
              >
                {anniversaryLetter.body}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.55 }}
                className="mt-7 font-hand text-3xl"
                style={{ color: "var(--accent-deep)" }}
              >
                {anniversaryLetter.signature}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.05, type: "spring", stiffness: 260 }}
                className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border"
                style={{
                  borderColor: "var(--accent)",
                  background: "var(--accent-soft)",
                  color: "var(--accent-deep)",
                }}
                aria-hidden
              >
                <Heart size={20} className="fill-accent-deep" />
              </motion.div>
            </motion.article>
          )}
        </AnimatePresence>

        {state === "reading" && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => setState("closed")}
            className="mt-8 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent-deep transition-colors min-h-[44px] px-3"
          >
            Tutup surat
          </motion.button>
        )}
      </div>
    </section>
  );
}
