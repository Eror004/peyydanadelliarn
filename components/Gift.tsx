
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Copy, Check, CreditCard, Sparkles, QrCode, Smartphone } from 'lucide-react';
import { BANK_DETAILS, QRIS_URL } from '../constants';
import { copyToClipboard } from '../utils';

type GiftTab = 'bank' | 'qris';

export const Gift: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<GiftTab>('bank');

  const handleCopy = () => {
    copyToClipboard(BANK_DETAILS.number).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  // Stagger Container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  // Title bounces in
  const titleVariants: Variants = {
    hidden: { y: -50, scale: 0.8, opacity: 0 },
    visible: { 
        y: 0, scale: 1, opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  // Content Transition
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.3 }
    },
    exit: { 
        opacity: 0, y: -20, scale: 0.95,
        transition: { duration: 0.2 }
    }
  };

  // The 3D Card Animation
  const cardVariants: Variants = {
    hidden: { 
        rotateX: 45, 
        y: 100, 
        opacity: 0, 
        scale: 0.8 
    },
    visible: { 
        rotateX: 0, 
        y: 0, 
        opacity: 1, 
        scale: 1,
        transition: { 
            type: "spring", 
            stiffness: 150, 
            damping: 15,
            mass: 1.2
        }
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-6 bg-white text-center border-x-4 border-gen-dark relative overflow-hidden">
         
         {/* Animated Background: Scrolling Diagonal Stripes */}
         <motion.div 
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 50%)', 
                backgroundSize: '30px 30px' 
            }}
         />

         {/* Floating Gradient Blobs */}
         <motion.div 
            animate={{ 
                x: [-30, 30, -30], 
                y: [-20, 20, -20],
                scale: [1, 1.1, 1],
                rotate: [0, 45, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-20%] w-[350px] h-[350px] bg-gradient-to-b from-gen-pink/30 to-gen-fuchsia/30 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"
         />
         <motion.div 
            animate={{ 
                x: [30, -30, 30], 
                y: [20, -20, 20],
                scale: [1.1, 1, 1.1],
                rotate: [0, -45, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[-20%] w-[350px] h-[350px] bg-gradient-to-t from-gen-blue/20 to-gen-green/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply"
         />

         <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-md w-full relative z-10 perspective-1000"
         >
            
            <div className="mb-6 flex flex-col items-center">
                <motion.div variants={titleVariants}>
                    <h2 className="font-display text-6xl md:text-7xl font-black text-gen-dark tracking-tighter drop-shadow-sm leading-none">
                        DIGITAL<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gen-blue to-gen-fuchsia">GIFT</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-4 font-medium font-mono">Safe & cashless, just how we like it.</p>
                </motion.div>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-gray-100 p-1 border-2 border-gen-dark rounded-xl mb-8 w-full shadow-neo-sm relative overflow-hidden">
                <button 
                    onClick={() => setActiveTab('bank')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold font-mono text-sm uppercase transition-all flex items-center justify-center gap-2 z-10 ${activeTab === 'bank' ? 'bg-gen-dark text-white shadow-md' : 'text-gray-500 hover:text-gen-dark'}`}
                >
                    <CreditCard size={16} /> Transfer
                </button>
                <button 
                    onClick={() => setActiveTab('qris')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold font-mono text-sm uppercase transition-all flex items-center justify-center gap-2 z-10 ${activeTab === 'qris' ? 'bg-gen-dark text-white shadow-md' : 'text-gray-500 hover:text-gen-dark'}`}
                >
                    <QrCode size={16} /> QRIS
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'bank' ? (
                    <motion.div 
                        key="bank-card"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full"
                    >
                        {/* Holographic Card Effect */}
                        <motion.div 
                            variants={cardVariants}
                            style={{ transformStyle: "preserve-3d" }}
                            className="group relative w-full aspect-[1.586/1]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#0f0f14] rounded-3xl transform transition-transform duration-500 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20">
                                
                                {/* Dynamic Sheen Effect */}
                                <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-shine" />

                                {/* Abstract Shapes inside card */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gen-fuchsia/40 rounded-full blur-[80px] mix-blend-screen animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gen-blue/40 rounded-full blur-[80px] mix-blend-screen animate-pulse delay-700"></div>
                                
                                {/* Noise Texture */}
                                <div className="absolute inset-0 opacity-30 bg-noise mix-blend-overlay"></div>

                                {/* Card Content */}
                                <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white text-left z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <CreditCard size={24} className="text-white/90" />
                                            <span className="font-display font-bold italic text-xl tracking-wider text-white/90">{BANK_DETAILS.bank}</span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-1 rounded">
                                            <Sparkles size={10} className="text-yellow-300" />
                                            <span className="text-[10px] font-mono font-bold">DEBIT</span>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div className="w-full">
                                            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1 font-mono">Account Number</p>
                                            <div className="flex items-center justify-between gap-2 w-full">
                                                <span className="font-mono text-2xl md:text-3xl tracking-widest text-shadow-sm truncate">{BANK_DETAILS.number}</span>
                                                
                                                <motion.button 
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={handleCopy} 
                                                    className={`p-3 rounded-xl backdrop-blur-md transition-all border shadow-lg ${copied ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'}`}
                                                >
                                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                                </motion.button>
                                            </div>
                                            <p className="text-sm mt-4 font-bold tracking-wide uppercase text-white/80 bg-black/20 inline-block px-2 py-1 rounded">{BANK_DETAILS.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="qris-card"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full flex flex-col items-center"
                    >
                         {/* QRIS Container Style */}
                        <div className="bg-white p-4 pb-6 border-4 border-gen-dark shadow-neo rotate-1 relative w-full max-w-xs">
                            {/* Tape Effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gen-yellow/80 border-2 border-gen-dark rotate-[-2deg] opacity-80 z-20"></div>

                            {/* Title */}
                            <div className="flex items-center justify-center gap-2 mb-4 pt-2">
                                <QrCode className="text-gen-dark" />
                                <h3 className="font-display font-black text-2xl text-gen-dark">SCAN ME</h3>
                            </div>

                            {/* QR Frame */}
                            <div className="relative border-4 border-gen-dark p-2 bg-white overflow-hidden group">
                                <img src={QRIS_URL} alt="QRIS Code" className="w-full h-auto aspect-square object-contain pixelated" />
                                
                                {/* Scanning Laser Animation */}
                                <motion.div 
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-10 opacity-70"
                                />
                                
                                {/* Scan Corner Accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-gen-dark"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-gen-dark"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-gen-dark"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-gen-dark"></div>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center px-2">
                                <div className="text-left">
                                    <p className="font-mono text-[10px] font-bold text-gray-400 uppercase">MERCHANT</p>
                                    <p className="font-bold text-sm text-gen-dark">{BANK_DETAILS.name}</p>
                                </div>
                                <div className="flex gap-1">
                                    {/* Dummy Payment Icons */}
                                    <div className="w-6 h-6 rounded-full bg-blue-500 border border-black"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-500 border border-black"></div>
                                    <div className="w-6 h-6 rounded-full bg-purple-500 border border-black"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-gen-dark bg-gen-yellow/20 px-4 py-2 rounded-full border border-gen-dark/10">
                             <Smartphone size={16} />
                             <span className="font-mono text-xs font-bold">Accepts All E-Wallets</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-xs text-gray-400 font-mono"
            >
                *Your prayers mean the world to us too!
            </motion.p>
         </motion.div>
    </div>
  );
};
