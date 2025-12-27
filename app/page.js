"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { 
  Trophy, Monitor, Gamepad, Crown, Play, Hexagon, Flame, Zap, Sword, Sparkles, Scroll, Ghost, Shield, Star, Award 
} from 'lucide-react';

// IMPORTS
import MagneticButton from './components/MagneticButton';
import TiltCard from './components/TiltCard';
import useSFX from './hooks/use-sfx';
import GlitchText from './components/GlitchText'; 

// --- UTILITY HELPER ---
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- CONFIGURATION ---
// ⚠️ PUT YOUR FILE IN THE /public FOLDER
// Change type to 'image' if you want to use a static image instead.
const GLOBAL_BG = {
  type: 'image', // 'video' or 'image'
  src: '/background.jpg', // e.g. '/background.mp4' or '/my-wallpaper.jpg'
  opacity: 1 // Adjust how visible the background is
};

// --- DATA ---

const REVIEWS = [
  "IGN: 10/10 - MASTERPIECE", "GAMESPOT: 10/10 - ESSENTIAL", "EDGE: GOLD AWARD", "METACRITIC: 96 - UNIVERSAL ACCLAIM", "THE GUARDIAN: 5/5", "GAME INFORMER: 10/10"
];

// RESTORED USER IMAGES
const DEMIGODS = [
  { id: 1, name: "Malenia", title: "Blade of Miquella", image: "https://esport-facts.com/wp-content/uploads/2024/06/Elden-Ring-Hardest-Bosses-Header-1200x675.webp", color: "#C55959" },
  { id: 2, name: "Radahn", title: "Starscourge", image: "https://jrpgfr.net/wp-content/uploads/2022/04/Starscourge-Radahn-1024x512.jpeg", color: "#596BC5" },
  { id: 3, name: "Morgott", title: "The Omen King", image: "https://sjc1.vultrobjects.com/cucdn/gallery-43/art/er-morgott-the-omen-king-fighting-radahn.jpg", color: "#C5A059" },
  { id: 4, name: "Rykard", title: "Lord of Blasphemy", image: "https://assetsio.gnwcdn.com/elden-ring-rykard.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp", color: "#C55990" },
];

const WEAPONS = [
  { 
    id: 1, name: "Moonveil", type: "Katana", 
    stats: { phys: 40, magic: 85, fire: 0 }, 
    desc: "A katana forged from glintstone. Unleashes a wave of light.",
    image: "/Moonveil.png"
  },
  { 
    id: 2, name: "Rivers of Blood", type: "Katana", 
    stats: { phys: 50, magic: 0, fire: 75 }, 
    desc: "Blade of the Okina. Cursed with a thirst for blood.",
    image: "https://assetsio.gnwcdn.com/elden-ring-rivers-of-blood_xlwbKCj.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
  },
  { 
    id: 3, name: "Dark Moon Greatsword", type: "Greatsword", 
    stats: { phys: 60, magic: 95, fire: 0 }, 
    desc: "A wedding gift from the Lunar Princess Ranni.",
    image: "/Darkmoon.webp"
  }
];

