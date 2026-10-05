// Cover statis yang ikut ter-render di SSR HTML sebelum React hydration.
// Tugasnya: menutup viewport dengan warna background sejak paint pertama,
// sehingga tidak ada satu piksel pun konten beranda yang terlihat sebelum
// intro anniversary mengambil alih.
//
// Disembunyikan via display:none (BUKAN .remove()) oleh hideIntroCover()
// agar unmount React tetap aman (React akan error NotFoundError jika node
// yang masih ia kelola dihapus dari luar sebelum unmount).
export function hideIntroCover() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("intro-cover");
  if (el) el.style.display = "none";
}

export default function IntroCover() {
  return (
    <div
      id="intro-cover"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // var() + fallback literal: tetap opaque walau globals.css belum load
        background: "var(--bg-primary, #faf7f2)",
      }}
    >
      <p
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontSize: 20,
          color: "var(--ink, #3d3833)",
        }}
      >
        2 years of us ♡
      </p>
    </div>
  );
}
