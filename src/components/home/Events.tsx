import { motion } from "motion/react";
import { visibleEventsFor, type WeddingEvent } from "@/lib/constants";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { fadeUp } from "@/lib/animations";
import { Calendar, CalendarPlus, Clock, MapPin } from "lucide-react";
import { useIsVIP } from "@/hooks/useIsVIP";

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const rowVariant = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

import haldiBg from "@/assets/haldi-bg.jpg";
import sangeetBg from "@/assets/sangeet-bg.jpg";
import weddingBg from "@/assets/wedding-bg.jpg";
import receptionBg from "@/assets/reception-bg.jpg";

const BACKGROUNDS: Record<string, string> = {
  haldi: haldiBg,
  sangeet: sangeetBg,
  "wedding-ceremony": weddingBg,
  reception: receptionBg,
};

function AddToCalendar({ ev, dark }: { ev: WeddingEvent; dark: boolean }) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all active:scale-95 cursor-pointer";
  const tone = dark
    ? "border border-gold/50 text-gold-soft hover:bg-gold hover:text-maroon-deep"
    : "border border-primary/30 bg-white/70 text-primary hover:bg-primary hover:text-ivory";

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <a
        href={googleCalendarUrl(ev)}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${tone}`}
      >
        <CalendarPlus size={14} />
        Google Calendar
      </a>
    </div>
  );
}

export function Events() {
  const isVIP = useIsVIP();
  const visibleEvents = visibleEventsFor(isVIP);

  return (
    <div id="events">
      {visibleEvents.map((ev) => {
        const Icon = ev.icon;
        const sectionId = ev.id;

        const hasBg = true;
        const isDarkTheme = sectionId === "sangeet" || sectionId === "reception";

        return (
          <section
            key={ev.name}
            id={sectionId}
            className={`relative min-h-[90vh] flex flex-col items-center justify-start pb-36 sm:pb-40 px-3 sm:px-4 overflow-hidden bg-cover bg-center bg-no-repeat mb-12 sm:mb-16 rounded-3xl ${sectionId === "wedding-ceremony" ? "pt-4" : "pt-16 sm:pt-24"
              }`}
            style={{ backgroundImage: `url(${BACKGROUNDS[sectionId]})` }}
          >
            {/* Center Progressive Radial Blur Backdrop (blurs only the center text area of the image) */}
            {hasBg && (
              <div
                className="absolute inset-0 -z-10 pointer-events-none backdrop-blur-[16px] sm:backdrop-blur-[24px]"
                style={{
                  maskImage: "radial-gradient(circle at center, black 0%, transparent 68%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 68%)",
                }}
              />
            )}

            {/* 
              Haldi / Wedding: Soft radial light glow to make the maroon text stand out on bright backgrounds.
              Sangeet / Reception: Tailored dark vignette to make the starry sky look deeper and increase text contrast.
            */}
            {(sectionId === "haldi" || sectionId === "wedding-ceremony") && (
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.65) 45%, rgba(255, 255, 255, 0.15) 75%, transparent 100%)",
                }}
              />
            )}

            {sectionId === "sangeet" && (
              <div className="absolute inset-0 bg-black/25 -z-10 pointer-events-none" />
            )}

            {sectionId === "reception" && (
              <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center 40%, rgba(8, 12, 26, 0.55) 0%, rgba(8, 12, 26, 0.25) 55%, transparent 95%)",
                }}
              />
            )}

            {/* Top Blur Blend Transition (smooth color blending at the top edge) */}
            {hasBg && (
              <div
                className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10 backdrop-blur-[12px]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />
            )}

            {/* Bottom Blur Blend Transition (smooth color blending at the bottom edge) */}
            {hasBg && (
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10 backdrop-blur-[12px]"
                style={{
                  maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                }}
              />
            )}

            <div className="mx-auto max-w-xl w-full z-10 px-1 sm:px-0">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={`w-full text-center p-5 sm:p-10 rounded-3xl ${isDarkTheme
                    ? "text-ivory bg-black/35 backdrop-blur-md border border-gold/30 shadow-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                    : "text-primary"
                  }`}
              >
                {/* Event Icon */}
                <div className="mb-3 sm:mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-md bg-gradient-to-br from-gold to-gold-soft text-maroon-deep shadow-gold heartbeat-hover cursor-default">
                  <Icon size={20} />
                </div>

                {/* Eyebrow */}
                <p
                  className={`text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.4em] mb-2 font-bold ${isDarkTheme
                      ? "text-gold-soft drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                      : "text-primary/90 font-semibold"
                    }`}
                >
                  {ev.eyebrow}
                </p>

                {/* Event Title */}
                <h3
                  className={`script text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold ${isDarkTheme
                      ? "gold-text drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
                      : "text-primary drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                    } mb-1 sm:mb-2`}
                >
                  {ev.name}
                </h3>

                {/* Blurb */}
                <p
                  className={`text-sm sm:text-base md:text-lg italic max-w-md mx-auto mt-0.5 mb-6 leading-relaxed font-serif px-2 ${isDarkTheme
                      ? "text-ivory drop-shadow-sm font-medium"
                      : "text-foreground font-medium"
                    }`}
                >
                  “{ev.blurb}”
                </p>

                {/* Details List */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  className={`mt-6 space-y-3.5 text-xs sm:text-sm text-left max-w-sm mx-auto border-t pt-4 ${isDarkTheme
                      ? "border-white/25 text-ivory font-medium"
                      : "border-primary/20 text-foreground font-semibold"
                    }`}
                >
                  <motion.div variants={rowVariant} className="flex items-center gap-3">
                    <Calendar
                      size={18}
                      className={`${isDarkTheme ? "text-gold" : "text-primary"} shrink-0`}
                    />
                    <span className="font-serif tracking-wide text-sm sm:text-base">{ev.date}</span>
                  </motion.div>
                  <motion.div variants={rowVariant} className="flex items-center gap-3">
                    <Clock
                      size={18}
                      className={`${isDarkTheme ? "text-gold" : "text-primary"} shrink-0`}
                    />
                    <span className="font-serif tracking-wide text-sm sm:text-base">{ev.time}</span>
                  </motion.div>
                  <motion.div variants={rowVariant} className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className={`${isDarkTheme ? "text-gold" : "text-primary"} mt-0.5 shrink-0`}
                    />
                    <span className="font-serif tracking-wide text-sm sm:text-base leading-snug">
                      {ev.venue}
                    </span>
                  </motion.div>
                </motion.div>

                <AddToCalendar ev={ev} dark={isDarkTheme} />
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
