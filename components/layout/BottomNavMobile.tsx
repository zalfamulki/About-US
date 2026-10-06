"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Cake, Heart, Home, Image as ImageIcon, BookOpen, Mail } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/anniversary", label: "Anniv", icon: Cake },
  { href: "/memories", label: "Memories", icon: BookOpen },
  { href: "/albums", label: "Albums", icon: ImageIcon },
  { href: "/letters", label: "Letters", icon: Mail },
  { href: "/story", label: "Story", icon: Heart },
  { href: "/about", label: "About", icon: Camera },
];

export default function BottomNavMobile() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-3 inset-x-3 z-40 flex items-center justify-around rounded-full border px-1.5 py-2 shadow-[0_12px_36px_rgba(61,56,51,0.14)]"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      aria-label="Navigasi utama"
    >
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              onClick={(e) => {
                if (pathname === href) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex flex-col items-center gap-0.5 rounded-full px-1.5 py-0.5 transition-colors"
            style={{ color: active ? "var(--accent-deep)" : "var(--muted)" }}
          >
            <Icon size={18} strokeWidth={1.75} />
            <span className="text-[8.5px] uppercase tracking-wider">{label}</span>
          </Link>
        );
      })}
      <ThemeToggle />
    </nav>
  );
}
