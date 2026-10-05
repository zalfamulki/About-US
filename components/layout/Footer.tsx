import Link from "next/link";
import { ANNIVERSARY, formatDateID } from "@/lib/counter";

export default function Footer() {
  return (
    <footer className="pb-28 md:pb-12 pt-16 text-center">
      <p className="font-serif italic text-lg text-muted">z &amp; k</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted/70">
        sejak {formatDateID(ANNIVERSARY)}
      </p>
      <p className="mt-4 text-xs text-muted/60">
        dibuat dengan pelan-pelan, untuk kita berdua
      </p>
      <Link
        href="/about"
        className="sr-only"
        aria-hidden
        tabIndex={-1}
      >
        about
      </Link>
    </footer>
  );
}
