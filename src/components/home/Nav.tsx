import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { X, Menu } from "lucide-react";
import { NAV } from "@/lib/constants";
import apLogo from "@/assets/ap-logo.png";
import { useIsVIP } from "@/hooks/useIsVIP";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isVIP = useIsVIP();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleNav = NAV.filter((n) => {
    if (n.id === "haldi" || n.id === "sangeet") {
      return isVIP;
    }
    return true;
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-md shadow-[0_1px_0_0] shadow-gold/30"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2">
          <img src={apLogo} alt="A & P" className="h-12 w-auto object-contain" />
        </a>
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {visibleNav.map((n, i) => (
            <motion.a
              key={n.id}
              href={`#${n.id}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + i * 0.07,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="text-sm uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </motion.a>
          ))}
        </nav>
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="lg:hidden inline-flex items-center justify-center rounded-full border border-gold/40 bg-ivory/80 p-2 text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden mx-4 mb-4 rounded-2xl border border-gold/30 bg-ivory/95 backdrop-blur p-4 shadow-elegant"
          >
            <ul className="flex flex-col gap-3">
              {visibleNav.map((n) => (
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
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold via-gold-soft to-maroon"
      />
    </motion.header>
  );
}
