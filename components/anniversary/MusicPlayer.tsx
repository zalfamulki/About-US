"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Heart, Music, Pause, Play } from "lucide-react";
import { couple } from "@/data/couple";

// Floating music player (prompt §12): vinyl berputar + equalizer + hearts
// saat diputar. DEFAULT OFF — tidak pernah autoplay tanpa klik user.
export default function MusicPlayer() {
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(couple.song.url);
      audio.loop = true;
      audio.volume = 0.85;
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("ended", () => setPlaying(false));
      audio.addEventListener("error", () => setPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const toggle = () => {
    const audio = getAudio();
    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-3 z-40 md:bottom-6 md:right-6 print:hidden">
      <div
        className="flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 shadow-[0_12px_36px_rgba(61,56,51,0.16)]"
        style={{
          background: "var(--surface)",
          borderColor: playing ? "var(--accent)" : "var(--line)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Vinyl */}
        <span className="relative flex h-11 w-11 items-center justify-center">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle at center, #2f2a26 0 2px, #4a423b 2px 4px)",
              boxShadow: "inset 0 0 0 2px rgba(217,166,160,0.5)",
            }}
            animate={playing && !reduce ? { rotate: 360 } : { rotate: 0 }}
            transition={
              playing && !reduce
                ? { duration: 3.2, repeat: Infinity, ease: "linear" }
                : { duration: 0.4 }
            }
          >
            <span
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--bg-primary)" }}
            />
          </motion.span>

          {/* Equalizer */}
          <AnimatePresence>
            {playing && (
              <span
                className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-[2px]"
                aria-hidden
              >
                {[0, 1, 2].map((bar) => (
                  <motion.span
                    key={bar}
                    className="w-[3px] rounded-full"
                    style={{ background: "var(--accent-deep)" }}
                    initial={{ height: 4 }}
                    animate={reduce ? { height: 8 } : { height: [4, 13, 6, 10, 4] }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            duration: 0.9 + bar * 0.18,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  />
                ))}
              </span>
            )}
          </AnimatePresence>
        </span>

        {/* Label */}
        <span className="flex flex-col leading-tight">
          <span
            className="font-hand text-base inline-flex items-center gap-1"
            style={{ color: "var(--accent-deep)" }}
          >
            Our song
            <Music size={13} aria-hidden />
          </span>
          <span
            className="max-w-[130px] truncate text-[10px] uppercase tracking-[0.18em] text-muted"
            title={`${couple.song.title} — ${couple.song.artist}`}
          >
            {couple.song.title} · {couple.song.artist}
          </span>
        </span>

        {/* Play / Pause */}
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Jeda lagu" : "Putar lagu"}
          aria-pressed={playing}
          className="flex h-11 w-11 items-center justify-center rounded-full transition-colors cursor-pointer"
          style={{
            background: playing ? "var(--accent-deep)" : "var(--accent-soft)",
            color: playing ? "#fff" : "var(--accent-deep)",
          }}
        >
          {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        {/* Hearts muncul saat lagu diputar */}
        <AnimatePresence>
          {playing && !reduce && (
            <span className="pointer-events-none absolute -top-1 left-6" aria-hidden>
              {[0, 1, 2].map((h) => (
                <motion.span
                  key={h}
                  className="absolute text-accent-deep"
                  initial={{ opacity: 0, y: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    y: -34,
                    x: h === 1 ? 10 : h === 2 ? -10 : 0,
                    scale: [0.6, 1, 0.9],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: h * 0.5,
                    ease: "easeOut",
                  }}
                >
                  <Heart size={13} className="fill-accent-deep" />
                </motion.span>
              ))}
            </span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
