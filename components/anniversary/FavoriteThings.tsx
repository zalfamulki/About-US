"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Car,
  ChevronDown,
  Clapperboard,
  Laugh,
  MapPin,
  Music,
  UtensilsCrossed,
} from "lucide-react";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import Reveal from "@/components/ui/Reveal";
import { favoriteThings, type FavoriteIcon } from "@/data/favorites";

const ICONS: Record<FavoriteIcon, typeof Music> = {
  song: Music,
  food: UtensilsCrossed,
  place: MapPin,
  movie: Clapperboard,
  joke: Laugh,
  photo: Camera,
  activity: Car,
};

// Our Favorite Things (prompt §11) — tiap card bisa dibuka untuk detail.
export default function FavoriteThings() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="favorite-things"
      className="mx-auto max-w-5xl px-6 py-20 md:py-28 scroll-mt-20"
    >
      <ChapterHeading
        chapter="Chapter 5 · The Little Things"
        title="Our Favorite Things"
        subtitle="ketuk kartunya untuk buka detail ♡"
      />

      {/* items-start: kartu yang dibuka tidak ikut meregangkan kartu
          tetangga sebaris (default grid stretch membuat kartu lain terlihat
          ikut terbuka tapi kosong). */}
      <div className="mt-12 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteThings.map((thing, i) => {
          const isOpen = openId === thing.id;
          const Icon = ICONS[thing.icon];
          return (
            <Reveal key={thing.id} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-2xl border overflow-hidden"
                style={{
                  background: "var(--surface)",
                  borderColor: isOpen ? "var(--accent)" : "var(--line)",
                  boxShadow: isOpen
                    ? "0 14px 34px rgba(217,166,160,0.22)"
                    : "0 6px 20px rgba(61,56,51,0.06)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : thing.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 p-5 text-left min-h-[44px] cursor-pointer"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    style={{ background: "var(--accent-soft)", color: "var(--accent-deep)" }}
                    aria-hidden
                  >
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="block text-[10px] uppercase tracking-[0.25em] font-mono text-muted"
                      aria-hidden
                    >
                      {thing.label}
                    </span>
                    <span className="mt-0.5 block font-serif text-lg leading-snug text-ink truncate">
                      {thing.value}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-muted"
                    aria-hidden
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p
                        className="border-t px-5 pb-5 pt-4 font-hand text-lg leading-relaxed"
                        style={{
                          borderColor: "var(--line)",
                          color: "var(--muted)",
                        }}
                      >
                        {thing.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
