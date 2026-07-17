import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import heroCard from "@/assets/hero-card.jpg";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroCard})`
      }}
    >
      {/* Subtle overlay if they want to darken it, but keeping it fully transparent so the card details are 100% clear */}
      <div className="absolute inset-0 bg-black/5 -z-10" />

      {/* Scroll Indicator */}
      <motion.a
        href="#countdown"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-primary/80 hover:text-primary transition-colors z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] font-semibold">Scroll</span>
        <ChevronDown className="mt-1 animate-bounce drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]" size={20} />
      </motion.a>
    </section>
  );
}
