import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { aboutUs } from "@/lib/data";
import { ANNIVERSARY, formatDateID, getRelationshipDuration } from "@/lib/counter";

export const metadata: Metadata = {
  title: "About — Zall & Kia",
  description: "Tentang situs kecil ini dan kami berdua.",
};

export default function AboutPage() {
  const { years, months, totalDays } = getRelationshipDuration();

  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:pt-40">
      <SectionHeading eyebrow="tentang kita" title="Zall & Kia" align="center" />

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {aboutUs.people.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.08}>
            <div className="rounded-[4px] bg-white p-6 shadow-[0_12px_35px_rgba(61,56,51,0.1)]">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft font-serif text-xl text-accent-deep">
                  {person.initial}
                </span>
                <h3 className="font-serif text-xl text-ink">{person.name}</h3>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-muted">
                {person.facts.map((fact) => (
                  <li key={fact}>&mdash; {fact}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 rounded-[4px] border border-line bg-white/60 p-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
            sudah bersama
          </p>
          <p className="mt-2 font-serif text-2xl text-ink">
            {years > 0 && `${years} tahun `}
            {months} bulan · {totalDays.toLocaleString("id-ID")} hari
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted/70">
            sejak {formatDateID(ANNIVERSARY)}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-muted">
          {aboutUs.note}
        </p>
        <div className="mx-auto mt-8 w-full max-w-xs rotate-[1deg] rounded-[4px] bg-white p-3 pb-10 shadow-[0_16px_45px_rgba(61,56,51,0.12)] transition-transform duration-500 hover:rotate-0">
          <PhotoPlaceholder seed={5} className="aspect-square rounded-sm" />
        </div>
      </Reveal>

      <Reveal className="mt-16 text-center">
        <Link
          href="/memories"
          className="inline-block rounded-full border border-accent/40 px-8 py-3 text-[11px] uppercase tracking-[0.25em] text-accent-deep transition-colors duration-300 hover:bg-accent-soft hover:border-accent"
        >
          lihat kenangan →
        </Link>
      </Reveal>
    </section>
  );
}
