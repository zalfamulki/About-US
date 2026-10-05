import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MilestoneCountdown from "@/components/home/MilestoneCountdown";
import { timeline } from "@/lib/data";
import { ANNIVERSARY, formatDateID } from "@/lib/counter";

export const metadata: Metadata = {
  title: "Our Story — Zall & Kia",
  description: "Garis waktu kita, dari pertama ketemu sampai sekarang.",
};

export default function StoryPage() {
  return (
    <>
      <ScrollProgressBar />
      <section className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:pt-40">
        <SectionHeading
          eyebrow={`sejak ${formatDateID(ANNIVERSARY)}`}
          title="Our Story"
          align="center"
        />

        {/* #3 Milestone Countdown */}
        <Reveal delay={0.1}>
          <MilestoneCountdown />
        </Reveal>

        <ol className="relative mt-16 border-l border-line ml-3">
          {timeline.map((entry, i) => (
            <li key={entry.title} className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden
                className="absolute top-1 -left-[7px] h-3 w-3 rounded-full border-2 border-accent bg-canvas"
              />
              <Reveal delay={i * 0.05}>
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
                  {entry.date}
                </p>
                <h2 className="mt-2 font-serif text-xl md:text-2xl text-ink">
                  {entry.title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* #5 Penutup cerita yang manis */}
        <Reveal className="mt-20 text-center" delay={0.1}>
          <div
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              aria-hidden
              style={{
                fontSize: "22px",
                opacity: 0.6,
                display: "block",
              }}
            >
              🌿
            </span>
            <blockquote
              style={{
                fontFamily: "var(--font-caveat)",
                fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
                color: "var(--accent-deep)",
                fontStyle: "italic",
                maxWidth: "480px",
                lineHeight: 1.5,
              }}
            >
              &ldquo;dan bab berikutnya, ditulis bersama.&rdquo;
            </blockquote>
            <p
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--muted)",
                opacity: 0.7,
              }}
            >
              cerita ini belum selesai
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
