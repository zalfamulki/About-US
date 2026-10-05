import Reveal from "@/components/ui/Reveal";

type ChapterHeadingProps = {
  chapter: string;
  title: string;
  subtitle?: string;
};

/** Penanda "chapter baru" — tiap section anniversary terasa seperti
 *  babak cerita, bukan sekadar blok konten (prompt §21). */
export default function ChapterHeading({
  chapter,
  title,
  subtitle,
}: ChapterHeadingProps) {
  return (
    <Reveal className="text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
        {chapter}
      </p>
      <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-md font-hand text-xl text-muted">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
