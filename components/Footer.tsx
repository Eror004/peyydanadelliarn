
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';
import { copyToClipboard } from '../utils';
import { config } from '../site-config';

export const Footer: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    copyToClipboard(config.couple.hashtag).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gen-dark text-white relative overflow-hidden px-6">
        
        {/* 1. Background Running Text (Marquee) */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none overflow-hidden z-0 py-10 opacity-10">
            <div className="w-full overflow-hidden">
                <div className="animate-marquee whitespace-nowrap font-display font-black text-8xl text-transparent stroke-text-white">
                    SEE YOU SOON • TERIMA KASIH • SEE YOU SOON • TERIMA KASIH • SEE YOU SOON • TERIMA KASIH •
                </div>
            </div>
            <div className="w-full overflow-hidden">
                <div className="animate-marquee-reverse whitespace-nowrap font-display font-black text-8xl text-transparent stroke-text-white">
                    {config.couple.names.full.toUpperCase()} • FOREVER • {config.couple.names.full.toUpperCase()} • FOREVER • {config.couple.names.full.toUpperCase()} • FOREVER •
                </div>
            </div>
        </div>

        {/* 2. Dynamic Floating Icons */}
        <motion.div 
            animate={{ 
                y: [-20, 20, -20], 
                rotate: [0, 45, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] md:right-[20%] text-gen-yellow opacity-60 z-0"
        >
            <Sparkles size={64} strokeWidth={1.5} />
        </motion.div>

        <motion.div 
            animate={{ 
                y: [20, -20, 20], 
                rotate: [0, -20, 0],
                x: [-10, 10, -10]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[10%] md:left-[20%] text-gen-pink opacity-30 z-0"
        >
            <Heart size={80} fill="currentColor" strokeWidth={0} />
        </motion.div>
        
        <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute top-[20%] left-[15%] opacity-20 text-gen-blue"
        >
             <Star size={40} />
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            
            {/* 3. Floating Title Animation */}
            <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center leading-[0.85] tracking-tighter"
            >
                <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="font-display font-black text-[5rem] md:text-[7rem] text-gen-blue drop-shadow-[4px_4px_0_rgba(0,0,0,1)] z-10 relative"
                >
                    Thank
                </motion.h2>
                <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-display font-black text-[5rem] md:text-[7rem] text-gen-pink drop-shadow-[4px_4px_0_rgba(0,0,0,1)] z-20 relative -mt-2"
                >
                    You
                </motion.h2>
            </motion.div>

            {/* Subtitle with fade in */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-mono text-gen-blue-light font-bold text-sm md:text-lg space-y-2"
            >
                <p>See you on the dance floor!</p>
                <p className="opacity-60 text-xs md:text-sm">(Or the buffet line 🍕)</p>
            </motion.div>

            {/* 4. Hashtag Button with Pulsing Glow */}
            <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={handleCopy}
                whileTap={{ scale: 0.95 }}
                className="group relative mt-8"
            >
                {/* Pulsing Glow Effect */}
                <motion.div 
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gen-fuchsia rounded-full blur-xl"
                />
                
                <div className="relative bg-[#1a1a1a] border-2 border-white/20 px-8 py-4 rounded-full flex items-center gap-4 hover:border-gen-pink hover:bg-black transition-all shadow-2xl group-hover:scale-105">
                    <span className="font-display font-bold text-xl md:text-2xl text-white tracking-wide">
                        {config.couple.hashtag}
                    </span>
                    <div className={`px-2 py-1 rounded flex items-center gap-1 text-[10px] font-mono font-bold transition-colors ${copied ? 'bg-green-500 text-black' : 'bg-white/10 text-gray-400 group-hover:text-white'}`}>
                        {copied ? "COPIED!" : "COPY"}
                    </div>
                </div>
            </motion.button>
        </div>
    </div>
  );
};
