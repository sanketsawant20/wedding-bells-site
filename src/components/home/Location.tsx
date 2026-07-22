import { MapPin, Sparkles } from "lucide-react";
import { Section, SectionTitle } from "./Section";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

export function Location() {
  const address = "Cloud 9 Hills Resort, Amby Valley Road, Lonavala, Maharashtra 410401";
  const mapsUrl = "https://maps.app.goo.gl/GHG1MYjY46So8rDa8?g_st=iw";

  return (
    <Section id="location">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Find your way to us" title="Venue & Location" />
        <div className="grid gap-8 md:grid-cols-5 md:items-stretch">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-3 overflow-hidden rounded-3xl border border-gold/40 shadow-elegant"
          >
            <iframe
              title="Wedding venue"
              className="h-80 w-full md:h-full min-h-[350px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 rounded-3xl border border-gold/40 bg-ivory/90 p-8 shadow-elegant flex flex-col justify-between card-glow-hover"
          >
            <div>
              <h3 className="font-serif text-3xl text-primary">Wedding Ceremony</h3>
              <p className="mt-1 script text-3xl gold-text">Cloud 9 Hills Resort</p>
              <div className="mt-6 space-y-4 text-foreground/85">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 shrink-0 text-primary" size={18} />
                  <p className="font-serif tracking-wide text-base leading-relaxed">{address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 shrink-0 text-primary" size={18} />
                  <p className="font-serif tracking-wide text-base">{`12th November 2026 \u00B7 2:07 PM onwards`}</p>
                </div>
              </div>
            </div>
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 32px -8px color-mix(in oklab, var(--gold) 55%, transparent)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.3em] text-primary-foreground shadow-elegant"
            >
              Get Directions
            </motion.a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
