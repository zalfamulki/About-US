"use client";

import { useSyncExternalStore } from "react";
import { getRelationshipDuration } from "@/lib/counter";
import Reveal from "@/components/ui/Reveal";

type Duration = ReturnType<typeof getRelationshipDuration>;

const subscribe = () => () => {};

let cache: { at: number; value: Duration } | null = null;

function getSnapshot(): Duration {
  const now = Date.now();
  if (!cache || now - cache.at > 60_000) {
    cache = { at: now, value: getRelationshipDuration(new Date(now)) };
  }
  return cache.value;
}

function getServerSnapshot(): null {
  return null;
}

export default function RelationshipCounter() {
  const duration = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return (
    <Reveal delay={0.15} className="mt-10 text-center">
      {duration ? (
        <>
          <p
            className="font-serif text-2xl md:text-3xl"
            style={{ color: "var(--ink)" }}
          >
            {duration.years > 0 && (
              <>
                <span style={{ color: "var(--accent-deep)" }}>
                  {duration.years}
                </span>{" "}
                tahun{" "}
              </>
            )}
            {duration.months > 0 && (
              <>
                <span style={{ color: "var(--accent-deep)" }}>
                  {duration.months}
                </span>{" "}
                bulan{" "}
              </>
            )}
            <span style={{ color: "var(--accent-deep)" }}>{duration.days}</span>{" "}
            hari
          </p>
          <p className="mt-1 font-hand text-lg" style={{ color: "var(--muted)" }}>
            ...dan masih saling stresin, tiap hari.
          </p>
          <p
            className="mt-3 text-[11px] uppercase tracking-[0.25em]"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            total {duration.totalDays} hari bareng kamu
          </p>
        </>
      ) : (
        <div className="h-20" aria-hidden />
      )}
    </Reveal>
  );
}
