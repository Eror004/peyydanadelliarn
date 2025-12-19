
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { CalendarCheck, AlarmClock, Star, Zap, Disc } from 'lucide-react';
import { DATE_ISO, LOCATION_NAME, COUPLE_NAME } from '../constants';
import { calculateTimeLeft, generateICS } from '../utils';

export const SaveTheDate: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(DATE_ISO));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(DATE_ISO));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const icsLink = generateICS(
    `Wedding of ${COUPLE_NAME}`,
    DATE_ISO,
    "We can't wait to celebrate with you! RSVP details inside.",
    LOCATION_NAME
  );

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0, rotate: 5 },
    visible: { 
      y: 0, opacity: 1, rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-[#050505] relative text-white overflow-hidden border-x-4 border-gen-dark">
        
        {/* 1. Background Grid & Radar Scan */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Grid */}
             <div className="absolute inset-0 opacity-20" 
                  style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
             />
             {/* Radar Scan Line */}
             <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gen-green shadow-[0_0_20px_#A3E635] opacity-80"
             />
        </div>

        {/* 2. Background Marquee (Diagonal) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden z-0 transform -rotate-12 scale-150">
            <div className="w-[200vw] bg-white text-black font-black font-display text-9xl py-4 animate-marquee whitespace-nowrap">
                25.05.2026 • MARK YOUR CALENDAR • 25.05.2026 • DONT MISS IT • 
            </div>
        </div>

        {/* Floating Decor */}
        <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-10 text-gen-pink z-10"
        >
            <Zap size={48} fill="currentColor" />
        </motion.div>
        <motion.div 
             animate={{ y: [-10, 10, -10] }} 
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-32 left-6 text-gen-yellow z-10"
        >
            <Star size={56} fill="currentColor" strokeWidth={2} className="stroke-black" />
        </motion.div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="w-full max-w-md relative z-10 flex flex-col items-center px-6"
        >
            {/* Live Indicator */}
            <div className="flex items-center gap-3 bg-black/50 backdrop-blur border border-white/20 px-4 py-1 rounded-full mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="font-mono text-xs font-bold tracking-widest text-gray-300">COUNTING DOWN</span>
            </div>

            {/* KINETIC TYPOGRAPHY TITLE */}
            <div className="flex flex-col items-center leading-[0.8] mb-10 w-full">
                <motion.h2 variants={itemVariants} className="font-display font-black text-7xl md:text-8xl tracking-tighter text-white drop-shadow-[4px_4px_0_#FF4D94]">
                    SAVE
                </motion.h2>
                <motion.div variants={itemVariants} className="flex items-center gap-4 w-full justify-center my-2">
                     <span className="h-2 flex-1 bg-white"></span>
                     <span className="font-mono font-bold text-xl text-gen-yellow italic bg-gen-dark px-2">THE</span>
                     <span className="h-2 flex-1 bg-white"></span>
                </motion.div>
                <motion.h2 
                    variants={itemVariants}
                    className="font-display font-black text-7xl md:text-8xl tracking-tighter text-transparent stroke-text-white hover:text-gen-blue transition-colors duration-300 cursor-default"
                    style={{ WebkitTextStroke: '2px white' }}
                >
                    DATE
                </motion.h2>
            </div>

            {/* CHAOTIC COUNTDOWN GRID */}
            <div className="grid grid-cols-4 gap-2 w-full mb-12">
                {[
                    { label: 'DAYS', val: timeLeft.days, color: 'bg-gen-pink', rotate: '-rotate-3' },
                    { label: 'HRS', val: timeLeft.hours, color: 'bg-gen-blue', rotate: 'rotate-2' },
                    { label: 'MIN', val: timeLeft.minutes, color: 'bg-gen-yellow', rotate: '-rotate-1' },
                    { label: 'SEC', val: timeLeft.seconds, color: 'bg-gen-green', rotate: 'rotate-3' }
                ].map((item, idx) => (
                    <motion.div 
                        key={item.label}
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                        className={`relative flex flex-col items-center justify-center aspect-[0.8] ${item.rotate} transition-transform`}
                    >
                        {/* Tape effect on top */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/50 backdrop-blur rotate-1 z-20"></div>
                        
                        <div className={`w-full h-full ${item.color} border-4 border-gen-dark shadow-neo flex flex-col items-center justify-center relative overflow-hidden group`}>
                             <span className="font-heavy text-3xl md:text-4xl text-gen-dark z-10">{item.val.toString().padStart(2, '0')}</span>
                             <span className="font-mono text-[10px] font-black bg-gen-dark text-white px-1 absolute bottom-1 right-1">{item.label}</span>
                             
                             {/* Scanline inside box */}
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-[200%] w-full animate-shine opacity-0 group-hover:opacity-100"></div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ACTION CARD */}
            <motion.div 
                variants={itemVariants}
                className="w-full relative group"
            >
                <div className="absolute inset-0 bg-gen-fuchsia translate-x-2 translate-y-2 rounded-xl"></div>
                <div className="relative bg-[#111] border-2 border-white/20 rounded-xl p-6 text-center overflow-hidden">
                    {/* Background noise inside card */}
                    <div className="absolute inset-0 bg-noise opacity-10"></div>
                    
                    <div className="relative z-10">
                        <h3 className="font-display font-bold text-2xl mb-1 text-white">Senin, 25 Mei 2026</h3>
                        <p className="font-mono text-xs text-gray-400 mb-6 uppercase tracking-widest">Akad Starts @ 10.00 WIB</p>
                        
                        <a 
                            href={icsLink}
                            download="wedding.ics"
                            className="block w-full bg-white text-gen-dark font-display font-black text-lg py-4 border-4 border-transparent hover:border-gen-pink hover:text-gen-pink transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                        >
                            <CalendarCheck size={20} />
                            Add to Calendar
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    </div>
  );
};
