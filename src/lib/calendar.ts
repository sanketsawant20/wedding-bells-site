import type { WeddingEvent } from "./constants";

const TITLE_PREFIX = "Pranav & Ashwini";

// 20261112T083000Z
const toCalStamp = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

function range(ev: WeddingEvent) {
  const start = new Date(ev.start);
  const end = new Date(start.getTime() + ev.durationHours * 60 * 60 * 1000);
  return { start: toCalStamp(start), end: toCalStamp(end) };
}

export function googleCalendarUrl(ev: WeddingEvent) {
  const { start, end } = range(ev);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${TITLE_PREFIX} · ${ev.name}`,
    dates: `${start}/${end}`,
    details: ev.blurb,
    location: ev.venue,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function downloadIcs(ev: WeddingEvent) {
  const { start, end } = range(ev);
  const escape = (s: string) => s.replace(/[\,;]/g, (m) => `\${m}`);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pranav & Ashwini//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}-${start}@pranav-ashwini`,
    `DTSTAMP:${toCalStamp(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escape(`${TITLE_PREFIX} · ${ev.name}`)}`,
    `DESCRIPTION:${escape(ev.blurb)}`,
    `LOCATION:${escape(ev.venue)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escape(ev.name)} starts in 2 hours`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
