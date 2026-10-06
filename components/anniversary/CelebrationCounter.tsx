"use client";

import { motion } from "motion/react";
import { Clock, Calendar, Heart, Sparkles, Moon, Laugh } from "lucide-react";
import { yearWordId } from "@/lib/counter";
import { useRelationshipDuration } from "@/lib/useRelationshipDuration";
import ChapterHeading from "@/components/anniversary/ChapterHeading";
import Reveal from "@/components/ui/Reveal";

export default function CelebrationCounter() {
  const duration = useRelationshipDuration();
  const years = Math.max(duration.years, 1);

  const totalMonths = duration.years * 12 + duration.months;
  const totalHours = duration.totalDays * 24;
  const totalMinutes = totalHours * 60;

  const STATS = [
    {
      value: `${duration.years}`,
      unit: "Years",
      subtext: `${yearWordId(years)} tahun penuh cerita`,
      icon: Heart,
    },
    {
      value: `${totalMonths}`,
      unit: "Months",
      subtext: "bulan-bulan yang manis",
      icon: Calendar,
    },
    {
      value: `${duration.totalDays}+`,
      unit: "Days",
      subtext: "hari memilih kamu",
      icon: Sparkles,
    },
    {
      value: `${totalHours.toLocaleString("id-ID")}+`,
      unit: "Hours",
      subtext: "jam ngobrol & ketawa",
      icon: Clock,
    },
    {
      value: `${totalMinutes.toLocaleString("id-ID")}+`,
      unit: "Minutes",
      subtext: "menit saling menyayangi",
      icon: Moon,
    },
    {
      value: "1,000,000+",
      unit: "Little Moments",
      subtext: "hal kecil yang bikin bahagia",
      icon: Laugh,
    },
  ];

  return (
    <section
      id="anniversary-counter"
      className="mx-auto max-w-5xl px-6 py-20 md:py-28 scroll-mt-20"
    >
      <ChapterHeading
        chapter="Chapter 2 · Time Together"
        title="Every Single Second With You"
        subtitle="...and I would choose to count them all over again."
      />

      <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.unit} delay={idx * 0.08}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border border-line bg-surface/90 shadow-xs hover:shadow-md transition-shadow text-center overflow-hidden"
              >
                {/* Decorative corner accent */}
                <div
                  className="absolute top-2 right-2 text-accent/30 pointer-events-none"
                  aria-hidden="true"
                >
                  <Icon size={16} />
                </div>

                <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-accent-deep tracking-tight">
                  {stat.value}
                </p>

                <p className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-ink mt-2">
                  {stat.unit}
                </p>

                <p className="font-hand text-sm text-muted mt-1">
                  {stat.subtext}
                </p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>

      {/* Playful footer note */}
      <Reveal delay={0.5} className="mt-12 text-center">
        <p className="font-hand text-xl text-muted">
          &ldquo;{duration.totalDays}+ hari, dan kamu masih jadi orang favoritku setiap harinya.&rdquo;
        </p>
      </Reveal>
    </section>
  );
}
