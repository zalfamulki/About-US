import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import { albums } from "@/lib/data";

export function generateStaticParams() {
  return albums.map(({ slug }) => ({ slug }));
}

type Props = PageProps<"/albums/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) return {};
  return { title: `${album.title} — Albums Zall & Kia` };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) notFound();

  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:pt-40">
      <Reveal>
        <Link
          href="/albums"
          className="text-[11px] uppercase tracking-[0.25em] text-muted underline decoration-line underline-offset-8 transition-colors hover:text-accent-deep hover:decoration-accent"
        >
          ← semua album
        </Link>
      </Reveal>

      <Reveal className="mt-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-3">
          {album.photoCount} foto
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink">
          {album.title}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          {album.description}
        </p>
      </Reveal>

      <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {Array.from({ length: Math.min(album.photoCount, 12) }, (_, i) => (
          <Reveal key={i} delay={(i % 3) * 0.06}>
            <PhotoPlaceholder
              seed={i + 1}
              className={`w-full rounded-sm ${
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
              }`}
            />
          </Reveal>
        ))}
      </div>

      {album.photoCount > 12 && (
        <p className="mt-8 text-center font-hand text-xl text-muted">
          sisanya masih di galeri HP, sabar ya
        </p>
      )}
    </section>
  );
}