const CLASSES = [
  { id: 1, title: "The Vagabond", subtitle: "Exiled Knight", image: "https://images.unsplash.com/photo-1599707367072-cd6ad6cb3d57?q=80&w=2600&auto=format&fit=crop", desc: "A knight exiled from their homeland to wander. Clad in heavy armor." },
  { id: 2, title: "The Astrologer", subtitle: "Scholar of Stars", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop", desc: "A scholar who reads destiny in the stars. Heir to the glintstone sorceries." },
  { id: 3, title: "The Samurai", subtitle: "Land of Reeds", image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=2690&auto=format&fit=crop", desc: "A capable fighter from the distant Land of Reeds. Handy with katana." },
  { id: 4, title: "The Prisoner", subtitle: "Iron Mask", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2662&auto=format&fit=crop", desc: "A prisoner bound in an iron mask. Studied in glintstone sorcery." },
  { id: 5, title: "The Confessor", subtitle: "Church Spy", image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2669&auto=format&fit=crop", desc: "A church spy adept at covert operations. Equally skilled with a sword." },
  { id: 6, title: "The Hero", subtitle: "Chieftain", image: "https://images.unsplash.com/photo-1505960012224-b1cb30113f84?q=80&w=2574&auto=format&fit=crop", desc: "A stalwart hero, at home with a battleaxe, descended from a badlands chieftain." }
];

// --- COMPONENTS ---

// 1. GLOBAL BACKGROUND (NEW)
const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-10] w-full h-full bg-[#050505]">
      {GLOBAL_BG.type === 'video' ? (
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover grayscale-[50%] brightness-[0.3]"
          style={{ opacity: GLOBAL_BG.opacity }}
        >
          <source src={GLOBAL_BG.src} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={GLOBAL_BG.src} 
          alt="Background" 
          className="w-full h-full object-cover grayscale-[50%] brightness-[0.3]"
          style={{ opacity: GLOBAL_BG.opacity }}
        />
      )}
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />
    </div>
  );
};

const EmberSystem = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#C5A059] rounded-full blur-[1px]"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: [null, Math.random() * -100], 
            opacity: [0, 0.6, 0],
            scale: [0, Math.random() * 2 + 1, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) { directionFactor.current = -1; } 
    else if (velocityFactor.get() > 0) { directionFactor.current = 1; }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0">
      <motion.div className="flex whitespace-nowrap flex-nowrap items-center gap-10" style={{ x }}>
        <span className="block text-6xl md:text-9xl font-serif text-[#1a1a1a] uppercase font-black tracking-tighter opacity-80 stroke-text">{children} </span>
        <span className="block text-6xl md:text-9xl font-serif text-[#1a1a1a] uppercase font-black tracking-tighter opacity-80 stroke-text">{children} </span>
        <span className="block text-6xl md:text-9xl font-serif text-[#1a1a1a] uppercase font-black tracking-tighter opacity-80 stroke-text">{children} </span>
        <span className="block text-6xl md:text-9xl font-serif text-[#1a1a1a] uppercase font-black tracking-tighter opacity-80 stroke-text">{children} </span>
      </motion.div>
    </div>
  );
}

