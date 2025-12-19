import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart } from 'lucide-react';
import { DATE_ISO } from '../constants';

export const Hero: React.FC = () => {
  const date = new Date(DATE_ISO);
  const formattedDate = new Intl.DateTimeFormat('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-gen-bg relative overflow-hidden px-4 pb-20 border-x-4 border-gen-dark">
        
        {/* Dynamic Background Marquee */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none select-none z-0">
             {[...Array(6)].map((_, i) => (
                <div key={i} className={`whitespace-nowrap font-display font-black text-6xl text-gen-dark ${i % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
                    LOVE • FOREVER • MPEY • ADELLIARN • 2026 • LOVE • FOREVER • MPEY • ADELLIARN • 2026 •
                </div>
             ))}
        </div>

        {/* Sticker Elements */}
        <motion.div 
            drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="absolute top-[12%] left-[5%] z-20 cursor-grab active:cursor-grabbing"
        >
             <div className="bg-gen-yellow p-3 rounded-full border-2 border-gen-dark shadow-neo rotate-[-12deg]">
                <Sparkles className="text-gen-dark w-8 h-8" />
             </div>
        </motion.div>

        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] right-[8%] z-10"
        >
            <div className="w-16 h-16 relative">
                 <div className="absolute inset-0 border-2 border-gen-dark rounded-full border-dashed animate-spin-slow"></div>
                 <Star className="absolute inset-0 m-auto text-gen-blue w-8 h-8 fill-gen-blue" />
            </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-sm md:max-w-md mt-10">
            
            {/* Photo Frame - Brutalist Style */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative z-10 mb-[-30px]" 
            >
                {/* Washi Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-gen-pink border-2 border-gen-dark shadow-neo-sm -rotate-2 z-30 flex items-center justify-center">
                    <span className="font-mono text-[10px] font-bold">OFFICIAL</span>
                </div>
                
                {/* The Frame */}
                <div className="bg-white p-2 border-4 border-gen-dark shadow-neo-lg rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="w-60 h-80 md:w-72 md:h-96 bg-gray-200 overflow-hidden relative border-2 border-gen-dark grayscale hover:grayscale-0 transition-all duration-500">
                        <img 
                            src="https://picsum.photos/600/800?random=1" 
                            alt="Mpey & Adelliarn" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                    </div>
                </div>
            </motion.div>

            {/* Typography - Dela Gothic Heavy Style */}
            <div className="relative z-20 flex flex-col items-center text-center w-full pointer-events-none mix-blend-normal transform -rotate-2">
                <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex flex-col items-center w-full"
                >
                    <span 
                        className="font-heavy block text-[3.8rem] md:text-[5.5rem] text-white tracking-tighter leading-[0.85] text-heavy-stroke drop-shadow-[4px_4px_0_rgba(255,125,170,1)]"
                    >
                        MPEY
                    </span>
                    
                    <div className="relative my-[-15px] z-30 scale-110">
                        <span className="absolute inset-0 text-gen-fuchsia blur-md opacity-50">&</span>
                        <span 
                            className="font-glitch block text-[4rem] md:text-[5.5rem] text-gen-fuchsia leading-none drop-shadow-[3px_3px_0_#000] z-10"
                            style={{ WebkitTextStroke: '1px black' }}
                        >
                            &
                        </span>
                    </div>

                    <span 
                        className="font-heavy block text-[3rem] md:text-[4.5rem] text-white tracking-tighter leading-[0.85] text-heavy-stroke drop-shadow-[4px_4px_0_rgba(255,125,170,1)] w-[120%]"
                    >
                        ADELLIARN
                    </span>
                </motion.h1>
            </div>

            {/* Date Badge */}
            <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 z-30"
            >
                <div className="bg-gen-yellow border-4 border-gen-dark px-6 py-2 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default rotate-2">
                    <p className="font-mono font-bold text-gen-dark text-sm md:text-base tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        {formattedDate}
                    </p>
                </div>
            </motion.div>

        </div>
    </div>
  );
};