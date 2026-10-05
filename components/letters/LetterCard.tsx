"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, Calendar, User } from "lucide-react";
import type { LoveLetter } from "@/lib/data";

export default function LetterCard({ letter }: { letter: LoveLetter }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(61,56,51,0.06)",
        transition: "border-color 0.3s, background 0.3s",
      }}
      className="relative overflow-hidden"
    >
      {/* Header / Envelope Seal */}
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted">
          <User size={13} className="text-accent-deep" />
          <span>
            {letter.from} <span className="text-accent">→</span> {letter.to}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted opacity-75">
          <Calendar size={12} />
          <span>{letter.date}</span>
        </div>
      </div>

      {/* Envelope Cover (Folded view) */}
      <div className="pt-5 pb-2">
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            color: "var(--ink)",
          }}
        >
          {letter.title}
        </h3>

        {!isOpen && (
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              marginTop: "8px",
              lineHeight: 1.6,
            }}
            className="line-clamp-2"
          >
            {letter.preview}
          </p>
        )}
      </div>

      {/* Unfoldable Body Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px dashed var(--accent-soft)",
                background: "var(--bg-primary)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-caveat)",
                  fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  color: "var(--ink)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                &ldquo;{letter.body}&rdquo;
              </p>
              <div className="mt-4 text-right">
                <span
                  style={{
                    fontFamily: "var(--font-caveat)",
                    fontSize: "1.2rem",
                    color: "var(--accent-deep)",
                  }}
                >
                  — Dengan cinta, {letter.from} 💌
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Open/Close Button */}
      <div className="mt-4 pt-3 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-wider text-accent-deep hover:bg-accent-soft/50 transition-colors"
          style={{ border: "1px solid var(--accent-soft)" }}
        >
          {isOpen ? (
            <>
              <MailOpen size={14} />
              <span>Tutup Surat</span>
            </>
          ) : (
            <>
              <Mail size={14} />
              <span>Buka Surat</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
