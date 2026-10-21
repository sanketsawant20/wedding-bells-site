import { useState, type FormEvent, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Check, Clock } from "lucide-react";
import { Section, SectionTitle } from "./Section";
import { Mandala } from "@/components/Mandala";
import { fadeUp } from "@/lib/animations";
import { useIsVIP } from "@/hooks/useIsVIP";
import { calendarDaysUntil, useNow } from "@/hooks/useCountdown";
import { RSVP_DEADLINE, visibleEventsFor } from "@/lib/constants";

// ── Lightweight canvas confetti ──────────────────────────────────────────────
const COLORS = ["#c9a84c", "#e8d4a0", "#6b1a1a", "#f0c0c0", "#fff8f0"];

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 3,
      d: Math.random() * 3 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.07 + 0.02,
      angle: 0,
      opacity: 1,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      pieces.forEach((p) => {
        p.angle += p.tiltSpeed;
        p.tilt = Math.sin(p.angle) * 12;
        p.y += p.d + 1.5;
        p.x += Math.sin(frame / 40);
        p.opacity = Math.max(0, p.opacity - 0.004);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.4, (p.tilt * Math.PI) / 180, 0, 2 * Math.PI);
        ctx.fill();
      });
      if (pieces.some((p) => p.opacity > 0)) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ display: active ? "block" : "none" }}
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────

const toRsvpEvents = (isVIP: boolean) =>
  visibleEventsFor(isVIP).map((ev) => ({
    name: ev.name,
    date: `${ev.shortDate} · ${ev.time}`,
    venue: ev.city,
  }));

