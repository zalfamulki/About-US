"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import { couple } from "@/data/couple";

export default function AnniversaryHero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and fade transforms for scroll (disabled if user prefers reduced motion)
  const yText = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 60]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0.2]);

  const handleScrollToCounter = () => {
    const el = document.getElementById("anniversary-counter");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle floating background shapes */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--accent-soft)" }}
        />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Chapter 1 badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line bg-surface/80 shadow-xs mb-6"
        >
          <Sparkles size={14} className="text-accent-deep" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted font-mono">
            Chapter 1 · Two Years of Us
          </span>
        </motion.div>

        {/* Main greeting */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-hand text-2xl sm:text-3xl text-accent-deep mb-2"
        >
          Happy 2nd Anniversary
        </motion.p>

        {/* Names Header */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl leading-tight text-ink tracking-tight my-2"
        >
          {couple.person1}{" "}
          <span className="text-accent font-hand text-5xl sm:text-7xl md:text-8xl px-1">
            ×
          </span>{" "}
          {couple.person2}
        </motion.h1>

        {/* Polaroid / Stamp mini decorative element */}
        <motion.div
          initial={{ opacity: 0, rotate: -3 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="my-6 px-4 py-2 rounded-lg bg-surface border border-line shadow-sm inline-flex items-center gap-2 text-xs text-muted"
        >
          <Heart size={14} className="fill-accent text-accent" />
          <span className="font-hand text-base text-ink">
            6 Oktober 2024 — Sekarang
          </span>
        </motion.div>

        {/* Subtitle / Quote from prompt */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-xl text-base sm:text-lg md:text-xl text-muted leading-relaxed font-sans px-2"
        >
          {couple.heroSubtitle}
        </motion.p>

        {/* CTA Button to scroll to relationship counter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={handleScrollToCounter}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-line text-xs uppercase tracking-[0.25em] text-muted hover:text-accent-deep hover:border-accent shadow-xs hover:shadow-sm transition-all duration-300 cursor-pointer min-h-[44px]"
            aria-label="Explore Our Story"
          >
            <span>Explore Our Story</span>
            <ArrowDown
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
