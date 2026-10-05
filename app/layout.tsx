import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Outfit, Caveat } from "next/font/google";
import NavBar from "@/components/layout/NavBar";
import BottomNavMobile from "@/components/layout/BottomNavMobile";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zall & Kia — Our Little Corner",
  description:
    "Ruang digital kecil milik kami berdua: foto, kenangan, dan cerita kita.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${outfit.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Restore theme before paint to prevent flash. next/script +
            beforeInteractive = pola resmi: dieksekusi pre-hydration dan
            tidak memicu error "script tag never executed" seperti <script>
            mentah di dalam Server Component. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('zall-kia-theme');if(t==='dark')document.documentElement.classList.add('dark');})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNavMobile />
      </body>
    </html>
  );
}
