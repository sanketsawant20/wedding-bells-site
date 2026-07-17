import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Countdown />
      <Events />
      <RSVP />
      <Location />
      <Footer />
    </main>
  );
}
