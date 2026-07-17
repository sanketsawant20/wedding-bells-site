import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import heroCard from "@/assets/hero-card.jpg";

// Petal / particle config
const PETALS = [
  { left: "8%", delay: 0, dur: 9, size: 18, drift: 55, char: "🌸" },
  { left: "18%", delay: 2.5, dur: 11, size: 14, drift: -40, char: "✨" },
  { left: "30%", delay: 1, dur: 13, size: 22, drift: 70, char: "🌸" },
  { left: "45%", delay: 4, dur: 8, size: 12, drift: -30, char: "✨" },
  { left: "58%", delay: 0.5, dur: 12, size: 20, drift: 50, char: "🌸" },
  { left: "70%", delay: 3, dur: 10, size: 16, drift: -60, char: "✨" },
  { left: "82%", delay: 1.8, dur: 14, size: 24, drift: 45, char: "🌸" },
  { left: "92%", delay: 5, dur: 9.5, size: 13, drift: -35, char: "✨" },
];

// Static twinkle star positions
const TWINKLES = [
  { top: "12%", left: "7%", dur: "2.1s", delay: "0s", size: 10 },
  { top: "20%", left: "88%", dur: "3.2s", delay: "0.8s", size: 14 },
  { top: "65%", left: "5%", dur: "2.8s", delay: "1.4s", size: 8 },
  { top: "75%", left: "91%", dur: "2.4s", delay: "0.3s", size: 12 },
  { top: "40%", left: "95%", dur: "3.5s", delay: "1.1s", size: 9 },
  { top: "55%", left: "3%", dur: "2.0s", delay: "0.6s", size: 11 },
  { top: "30%", left: "93%", dur: "3.0s", delay: "1.7s", size: 7 },
  { top: "85%", left: "12%", dur: "2.6s", delay: "0.2s", size: 13 },
];


export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: image moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-center pt-16 md:pt-0"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-cover md:bg-contain bg-no-repeat bg-[#fdf6ee] [background-position:center_65%] md:bg-center scale-100"
        style={{ backgroundImage: `url(${heroCard})`, y: bgY }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/5 -z-10" />

      {/* Twinkle stars */}
      {TWINKLES.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute select-none text-gold twinkle"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            ["--twinkle-dur" as string]: s.dur,
            ["--twinkle-delay" as string]: s.delay,
          }}
        >
          ✦
        </span>
      ))}

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-0 select-none"
          style={{
            left: p.left,
            fontSize: p.size,
            ["--drift" as string]: `${p.drift}px`,
            animation: `petal-fall ${p.dur}s ${p.delay}s ease-in-out infinite`,
            opacity: 0,
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Scroll Indicator */}
      <motion.a
        href="#countdown"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-primary/80 hover:text-primary transition-colors z-10 group"
      >
        {/* Ring pulse behind the chevron */}
        <span className="relative flex items-center justify-center mb-1">
          <span className="absolute h-8 w-8 rounded-full ring-pulse opacity-0" />
          <span className="text-[10px] uppercase tracking-[0.4em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] font-semibold">
            Scroll
          </span>
        </span>
        <ChevronDown
          className="mt-1 animate-bounce drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] group-hover:scale-125 transition-transform"
          size={20}
        />
      </motion.a>
    </section>
  );
}