const LoreNode = ({ year, title, text, align = "left" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative w-full md:w-1/2 p-8 backdrop-blur-sm bg-black/20 rounded-md border border-white/5 ${align === "left" ? "md:text-right md:pr-16" : "md:ml-auto md:pl-16 text-left"}`}
    >
      <div className={`absolute top-10 w-4 h-4 bg-[#050505] border-2 border-[#C5A059] rounded-full z-10 
        ${align === "left" ? "right-[-9px] md:right-[-9px]" : "left-[-9px] md:left-[-9px]"}`} 
      >
        <div className="absolute inset-0 bg-[#C5A059] rounded-full animate-ping opacity-50" />
      </div>

      <span className="text-[#C5A059] font-mono text-xs tracking-widest uppercase mb-2 block">{year}</span>
      <h3 className="text-3xl md:text-5xl font-serif text-[#e5e5e5] mb-4">{title}</h3>
      <p className="text-gray-400 font-light leading-relaxed">{text}</p>
    </motion.div>
  );
};

const StatBar = ({ label, value, color, icon: Icon }) => (
  <div className="mb-3">
    <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400 mb-1">
      <div className="flex items-center gap-2"><Icon size={12} /> {label}</div>
      <span>{value}</span>
    </div>
    <div className="h-1 w-full bg-[#222] rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </div>
);

const SectionTitle = ({ subtitle, title }) => (
  <div className="mb-20 text-center relative z-10">
    <div className="inline-block mb-4">
      <GlitchText text={subtitle} className="font-serif text-[#C5A059] text-sm tracking-[0.3em] uppercase" />
    </div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-5xl md:text-7xl text-[#e5e5e5] font-serif uppercase tracking-tight drop-shadow-lg"
    >
      {title}
    </motion.h2>
    <div className="mt-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto opacity-50" />
  </div>
);

const PlatformButton = ({ icon: Icon, label, price, onHover }) => (
  <button 
    onMouseEnter={onHover}
    className="group relative w-full flex items-center justify-between p-6 border border-[#333] bg-black/40 backdrop-blur-md hover:border-[#C5A059] transition-colors duration-500 overflow-hidden"
  >
    <div className="absolute inset-0 bg-[#C5A059] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
    <div className="flex items-center gap-4 z-10">
      <Icon className="text-[#666] group-hover:text-[#C5A059] transition-colors" />
      <span className="font-serif text-lg text-gray-300 group-hover:text-white tracking-wider">{label}</span>
    </div>
    <span className="z-10 font-mono text-xs text-[#C5A059] border border-[#C5A059]/30 px-2 py-1 rounded">
      {price}
    </span>
  </button>
);

// --- MAIN PAGE ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const { playHover, playClick } = useSFX();
  
  // RUNE COUNTER
  const [runes, setRunes] = useState(0);
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setRunes(Math.floor(latest * 50000));
    });
  }, [scrollYProgress]);

  // CAROUSEL
  const carouselWrapperRef = useRef(null);
  const [carouselConstraint, setCarouselConstraint] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      if(carouselWrapperRef.current) {
        setCarouselConstraint(carouselWrapperRef.current.scrollWidth - carouselWrapperRef.current.offsetWidth + 50); 
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // ACCORDION
  const [activeDemigod, setActiveDemigod] = useState(0);

  // LORE LINE HEIGHT
  const loreRef = useRef(null);
  const { scrollYProgress: loreProgress } = useScroll({ target: loreRef, offset: ["start center", "end center"] });
  const lineHeight = useTransform(loreProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-full min-h-screen">
      
      {/* 0. GLOBAL LAYERS */}
      <GlobalBackground />
      <EmberSystem />

      {/* RUNE COUNTER */}
      <div className="fixed top-24 right-8 z-50 flex items-center gap-3 mix-blend-difference text-[#C5A059] font-mono text-sm pointer-events-none">
        <Hexagon size={16} className="animate-pulse" />
        <span>{runes.toLocaleString()}</span>
      </div>

      {/* 1. HERO */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* We keep the hero's specific parallax video, but blend it */}
        <motion.div className="absolute inset-0 z-0" style={{ y: yBackground, scale: 1.1 }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] z-10" />
          <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[30%] brightness-[0.4]">
             <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="z-20 text-center px-4 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} 
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
          transition={{ duration: 1.5 }}
        >
          {/* Utilisation de font-mantinia ici */}
          <h2 className="text-[#C5A059] font-mantinia text-sm md:text-lg tracking-[0.5em] mb-6 uppercase opacity-90">
            The Golden Order is Broken
          </h2>
          
          {/* Et ici */}
          <h1 className="text-6xl md:text-[10rem] leading-[0.85] font-mantinia text-[#e5e5e5] tracking-tighter mb-8 drop-shadow-2xl">
            SHATTERED<br/>Elden Ring
          </h1>
        </motion.div>
          <MagneticButton className="inline-block mt-8">
            <button onClick={playClick} onMouseEnter={playHover} className="group relative px-10 py-4 overflow-hidden border border-[#C5A059]/40 bg-black/20 backdrop-blur-sm hover:border-[#C5A059] transition-all duration-500">
              <span className="relative z-10 text-[#C5A059] font-serif tracking-[0.2em] text-sm group-hover:text-white transition-colors">RESTORE THE ORDER</span>
              <div className="absolute inset-0 bg-[#C5A059]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* 2. AWARDS */}
      <section className="py-24 bg-[#C5A059] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20 mix-blend-multiply" />
        <div className="relative z-10 w-full transform -rotate-2 origin-center scale-110">
          <ParallaxText baseVelocity={-2}>GAME OF THE YEAR • 10/10 • </ParallaxText>
          <ParallaxText baseVelocity={2}>MASTERPIECE • UNRIVALED • </ParallaxText>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border-[2px] border-black rounded-full flex items-center justify-center backdrop-blur-sm bg-white/10"
          >
             <Star className="text-black w-24 h-24" fill="black" />
          </motion.div>
        </div>
      </section>

      {/* 3. LORE */}
      <div className="relative py-40 overflow-hidden" ref={loreRef}>
        {/* Transparent background so global bg shows through */}
        <SectionTitle subtitle="The History" title="The Shattering" />

        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform md:-translate-x-1/2 ml-4 md:ml-0">
             <motion.div style={{ height: lineHeight }} className="w-full bg-[#C5A059] shadow-[0_0_15px_#C5A059]" />
          </div>

          <div className="space-y-32">
             <LoreNode 
               year="The Beginning" 
               title="The Golden Order" 
               text="In the Lands Between, ruled by Queen Marika the Eternal, the Elden Ring, the source of the Erdtree, has been shattered. The Order, once absolute, now lies in fragments across the realm." 
               align="left" 
             />
             <LoreNode 
               year="The Conflict" 
               title="The War of Shattering" 
               text="Marika's offspring, demigods all, claimed the shards of the Elden Ring known as Great Runes. The mad taint of their newfound strength triggered a war that abandoned the Greater Will." 
               align="right" 
             />
             <LoreNode 
               year="The Exile" 
               title="The Tarnished" 
               text="You, who were spurned by the grace of gold and exiled from the Lands Between. The dead who yet live. The call has returned to you, crossing the fog of the sea." 
               align="left" 
             />
             <div className="pt-20 text-center relative z-10">
                <MagneticButton>
                  <button className="bg-[#C5A059] text-black px-8 py-3 font-serif uppercase tracking-widest text-xs hover:bg-white transition-colors">
                    Read Full Lore
                  </button>
                </MagneticButton>
             </div>
          </div>
        </div>
      </div>

      {/* 4. DEMIGODS */}
      <section className="py-32 overflow-hidden">
        <SectionTitle subtitle="Shardbearers" title="The Demigods" />
        <div className="max-w-[1400px] mx-auto px-6 h-[500px] flex gap-2">
          {DEMIGODS.map((god, idx) => (
            <motion.div 
              key={god.id}
              className="relative h-full rounded-sm overflow-hidden cursor-pointer border border-white/5"
              animate={{ flex: activeDemigod === idx ? 4 : 1 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              onMouseEnter={() => { setActiveDemigod(idx); playHover(); }}
              onClick={playClick}
            >
              <img src={god.image} alt={god.name} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeDemigod === idx ? 1 : 0 }} className="overflow-hidden">
                    <h3 className="text-4xl md:text-6xl font-serif text-white mb-2">{god.name}</h3>
                    <p className="text-[#C5A059] uppercase tracking-widest text-sm">{god.title}</p>
                 </motion.div>
                 {activeDemigod !== idx && (
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0">
                     <span className="writing-vertical text-white/50 text-xs tracking-[0.5em] uppercase hidden md:block">{god.name}</span>
                   </div>
                 )}
              </div>
              {activeDemigod === idx && <motion.div layoutId="activeBorder" className="absolute inset-0 border border-[#C5A059]/50" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. ARMORY */}
      <section className="py-32 border-y border-[#222] relative bg-black/40 backdrop-blur-sm">
        <SectionTitle subtitle="Legendary Armaments" title="The Armory" />
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {WEAPONS.map((w) => (
            <TiltCard key={w.id} className="bg-black/40 border border-[#222] p-6 group hover:border-[#C5A059]/50 transition-colors duration-500">
               <div className="aspect-square mb-6 overflow-hidden bg-black/50 border border-[#333] relative">
                 <img src={w.image} className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
               </div>
               <h3 className="text-2xl font-serif text-[#e5e5e5] mb-1">{w.name}</h3>
               <p className="text-[#666] text-xs uppercase tracking-widest mb-6">{w.type}</p>
               <div className="space-y-4 mb-6">
                 <StatBar label="Physical" value={w.stats.phys} color="#888" icon={Sword} />
                 <StatBar label="Magic" value={w.stats.magic} color="#596BC5" icon={Zap} />
                 <StatBar label="Fire" value={w.stats.fire} color="#C55959" icon={Flame} />
               </div>
               <p className="text-[#555] text-xs italic border-t border-[#222] pt-4">"{w.desc}"</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 6. CAROUSEL */}
      <section className="py-32 overflow-hidden">
        <SectionTitle subtitle="The Lineage" title="Choose Your Vessel" />
        <div ref={carouselWrapperRef} className="cursor-grab active:cursor-grabbing pl-[10vw] overflow-hidden">
          <motion.div 
            drag="x" dragFree={true} dragElastic={0.2}
            dragConstraints={{ right: 0, left: -carouselConstraint }} 
            className="flex gap-12 w-max pr-[10vw]"
          >
            {CLASSES.map((cls) => (
              <div key={cls.id} className="w-[350px] md:w-[450px] perspective-1000">
                <TiltCard className="h-[600px] w-full border border-[#222] bg-black/60 group overflow-hidden select-none relative z-10">
                  <img src={cls.image} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-110" alt={cls.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 transform translate-z-20">
                    <h3 className="text-4xl font-serif text-[#e5e5e5] mb-2">{cls.title}</h3>
                    <p className="text-[#C5A059] uppercase tracking-widest text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cls.subtitle}</p>
                    <p className="text-gray-400 font-light leading-relaxed text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">{cls.desc}</p>
                  </div>
                  <div className="absolute inset-0 border border-[#C5A059] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. PURCHASE */}
      <section className="py-32 px-6 relative border-t border-[#222] bg-black/80">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative perspective-1000 flex justify-center">
            <motion.div animate={{ y: [0, -20, 0], rotateY: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="aspect-[4/5] w-full max-w-md bg-[#111] border border-[#333] p-2 relative shadow-[0_0_50px_rgba(197,160,89,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/20 to-transparent opacity-50" />
              <img src="eldenboxillustration.jpg" alt="Box Art" className="w-full h-full object-cover grayscale opacity-60 mix-blend-screen" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#C5A059] rounded-full flex items-center justify-center text-black font-bold font-serif text-center p-4 rotate-12 shadow-[0_0_30px_rgba(197,160,89,0.4)]">DELUXE EDITION</div>
            </motion.div>
          </div>
          <div>
            <SectionTitle subtitle="Become the Elden Lord" title="Begin Your Journey" />
            <p className="text-gray-400 mb-12 font-light text-lg leading-relaxed">Includes the base game, digital artbook, and original soundtrack. Pre-order now to receive the "Ring" gesture.</p>
            <div className="space-y-4 mb-12">
              <PlatformButton icon={Monitor} label="Steam / PC" price="$59.99" onHover={playHover} />
              <PlatformButton icon={Gamepad} label="PlayStation 5" price="$69.99" onHover={playHover} />
              <PlatformButton icon={Monitor} label="Xbox Series X|S" price="$69.99" onHover={playHover} />
            </div>
            <div className="flex items-center gap-6">
              <MagneticButton>
                <button onClick={playClick} className="bg-[#C5A059] text-black px-8 py-4 font-serif font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">Pre-Order Now</button>
              </MagneticButton>
              <span className="text-[#444] text-xs uppercase tracking-widest">Digital Download Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
{/* FOOTER */}
      <footer className="bg-black py-20 border-t border-[#333] relative overflow-hidden flex flex-col items-center px-4 text-center">
         {/* Effet de fond */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/10 to-transparent opacity-50" />
         
         {/* Icône et Titre */}
         <Crown className="w-16 h-16 text-[#333] mb-8 relative z-10" />
         <h1 className="text-4xl font-serif text-[#333] mb-2 select-none relative z-10">Elden Ring</h1>
         <span className="text-[#444] text-xs font-mono uppercase tracking-[0.3em] mb-12 relative z-10">
            Unofficial Fan Tribute
         </span>

         {/* Liens externes (Optionnels) */}
         <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#666] font-mono text-xs uppercase tracking-widest mb-12 relative z-10">
            <a href="https://en.bandainamcoent.eu/elden-ring/elden-ring" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors">Bandai Namco</a>
            <span className="text-[#333] hidden md:inline">/</span>
            <a href="https://www.fromsoftware.jp/ww/" target="_blank" rel="noreferrer" className="hover:text-[#C5A059] transition-colors">FromSoftware</a>
            <span className="text-[#333] hidden md:inline">/</span>
            <span className="cursor-default">Fan Project</span>
         </div>

         {/* DISCLAIMER / MENTIONS LÉGALES */}
         <div className="relative z-10 max-w-2xl space-y-4">
            <p className="text-[#444] text-[10px] md:text-xs leading-relaxed font-sans">
               Ce site est un <strong>projet de fan à but non lucratif</strong> réalisé à des fins éducatives et de démonstration (Portfolio). 
               Il n&apos;est en aucun cas affilié, associé, autorisé, approuvé ou officiellement lié à <span className="text-[#666]">FromSoftware, Inc.</span> ou <span className="text-[#666]">Bandai Namco Entertainment</span>.
            </p>
            <p className="text-[#333] text-[10px] font-mono">
               ELDEN RING™ & ©Bandai Namco Entertainment Inc. / ©2022 FromSoftware, Inc.
            </p>
            
            {/* TA SIGNATURE */}
            <p className="text-[#C5A059]/40 text-xs font-mono pt-8">
               Designed & Developed by Yassine Berrichi
            </p>
         </div>
      </footer>
    </div>
  );
}