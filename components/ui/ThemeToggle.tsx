"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "zall-kia-theme";
type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.setAttribute("data-theme", theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = stored ?? preferred;
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return { theme, toggle };
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Aktifkan mode malam" : "Aktifkan mode siang"}
      id="theme-toggle-btn"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--muted)",
        transition: "color 0.2s, transform 0.3s",
        fontSize: "16px",
        lineHeight: 1,
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.color = "var(--accent-deep)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted)")
      }
    >
      <span
        style={{
          display: "inline-block",
          transform: theme === "dark" ? "rotate(20deg)" : "rotate(0deg)",
          transition: "transform 0.4s ease",
          fontSize: "15px",
        }}
        aria-hidden
      >
        {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
      </span>
    </button>
  );
}
