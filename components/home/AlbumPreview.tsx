import Link from "next/link";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { albums } from "@/lib/data";

export default function AlbumPreview() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 md:py-24">
      <SectionHeading eyebrow="koleksi foto" title="Album Terbaru" />

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {albums.map((album, i) => (
          <Reveal key={album.slug} delay={i * 0.08}>
            <Link href={`/albums/${album.slug}`} className="block group">
              <div
                className={`relative overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(61,56,51,0.08)] ${
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                <PhotoPlaceholder seed={i + 1} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-4 pt-10">
                  <p className="font-serif text-lg text-white leading-snug">
                    {album.title}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {album.photoCount} foto
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal delay={albums.length * 0.08}>
          <Link
            href="/albums"
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line text-muted transition-colors hover:border-accent hover:text-accent-deep"
          >
            <span className="font-serif italic text-xl">semua album</span>
            <span className="text-[11px] uppercase tracking-[0.25em]">
              lihat →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
