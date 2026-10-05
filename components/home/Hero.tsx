import Link from "next/link";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import RelationshipCounter from "./RelationshipCounter";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 md:pt-40 pb-16">
      <Reveal className="text-center">
        <p className="font-hand text-xl md:text-2xl text-muted">
          our little corner of the world
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
        <Reveal delay={0.05}>
          <div className="relative rotate-[-2deg] rounded-[4px] bg-white p-3 pb-12 shadow-[0_16px_45px_rgba(61,56,51,0.12)] w-64 sm:w-72 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
            <PhotoPlaceholder seed={0} className="aspect-[4/5] rounded-sm" />
            <p className="absolute bottom-3 inset-x-0 text-center font-hand text-xl text-muted">
              kamu &amp; aku, suatu sore
            </p>
          </div>
        </Reveal>

        <div className="text-center md:text-left">
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight text-ink">
              Zall
              <span className="text-accent px-3 md:px-4">&amp;</span>
              Kia
            </h1>
          </Reveal>
          <RelationshipCounter />
        </div>
      </div>

      <Reveal delay={0.2} className="mt-14 text-center">
        <Link
          href="/story"
          className="group inline-flex flex-col items-center gap-1 text-muted transition-colors hover:text-accent-deep"
        >
          <span className="text-[11px] uppercase tracking-[0.3em]">
            read our story
          </span>
          <span
            aria-hidden
            className="block h-px w-10 bg-current transition-all duration-300 group-hover:w-16"
          />
        </Link>
      </Reveal>
    </section>
  );
}
