"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw, Mail } from "lucide-react";
import { reasonsILoveYou } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function ReasonsJar() {
  const [currentReason, setCurrentReason] = useState<string | null>(null);
  const [drawnCount, setDrawnCount] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  const drawReason = () => {
    setIsOpening(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * reasonsILoveYou.length);
      // Avoid immediate duplicate
      if (currentReason && reasonsILoveYou[nextIndex] === currentReason) {
        nextIndex = (nextIndex + 1) % reasonsILoveYou.length;
      }
      setCurrentReason(reasonsILoveYou[nextIndex]);
      setDrawnCount((prev) => prev + 1);
      setIsOpening(false);
    }, 250);
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <Reveal>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "24px",
            padding: "36px 24px",
            boxShadow: "0 12px 40px rgba(61,56,51,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] text-accent-deep bg-accent-soft/40 mb-4">
            <Sparkles size={12} />
            <span>Interactive Jar</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              color: "var(--ink)",
            }}
          >
            &ldquo;Reasons I Love You&rdquo; Jar
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              marginTop: "6px",
              maxWidth: "400px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Toples kecil berisi alasan-alasan manis. Klik toples untuk mengambil satu catatan acak.
          </p>

          {/* Jar container */}
          <div className="mt-8 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.06, rotate: [-1, 1, -1] }}
              whileTap={{ scale: 0.94 }}
              onClick={drawReason}
              aria-label="Ambil catatan dari toples"
              style={{
                position: "relative",
                cursor: "pointer",
                background: "none",
                border: "none",
                outline: "none",
              }}
            >
              {/* Cute Jar Illustration */}
              <div
                style={{
                  width: "100px",
                  height: "120px",
                  border: "3px solid var(--accent-deep)",
                  borderRadius: "16px 16px 28px 28px",
                  background: "var(--accent-soft)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0 8px 24px rgba(217,166,160,0.3)",
                }}
              >
                {/* Lid */}
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    width: "80px",
                    height: "12px",
                    background: "var(--accent-deep)",
                    borderRadius: "6px 6px 2px 2px",
                  }}
                />

                {/* Heart inside jar */}
                <motion.span
                  animate={{
                    scale: isOpening ? [1, 1.3, 1] : [1, 1.1, 1],
                    rotate: isOpening ? [0, 15, -15, 0] : 0,
                  }}
                  transition={{ duration: 0.6, repeat: isOpening ? 0 : Infinity, repeatDelay: 2 }}
                  style={{ display: "flex" }}
                  aria-hidden
                >
                  <Mail size={34} style={{ color: "var(--accent-deep)" }} />
                </motion.span>
              </div>
            </motion.button>

            <p
              style={{
                fontSize: "11px",
                color: "var(--muted)",
                marginTop: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              {drawnCount === 0
                ? "klik toples untuk membuka"
                : `sudah diambil ${drawnCount} kali`}
            </p>
          </div>

          {/* Floating paper note reveal */}
          <div className="mt-8 min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentReason && (
                <motion.div
                  key={currentReason}
                  initial={{ opacity: 0, y: 20, rotate: -3, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px dashed var(--accent)",
                    borderRadius: "12px",
                    padding: "20px 24px",
                    maxWidth: "480px",
                    width: "100%",
                    boxShadow: "0 8px 24px rgba(61,56,51,0.08)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-caveat)",
                      fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
                      color: "var(--accent-deep)",
                      lineHeight: 1.4,
                    }}
                  >
                    &ldquo;{currentReason}&rdquo;
                  </p>
                  <button
                    onClick={drawReason}
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted hover:text-accent-deep transition-colors"
                  >
                    <RefreshCw size={11} />
                    <span>ambil lagi</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
