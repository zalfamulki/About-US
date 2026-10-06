"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/anniversary", label: "Anniversary", highlight: true },
  { href: "/memories", label: "Memories" },
  { href: "/albums", label: "Albums" },
  { href: "/letters", label: "Letters" },
  { href: "/story", label: "Our Story" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-40 hidden md:flex justify-center">
      <nav
        className="mt-5 flex items-center gap-7 rounded-full border px-8 py-3 shadow-[0_8px_30px_rgba(61,56,51,0.08)]"
        style={{
          borderColor: "var(--line)",
          background: "var(--surface)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {LINKS.map(({ href, label, highlight }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => {
                // Sudah di halaman ini → cukup scroll ke atas (rasa "reset").
                if (pathname === href) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`text-[13px] tracking-wide transition-colors ${
                highlight && active
                  ? "rounded-full border px-3.5 py-1.5 font-medium"
                  : `${active ? "text-accent-deep font-medium" : "text-muted hover:text-ink"}`
              }`}
              style={
                highlight && active
                  ? {
                      background: "var(--accent-deep)",
                      borderColor: "var(--accent-deep)",
                      color: "#fff",
                    }
                  : { color: active ? "var(--accent-deep)" : undefined }
              }
            >
              {label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
