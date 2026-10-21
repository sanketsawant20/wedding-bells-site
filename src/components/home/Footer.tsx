import { Mandala, Divider } from "@/components/Mandala";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-deep py-16 text-ivory">
      <Mandala className="absolute -left-24 -top-24 h-72 w-72 text-gold/15" />
      <Mandala className="absolute -right-24 -bottom-24 h-80 w-80 text-gold/10" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Divider className="!text-gold" />
        <h3 className="script mt-4 text-6xl sm:text-7xl gold-text">Pranav &amp; Ashwini</h3>
        <p className="mt-4 font-serif text-lg text-ivory/85">
          Thank you for being part of our story. Your presence, prayers and blessings mean the world
          to us.
        </p>
        <Divider className="!text-gold" />
        <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold-soft">
          Made with <span className="text-gold">♥</span> in Lonavala · 2026
        </p>
      </div>
    </footer>
  );
}
