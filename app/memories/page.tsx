import type { Metadata } from "next";
import MemoryGrid from "@/components/memories/MemoryGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Memories — Zall & Kia",
  description: "Kumpulan kenangan kecil yang sayang buat dilupain.",
};

export default function MemoriesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:pt-40">
      <SectionHeading
        eyebrow="koleksi"
        title="Kenangan"
        align="center"
      />
      <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted">
        Beberapa momen sudah ditulis, sisanya masih tersimpan di kepala.
      </p>

      <div className="mt-12">
        <MemoryGrid />
      </div>
    </section>
  );
}
