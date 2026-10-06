"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { couple } from "@/data/couple";
import { formatOrdinal, yearWordEn } from "@/lib/counter";
import { useRelationshipDuration } from "@/lib/useRelationshipDuration";

type EnvelopeIntroProps = {
  onOpen: () => void;
};

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const duration = useRelationshipDuration();
  const years = Math.max(duration.years, 1);
  // Animation states: 'closed' -> 'opening' (flap opening) -> 'pulling' (paper rising) -> 'opened' (paper in front & ready)
  const [animState, setAnimState] = useState<"closed" | "opening" | "pulling" | "opened">("closed");

  const handleOpen = () => {
    if (animState !== "closed") return;

    // Step 1: Open flap
    setAnimState("opening");

    // Step 2: Paper slides up out of pocket
    setTimeout(() => {
      setAnimState("pulling");
    }, 450);

    // Step 3: Paper moves in front of envelope and settles
    setTimeout(() => {
      setAnimState("opened");
    }, 1100);
  };

  const isFlapOpen = animState !== "closed";
  const isPaperInFront = animState === "opened";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden select-none"
      style={{
        background: "var(--bg-primary)",
        color: "var(--ink)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Anniversary Envelope"
    >
      {/* Background ambient sparkles & floating heart particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-10 text-accent/40 animate-pulse">
          <Sparkles size={22} />
        </div>
        <div className="absolute bottom-1/4 right-12 text-accent-deep/40 animate-pulse">
          <Sparkles size={20} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-accent/30 animate-pulse">
          <Heart size={16} className="fill-accent/30" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col items-center max-w-sm w-full"
      >
        {/* Header note */}
        <p className="font-hand text-2xl sm:text-3xl text-accent-deep mb-6 text-center tracking-wide">
          To my favorite person ♡
        </p>

        {/* Envelope & Letter Wrapper */}
        <div
          className="relative w-72 sm:w-80 h-48 sm:h-52 mb-8 flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {/* 1. Envelope Back Wall (Base) - Z-Index 0 */}
          <div
            className="absolute inset-0 rounded-2xl border border-line shadow-lg"
            style={{
              background: "var(--bg-secondary)",
              zIndex: 0,
            }}
          />

          {/* 2. Top Flap (Triangular fold) - Z-Index 30 when closed, Z-0 when open */}
          <motion.div
            className="absolute inset-x-0 top-0 h-32 origin-top pointer-events-none"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isFlapOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              transformStyle: "preserve-3d",
              background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--surface) 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              filter: isFlapOpen ? "none" : "drop-shadow(0 4px 6px rgba(61, 56, 51, 0.08))",
              zIndex: isFlapOpen ? 0 : 30,
            }}
          >
            {/* Heart seal sticker on top flap when closed (overlapping deeply with front pocket) */}
            {!isFlapOpen && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-surface border border-accent/60 flex items-center justify-center text-accent-deep shadow-sm">
                <Heart size={16} className="fill-accent-deep" />
              </div>
            )}
          </motion.div>

          {/* 3. Letter Paper (Starts hidden/tucked inside, slides up, then moves in front) */}
          <motion.div
            className="absolute inset-x-4 h-44 sm:h-46 rounded-xl bg-white p-5 shadow-xl flex flex-col items-center justify-center text-center border border-line/70 cursor-pointer"
            initial={{ y: 20, scale: 0.95, opacity: 0 }}
            animate={
              animState === "closed"
                ? { y: 20, scale: 0.95, opacity: 0 }
                : animState === "opening"
                ? { y: 15, scale: 0.95, opacity: 1 }
                : animState === "pulling"
                ? { y: -130, scale: 1.02, opacity: 1 }
                : { y: -25, scale: 1.05, opacity: 1 }
            }
            transition={{
              duration: animState === "pulling" ? 0.65 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              zIndex: isPaperInFront ? 40 : 10,
              boxShadow: isPaperInFront
                ? "0 22px 50px rgba(61,56,51,0.22)"
                : "0 4px 15px rgba(61,56,51,0.06)",
            }}
            onClick={animState === "opened" ? onOpen : handleOpen}
          >
            <div className="w-10 h-1 bg-accent/40 rounded-full mb-2" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
              Happy {formatOrdinal(years)} Anniversary
            </p>
            <h2 className="font-serif text-2xl text-ink mt-1 tracking-tight">
              {couple.person1} <span className="text-accent-deep font-hand text-3xl px-0.5">×</span> {couple.person2}
            </h2>
            <p className="font-hand text-lg text-accent-deep mt-0.5">
              {years} year{years > 1 ? "s" : ""} of us ♡
            </p>
            <p className="text-[11px] text-muted/80 font-sans italic mt-1 line-clamp-1">
              &ldquo;{yearWordEn(years)} years, countless memories, one
              favorite person.&rdquo;
            </p>

            {animState === "opened" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-accent-deep font-medium font-sans bg-accent-soft/60 px-3 py-1 rounded-full"
              >
                <span>Ketuk untuk masuk</span>
                <ArrowRight size={13} />
              </motion.div>
            )}
          </motion.div>

          {/* 4. Front Pocket of envelope (V-shape covering the lower half) - Z-Index 20 */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none shadow-sm border-b border-line"
            style={{
              background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--surface) 100%)",
              clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
              zIndex: 20,
            }}
          />
        </div>

        {/* Action Button */}
        <div className="h-14 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {animState === "closed" && (
              <motion.button
                key="open-btn"
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleOpen}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-surface border border-accent/60 text-accent-deep text-sm font-medium tracking-wide shadow-xs hover:shadow-md hover:bg-accent-soft/50 transition-all duration-300 cursor-pointer min-h-[44px]"
              >
                <span>Buka Surat Anniversary</span>
                <ArrowRight size={16} />
              </motion.button>
            )}

            {(animState === "opening" || animState === "pulling") && (
              <motion.div
                key="opening-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center font-hand text-xl text-accent-deep animate-pulse"
              >
                <span className="inline-flex items-center gap-1.5">
                  Mengeluarkan surat cinta kita...
                  <Sparkles size={15} aria-hidden />
                </span>
              </motion.div>
            )}

            {animState === "opened" && (
              <motion.button
                key="proceed-btn"
                type="button"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                onClick={onOpen}
                className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-accent-deep text-white text-sm font-medium tracking-wide shadow-md hover:bg-accent hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[44px]"
              >
                <span>Masuk ke Dunia Kita</span>
                <ArrowRight size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
