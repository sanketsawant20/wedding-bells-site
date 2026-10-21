import { useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { Section, SectionTitle } from "./Section";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp } from "@/lib/animations";

const VENUES = [
  {
    id: "wedding",
    label: "Wedding · Lonavala",
    title: "Wedding Ceremony",
    subtitle: "Cloud 9 Hills Resort",
    address: "Cloud 9 Hills Resort, Amby Valley Road, Lonavala, Maharashtra 410401",
    date: "12th November 2026 · 1:00 PM onwards",
    mapsUrl: "https://maps.app.goo.gl/GHG1MYjY46So8rDa8?g_st=iw",
    embedQuery: "Cloud 9 Hills Resort, Amby Valley Road, Lonavala, Maharashtra 410401",
  },
  {
    id: "reception",
    label: "Reception · Pune",
    title: "Wedding Reception",
    subtitle: "Siddharth Gautam Buddha Udyan",
    address: "Siddharth Gautam Buddha Udyan, Mahatma Phulenagar, Chinchwad, Pune – 411019",
    date: "15th November 2026 · 6:00 PM onwards",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Siddharth+Gautam+Buddha+Udyan+Mahatma+Phulenagar+Chinchwad+Pune+411019",
    embedQuery:
      "Siddharth Gautam Buddha Udyan, Mahatma Phulenagar, Chinchwad, Pune 411019",
  },
];

export function Location() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = VENUES[selectedIdx];

  return (
    <Section id="location">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle eyebrow="Find your way to us" title="Venue & Location" />

        {/* Venue Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-full bg-white/80 border border-gold/40 shadow-sm backdrop-blur">
            {VENUES.map((venue, idx) => (
              <button
                type="button"
                key={venue.id}
                onClick={() => setSelectedIdx(idx)}
                className={`rounded-full px-4 sm:px-7 py-2.5 text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer touch-manipulation ${
                  selectedIdx === idx
                    ? "bg-maroon-deep text-ivory shadow-md"
                    : "text-foreground/75 hover:text-primary"
                }`}
              >
                {venue.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-5 md:items-stretch">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-3 overflow-hidden rounded-3xl border border-gold/40 shadow-elegant bg-ivory"
          >
            <iframe
              key={current.id}
              title={current.title}
              className="h-72 w-full md:h-full min-h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(current.embedQuery)}&output=embed`}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 rounded-3xl border border-gold/40 bg-ivory/95 p-6 sm:p-8 shadow-elegant flex flex-col justify-between card-glow-hover"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-serif text-2xl sm:text-3xl text-primary font-bold">{current.title}</h3>
                <p className="mt-1 script text-3xl sm:text-4xl gold-text">{current.subtitle}</p>
                <div className="mt-6 space-y-4 text-foreground/85">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 shrink-0 text-primary" size={18} />
                    <p className="font-serif tracking-wide text-sm sm:text-base leading-relaxed font-medium">
                      {current.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-1 shrink-0 text-primary" size={18} />
                    <p className="font-serif tracking-wide text-sm sm:text-base font-medium">
                      {current.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.a
              href={current.mapsUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px -8px color-mix(in oklab, var(--gold) 55%, transparent)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-xs sm:text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-elegant font-semibold cursor-pointer"
            >
              Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
