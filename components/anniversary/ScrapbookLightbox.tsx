"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";

export type LightboxItem = {
  id: string;
  title: string;
  date?: string;
  location?: string;
  tag?: string;
  story?: string;
  note?: string;
  quote?: string;
  /** Seed PhotoPlaceholder saat foto asli belum ada */
  seed: number;
  photo?: string;
  /** Link opsional ke halaman detail (mis. /memories/[slug]) */
  detailHref?: string;
  detailLabel?: string;
};

/** layoutId bersama thumbnail → animasi morph foto-ke-lightbox. */
export function lightboxId(id: string) {
  return `scrapbook-${id}`;
}

type Props = {
  item: LightboxItem;
  onClose: () => void;
};

export default function ScrapbookLightbox({ item, onClose }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const meta = [item.date, item.location, item.tag].filter(Boolean).join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/55"
        style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      />

      {/* Kartu lightbox — morph dari thumbnail via layoutId */}
      <motion.figure
        layoutId={reduce ? undefined : lightboxId(item.id)}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-md overflow-y-auto rounded-[6px] bg-white p-4 pb-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          {item.photo ? (
            <Image
              src={item.photo}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 90vw, 448px"
              className="object-cover"
            />
          ) : (
            <PhotoPlaceholder seed={item.seed} className="h-full w-full" />
          )}
        </div>

        <figcaption className="px-1 pt-4">
          {meta && (
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
              {meta}
            </p>
          )}
          <h3 className="mt-2 font-serif text-2xl text-ink">{item.title}</h3>
          {item.story && (
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {item.story}
            </p>
          )}
          {item.note && (
            <p className="mt-3 rounded-xl border border-dashed border-accent/60 bg-cream/60 px-4 py-3 font-hand text-lg text-accent-deep">
              {item.note}
            </p>
          )}
          {item.quote && (
            <p className="mt-3 font-hand text-xl text-accent-deep">
              {item.quote}
            </p>
          )}
          {item.detailHref && (
            <Link
              href={item.detailHref}
              className="mt-4 inline-block text-[11px] uppercase tracking-[0.25em] text-muted underline decoration-line underline-offset-8 transition-colors hover:text-accent-deep hover:decoration-accent"
            >
              {item.detailLabel ?? "baca cerita lengkap →"}
            </Link>
          )}
        </figcaption>

        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau foto"
          className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink/45 text-white transition-colors hover:bg-ink/65"
        >
          <X size={18} />
        </button>
      </motion.figure>
    </motion.div>
  );
}
