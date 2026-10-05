"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import HeartLike from "@/components/ui/HeartLike";
import EmptyState from "@/components/ui/EmptyState";
import { memories, TAG_LABELS, type MemoryTag } from "@/lib/data";

type Filter = MemoryTag | "all";

const FILTERS: Filter[] = ["all", ...((Object.keys(TAG_LABELS) as Filter[]))];

export default function MemoryGrid() {
  const [active, setActive] = useState<Filter>("all");
  const filtered =
    active === "all" ? memories : memories.filter((m) => m.tag === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
              active === f
                ? "border-accent bg-accent-soft text-accent-deep"
                : "border-line text-muted hover:border-accent hover:text-accent-deep"
            }`}
          >
            {f === "all" ? "semua" : TAG_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((memory, i) => (
          <Reveal key={memory.slug} delay={(i % 3) * 0.08}>
            <div className="relative group block h-full rounded-[4px] bg-white p-4 pb-6 shadow-[0_12px_35px_rgba(61,56,51,0.1)] transition-transform duration-500 hover:-translate-y-1">
              <Link href={`/memories/${memory.slug}`}>
                <div className={i % 2 === 0 ? "-rotate-1" : "rotate-1"}>
                  <PhotoPlaceholder
                    seed={i + 3}
                    className="aspect-[4/5] rounded-sm transition-transform duration-500 group-hover:rotate-0"
                  />
                </div>
              </Link>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted">
                  {memory.date} · {TAG_LABELS[memory.tag]}
                </p>
                <HeartLike id={`memory_${memory.slug}`} />
              </div>

              <Link href={`/memories/${memory.slug}`}>
                <h3 className="mt-2 font-serif text-xl text-ink group-hover:text-accent-deep">
                  {memory.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                  {memory.story}
                </p>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <EmptyState
          title="Belum ada kenangan di kategori ini"
          message="tapi akan segera ditambah..."
        />
      )}
    </div>
  );
}
