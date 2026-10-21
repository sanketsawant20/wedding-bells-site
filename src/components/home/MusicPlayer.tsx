import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Music } from "lucide-react";
import weddingSong from "@/assets/Saiyaara (Reprise - Female Version) Lyrics - Shreya Ghoshal, Faheem Abdullah.mp3";

interface MusicPlayerProps {
  autoPlay: boolean;
}

const BARS = [0.9, 0.6, 1, 0.75];

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch((error) => console.log("Autoplay was prevented:", error));
    }
  }, [autoPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingSong}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <AnimatePresence>
        {autoPlay && (
          <motion.button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause music" : "Play music"}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-gold/60 bg-maroon-deep/90 backdrop-blur text-gold shadow-elegant cursor-pointer"
          >
            {playing && <span className="absolute inset-0 rounded-full ring-pulse" />}
            {playing ? (
              <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
                {BARS.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-gold"
                    animate={{ height: ["30%", `${h * 100}%`, "30%"] }}
                    transition={{ duration: 0.9 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </span>
            ) : (
              <Music size={20} />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
