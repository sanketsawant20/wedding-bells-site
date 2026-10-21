import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Section, SectionTitle } from "./Section";
import { visibleEventsFor, type WeddingEvent } from "@/lib/constants";
import { useIsVIP } from "@/hooks/useIsVIP";
import { calendarDaysUntil, useNow } from "@/hooks/useCountdown";

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

type Status = { label: string; tone: "live" | "next" | "past" | "soon" };

function statusOf(ev: WeddingEvent, now: number, isNext: boolean): Status {
  const start = new Date(ev.start).getTime();
  const end = start + ev.durationHours * 60 * 60 * 1000;
  if (now >= end) return { label: "Celebrated", tone: "past" };
  if (now >= start) return { label: "Happening now", tone: "live" };

  const days = calendarDaysUntil(start, now);
  const when = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;
  return isNext ? { label: `Up next · ${when}`, tone: "next" } : { label: when, tone: "soon" };
}

const TONE_CLASS: Record<Status["tone"], string> = {
  live: "bg-maroon text-ivory border-maroon animate-pulse",
  next: "bg-gradient-to-r from-gold to-gold-soft text-maroon-deep border-gold",
  soon: "bg-ivory text-primary/80 border-gold/40",
  past: "bg-transparent text-foreground/50 border-foreground/20 line-through decoration-gold",
};

export function Schedule() {
  const isVIP = useIsVIP();
  const now = useNow();
  const events = visibleEventsFor(isVIP);

  const nextId =
    now === null
      ? null
      : events.find((ev) => new Date(ev.start).getTime() + ev.durationHours * 3_600_000 > now)?.id;

  return (
    <Section id="schedule" className="!py-14 sm:!py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionTitle eyebrow="The celebrations at a glance" title="Schedule" />

        <motion.ol
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto max-w-2xl"
        >
          {/* Vertical gold thread */}
          <span
            aria-hidden="true"
            className="absolute left-[27px] sm:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold to-transparent"
          />

          {events.map((ev, i) => {
            const Icon = ev.icon;
            const status = now === null ? null : statusOf(ev, now, ev.id === nextId);
            const right = i % 2 === 1;

            return (
              <motion.li
                key={ev.id}
                variants={itemVariant}
                className={`relative flex items-center gap-4 sm:gap-0 py-4 sm:py-6 ${
                  right ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <a
                  href={`#${ev.id}`}
                  className={`order-2 sm:order-none flex-1 sm:w-1/2 sm:flex-none group ${
                    right ? "sm:pl-12" : "sm:pr-12 sm:text-right"
                  }`}
                >
                  <div
                    className={`rounded-2xl border bg-ivory/80 backdrop-blur p-4 sm:p-5 shadow-elegant card-glow-hover ${
                      ev.id === nextId ? "border-gold" : "border-gold/30"
                    } ${status?.tone === "past" ? "opacity-70" : ""}`}
                  >
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 font-semibold">
                      {ev.shortDate} · {ev.time}
                    </p>
                    <h3 className="script mt-1 text-3xl sm:text-4xl text-primary group-hover:text-maroon-deep transition-colors">
                      {ev.name}
                    </h3>
                    <p className="font-serif text-sm sm:text-base text-foreground/75 italic">
                      {ev.city}
                    </p>
                    {status && (
                      <span
                        className={`mt-3 inline-block rounded-full border px-3 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold ${TONE_CLASS[status.tone]}`}
                      >
                        {status.label}
                      </span>
                    )}
                  </div>
                </a>

                {/* Node on the thread */}
                <span
                  className={`order-1 sm:order-none relative z-10 sm:absolute sm:left-1/2 sm:-translate-x-1/2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ivory bg-gradient-to-br from-gold to-gold-soft text-maroon-deep shadow-gold ${
                    ev.id === nextId ? "ring-4 ring-gold/30" : ""
                  }`}
                >
                  <Icon size={22} />
                </span>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
}
