import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MapPin, ArrowUpRight, Ticket } from 'lucide-react';
import { MAPS_URL, LOCATION_NAME } from '../constants';

export const EventsAndMap: React.FC = () => {
  
  // Stagger container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  // Title slams down
  const titleVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  // Akad ticket slides from LEFT
  const ticketLeftVariants: Variants = {
    hidden: { x: -100, opacity: 0, rotate: -5 },
    visible: { 
      x: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  // Party ticket slides from RIGHT
  const ticketRightVariants: Variants = {
    hidden: { x: 100, opacity: 0, rotate: 5 },
    visible: { 
      x: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  // Map pops up from bottom
  const mapVariants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 250, damping: 25 }
    }
  };

  return (
    <div className="h-full w-full flex flex-col pt-20 px-4 bg-gen-yellow overflow-y-auto no-scrollbar pb-32 border-x-4 border-gen-dark">
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.2 }}
            className="max-w-md mx-auto w-full space-y-6"
        >
            
            <motion.div variants={titleVariants} className="text-center mb-4">
                 <h2 className="font-display font-black text-4xl uppercase text-white drop-shadow-[4px_4px_0_#000] stroke-text" style={{ WebkitTextStroke: '2px black' }}>THE PLAN</h2>
            </motion.div>

            {/* Ticket Cards */}
            <div className="grid gap-6">
                
                {/* Akad Ticket - Slide from Left */}
                <motion.div 
                    variants={ticketLeftVariants}
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="relative bg-white border-4 border-gen-dark shadow-neo"
                >
                    {/* Cutout circles */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gen-yellow border-r-4 border-gen-dark rounded-full"></div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gen-yellow border-l-4 border-gen-dark rounded-full"></div>
                    
                    <div className="p-6 border-b-4 border-dashed border-gen-dark">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-display font-black text-3xl">AKAD</h3>
                             <Ticket size={32} className="text-gen-blue" />
                        </div>
                        <p className="font-mono text-sm font-bold bg-gen-blue text-white inline-block px-2 border-2 border-gen-dark">SESSION 01</p>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                        <div>
                            <p className="font-mono text-xs text-gray-500 uppercase">Time</p>
                            <p className="font-display font-bold text-xl">10.00 WIB</p>
                        </div>
                        <div className="text-right">
                             <p className="font-mono text-xs text-gray-500 uppercase">Dresscode</p>
                             <p className="font-bold text-sm">White / Cream</p>
                        </div>
                    </div>
                </motion.div>

                {/* Resepsi Ticket - Slide from Right */}
                <motion.div 
                    variants={ticketRightVariants}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="relative bg-gen-dark text-white border-4 border-white shadow-neo"
                >
                    {/* Cutout circles */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gen-yellow border-r-4 border-white rounded-full"></div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gen-yellow border-l-4 border-white rounded-full"></div>
                    
                    <div className="p-6 border-b-4 border-dashed border-white">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-display font-black text-3xl text-gen-pink">PARTY</h3>
                             <Ticket size={32} className="text-gen-pink" />
                        </div>
                        <p className="font-mono text-sm font-bold bg-gen-pink text-gen-dark inline-block px-2 border-2 border-white">SESSION 02</p>
                    </div>
                    <div className="p-4 bg-gray-900 flex justify-between items-center">
                        <div>
                            <p className="font-mono text-xs text-gray-400 uppercase">Time</p>
                            <p className="font-display font-bold text-xl">11.00 WIB</p>
                        </div>
                        <div className="text-right">
                             <p className="font-mono text-xs text-gray-400 uppercase">Dresscode</p>
                             <p className="font-bold text-sm">Colorful Pastel</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Map Widget - Pops up */}
            <motion.div 
                variants={mapVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white border-4 border-gen-dark p-2 mt-4 shadow-neo hover:shadow-none transition-shadow"
            >
                <div className="h-40 w-full bg-gray-200 border-2 border-gen-dark relative grayscale hover:grayscale-0 transition-all">
                     <iframe 
                        src={MAPS_URL} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <div className="p-3 flex items-center justify-between">
                    <div>
                        <h4 className="font-black text-gen-dark font-display">{LOCATION_NAME}</h4>
                        <p className="font-mono text-[10px] text-gray-500 uppercase font-bold mt-1">TAP BUTTON FOR DIRECTIONS</p>
                    </div>
                    <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-10 h-10 bg-gen-blue border-2 border-gen-dark flex items-center justify-center text-white hover:bg-gen-dark transition-colors"
                    >
                        <ArrowUpRight size={20} strokeWidth={3} />
                    </a>
                </div>
            </motion.div>
        </motion.div>
    </div>
  );
};