"use client";

import { useSyncExternalStore } from "react";
import {
  getNextAnniversary,
  getNextDayMilestone,
  formatDateID,
} from "@/lib/counter";

const subscribe = () => () => {};

type Snapshot = {
  anniversary: ReturnType<typeof getNextAnniversary>;
  dayMilestone: ReturnType<typeof getNextDayMilestone>;
};

// WAJIB di-cache: getSnapshot harus mengembalikan referensi stabil.
// Objek baru setiap render = React mengira store berubah terus
// = infinite loop (React error #185, ditemukan via browser test Fase 3).
let cache: { at: number; value: Snapshot } | null = null;

function getSnapshot(): Snapshot {
  const now = Date.now();
  if (!cache || now - cache.at > 60_000) {
    const date = new Date(now);
    cache = {
      at: now,
      value: {
        anniversary: getNextAnniversary(date),
        dayMilestone: getNextDayMilestone(date),
      },
    };
  }
  return cache.value;
}

function getServerSnapshot() {
  return null;
}

export default function MilestoneCountdown() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!data) return null;

  const { anniversary, dayMilestone } = data;

  const milestones = [
    {
      label: anniversary.label,
      date: formatDateID(anniversary.date),
      daysUntil: anniversary.daysUntil,
    },
    ...(dayMilestone
      ? [
          {
            label: dayMilestone.label,
            date: formatDateID(dayMilestone.date),
            daysUntil: dayMilestone.daysUntil,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {milestones.map((m) => (
        <div
          key={m.label}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "14px 20px",
            textAlign: "center",
            minWidth: "140px",
            boxShadow: "0 4px 16px rgba(61,56,51,0.06)",
            transition: "background 0.4s, border-color 0.4s",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              fontFamily: "var(--font-playfair)",
              color: "var(--accent-deep)",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {m.daysUntil}
          </p>
          <p
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--muted)",
              marginTop: "4px",
            }}
          >
            hari lagi
          </p>
          <p
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "15px",
              color: "var(--ink)",
              marginTop: "6px",
            }}
          >
            {m.label}
          </p>
          <p
            style={{
              fontSize: "9px",
              color: "var(--muted)",
              opacity: 0.7,
              marginTop: "2px",
            }}
          >
            {m.date}
          </p>
        </div>
      ))}
    </div>
  );
}
