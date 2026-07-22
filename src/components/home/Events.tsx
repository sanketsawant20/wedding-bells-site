import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Divider } from "@/components/Mandala";
import { EVENTS } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";
import { Calendar, Clock, MapPin } from "lucide-react";

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

export function Events() {
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("vip") === "true") {
        setIsVIP(true);
      }
    }
  }, []);

  const visibleEvents = EVENTS.filter((ev) => {
    const nameLower = ev.name.toLowerCase();
    if (nameLower.includes("haldi") || nameLower.includes("sangeet")) {
      return isVIP;
    }
    return true;
  });

  return (
    <div id="events">
      {visibleEvents.map((ev, i) => {
        const Icon = ev.icon;
        const sectionId = ev.name.toLowerCase().includes("haldi")
          ? "haldi"
          : ev.name.toLowerCase().includes("sangeet")
            ? "sangeet"
            : "wedding-ceremony";

        const hasBg = true;
        const isDarkTheme = sectionId === "sangeet";

        return (
          <section
            key={ev.name}
            id={sectionId}
            className={`relative min-h-[90vh] flex flex-col items-center justify-start pb-40 px-4 overflow-hidden bg-cover bg-center bg-no-repeat mb-12 sm:mb-16 rounded-3xl ${
              sectionId === "wedding-ceremony" ? "pt-4" : "pt-24"
            }`}
            style={{
              backgroundImage:
                sectionId === "haldi"
                  ? `url(${haldiBg})`
                  : sectionId === "sangeet"
                    ? `url(${sangeetBg})`
                    : `url(${weddingBg})`,
            }}
          >
            {/* Center Progressive Radial Blur Backdrop (blurs only the center text area of the image) */}
            {hasBg && (
              <div
                className="absolute inset-0 -z-10 pointer-events-none backdrop-blur-[24px]"
                style={{
                  maskImage: "radial-gradient(circle at center, black 0%, transparent 65%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 65%)",
                }}
              />
            )}

            {/* 
              Haldi / Wedding: Soft radial light glow to make the maroon text stand out on bright backgrounds.
              Sangeet: Subtle dark vignette to make the starry sky look deeper and increase text contrast.
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

            <div className="mx-auto max-w-xl w-full z-10">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`w-full text-center p-6 sm:p-10 rounded-3xl ${
                  isDarkTheme
                    ? "text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    : "text-primary"
                }`}
              >
                {/* Event Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full shadow-md bg-gradient-to-br from-gold to-gold-soft text-maroon-deep shadow-gold heartbeat-hover cursor-default">
                  <Icon size={20} />
                </div>

                {/* Eyebrow */}
                <p
                  className={`text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-2 font-medium ${
                    isDarkTheme ? "text-gold-soft" : "text-primary/80"
                  }`}
                >
                  {ev.name.toLowerCase().includes("wedding")
                    ? "The Main Ceremony"
                    : ev.name.toLowerCase().includes("sangeet")
                      ? "Pre-Wedding Celebration"
                      : "Pre-Wedding Ritual"}
                </p>

                {/* Event Title */}
                <h3
                  className={`script text-5xl sm:text-6xl md:text-7xl font-bold ${
                    isDarkTheme
                      ? "gold-text drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                      : "text-primary drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
                  } mb-0.5`}
                >
                  {ev.name}
                </h3>

                {/* Blurb */}
                <p
                  className={`text-base sm:text-lg italic max-w-md mx-auto mt-0.5 mb-6 leading-relaxed font-serif ${
                    isDarkTheme ? "text-ivory/95" : "text-foreground font-medium"
                  }`}
                >
                  "{ev.blurb}"
                </p>

                {/* Details List */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  className={`mt-6 space-y-3 text-xs sm:text-sm text-left max-w-sm mx-auto border-t pt-4 ${
                    isDarkTheme
                      ? "border-white/20 text-ivory/90"
                      : "border-primary/20 text-foreground font-semibold"
                  }`}
                >
                  <motion.div variants={rowVariant} className="flex items-center gap-3">
                    <Calendar size={16} className={isDarkTheme ? "text-gold" : "text-primary"} />
                    <span className="font-serif tracking-wide text-sm sm:text-base">{ev.date}</span>
                  </motion.div>
                  <motion.div variants={rowVariant} className="flex items-center gap-3">
                    <Clock size={16} className={isDarkTheme ? "text-gold" : "text-primary"} />
                    <span className="font-serif tracking-wide text-sm sm:text-base">{ev.time}</span>
                  </motion.div>
                  <motion.div variants={rowVariant} className="flex items-center gap-3">
                    <MapPin size={16} className={isDarkTheme ? "text-gold" : "text-primary"} />
                    <span className="font-serif tracking-wide text-sm sm:text-base">{ev.venue}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
