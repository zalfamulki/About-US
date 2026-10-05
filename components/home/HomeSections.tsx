import Link from "next/link";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { memories, homeQuote } from "@/lib/data";

export function FeaturedMemory() {
  const memory = memories[0];

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">
      <SectionHeading eyebrow="featured memory" title={memory.title} />

      <div className="mt-10 grid md:grid-cols-12 gap-8 items-center">
        <Reveal className="md:col-span-5">
          <div className="rotate-[1.5deg] rounded-[4px] bg-white p-3 pb-10 shadow-[0_16px_45px_rgba(61,56,51,0.12)] transition-transform duration-500 hover:rotate-0 w-full max-w-xs mx-auto md:mx-0">
            <PhotoPlaceholder seed={2} className="aspect-square rounded-sm" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-3">
            {memory.date} · {memory.location}
          </p>
          <p className="max-w-md text-lg leading-relaxed text-ink/85">
            {memory.story}
          </p>
          {memory.quote && (
            <p className="mt-4 font-hand text-xl text-accent-deep">
              {memory.quote}
            </p>
          )}
          <Link
            href="/memories"
            className="mt-6 inline-block text-[11px] uppercase tracking-[0.25em] text-muted underline decoration-line underline-offset-8 transition-colors hover:text-accent-deep hover:decoration-accent"
          >
            semua kenangan →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function QuoteCTA() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
      <Reveal>
        <p className="font-serif italic text-2xl md:text-4xl leading-snug text-ink">
          &ldquo;{homeQuote.text}&rdquo;
        </p>
        <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-muted/70">
          — {homeQuote.from}
        </p>
        <Link
          href="/story"
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-accent/40 px-8 py-3 text-[11px] uppercase tracking-[0.25em] text-accent-deep transition-all duration-300 hover:bg-accent-soft hover:border-accent"
        >
          our story
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
