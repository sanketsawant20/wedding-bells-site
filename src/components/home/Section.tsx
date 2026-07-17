import React from "react";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { Divider } from "@/components/Mandala";

export function Section({
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

export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
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
