"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Selalu true saat modul pertama dimuat (full page load), lalu jadi false
// setelah mount pertama. Server juga selalu true → SSR HTML dan render
// pertama client selalu sama (tanpa wrapper animasi).
// Efek samping yang diinginkan: di load pertama TIDAK ada window
// `opacity:0` (dulu: cover/intro/homepage invisible ~450ms, yang tampil
// hanya chrome navbar = kilasan "beranda" sebelum intro muncul).
// Setelah load pertama, navigasi antar halaman tetap dapat page
// transition (template di-remount per navigasi → useState initial
// sudah false → fade jalan).
let firstLoad = true;

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [skipFade] = useState(() => firstLoad);

  useEffect(() => {
    firstLoad = false;
  }, []);

  if (reduce || skipFade) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