function DeadlineBadge() {
  const now = useNow();
  if (now === null) return null;

  const daysLeft = calendarDaysUntil(RSVP_DEADLINE, now);
  if (daysLeft < 0) return null;

  return (
    <div className="-mt-2 mb-8 flex justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory/90 px-4 py-1.5 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-primary shadow-sm">
        <Clock size={13} className="text-gold" />
        {daysLeft === 0
          ? "Last day to reply"
          : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left to reply`}
      </span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-bold pl-1">
        {label}
      </span>
      {children}
    </div>
  );
}

export function RSVP() {
  const isVIP = useIsVIP();
  const availableEvents = toRsvpEvents(isVIP);
  const availableNames = availableEvents.map((e) => e.name);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    attending: "yes",
    events: ["Wedding Ceremony", "Wedding Reception"] as string[],
    message: "",
  });

  useEffect(() => {
    setForm((f) => ({
      ...f,
      events: toRsvpEvents(isVIP).map((e) => e.name),
    }));
  }, [isVIP]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submittedEvents =
      form.attending === "yes" ? (form.events.length > 0 ? form.events : availableNames) : [];

    const formData = new FormData();
    formData.append("entry.1099816419", form.name);
    formData.append("entry.1954327725", form.guests);
    formData.append("entry.981178490", form.attending);
    formData.append("entry.2097524413", submittedEvents.join(", "));
    formData.append("entry.847179712", form.message);

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSe3iMeg6dE7xhB5rozSDINLpRuWIS_NTXitOId_eypjLIkt9g/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const toggleEvent = (name: string) =>
    setForm((f) =>
      f.events.includes(name)
        ? { ...f, events: f.events.filter((e) => e !== name) }
        : { ...f, events: [...f.events, name] },
    );

  return (
    <Section
      id="rsvp"
      className="bg-gradient-to-b from-transparent via-blush/20 to-transparent !py-20"
    >
      <Confetti active={submitted} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle eyebrow="With love, please reply by 1st November" title="RSVP" />
        <DeadlineBadge />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-gold/30 bg-ivory/80 backdrop-blur-md p-5 sm:p-12 shadow-elegant"
        >
          {/* Decorative Corner Mandala */}
          <Mandala className="absolute -right-16 -bottom-16 h-56 w-56 text-gold/15 pointer-events-none -z-10" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 animate-pulse">
                  <Heart size={32} fill="currentColor" />
                </div>
                <h3 className="font-serif text-4xl text-primary mb-3">Thank You!</h3>
                <p className="text-foreground/85 max-w-md mx-auto text-base sm:text-lg">
                  Your response has been noted. We can't wait to celebrate with you,{" "}
                  <span className="font-bold text-primary">{form.name || "friend"}</span>!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      guests: "1",
                      attending: "yes",
                      events: availableNames,
                      message: "",
                    });
                  }}
                  className="mt-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary underline decoration-gold/50 underline-offset-8 hover:decoration-primary transition-all cursor-pointer"
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
                className="grid gap-6 sm:gap-8"
              >
                {/* Full Name */}
                <Field label="Full Name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rsvp-input"
                    placeholder="Enter your name"
                  />
                </Field>

                {/* Grid Inputs */}
                <div className="grid gap-6 sm:grid-cols-2">
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

                  <Field label={isVIP ? "Attending status" : "Will you be attending?"}>
                    <select
                      value={form.attending}
                      onChange={(e) => setForm({ ...form, attending: e.target.value })}
                      className="rsvp-input cursor-pointer"
                    >
                      {isVIP ? (
                        <>
                          <option value="yes">Joyfully accepts</option>
                          <option value="no">Regretfully declines</option>
                        </>
                      ) : (
                        <>
                          <option value="yes">Yes, I'll be there!</option>
                          <option value="no">Regretfully declines</option>
                        </>
                      )}
                    </select>
                  </Field>
                </div>

                {/* Event Attendance Checkboxes/Cards */}
                {form.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Field label="Which events will you attend? (Tap to select)">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1.5">
                        {availableEvents.map((ev) => {
                          const active = form.events.includes(ev.name);
                          return (
                            <button
                              type="button"
                              key={ev.name}
                              onClick={() => toggleEvent(ev.name)}
                              aria-pressed={active}
                              className={`flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition-all duration-200 border-2 touch-manipulation cursor-pointer select-none active:scale-[0.98] ${
                                active
                                  ? "bg-maroon-deep text-ivory border-gold shadow-md"
                                  : "bg-white/95 text-foreground border-gold/40 hover:border-gold hover:bg-white shadow-sm"
                              }`}
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-serif text-base sm:text-lg font-bold tracking-wide leading-tight">
                                  {ev.name}
                                </span>
                                <span
                                  className={`text-xs font-semibold tracking-wide mt-1 ${
                                    active ? "text-gold-soft" : "text-primary/80"
                                  }`}
                                >
                                  {ev.date} · {ev.venue}
                                </span>
                              </div>
                              <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                                  active
                                    ? "bg-gold border-gold text-maroon-deep shadow-sm"
                                    : "border-primary/40 bg-white/80"
                                }`}
                              >
                                {active && <Check size={14} strokeWidth={3} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      {form.events.length === 0 && (
                        <p className="text-xs text-primary font-medium mt-1.5 pl-1 italic">
                          Please select at least one event you'll be attending.
                        </p>
                      )}
                    </Field>
                  </motion.div>
                )}

                {/* Message */}
                <Field label="Message for the couple">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="rsvp-input resize-none"
                    placeholder="Write a message or warm wishes..."
                  />
                </Field>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative mt-4 inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold px-8 py-4 font-serif text-base sm:text-lg uppercase tracking-[0.3em] text-maroon-deep shadow-elegant transition-all duration-300 hover:scale-[1.01] hover:shadow-gold disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative font-semibold">
                    {submitting ? "Sending Response..." : "Send RSVP"}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .rsvp-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.85);
          border: 1.5px solid rgba(180, 140, 80, 0.35);
          border-radius: 0.75rem;
          padding: 0.85rem 1.15rem;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--foreground);
          font-weight: 500;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .rsvp-input:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(180, 140, 80, 0.55);
        }
        .rsvp-input:focus {
          outline: none;
          background: #ffffff;
          border-color: var(--maroon);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--gold) 30%, transparent), 0 2px 6px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </Section>
  );
}
