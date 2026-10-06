"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Coffee, Mail, Moon, Plane } from "lucide-react";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { timeline, type TimelineDoodle } from "@/data/timeline";

const DOODLE_ICONS: Record<TimelineDoodle, typeof Coffee> = {
  coffee: Coffee,
  mail: Mail,
  moon: Moon,
  plane: Plane,
};

// Timeline sinematik: tiap entry = satu "scene" — foto polaroid + teks +
// quote + doodle, masuk viewport dengan image slide, text reveal, dan
// sticker pop. Bukan timeline korporat: konektornya dashed dengan node hati.
export default function CinematicTimeline() {
  const reduce = useReducedMotion();

  return (
    <ol className="relative mt-14">
      {/* Konektor dashed di tengah (desktop) / kiri (mobile) */}
      <span
        aria-hidden
        className="absolute top-2 bottom-8 left-[13px] md:left-1/2 md:-translate-x-1/2 border-l-2 border-dashed border-accent/50"
      />

      {timeline.map((entry, i) => {
        const left = i % 2 === 0;
        return (
          <li
            key={entry.title}
            className={`relative pb-14 last:pb-2 pl-12 md:pl-0 md:w-1/2 ${
              left
                ? "md:pr-12 md:text-right md:mr-auto"
                : "md:pl-12 md:ml-auto"
            }`}
          >
            {/* Node hati di garis waktu: menempel di konektor tengah */}
            <span
              aria-hidden
              className={`absolute top-1 left-[4px] flex h-5 w-5 items-center justify-center rounded-full bg-surface border border-accent/60 text-[10px] text-accent-deep ${
                left ? "md:left-auto md:-right-[11px]" : "md:-left-[11px]"
              }`}
            >
              ♥
            </span>

            {/* Foto polaroid */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: left ? -48 : 48, rotate: left ? -4 : 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: left ? -2 : 2 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative inline-block rounded-[4px] bg-white p-3 pb-10 shadow-[0_16px_45px_rgba(61,56,51,0.12)] w-full max-w-[240px] ${
                left ? "md:ml-auto" : ""
              }`}
            >
              {/* Tape */}
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg] h-6 w-20 rounded-[2px] bg-accent-soft/80 border border-accent/30"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                {entry.photo ? (
                  <Image
                    src={entry.photo}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 768px) 70vw, 240px"
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <PhotoPlaceholder seed={i} className="h-full w-full" />
                )}
              </div>
              {/* Doodle sticker */}
              {entry.doodle &&
                (() => {
                  const DoodleIcon = DOODLE_ICONS[entry.doodle];
                  return (
                    <motion.span
                      aria-hidden
                      initial={reduce ? false : { opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 14,
                        delay: 0.35,
                      }}
                      className="absolute -bottom-4 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface border border-accent/50 shadow-md"
                      style={{ color: "var(--accent-deep)" }}
                    >
                      <DoodleIcon size={20} />
                    </motion.span>
                  );
                })()}
            </motion.div>

            {/* Teks cerita */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
                {entry.date}
              </p>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl text-ink">
                {entry.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                {entry.description}
              </p>
              {entry.quote && (
                <p className="mt-3 font-hand text-xl text-accent-deep">
                  {entry.quote}
                </p>
              )}
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
