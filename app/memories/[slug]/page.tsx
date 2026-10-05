import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import { memories, TAG_LABELS } from "@/lib/data";

export function generateStaticParams() {
  return memories.map(({ slug }) => ({ slug }));
}

type Props = PageProps<"/memories/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const memory = memories.find((m) => m.slug === slug);
  if (!memory) return {};
  return { title: `${memory.title} — Memories Zall & Kia` };
}

export default async function MemoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const memory = memories.find((m) => m.slug === slug);
  if (!memory) notFound();

  const index = memories.indexOf(memory);

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:pt-40">
      <Reveal>
        <Link
          href="/memories"
          className="text-[11px] uppercase tracking-[0.25em] text-muted underline decoration-line underline-offset-8 transition-colors hover:text-accent-deep hover:decoration-accent"
        >
          ← semua kenangan
        </Link>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-12 items-start">
        <Reveal className="md:col-span-5">
          <div className="rotate-[-1.5deg] rounded-[4px] bg-white p-3 pb-10 shadow-[0_16px_45px_rgba(61,56,51,0.12)] w-full max-w-xs mx-auto md:mx-0 transition-transform duration-500 hover:rotate-0">
            <PhotoPlaceholder seed={index + 3} className="aspect-square rounded-sm" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-3">
            {memory.date} · {memory.location} · {TAG_LABELS[memory.tag]}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-ink">
            {memory.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">
            {memory.story}
          </p>
          {memory.note && (
            <p className="mt-5 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-muted">
              {memory.note}
            </p>
          )}
          {memory.quote && (
            <p className="mt-6 font-hand text-2xl text-accent-deep">
              {memory.quote}
            </p>
          )}
        </Reveal>
      </div>
    </article>
  );
}
