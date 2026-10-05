import Reveal from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl text-ink">{title}</h2>
      <div
        className={`mt-4 h-px w-12 bg-accent ${centered ? "mx-auto" : ""}`}
        aria-hidden
      />
    </Reveal>
  );
}
