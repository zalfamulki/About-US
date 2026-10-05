"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import LetterCard from "@/components/letters/LetterCard";
import { letters } from "@/lib/data";

export default function LettersPage() {
  const [filter, setFilter] = useState<"all" | "Zall" | "Kia">("all");

  const filteredLetters = letters.filter((l) => {
    if (filter === "all") return true;
    return l.from === filter;
  });

  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:pt-40">
      <SectionHeading
        eyebrow="surat-surat rahasia"
        title="Love Letters"
        align="center"
      />

      <Reveal delay={0.1} className="mt-4 text-center">
        <p className="font-hand text-xl text-muted">
          surat singkat yang ditulis saat rindu, saat haru, atau sekadar ingin cerita.
        </p>
      </Reveal>

      {/* Filter Tabs */}
      <Reveal delay={0.15} className="mt-8 flex justify-center gap-2">
        {(["all", "Zall", "Kia"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-colors ${
              filter === f
                ? "bg-accent-soft text-accent-deep border border-accent"
                : "text-muted hover:text-ink border border-line"
            }`}
          >
            {f === "all" ? "Semua Surat" : `Dari ${f}`}
          </button>
        ))}
      </Reveal>

      {/* Letters List */}
      <div className="mt-12 space-y-6">
        {filteredLetters.map((letter, i) => (
          <Reveal key={letter.id} delay={i * 0.1}>
            <LetterCard letter={letter} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
