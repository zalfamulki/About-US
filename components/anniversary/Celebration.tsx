"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import Reveal from "@/components/ui/Reveal";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { confettiCelebration } from "@/components/anniversary/ConfettiBurst";
import { ANNIVERSARY, anniversaryStartLabel } from "@/lib/counter";
import { useRelationshipDuration } from "@/lib/useRelationshipDuration";

type Counts = { days: number; hours: number; minutes: number };

const subscribe = () => () => {};

let cache: { at: number; value: Counts } | null = null;

function computeCounts(now: Date): Counts {
  const diff = Math.max(0, now.getTime() - ANNIVERSARY.getTime());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor(diff / 60_000),
  };
}

function getSnapshot(): Counts {
  const now = Date.now();
  if (!cache || now - cache.at > 60_000) {
    cache = { at: now, value: computeCounts(new Date(now)) };
  }
  return cache.value;
}

function getServerSnapshot(): Counts {
  return computeCounts(new Date(2026, 9, 6));
}

// Partikel floating yang tenang (deterministik, jumlah dikit — §14:
// "jangan terlalu ramai").
type Particle = {
  top: string;
  left?: string;
  right?: string;
  delay: number;
  kind: "heart" | "sparkle" | "star";
};

const PARTICLES: Particle[] = [
  { top: "8%", left: "6%", delay: 0, kind: "heart" },
  { top: "18%", right: "10%", delay: 0.8, kind: "sparkle" },
  { top: "62%", left: "4%", delay: 1.4, kind: "star" },
  { top: "72%", right: "6%", delay: 0.4, kind: "heart" },
  { top: "38%", left: "12%", delay: 1.9, kind: "sparkle" },
  { top: "46%", right: "14%", delay: 1.1, kind: "star" },
];

export default function Celebration() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fired = useRef(false);
  const counts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // Realtime dari tanggal jadian untuk judul & kutipan.
  const years = Math.max(useRelationshipDuration().years, 1);

  useEffect(() => {
    if (inView && !fired.current) {
      fired.current = true;
      confettiCelebration();
    }
  }, [inView]);

  const STATS = [
    { value: counts.days.toLocaleString("id-ID"), unit: "Days" },
    { value: counts.hours.toLocaleString("id-ID"), unit: "Hours" },
    { value: counts.minutes.toLocaleString("id-ID"), unit: "Minutes" },
  ];

  return (
    <section
      ref={ref}
      id="celebration"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 py-24 md:py-32 scroll-mt-20"
    >
      {/* Partikel floating */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute text-accent"
              style={{ top: p.top, left: p.left, right: p.right }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 0.75, 0], y: [10, -22, -46] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            >
              {p.kind === "heart" ? (
                <Heart size={16} className="fill-accent/60" />
              ) : p.kind === "sparkle" ? (
                <Sparkles size={16} />
              ) : (
                <Star size={14} className="fill-accent/50" />
              )}
            </motion.span>
          ))}
        </div>
      )}

      <ChapterHeading
        chapter="Chapter 7 · The Celebration"
        title={`${years} YEAR${years > 1 ? "S" : ""}.`}
        subtitle="and somehow, I'd still choose you."
      />

      {/* Polaroid floating pelan */}
      {!reduce && (
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          aria-hidden
        >
          <motion.div
            className="absolute left-4 top-2 w-24 -rotate-6 rounded-lg border border-line bg-surface p-2 pb-6 shadow-lg lg:w-28"
            animate={{ y: [0, -10, 0], rotate: [-6, -4, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <PhotoPlaceholder seed={2} className="h-24 w-full rounded" />
          </motion.div>
          <motion.div
            className="absolute right-4 bottom-2 w-24 rotate-5 rounded-lg border border-line bg-surface p-2 pb-6 shadow-lg lg:w-28"
            animate={{ y: [0, 10, 0], rotate: [5, 3, 5] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <PhotoPlaceholder seed={5} className="h-24 w-full rounded" />
          </motion.div>
        </div>
      )}

      <div className="relative mt-12 grid grid-cols-3 gap-3 sm:gap-5">
        {STATS.map((stat, i) => (
          <Reveal key={stat.unit} delay={i * 0.1}>
            <div
              className="rounded-2xl border px-3 py-6 text-center sm:px-5"
              style={{
                background: "var(--surface)",
                borderColor: "var(--line)",
                boxShadow: "0 6px 20px rgba(61,56,51,0.06)",
              }}
            >
              <p className="font-serif text-2xl font-semibold tracking-tight text-accent-deep sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted sm:text-xs">
                {stat.unit}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-12 text-center">
        <p className="font-hand text-2xl text-ink md:text-3xl">
          &ldquo;sejak {anniversaryStartLabel()} — masih hitung hari, masih memilih kamu.
          ♡&rdquo;
        </p>
      </Reveal>
    </section>
  );
}
