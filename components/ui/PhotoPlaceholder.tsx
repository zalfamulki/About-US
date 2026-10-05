const PALETTES = [
  ["#F0DCD8", "#E5C8C2"],
  ["#F3EBE0", "#E3D3BC"],
  ["#EDE3D6", "#D9C4AC"],
  ["#EFE0DB", "#DDBDB5"],
  ["#F1E7DA", "#DECDB4"],
  ["#EBDFD3", "#CFBBA4"],
];

type PhotoPlaceholderProps = {
  seed?: number;
  className?: string;
};

export default function PhotoPlaceholder({
  seed = 0,
  className = "",
}: PhotoPlaceholderProps) {
  const [from, to] = PALETTES[Math.abs(seed) % PALETTES.length];
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, rgba(255,255,255,0.45), transparent 55%)",
        }}
      />
      <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.25em] text-ink/25 select-none">
        photo
      </span>
    </div>
  );
}
