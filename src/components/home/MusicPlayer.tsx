import React, { useEffect, useRef } from "react";
import weddingSong from "@/assets/Saiyaara (Reprise - Female Version) Lyrics - Shreya Ghoshal, Faheem Abdullah.mp3";

interface MusicPlayerProps {
  autoPlay: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
        .catch((error) => console.log("Autoplay was prevented:", error));
    }
  }, [autoPlay]);

  return (
    <audio ref={audioRef} src={weddingSong} loop preload="auto" />
  );
};
