"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart, X } from "lucide-react";

type SecretId = "heart" | "name" | "keyboard" | "bottom";

const MESSAGES: Record<SecretId, string> = {
  heart: "Okay, you weren't supposed to find this...\nStill choosing you. Every single time.",
  name: "You clicked our names. Cute.\nStill yours — always.",
  keyboard: "Typing \"love\" on my keyboard just proves it.\nYou already have the whole thing.",
  bottom: "You scrolled all the way down, just for me.\nOf course you did ♡",
};

const TOTAL = Object.keys(MESSAGES).length;

// Easter Eggs (prompt §13): 4 secret — heart 5x, klik nama pasangan,
// ketik "love", scroll sampai bawah. Toast "You found a secret ♡" HANYA
// muncul saat secret BARU ditemukan (sekali per secret, disimpan di
// localStorage supaya tidak muncul lagi saat scroll/pindah menu).
const FOUND_KEY = "anniversary_secrets_found";

function loadFound(): SecretId[] {
  try {
    const raw = localStorage.getItem(FOUND_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid: SecretId[] = ["heart", "name", "keyboard", "bottom"];
    return parsed.filter((v): v is SecretId => valid.includes(v as SecretId));
  } catch {
    return [];
  }
}

export default function EasterEggs() {
  const reduce = useReducedMotion();
  const [found, setFound] = useState<SecretId[]>(() => loadFound());
  const [active, setActive] = useState<SecretId | null>(null);
  const heartClicks = useRef(0);
  const hideTimer = useRef<number | null>(null);
  // Cermin sinkron state found: guard supaya reveal yang sama tidak
  // memicu toast + reset timer berulang (penyebab toast "nempel" saat
  // scroll di bawah halaman).
  const foundRef = useRef<SecretId[]>(found);

  const reveal = useCallback((id: SecretId) => {
    if (foundRef.current.includes(id)) return;
    foundRef.current = [...foundRef.current, id];
    setFound(foundRef.current);
    try {
      localStorage.setItem(FOUND_KEY, JSON.stringify(foundRef.current));
    } catch {
      // storage diblokir → toast tetap jalan untuk sesi ini.
    }
    setActive(id);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setActive(null), 7000);
  }, []);

  const dismiss = useCallback(() => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    setActive(null);
  }, []);

  // 1. Klik nama pasangan (elemen dengan data-secret-name)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-secret-name]")) reveal("name");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reveal]);

  // 2. Keyboard shortcut: ketik "love"
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "love") reveal("keyboard");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reveal]);

  // 3. Scroll sampai bawah halaman
  useEffect(() => {
    const onScroll = () => {
      const reached =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 140;
      if (reached) reveal("bottom");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reveal]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const onHeart = () => {
    heartClicks.current += 1;
    if (heartClicks.current >= 5) {
      heartClicks.current = 0;
      reveal("heart");
    }
  };

  return (
    <>
      {/* Trigger rahasia: heart 5x */}
      <button
        type="button"
        onClick={onHeart}
        aria-label="Hati kecil"
        className="fixed left-3 bottom-20 z-40 flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:left-6 md:bottom-6 cursor-pointer"
        style={{
          background: "color-mix(in srgb, var(--surface) 70%, transparent)",
          borderColor: "var(--line)",
          color: "var(--accent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <motion.span
          animate={
            reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={17} className="fill-accent/50" />
        </motion.span>
      </button>

      {/* Toast secret */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-36 left-1/2 z-50 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border px-5 py-4 text-center shadow-[0_16px_44px_rgba(61,56,51,0.2)] md:bottom-24"
            style={{
              background: "var(--surface)",
              borderColor: "var(--accent)",
            }}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Tutup pesan rahasia"
              className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-ink cursor-pointer"
            >
              <X size={14} />
            </button>
            <p
              className="font-serif text-lg"
              style={{ color: "var(--accent-deep)" }}
            >
              You found a secret ♡
            </p>
            <p className="mt-2 whitespace-pre-line font-hand text-lg leading-snug text-ink">
              {MESSAGES[active]}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-muted">
              {found.length} of {TOTAL} secrets
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
