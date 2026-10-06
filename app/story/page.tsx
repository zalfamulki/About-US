import type { Metadata } from "next";
import { Leaf } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MilestoneCountdown from "@/components/home/MilestoneCountdown";
import CinematicTimeline from "@/components/anniversary/CinematicTimeline";
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

        {/* Timeline sinematik: tiap entry = satu scene cerita */}
        <CinematicTimeline />

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
                display: "flex",
                justifyContent: "center",
                opacity: 0.6,
              }}
            >
              <Leaf size={22} style={{ color: "var(--accent-deep)" }} />
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
