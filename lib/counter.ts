export const ANNIVERSARY = new Date(2024, 9, 6);

export type RelationshipDuration = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
};

export type Milestone = {
  label: string;
  date: Date;
  daysUntil: number;
};

function calendarMonthsBetween(from: Date, to: Date): number {
  let months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months -= 1;
  return Math.max(0, months);
}

export function getRelationshipDuration(now: Date = new Date()): RelationshipDuration {
  const start = ANNIVERSARY;
  const totalDays = Math.max(
    0,
    Math.floor(
      (stripTime(now).getTime() - stripTime(start).getTime()) / 86_400_000
    )
  );

  const totalMonths = calendarMonthsBetween(start, now);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const anchor = addMonths(start, totalMonths);
  const days = Math.max(
    0,
    Math.round((stripTime(now).getTime() - anchor.getTime()) / 86_400_000)
  );

  return { years, months, days, totalDays };
}

/** Returns the next upcoming day-milestone (e.g. hari ke-500, ke-1000, ke-1500...) */
export function getNextDayMilestone(now: Date = new Date()): Milestone | null {
  const { totalDays } = getRelationshipDuration(now);
  const STEP = 100;
  // Find next milestone divisible by STEP (100-day increments, highlight 500/1000)
  const next = Math.ceil((totalDays + 1) / STEP) * STEP;
  const milestoneDate = new Date(ANNIVERSARY.getTime() + next * 86_400_000);
  const daysUntil = Math.round(
    (stripTime(milestoneDate).getTime() - stripTime(now).getTime()) / 86_400_000
  );
  return { label: `hari ke-${next}`, date: milestoneDate, daysUntil };
}

/** Returns next yearly anniversary and how many days until it */
export function getNextAnniversary(now: Date = new Date()): Milestone {
  const today = stripTime(now);
  const year = today.getFullYear();
  let candidate = new Date(year, ANNIVERSARY.getMonth(), ANNIVERSARY.getDate());
  if (candidate.getTime() <= today.getTime()) {
    candidate = new Date(year + 1, ANNIVERSARY.getMonth(), ANNIVERSARY.getDate());
  }
  const daysUntil = Math.round(
    (candidate.getTime() - today.getTime()) / 86_400_000
  );
  const anniversaryNumber = candidate.getFullYear() - ANNIVERSARY.getFullYear();
  return {
    label: `anniversary ${anniversaryNumber} tahun`,
    date: candidate,
    daysUntil,
  };
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d;
}

function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function formatDateID(date: Date): string {
  return `${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
}
