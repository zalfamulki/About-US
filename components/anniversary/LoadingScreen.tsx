"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Heart, Star, Sparkles } from "lucide-react";
import { yearWordId } from "@/lib/counter";
import { useRelationshipDuration } from "@/lib/useRelationshipDuration";

type LoadingScreenProps = {
  onDone: () => void;
};

// 10 floating decorative elements
const FLOATING_ITEMS = [
  { icon: Heart, top: "12%", left: "10%", size: 18, delay: 0, duration: 4 },
  { icon: Sparkles, top: "18%", right: "12%", size: 22, delay: 0.5, duration: 4.5 },
  { icon: Star, top: "35%", left: "8%", size: 16, delay: 1, duration: 5 },
  { icon: Heart, top: "40%", right: "10%", size: 20, delay: 1.5, duration: 3.8 },
  { icon: Sparkles, top: "65%", left: "15%", size: 18, delay: 0.8, duration: 4.2 },
  { icon: Star, top: "70%", right: "14%", size: 16, delay: 1.2, duration: 4.8 },
  { icon: Heart, top: "82%", left: "22%", size: 14, delay: 0.3, duration: 3.5 },
  { icon: Sparkles, top: "85%", right: "20%", size: 20, delay: 1.8, duration: 5.2 },
  { icon: Star, top: "25%", left: "48%", size: 14, delay: 0.7, duration: 4 },
  { icon: Heart, top: "88%", left: "50%", size: 16, delay: 1.4, duration: 4.6 },
];

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const shouldReduceMotion = useReducedMotion();
  const duration = useRelationshipDuration();
  const years = Math.max(duration.years, 1);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [typedText, setTypedText] = useState("");
  const fullText = "Preparing something special...";
  const [progress, setProgress] = useState(0);

  // If user prefers reduced motion, skip loading immediately
  useEffect(() => {
    if (shouldReduceMotion) {
      onDone();
    }
  }, [shouldReduceMotion, onDone]);

  // Step 1: Typing text effect (~40ms per char)
  useEffect(() => {
    let charIndex = 0;
    const typingTimer = setInterval(() => {
      charIndex += 1;
      setTypedText(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typingTimer);
      }
    }, 40);

    // Transition to Step 2 at ~1.3s
    const step2Timer = setTimeout(() => {
      setStep(2);
    }, 1300);

    // Transition to Step 3 at ~2.3s
    const step3Timer = setTimeout(() => {
      setStep(3);
    }, 2300);

    // Finish and call onDone at ~3.6s
    const finishTimer = setTimeout(() => {
      onDone();
    }, 3600);

    return () => {
      clearInterval(typingTimer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(finishTimer);
    };
  }, [onDone]);

  // Step 3: Smooth progress bar increment
  useEffect(() => {
    if (step < 3) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden px-6"
      style={{
        background: "var(--bg-primary)",
        color: "var(--ink)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Anniversary Experience"
    >
      {/* Floating gentle decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {FLOATING_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              className="absolute text-accent/40"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
              }}
              animate={{
                y: [0, -14, 0],
                opacity: [0.3, 0.75, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut",
              }}
            >
              <Icon size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      {/* Skip button in top right */}
      <button
        onClick={onDone}
        className="absolute top-6 right-6 z-20 text-xs tracking-widest uppercase font-mono px-3.5 py-1.5 rounded-full border border-line bg-surface/80 hover:bg-accent-soft hover:text-accent-deep transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center text-muted"
        aria-label="Skip loading animation"
      >
        Skip →
      </button>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full min-h-[220px] justify-center">
        {/* Step 1: Typing text */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5"
          >
            <p className="font-sans text-sm md:text-base tracking-wider text-muted">
              {typedText}
            </p>
            <span className="w-1.5 h-4 bg-accent inline-block animate-pulse" />
          </motion.div>
        )}

        {/* Step 2: N years of us ♡ */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 120,
              duration: 0.7,
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft/60 text-accent-deep text-xs uppercase tracking-widest font-mono">
              <Sparkles size={13} />
              <span>Chapter 1</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-normal tracking-tight">
              {years} year{years > 1 ? "s" : ""} of us <span className="text-accent-deep font-hand text-4xl">♡</span>
            </h1>
            <p className="font-hand text-lg text-muted mt-1">
              {yearWordId(years)} tahun cerita kita
            </p>
          </motion.div>
        )}

        {/* Step 3: Loading our little universe... + Progress Bar */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex items-center gap-2 text-accent-deep mb-3">
              <Heart size={20} className="fill-accent-deep animate-pulse" />
            </div>
            <p className="font-serif italic text-lg md:text-xl text-ink mb-4">
              Loading our little universe...
            </p>

            {/* Smooth progress track */}
            <div className="w-48 sm:w-56 h-1.5 bg-line rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-deep rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-muted mt-2">
              {Math.min(100, progress)}%
            </span>
          </motion.div>
        )}
      </div>

      {/* Tap anywhere hint */}
      <button
        type="button"
        onClick={onDone}
        className="absolute bottom-10 inset-x-0 mx-auto text-center font-hand text-muted/70 text-sm hover:text-accent-deep transition-colors cursor-pointer bg-transparent border-0"
      >
        <span className="inline-flex items-center gap-1.5">
          ketuk di mana saja untuk lanjut
          <Sparkles size={14} aria-hidden />
        </span>
      </button>
    </div>
  );
}
