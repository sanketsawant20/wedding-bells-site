import { useState, useEffect } from "react";

const DAY = 1000 * 60 * 60 * 24;
const IST_OFFSET = 5.5 * 60 * 60 * 1000;

/** Whole calendar days (India time) from `now` until `target`: 0 = today, 1 = tomorrow. */
export function calendarDaysUntil(target: Date | number, now: number) {
  const day = (t: number) => Math.floor((t + IST_OFFSET) / DAY);
  return day(new Date(target).getTime()) - day(now);
}

/** Current time, refreshed every `intervalMs`. `null` until mounted so SSR and hydration agree. */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}

export function useCountdown(target: Date) {
  const now = useNow(1000);

  const diff = now === null ? null : Math.max(0, target.getTime() - now);
  if (diff === null) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, done: diff === 0 };
}
