import { Section } from "./Section";
import { Mandala } from "@/components/Mandala";
import { ScratchCard } from "@/components/ScratchCard";
import { useCountdown } from "@/hooks/useCountdown";
import { WEDDING_DATE } from "@/lib/constants";

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const items = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];
  return (
    <Section id="countdown" className="!py-10 sm:!py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/40 bg-gradient-to-br from-maroon-deep via-maroon to-maroon-deep p-5 sm:p-12 text-ivory shadow-elegant">
          <Mandala className="absolute -right-16 -top-16 h-48 w-48 sm:h-64 sm:w-64 text-gold/20" />
          <Mandala className="absolute -left-16 -bottom-16 h-48 w-48 sm:h-72 sm:w-72 text-gold/15" />

          {/* Heading */}
          <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-soft">
            Counting the moments until
          </p>
          <h3 className="script mt-2 text-center text-4xl sm:text-6xl gold-text">
            we say forever
          </h3>

          {/* Scratch Card */}
          <div className="mt-5 sm:mt-8 flex flex-col items-center">
            <ScratchCard className="px-4 py-3 sm:px-6 sm:py-4 border border-gold/30 shadow-elegant bg-ivory/10 backdrop-blur">
              <div className="flex flex-col items-center gap-1">
                <p className="font-serif text-lg sm:text-3xl text-ivory tracking-wide">
                  12 · November · 2026
                </p>
                <p className="text-[10px] sm:text-sm uppercase tracking-[0.3em] text-gold-soft">
                  Lonavala · MH
                </p>
              </div>
            </ScratchCard>
          </div>

          {/* Countdown Grid — 4 cols on all sizes */}
          <div className="mt-5 sm:mt-10 grid grid-cols-4 gap-2 sm:gap-6">
            {items.map((it) => (
              <div
                key={it.label}
                className="rounded-xl sm:rounded-2xl border border-gold/30 bg-ivory/[0.06] backdrop-blur px-1 py-4 sm:px-2 sm:py-8 text-center"
              >
                <div className="font-serif text-2xl sm:text-5xl md:text-6xl text-ivory tabular-nums">
                  {String(it.value).padStart(2, "0")}
                </div>
                <div className="mt-1 sm:mt-2 text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-soft">
                  {it.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
