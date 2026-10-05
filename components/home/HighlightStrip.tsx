import Link from "next/link";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { highlights } from "@/lib/data";

export default function HighlightStrip() {
  return (
    <section className="py-20 md:py-24 bg-cream/60">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="the best of us" title="Highlights" />
          <Link
            href="/albums"
            className="shrink-0 pb-1 text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent-deep"
          >
            lihat semua →
          </Link>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] pb-4">
          {highlights.map((photo, i) => (
            <figure
              key={photo.id}
              className={`group relative shrink-0 snap-center overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(61,56,51,0.08)] transition-transform duration-500 hover:-translate-y-1.5 ${
                i % 3 === 0
                  ? "w-60 h-80"
                  : i % 3 === 1
                    ? "w-52 h-64 mt-6"
                    : "w-56 h-72"
              }`}
            >
              <PhotoPlaceholder seed={i} className="h-full w-full" />
              {photo.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/50 to-transparent px-4 pb-3 pt-8 text-xs text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
