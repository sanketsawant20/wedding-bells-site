import React, { useState } from "react";
import { motion } from "motion/react";
import envelopeImg from "@/assets/envelope.jpeg";
import buttonImg from "@/assets/button.png";

interface EnvelopeIntroProps {
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Wait for the animation to complete before removing the overlay
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blush via-ivory to-gold-soft">
      {/* Decorative Emojis */}
      <div className="absolute top-8 left-8 text-6xl opacity-20 select-none animate-bounce" style={{ animationDuration: '4s' }}>🌸</div>
      <div className="absolute top-8 right-8 text-6xl opacity-20 select-none animate-bounce" style={{ animationDuration: '4.5s' }}>✨</div>
      <div className="absolute bottom-8 left-8 text-6xl opacity-20 select-none animate-bounce" style={{ animationDuration: '5s' }}>✨</div>
      <div className="absolute bottom-8 right-8 text-6xl opacity-20 select-none animate-bounce" style={{ animationDuration: '3.5s' }}>🌸</div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isOpening ? { 
          opacity: 0, 
          scale: 1.1,
          transition: { duration: 1.2, ease: "easeInOut" }
        } : { 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.8 }
        }}
        className="relative w-full h-screen flex items-center justify-center"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Envelope Image */}
          <motion.img 
            src={envelopeImg} 
            alt="Envelope"
            animate={isOpening ? { 
              scale: 1.1, 
              rotate: -2,
              filter: "blur(2px)",
              opacity: 0
            } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full object-cover md:object-contain drop-shadow-2xl"
          />

          {/* Wax Seal / Open Button */}
          <motion.button 
            onClick={handleOpen}
            disabled={isOpening}
            animate={isOpening ? { 
              scale: [1, 1.3, 0],
              rotate: [5, -15, 45],
              opacity: [1, 1, 0]
            } : { 
              scale: [1, 1.05, 1],
              rotate: 5
            }}
            transition={isOpening ? { 
              duration: 1.0,
              ease: "easeInOut"
            } : {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-54 md:h-54 w-64 h-64 mt-2 flex items-center justify-center cursor-pointer focus:outline-none z-10"
            tabIndex={0}
          >
            <img 
              src={buttonImg} 
              alt="Open" 
              className="w-full h-full object-contain filter drop-shadow-lg hover:brightness-110 transition-all duration-300"
            />
          </motion.button>

          {/* Invitation Texts */}
          <motion.div 
            animate={isOpening ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center px-4 w-full"
          >
            <h2 className="script text-5xl md:text-7xl text-maroon-deep drop-shadow-md">
              You’re Invited
            </h2>
            <p className="font-serif text-lg md:text-xl text-maroon-deep/80 mt-4 tracking-wider font-semibold">
              Tap to open your invitation
            </p>
          </motion.div>

          {/* Decorative Horizontal Lines */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-gold-soft to-transparent opacity-30"></div>
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-gold-soft to-transparent opacity-30"></div>
        </div>
      </motion.div>
    </div>
  );
};
