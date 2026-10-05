"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import Hero from "@/components/home/Hero";
import { FeaturedMemory, QuoteCTA } from "@/components/home/HomeSections";
import HighlightStrip from "@/components/home/HighlightStrip";
import AlbumPreview from "@/components/home/AlbumPreview";
import PlaylistRow from "@/components/home/PlaylistRow";
import ReasonsJar from "@/components/home/ReasonsJar";
import LoadingScreen from "@/components/anniversary/LoadingScreen";
import EnvelopeIntro from "@/components/anniversary/EnvelopeIntro";
import IntroCover, { hideIntroCover } from "@/components/anniversary/IntroCover";

const STEP_KEY = "anniversary_intro_step";
const LEGACY_SEEN_KEY = "anniversary_intro_seen";

type IntroStep = "loading" | "envelope" | "done";

function readPersistedStep(): IntroStep {
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw === "loading" || raw === "envelope" || raw === "done") return raw;
    // Fallback flag versi lama: pernah selesai = langsung beranda.
    if (sessionStorage.getItem(LEGACY_SEEN_KEY) === "true") return "done";
  } catch {
    // sessionStorage diblokir → anggap kunjungan baru.
  }
  return "loading";
}

function writePersistedStep(step: IntroStep) {
  try {
    sessionStorage.setItem(STEP_KEY, step);
    if (step === "done") sessionStorage.setItem(LEGACY_SEEN_KEY, "true");
  } catch {
    // ignore — state in-memory tetap jalan untuk sesi ini.
  }
}

function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export default function Home() {
  // Progres intro dibaca via store (hydration-safe): saat hydration dipakai
  // snapshot server="loading" → first-render client selalu sama persis
  // dengan SSR. Sinkron ke nilai asli otomatis setelah hydration —
  // tanpa branch window di initializer, tanpa setState di effect.
  const persistedStep = useSyncExternalStore(
    subscribeStorage,
    readPersistedStep,
    () => "loading"
  );
  const [introStep, setIntroStep] = useState<IntroStep>("loading");
  // Transisi in-memory menang jika sudah bergerak; jika belum (fresh mount
  // ATAU remount pasca-regenerasi tree oleh React), lanjutkan progres
  // tersimpan — intro tidak pernah mengulang dari awal.
  const visibleStep = introStep !== "loading" ? introStep : persistedStep;

  // Stabil (useCallback): LoadingScreen menjalankan ulang timer-nya setiap
  // identitas onDone berubah — tanpa ini, tiap re-render Home me-reset intro.
  // Setiap transisi juga ditulis ke sessionStorage (write-through) agar
  // posisi intro selamat dari remount.
  const goEnvelope = useCallback(() => {
    writePersistedStep("envelope");
    setIntroStep("envelope");
  }, []);

  const handleFinishIntro = useCallback(() => {
    writePersistedStep("done");
    setIntroStep("done");
  }, []);

  useEffect(() => {
    // Cover pre-paint sudah menutup layar sejak SSR; sembunyikan sekarang
    // karena LoadingScreen (opaque, bg sama) sudah mengambil alih.
    hideIntroCover();
  }, []);

  useEffect(() => {
    // Kunci scroll body selama intro agar tidak ada konten mengintip.
    if (visibleStep === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visibleStep]);

  // Selama intro belum selesai, hanya tampilkan screen intro — jangan render beranda di bawahnya
  if (visibleStep !== "done") {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)]">
        <IntroCover />
        <AnimatePresence mode="wait">
          {visibleStep === "loading" && (
            <LoadingScreen
              key="loading"
              onDone={goEnvelope}
            />
          )}
          {visibleStep === "envelope" && (
            <EnvelopeIntro
              key="envelope"
              onOpen={handleFinishIntro}
            />
          )}
        </AnimatePresence>
      </main>
    );
  }

  // Tampilkan beranda inti setelah intro selesai.
  // NOTE: JANGAN render <IntroCover /> di sini — node-nya akan fresh-mount
  // dalam keadaan visible (opaque, z-60) dan menutupi beranda dengan tulisan
  // "2 years of us" (bug: dikira stuck). Cover hanya dibutuhkan di branch
  // intro, di posisi yang sama agar display:none-nya lestari.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Hero />
      <FeaturedMemory />
      <HighlightStrip />
      <AlbumPreview />
      <ReasonsJar />
      <PlaylistRow />
      <QuoteCTA />
    </motion.div>
  );
}
