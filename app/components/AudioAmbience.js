"use client";
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- NEW: Set volume on mount ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Sets volume to 20%
    }
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Optional: Ensure volume is set before playing
      audioRef.current.volume = 0.2; 
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 mix-blend-difference">
      <audio ref={audioRef} loop src="/ambienceost.mp3" /> 
      
      {isPlaying && (
        <div className="flex items-end gap-1 h-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#C5A059]"
              animate={{ height: ["20%", "100%", "20%"] }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                delay: i * 0.1,
                ease: "linear" 
              }}
            />
          ))}
        </div>
      )}

      <button 
        onClick={toggleAudio}
        className="text-[#C5A059] hover:text-white transition-colors p-2 border border-[#C5A059]/30 rounded-full"
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  );
}