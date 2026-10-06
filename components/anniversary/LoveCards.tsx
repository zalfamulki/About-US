"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  Laugh,
  MessagesSquare,
  Sparkles,
  Moon,
  Coffee,
  Music,
  Camera,
  Star,
  Sun,
  Gift,
  Smile,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import { reasonsILoveYou } from "@/data/couple";

const ICONS = [
  Laugh,
  MessagesSquare,
  Sparkles,
  Moon,
  Coffee,
  Heart,
  Music,
  Camera,
  Star,
  Sun,
  Gift,
  Smile,
];

// Kartu "Things I Love About You" — muncul satu per satu (stagger),
// hover di desktop (lift), tap di mobile (hati terisi + penghitung).
// ReasonsJar yang lama tetap hidup di halaman umum.
export default function LoveCards() {
  const [loved, setLoved] = useState<Set<number>>(new Set());

  const toggleLoved = (index: number) => {
    setLoved((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const total = reasonsILoveYou.length + 1;

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <ChapterHeading
        chapter="Love Notes"
        title="Things I Love About You"
        subtitle="ketuk kartunya kalau setuju ♡"
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasonsILoveYou.map((reason, i) => {
          const Icon = ICONS[i % ICONS.length];
          const isLoved = loved.has(i);
          return (
            <Reveal key={reason} delay={(i % 3) * 0.08}>
              <motion.button
                type="button"
                onClick={() => toggleLoved(i)}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                aria-pressed={isLoved}
                aria-label={`Suka alasan: ${reason}`}
                className="group flex min-h-[44px] w-full flex-col rounded-2xl border p-5 text-left transition-colors duration-300"
                style={{
                  background: "var(--surface)",
                  borderColor: isLoved ? "var(--accent)" : "var(--line)",
                  boxShadow: isLoved
                    ? "0 12px 32px rgba(217,166,160,0.25)"
                    : "0 6px 20px rgba(61,56,51,0.06)",
                }}
              >
                <span className="flex items-center justify-between">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent-deep)",
                    }}
                  >
                    <Icon size={17} />
                  </span>
                  <motion.span
                    key={String(isLoved)}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    className={isLoved ? "text-accent-deep" : "text-line"}
                  >
                    <Heart size={18} fill={isLoved ? "currentColor" : "none"} />
                  </motion.span>
                </span>
                <span
                  className="mt-3 font-hand text-[1.35rem] leading-snug"
                  style={{ color: "var(--ink)" }}
                >
                  {reason}
                </span>
              </motion.button>
            </Reveal>
          );
        })}

        {/* Kartu penutup */}
        <Reveal delay={0.1} className="sm:col-span-2 lg:col-span-3">
          <div
            className="rounded-2xl border border-dashed px-6 py-8 text-center"
            style={{
              borderColor: "var(--accent)",
              background: "var(--accent-soft)",
            }}
          >
            <p
              className="font-serif text-2xl md:text-3xl"
              style={{ color: "var(--ink)" }}
            >
              Basically... you.{" "}
              <span style={{ color: "var(--accent-deep)" }}>♡</span>
            </p>
            <p
              className="mt-2 text-[11px] uppercase tracking-[0.25em]"
              style={{ color: "var(--muted)" }}
            >
              {loved.size} dari {total} tersimpan di hati
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
