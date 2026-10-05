"use client";

import Reveal from "@/components/ui/Reveal";

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "Belum ada foto di sini",
  message = "tapi ceritanya sudah bagus.",
}: EmptyStateProps) {
  return (
    <Reveal className="my-16 text-center">
      <div
        style={{
          border: "1px dashed var(--accent)",
          background: "var(--surface)",
          borderRadius: "20px",
          padding: "40px 24px",
          maxWidth: "420px",
          margin: "0 auto",
          boxShadow: "0 8px 24px rgba(61,56,51,0.04)",
        }}
      >
        <span aria-hidden style={{ fontSize: "36px", display: "block" }}>
          🖼️
        </span>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.2rem",
            color: "var(--ink)",
            marginTop: "12px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-caveat)",
            fontSize: "1.4rem",
            color: "var(--accent-deep)",
            marginTop: "6px",
          }}
        >
          &ldquo;{message}&rdquo;
        </p>
      </div>
    </Reveal>
  );
}
