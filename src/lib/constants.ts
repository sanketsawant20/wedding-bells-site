import { Flower2, Music4, PartyPopper, Sparkles } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const WEDDING_DATE = new Date("2026-11-12T13:00:00+05:30");
export const RSVP_DEADLINE = new Date("2026-11-01T23:59:59+05:30");

export const NAV = [
  { id: "home", label: "Home" },
  { id: "schedule", label: "Schedule" },
  { id: "haldi", label: "Haldi" },
  { id: "sangeet", label: "Sangeet" },
  { id: "wedding-ceremony", label: "Wedding" },
  { id: "reception", label: "Reception" },
  { id: "rsvp", label: "RSVP" },
  { id: "location", label: "Location" },
];

export type WeddingEvent = (typeof EVENTS)[number];

// Single source of truth for every event — Events, Schedule, RSVP and calendar links read from here.
export const EVENTS = [
  {
    id: "haldi",
    vipOnly: true,
    name: "Haldi",
    icon: Sparkles,
    date: "11th November 2026",
    shortDate: "11 Nov",
    time: "01:00 PM",
    start: "2026-11-11T13:00:00+05:30",
    durationHours: 3,
    city: "Lonavala",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "A joyful day of turmeric, laughter, and blessings.",
    eyebrow: "Pre-Wedding Ritual",
  },
  {
    id: "sangeet",
    vipOnly: true,
    name: "Sangeet",
    icon: Music4,
    date: "11th November 2026",
    shortDate: "11 Nov",
    time: "07:00 PM",
    start: "2026-11-11T19:00:00+05:30",
    durationHours: 4,
    city: "Lonavala",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "An evening of music, dance and dazzling performances.",
    eyebrow: "Pre-Wedding Celebration",
  },
  {
    id: "wedding-ceremony",
    vipOnly: false,
    name: "Wedding Ceremony",
    icon: Flower2,
    date: "12th November 2026",
    shortDate: "12 Nov",
    time: "01:00 PM",
    start: "2026-11-12T13:00:00+05:30",
    durationHours: 4,
    city: "Lonavala",
    venue: "Cloud 9 Hills Resort, Lonavala",
    blurb: "A sacred union inspired by compassion, wisdom, and harmony.",
    eyebrow: "The Main Ceremony",
  },
  {
    id: "reception",
    vipOnly: false,
    name: "Wedding Reception",
    icon: PartyPopper,
    date: "15th November 2026",
    shortDate: "15 Nov",
    time: "06:00 PM",
    start: "2026-11-15T18:00:00+05:30",
    durationHours: 4,
    city: "Pune",
    venue: "Siddharth Gautam Buddha Udyan, Mahatma Phulenagar, Chinchwad, Pune – 411019",
    blurb: "An evening of love, laughter, and good food with the ones we cherish.",
    eyebrow: "The Celebration Continues",
  },
];

export const visibleEventsFor = (isVIP: boolean) => EVENTS.filter((ev) => isVIP || !ev.vipOnly);

export const GALLERY = [g1, g4, g3, g2, g6, g5];
