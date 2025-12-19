import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Heart } from 'lucide-react';

interface SplashProps {
  onOpen: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onOpen }) => {
  
  // Animation Variants for the Title Container
  const titleContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const titleItemVariants: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.5, rotate: -5 },
    visible: { 
      y: 0, opacity: 1, scale: 1, rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  return (
    <motion.section 
        className="fixed inset-0 z-[100] h-[100dvh] w-full flex pointer-events-none"
    >
      
      {/* LEFT CURTAIN */}
      <motion.div 
        initial={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="w-1/2 h-full bg-white border-l-4 border-y-4 border-r-0 border-gen-dark relative z-10 pointer-events-auto flex items-center justify-end"
      >
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        {/* Handle Decor Left */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gen-dark/20 rounded-l-full mr-2"></div>
      </motion.div>

      {/* RIGHT CURTAIN */}
      <motion.div 
        initial={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="w-1/2 h-full bg-white border-r-4 border-y-4 border-l-0 border-gen-dark relative z-10 pointer-events-auto flex items-center justify-start"
      >
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        {/* Handle Decor Right */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gen-dark/20 rounded-r-full ml-2"></div>
      </motion.div>

      {/* CONTENT OVERLAY (Fades out) */}
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col justify-between p-2 pointer-events-auto"
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Bar */}
        <div className="relative z-10 flex justify-between items-center bg-gen-dark text-white p-3 rounded-t-lg shadow-neo-sm mx-auto w-full max-w-[calc(100%-8px)] mt-1">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 border border-white"></div>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest">System_Invitation.exe</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
            
            {/* Animated Heart Container */}
            <motion.div 
                animate={{ 
                    y: [-15, 15, -15], 
                    rotate: [-5, 5, -5] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8 relative group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gen-yellow blur-2xl rounded-full"
                ></motion.div>

                <Heart size={80} className="fill-gen-pink text-gen-dark stroke-[3px] relative z-10 drop-shadow-neo-sm" />
                
                <motion.div 
                    animate={{ rotate: [12, 25, 12], scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5, ease: "backInOut" }}
                    className="absolute -top-4 -right-6 bg-gen-blue text-white font-mono text-xs px-2 py-1 border-2 border-gen-dark shadow-neo-sm z-20 origin-bottom-left"
                >
                    BARU!
                </motion.div>
            </motion.div>

            {/* MAIN TITLE ANIMATION BLOCK */}
            <motion.div
                variants={titleContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center font-display font-black text-center leading-[0.9] text-gen-dark mix-blend-hard-light mb-4"
            >
                <motion.span variants={titleItemVariants} className="block relative z-10">
                    <motion.span 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="block text-stroke-text text-white drop-shadow-[4px_4px_0_#000] text-6xl"
                    >
                        THE
                    </motion.span>
                </motion.span>

                <motion.span variants={titleItemVariants} className="block relative z-20">
                    <motion.span
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="block text-gen-pink text-6xl md:text-7xl"
                    >
                        WEDDING
                    </motion.span>
                </motion.span>

                <motion.span variants={titleItemVariants} className="block relative z-30 mt-2">
                    <motion.div
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="block text-2xl md:text-3xl font-mono bg-gen-yellow px-4 py-2 border-2 border-gen-dark shadow-neo"
                    >
                        OF THE YEAR
                    </motion.div>
                </motion.span>
            </motion.div>

            <p className="font-mono text-xs text-center max-w-[200px] mt-6 mb-8 text-gray-500">
            MEMUAT ASET... 99%<br/>
            SIAP BUAT PARTY?
            </p>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="group relative w-full max-w-xs"
            >
                <div className="absolute inset-0 bg-gen-dark translate-x-2 translate-y-2 rounded-xl"></div>
                <div className="relative bg-white border-4 border-gen-dark rounded-xl px-8 py-5 flex items-center justify-between group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform">
                    <span className="font-display font-black text-2xl tracking-tighter">BUKA</span>
                    <div className="bg-gen-fuchsia p-2 rounded-lg border-2 border-gen-dark">
                        <Zap size={24} className="text-white fill-white animate-pulse-fast" />
                    </div>
                </div>
            </motion.button>
        </div>

        {/* Footer ticker */}
        <div className="relative z-10 border-t-4 border-gen-dark bg-gen-yellow p-2 overflow-hidden mx-auto w-full max-w-[calc(100%-8px)] mb-1 shadow-neo-sm">
            <div className="whitespace-nowrap animate-marquee font-mono font-bold text-sm">
                MPEY & ADELLIARN • CATAT TANGGALNYA • 25 MEI 2026 • UNDANGAN RESMI • JANGAN DI-SKIP • 
                MPEY & ADELLIARN • CATAT TANGGALNYA • 25 MEI 2026 • UNDANGAN RESMI • JANGAN DI-SKIP •
            </div>
        </div>
      </motion.div>
    </motion.section>
  );
};