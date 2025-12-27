// app/layout.js
"use client";

import './globals.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// --- IMPORTS ---
import FogBackground from './components/FogBackground';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import AudioAmbience from './components/AudioAmbience';
// --- SHARED COMPONENTS ---

const GraceCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#C5A059] rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-[#C5A059]/30 rounded-full pointer-events-none z-[99]"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />
    </>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const links = [
    { name: 'Sanctuary', path: '/' },
    { name: 'Cartography', path: '/map' },
  ];

  return (
    <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
      <div className="font-serif text-xl tracking-[0.2em] text-[#C5A059] font-bold">Elden Ring</div>
      <div className="flex gap-8 text-sm tracking-widest uppercase text-gray-400">
        {links.map((link) => (
          <Link key={link.path} href={link.path} className="relative group">
            <span className={pathname === link.path ? "text-[#C5A059]" : "hover:text-[#C5A059] transition-colors"}>
              {link.name}
            </span>
            {pathname === link.path && (
              <motion.div layoutId="underline" className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#C5A059]" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-[#a8a29e] overflow-x-hidden selection:bg-[#C5A059] selection:text-black cursor-none">
        
        {/* 1. The Preloader (Runs once) */}
        <Preloader />

        {/* 2. Global Atmos */}
        <AudioAmbience />
        
        <div className="fixed inset-0 z-0 pointer-events-none">
           <FogBackground />
        </div>
        <div className="fixed inset-0 z-[1] opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <GraceCursor />
        <NavBar />

        {/* 3. Smooth Scroll Wrapper */}
        <SmoothScroll>
          <main className="relative z-10 min-h-screen">
              {children}
          </main>
        </SmoothScroll>
        
      </body>
    </html>
  );
}