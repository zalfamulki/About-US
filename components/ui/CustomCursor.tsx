"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only desktop (pointer: fine)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setVisible(true);

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[role='button']")) setHovered(true);
    };

    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("a,button,[role='button']")) setHovered(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mousemove", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mousemove", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "var(--accent-deep)",
          marginLeft: "-3px",
          marginTop: "-3px",
          transition: "opacity 0.2s",
        }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: "none",
          width: hovered ? "40px" : "24px",
          height: hovered ? "40px" : "24px",
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          opacity: 0.65,
          marginLeft: hovered ? "-20px" : "-12px",
          marginTop: hovered ? "-20px" : "-12px",
          transition:
            "width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.2s",
        }}
      />
    </>
  );
}
