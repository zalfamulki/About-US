"use client";

import { useSyncExternalStore } from "react";
import {
  getRelationshipDuration,
  type RelationshipDuration,
} from "@/lib/counter";

const subscribe = () => () => {};

// Durasi hubungan yang live-update (realtime dari tanggal jadian
// ANNIVERSARY di lib/counter.ts). Pola cache + snapshot server tetap
// seperti MilestoneCountdown/Celebration: getSnapshot wajib stabil dan
// getServerSnapshot wajib deterministik agar prerender tidak mismatch.
let cache: { at: number; value: RelationshipDuration } | null = null;

function getSnapshot(): RelationshipDuration {
  const now = Date.now();
  if (!cache || now - cache.at > 60_000) {
    cache = { at: now, value: getRelationshipDuration(new Date(now)) };
  }
  return cache.value;
}

// Tanggal acuan tetap (6 Okt 2026 = genap 2 tahun) supaya HTML prerender
// selalu sama; setelah hydration otomatis diganti nilai realtime.
// WAJIB di-cache: getServerSnapshot harus mengembalikan referensi stabil,
// objek baru setiap render = React mengira store berubah terus.
let serverCache: RelationshipDuration | null = null;

function getServerSnapshot(): RelationshipDuration {
  if (!serverCache) {
    serverCache = getRelationshipDuration(new Date(2026, 9, 6));
  }
  return serverCache;
}

export function useRelationshipDuration(): RelationshipDuration {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
