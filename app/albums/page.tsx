import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import { albums } from "@/lib/data";

export const metadata: Metadata = {
  title: "Albums — Zall & Kia",
  description: "Album foto kita, diisi pelan-pelan.",
};

export default function AlbumsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:pt-40">
      <SectionHeading eyebrow="galeri" title="Album" align="center" />
      <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted">
        Foto aslinya menyusul. Untuk sekarang, bayangkan yang paling bagus.
      </p>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album, i) => (
          <Reveal key={album.slug} delay={(i % 3) * 0.08}>
            <Link
              href={`/albums/${album.slug}`}
              className="group block rounded-[4px] bg-white p-4 pb-6 shadow-[0_12px_35px_rgba(61,56,51,0.1)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-sm">
                <PhotoPlaceholder seed={i} className="aspect-square col-span-2" />
                <PhotoPlaceholder seed={i + 1} className="aspect-square" />
                <PhotoPlaceholder seed={i + 2} className="aspect-square" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink group-hover:text-accent-deep">
                {album.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {album.description}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-muted/70">
                {album.photoCount} foto
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
