import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { EnvelopeIntro } from "@/components/home/EnvelopeIntro";
import { MusicPlayer } from "@/components/home/MusicPlayer";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { Events } from "@/components/home/Events";
import { RSVP } from "@/components/home/RSVP";
import { Location } from "@/components/home/Location";
import { Footer } from "@/components/home/Footer";

export const Route = createFileRoute("/")({
  component: WeddingPage,
});

function WeddingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && <EnvelopeIntro key="envelope" onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      <MusicPlayer autoPlay={isOpen} />

      <main className="relative overflow-x-hidden space-y-12 sm:space-y-16">
        <Nav />
        <Hero />
        <Countdown />
        <Events />
        <RSVP />
        <Location />
        <Footer />
      </main>
    </>
  );
}
