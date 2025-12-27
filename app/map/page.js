// app/map/page.js
"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, X } from 'lucide-react';

// --- DATA: The "Sites of Grace" ---
const LOCATIONS = [
  { id: 1, x: 30, y: 40, title: "The Weeping Peninsula", desc: "A land of constant rain and sorrow. The local knights have all gone mad.", level: "Recommended Lvl: 10-20" },
  { id: 2, x: 60, y: 25, title: "Crumbling Farum Azula", desc: "A city suspended in time and storm, home to the ancient dragonlords.", level: "Recommended Lvl: 100+" },
  { id: 3, x: 50, y: 70, title: "Leyndell, Royal Capital", desc: "The golden heart of the world, buried under ash and history.", level: "Recommended Lvl: 80-90" },
];

export default function MapPage() {
  const [activePin, setActivePin] = useState(null);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-sm">
      
      {/* UI Overlay */}
      <div className="absolute top-32 left-10 z-30 max-w-sm pointer-events-none">
        <h1 className="text-4xl font-serif text-[#C5A059] mb-2">Cartography</h1>
        <p className="text-sm text-gray-500">
          Touch a grace to recall its memory.
        </p>
      </div>

      {/* THE MAP CONTAINER */}
      <div className="relative w-[90%] h-[80%] border border-[#333] bg-[#111] overflow-hidden rounded-sm shadow-2xl shadow-black">
        
        {/* Background Texture (Abstract Map) */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542259681-d4cd71b3dc9c?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125" />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />

        {/* PINS */}
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActivePin(loc)}
            className="absolute group z-20 focus:outline-none"
            style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
          >
            {/* The Pulse Effect */}
            <div className="absolute -inset-4 bg-[#C5A059] rounded-full opacity-0 group-hover:opacity-20 animate-ping" />
            
            {/* The Icon */}
            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border border-[#C5A059] transition-all duration-500 ${activePin?.id === loc.id ? 'bg-[#C5A059] text-black' : 'bg-black text-[#C5A059]'}`}>
              <MapPin size={16} />
            </div>
            
            {/* Label (Hidden unless hovered) */}
            <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {loc.title}
            </span>
          </button>
        ))}

        {/* ACTIVE PIN DETAILS PANEL (Appears on click) */}
        {activePin && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute right-0 top-0 h-full w-full md:w-96 bg-[#0a0a0a]/95 border-l border-[#333] z-40 p-10 flex flex-col justify-center backdrop-blur-md"
          >
            <button 
              onClick={() => setActivePin(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white"
            >
              <X />
            </button>

            <div className="mb-6 w-12 h-1 bg-[#C5A059]" />
            <h2 className="text-3xl font-serif text-[#e5e5e5] mb-4">{activePin.title}</h2>
            <p className="text-[#888] font-light leading-relaxed mb-8">{activePin.desc}</p>
            
            <div className="p-4 border border-[#333] bg-black/50">
              <span className="text-xs text-[#C5A059] uppercase tracking-widest block mb-1">Status</span>
              <span className="text-sm text-gray-300 font-mono">{activePin.level}</span>
            </div>

            <button className="mt-8 py-3 px-6 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-colors duration-300 uppercase text-xs tracking-[0.2em]">
              Travel to Location
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}