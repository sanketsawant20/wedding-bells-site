import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ChevronDown,
  Flower2,
  Music4,
  Sparkles,
  MapPin,
  Phone,
  Heart,
  X,
  Menu,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import coupleImg from "@/assets/couple.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import { Mandala, Divider } from "@/components/Mandala";

export const Route = createFileRoute("/")({
  component: WeddingPage,
});

const WEDDING_DATE = new Date("2026-12-15T18:00:00+05:30");

const NAV = [
  { id: "home", label: "Home" },
  { id: "story", label: "Story" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
  { id: "location", label: "Location" },
];

const EVENTS = [
  {
    name: "Haldi",
    icon: Flower2,
    date: "10th December 2026",
    time: "10:00 AM",
    venue: "Family Residence, Udaipur",
    blurb: "A joyful morning of turmeric, laughter, and blessings.",
  },
  {
    name: "Sangeet",
    icon: Music4,
    date: "12th December 2026",
    time: "7:00 PM",
    venue: "Grand Lawns, Udaipur",
    blurb: "An evening of music, dance and dazzling performances.",
  },
  {
    name: "Wedding Ceremony",
    icon: Sparkles,
    date: "15th December 2026",
    time: "6:00 PM",
    venue: "Lake Palace Gardens, Udaipur",
    blurb: "The seven sacred vows, under a canopy of stars.",
  },
];

const GALLERY = [g1, g4, g3, g2, g6, g5];

function useCountdown(target: Date) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className ?? ""}`}>
      {children}
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <motion.div
      className="text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {eyebrow && (
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-accent-foreground/70">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl sm:text-5xl md:text-6xl text-primary">{title}</h2>
      <Divider />
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-md shadow-[0_1px_0_0] shadow-gold/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2">
          <span className="script text-2xl text-primary">R &amp; A</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full border border-gold/40 bg-ivory/80 p-2 text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mx-4 mb-4 rounded-2xl border border-gold/30 bg-ivory/95 backdrop-blur p-4 shadow-elegant"
          >
            <ul className="flex flex-col gap-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-center text-sm uppercase tracking-[0.25em] text-foreground/80 hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-center"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/40 to-ivory" />
      </div>

      <Mandala className="absolute -left-24 top-24 h-80 w-80 text-maroon/15 float-slow" />
      <Mandala className="absolute -right-24 bottom-16 h-96 w-96 text-gold/25 float-slow" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-xs sm:text-sm uppercase tracking-[0.5em] text-primary/80"
        >
          Together with their families
        </motion.p>
        <motion.h1
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 leading-[0.9]"
        >
          <span className="script block text-7xl sm:text-8xl md:text-[9rem] gold-text drop-shadow-[0_2px_0_rgba(0,0,0,0.05)]">
            Riya
          </span>
          <span className="my-2 block font-serif text-2xl sm:text-3xl text-primary/70 italic">
            &amp; we invite you to celebrate &amp;
          </span>
          <span className="script block text-7xl sm:text-8xl md:text-[9rem] gold-text">
            Arjun
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <Divider className="w-56 !my-2" />
          <p className="font-serif text-2xl sm:text-3xl text-primary tracking-wide">
            15 · December · 2026
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-foreground/70">
            Udaipur · Rajasthan
          </p>
        </motion.div>

        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-primary/70 hover:text-primary"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown className="mt-1 animate-bounce" size={18} />
        </motion.a>
      </div>
    </section>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <Section id="countdown" className="!py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-maroon-deep via-maroon to-maroon-deep p-8 sm:p-12 text-ivory shadow-elegant">
          <Mandala className="absolute -right-16 -top-16 h-64 w-64 text-gold/20" />
          <Mandala className="absolute -left-20 -bottom-20 h-72 w-72 text-gold/15" />
          <p className="text-center text-xs uppercase tracking-[0.5em] text-gold-soft">
            Counting the moments until
          </p>
          <h3 className="script mt-3 text-center text-5xl sm:text-6xl gold-text">
            we say forever
          </h3>
          <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6">
            {items.map((it) => (
              <div
                key={it.label}
                className="rounded-2xl border border-gold/30 bg-ivory/[0.06] backdrop-blur px-2 py-5 sm:py-8 text-center"
              >
                <div className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tabular-nums">
                  {String(it.value).padStart(2, "0")}
                </div>
                <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-soft">
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

function Story() {
  return (
    <Section id="story">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="How it began" title="Our Little Story" />
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/30 to-blush/50 blur-xl" />
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-elegant">
              <img
                src={coupleImg}
                alt="Riya and Arjun"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1200}
                height={1400}
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5 font-serif text-lg leading-relaxed text-foreground/85"
          >
            <p>
              It started, as many stories do, over a cup of chai on a rainy Bombay afternoon
              in 2021. A shared table, a stolen glance, and a conversation that outlasted
              the monsoon downpour outside.
            </p>
            <p>
              Somewhere between weekend road trips to the Sahyadris, endless voice notes,
              and Riya's absolute refusal to like Arjun's playlists, we knew this was it —
              the easy kind of love, the kind that feels like coming home.
            </p>
            <p>
              Five years, one very small proposal by the sea, and a lifetime of dreams
              later — we're saying <em>I do</em> in the city of lakes, surrounded by the
              people who made us who we are. We can't wait to see you there.
            </p>
            <p className="script text-3xl gold-text">— Riya &amp; Arjun</p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Events() {
  return (
    <Section id="events" className="bg-blush/40">
      <Mandala className="absolute right-0 top-10 h-72 w-72 text-maroon/10 pointer-events-none" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle eyebrow="Save the dates" title="Wedding Events" />
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-gold to-transparent md:left-1/2 md:block" />
          <ul className="space-y-10">
            {EVENTS.map((ev, i) => {
              const Icon = ev.icon;
              const alignRight = i % 2 === 1;
              return (
                <motion.li
                  key={ev.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                    alignRight ? "md:[&>*:first-child]:col-start-2" : ""
                  }`}
                >
                  <div
                    className={`relative rounded-3xl border border-gold/40 bg-ivory/90 backdrop-blur p-6 sm:p-8 shadow-elegant ${
                      alignRight ? "md:text-right" : ""
                    }`}
                  >
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-maroon-deep shadow-gold ${
                        alignRight ? "md:ml-auto" : ""
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-3xl text-primary">{ev.name}</h3>
                    <p className="mt-1 italic text-foreground/70">{ev.blurb}</p>
                    <div className="mt-5 grid gap-2 text-sm text-foreground/85">
                      <div className="flex items-center gap-2 md:justify-start"
                        style={{ justifyContent: alignRight ? "flex-end" : undefined }}>
                        <span className="uppercase tracking-[0.25em] text-xs text-accent-foreground/70">
                          When
                        </span>
                        <span>· {ev.date} · {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2"
                        style={{ justifyContent: alignRight ? "flex-end" : undefined }}>
                        <span className="uppercase tracking-[0.25em] text-xs text-accent-foreground/70">
                          Where
                        </span>
                        <span>· {ev.venue}</span>
                      </div>
                    </div>
                    <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-ivory md:block"
                      style={{
                        left: alignRight ? "-1.75rem" : "auto",
                        right: alignRight ? "auto" : "-1.75rem",
                      }}
                    />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <Section id="gallery">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Moments" title="Photo Gallery" />
        <div className="columns-2 gap-4 md:columns-3 [column-fill:_balance]">
          {GALLERY.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-gold/30 shadow-elegant transition-transform duration-300 hover:-translate-y-1 hover:shadow-gold"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full transition-transform duration-500 hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-deep/85 backdrop-blur p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              className="absolute right-6 top-6 rounded-full border border-gold/50 bg-ivory/10 p-2 text-ivory hover:bg-ivory/20"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <motion.img
              key={active}
              src={GALLERY[active]}
              alt=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl border border-gold/40 shadow-elegant"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

const EVENT_OPTIONS = ["Haldi", "Sangeet", "Wedding Ceremony"];

function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    attending: "yes",
    events: [] as string[],
    message: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleEvent = (name: string) =>
    setForm((f) =>
      f.events.includes(name)
        ? { ...f, events: f.events.filter((e) => e !== name) }
        : { ...f, events: [...f.events, name] },
    );

  return (
    <Section id="rsvp" className="bg-gradient-to-b from-transparent via-blush/30 to-transparent">
      <div className="mx-auto max-w-3xl px-6">
        <SectionTitle eyebrow="With love, please reply by 1st November" title="RSVP" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-gold/40 bg-ivory/95 p-6 sm:p-10 shadow-elegant"
        >
          <Mandala className="absolute -right-16 -bottom-16 h-56 w-56 text-gold/15 pointer-events-none" />
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center"
              >
                <Heart className="mx-auto text-primary" size={40} />
                <h3 className="mt-4 font-serif text-4xl text-primary">Thank you!</h3>
                <p className="mt-2 text-foreground/80">
                  Your response has been noted. We can't wait to celebrate with you,{" "}
                  <span className="font-medium text-primary">{form.name || "friend"}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", guests: "1", attending: "yes", events: [], message: "" });
                  }}
                  className="mt-6 text-sm uppercase tracking-[0.25em] text-primary underline-offset-4 hover:underline"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-5"
              >
                <Field label="Full Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rsvp-input"
                    placeholder="Your name"
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Number of Guests">
                    <input
                      required
                      type="number"
                      min={1}
                      max={10}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="rsvp-input"
                    />
                  </Field>
                  <Field label="Attending">
                    <select
                      value={form.attending}
                      onChange={(e) => setForm({ ...form, attending: e.target.value })}
                      className="rsvp-input"
                    >
                      <option value="yes">Joyfully accepts</option>
                      <option value="no">Regretfully declines</option>
                    </select>
                  </Field>
                </div>
                <Field label="Which events will you attend?">
                  <div className="flex flex-wrap gap-2">
                    {EVENT_OPTIONS.map((ev) => {
                      const active = form.events.includes(ev);
                      return (
                        <button
                          type="button"
                          key={ev}
                          onClick={() => toggleEvent(ev)}
                          className={`rounded-full border px-4 py-2 text-sm transition-all ${
                            active
                              ? "border-primary bg-primary text-primary-foreground shadow-gold"
                              : "border-gold/50 bg-ivory text-foreground/80 hover:border-primary/60"
                          }`}
                        >
                          {ev}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label="Message for the couple">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="rsvp-input resize-none"
                    placeholder="Send us your wishes…"
                  />
                </Field>
                <button
                  type="submit"
                  className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold px-8 py-4 font-serif text-lg uppercase tracking-[0.3em] text-maroon-deep shadow-gold transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Send RSVP</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`
        .rsvp-input {
          width: 100%;
          background: color-mix(in oklab, var(--ivory) 92%, transparent);
          border: 1px solid color-mix(in oklab, var(--gold) 55%, transparent);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-family: var(--font-sans);
          color: var(--foreground);
          transition: border-color .2s, box-shadow .2s;
        }
        .rsvp-input:focus {
          outline: none;
          border-color: var(--maroon);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--gold) 40%, transparent);
        }
      `}</style>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-accent-foreground/80">
        {label}
      </span>
      {children}
    </label>
  );
}

function Location() {
  const address = "Lake Palace Gardens, Pichola, Udaipur, Rajasthan 313001";
  const mapsUrl = useMemo(
    () => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
    [],
  );
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
              className="h-80 w-full md:h-full"
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
            className="md:col-span-2 rounded-3xl border border-gold/40 bg-ivory/90 p-8 shadow-elegant"
          >
            <h3 className="font-serif text-3xl text-primary">Wedding Ceremony</h3>
            <p className="mt-1 script text-3xl gold-text">Lake Palace Gardens</p>
            <div className="mt-6 space-y-4 text-foreground/85">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-primary" size={18} />
                <p>{address}</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 shrink-0 text-primary" size={18} />
                <div>
                  <p>Riya's family: +91 98200 12345</p>
                  <p>Arjun's family: +91 98200 67890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 shrink-0 text-primary" size={18} />
                <p>15th December 2026 · 6:00 PM onwards</p>
              </div>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.3em] text-primary-foreground shadow-elegant transition-transform hover:scale-105"
            >
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-deep py-16 text-ivory">
      <Mandala className="absolute -left-24 -top-24 h-72 w-72 text-gold/15" />
      <Mandala className="absolute -right-24 -bottom-24 h-80 w-80 text-gold/10" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Divider className="!text-gold" />
        <h3 className="script mt-4 text-6xl sm:text-7xl gold-text">Riya &amp; Arjun</h3>
        <p className="mt-4 font-serif text-lg text-ivory/85">
          Thank you for being part of our story. Your presence, prayers and blessings
          mean the world to us.
        </p>
        <Divider className="!text-gold" />
        <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-soft">
          Made with <span className="text-gold">♥</span> in Udaipur · 2026
        </p>
      </div>
    </footer>
  );
}

function WeddingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Countdown />
      <Story />
      <Events />
      <Gallery />
      <RSVP />
      <Location />
      <Footer />
    </main>
  );
}
