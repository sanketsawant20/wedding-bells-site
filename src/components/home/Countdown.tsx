import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { Section } from "./Section";
import { Mandala } from "@/components/Mandala";
import { ScratchCard } from "@/components/ScratchCard";
import { useCountdown } from "@/hooks/useCountdown";
import { WEDDING_DATE } from "@/lib/constants";

const cardStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Animated number that flips when it changes
function FlipNumber({ value }: { value: number }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="relative overflow-hidden h-[1.25em]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center font-serif tabular-nums text-ivory"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

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
          {/* Spinning mandalas */}
          <Mandala className="absolute -right-16 -top-16 h-48 w-48 sm:h-64 sm:w-64 text-gold/20 mandala-spin" />
          <Mandala className="absolute -left-16 -bottom-16 h-48 w-48 sm:h-72 sm:w-72 text-gold/15 mandala-spin [animation-direction:reverse]" />

          {/* Heading */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-soft"
          >
            Counting the moments until
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="script mt-2 text-center text-4xl sm:text-6xl gold-shimmer-text breathe"
          >
            we say forever
          </motion.h3>

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

          {/* Countdown Grid with flip numbers */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-5 sm:mt-10 grid grid-cols-4 gap-2 sm:gap-6"
          >
            {items.map((it) => (
              <motion.div
                key={it.label}
                variants={cardVariant}
                className="rounded-xl sm:rounded-2xl border border-gold/30 bg-ivory/[0.06] backdrop-blur px-1 py-4 sm:px-2 sm:py-8 text-center card-glow-hover cursor-default"
              >
                <div className="text-2xl sm:text-5xl md:text-6xl">
                  <FlipNumber value={it.value} />
                </div>
                <div className="mt-1 sm:mt-2 text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-soft">
                  {it.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
