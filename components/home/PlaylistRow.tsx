"use client";

import { useState } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { playlist } from "@/lib/data";

export default function PlaylistRow() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const togglePlay = (index: number) => {
    setPlayingIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 md:py-24" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="our playlist" title="Lagu Kita" align="center" />

        <p className="mx-auto mt-3 max-w-md text-center font-hand text-lg text-muted">
          klik lagu untuk memutar musik mini &amp; rasakan suasananya
        </p>

        <div className="mt-12 space-y-2">
          {playlist.map((song, i) => {
            const isPlaying = playingIndex === i;
            const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(
              `${song.title} ${song.artist}`
            )}`;

            return (
              <Reveal key={song.title} delay={i * 0.07}>
                <div
                  onClick={() => togglePlay(i)}
                  className="group cursor-pointer flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300"
                  style={{
                    background: isPlaying ? "var(--surface)" : "transparent",
                    border: isPlaying ? "1px solid var(--accent)" : "1px solid transparent",
                    boxShadow: isPlaying ? "0 8px 24px rgba(61,56,51,0.08)" : "none",
                  }}
                >
                  {/* Play/Pause Button & Equalizer */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(i);
                    }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105"
                    style={{
                      background: isPlaying ? "var(--accent-deep)" : "var(--accent-soft)",
                      color: isPlaying ? "#ffffff" : "var(--accent-deep)",
                    }}
                    aria-label={isPlaying ? `Jeda ${song.title}` : `Putar ${song.title}`}
                  >
                    {isPlaying ? (
                      <Pause size={15} fill="currentColor" />
                    ) : (
                      <Play size={15} fill="currentColor" className="ml-0.5" />
                    )}
                  </button>

                  {/* Song Details */}
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg md:text-xl leading-snug" style={{ color: "var(--ink)" }}>
                      {song.title}
                      <span className="ml-2 font-sans text-xs uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
                        {song.artist}
                      </span>
                    </p>
                    <p className="mt-0.5 font-hand text-lg" style={{ color: "var(--muted)" }}>
                      {song.reason}
                    </p>
                  </div>

                  {/* Mini Animated Equalizer */}
                  {isPlaying ? (
                    <div className="flex items-end gap-1 h-5 px-2">
                      {[0, 1, 2, 3].map((b) => (
                        <motion.span
                          key={b}
                          animate={{ height: ["20%", "100%", "30%", "80%"] }}
                          transition={{
                            duration: 0.6 + b * 0.15,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                          style={{
                            width: "3px",
                            background: "var(--accent-deep)",
                            borderRadius: "2px",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <a
                      href={spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Buka di Spotify"
                      className="hidden sm:flex items-center gap-1 text-[11px] uppercase tracking-wider text-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent-deep"
                    >
                      <span>Spotify</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
