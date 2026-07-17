import { Flower2, Music4, Sparkles } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const WEDDING_DATE = new Date("2026-11-12T14:00:00+05:30");

export const NAV = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
  { id: "location", label: "Location" },
];

export const EVENTS = [
  {
    name: "Mehendi",
    icon: Flower2,
    date: "11th November 2026",
    time: "4:00 PM",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "Staining hands with love, laughter, and beautiful henna patterns.",
  },
  {
    name: "Haldi",
    icon: Sparkles,
    date: "12th November 2026",
    time: "11:00 AM",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "A joyful morning of turmeric, laughter, and blessings.",
  },
  {
    name: "Sangeet",
    icon: Music4,
    date: "12th November 2026",
    time: "7:00 PM",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "An evening of music, dance and dazzling performances.",
  },
  {
    name: "Wedding Ceremony",
    icon: Flower2,
    date: "13th November 2026",
    time: "02:07 PM",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "The seven sacred vows, under a canopy of stars.",
  },
];

export const GALLERY = [g1, g4, g3, g2, g6, g5];

