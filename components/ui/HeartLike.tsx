"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "motion/react";

export default function HeartLike({ id }: { id: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`like_${id}`);
      if (stored === "true") setLiked(true);
    } catch {}
  }, [id]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    try {
      localStorage.setItem(`like_${id}`, String(next));
    } catch {}
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.15 }}
      onClick={toggle}
      aria-label={liked ? "Batal menyukai" : "Sukai kenangan ini"}
      className="p-1.5 rounded-full transition-colors"
      style={{
        background: liked ? "var(--accent-soft)" : "transparent",
        color: liked ? "var(--accent-deep)" : "var(--muted)",
      }}
    >
      <Heart
        size={16}
        fill={liked ? "var(--accent-deep)" : "none"}
        strokeWidth={1.8}
      />
    </motion.button>
  );
}
