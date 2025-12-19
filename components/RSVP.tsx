
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Send, CheckCircle2, MessageCircle, Star, Mail } from 'lucide-react';
import { RsvpStatus, SessionType } from '../types';
import { config } from '../site-config';

export const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    status: RsvpStatus.HADIR,
    session: SessionType.AKAD,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        setSubmitted(true);
    }, 1000);
  };

  const generateWALink = () => {
    const text = `Halo ${config.couple.names.full}, aku ingin RSVP.\nNama: ${formData.name}\nStatus: ${formData.status}\nJumlah: ${formData.guests}\nSesi: ${formData.session}\nUcapan: ${formData.message}`;
    return `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const titleVariants: Variants = {
    hidden: { y: -80, x: -20, opacity: 0, rotate: -5 },
    visible: { 
        y: 0, x: 0, opacity: 1, rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 12, mass: 1.2 }
    }
  };

  const badgeVariants: Variants = {
    hidden: { scale: 0, rotate: 15, opacity: 0 },
    visible: { 
        scale: 1, rotate: -1, opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 15 }
    }
  };

  const fieldVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
        y: 0, opacity: 1,
        transition: { type: "spring", stiffness: 250, damping: 20 }
    }
  };

  if (submitted) {
      return (
        <div className="h-full w-full flex flex-col justify-center items-center text-center p-6 bg-gen-green border-x-4 border-gen-dark relative overflow-hidden">
            
            {/* Animated Scrolling Grid Background */}
            <motion.div 
                animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', 
                    backgroundSize: '40px 40px' 
                }}
            ></motion.div>
            
            {/* Success Icon - Pop Entrance & Floating Idle */}
            <motion.div 
                initial={{ scale: 0, rotate: -180 }} 
                animate={{ scale: 1, rotate: 0 }} 
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative z-10 mb-6"
            >
                <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white text-gen-dark p-6 border-4 border-gen-dark shadow-neo-lg rounded-full"
                >
                    <CheckCircle2 size={80} strokeWidth={3} />
                </motion.div>
            </motion.div>

            {/* Main Text - Slam Entrance & Jitter Idle */}
            <motion.div
                initial={{ opacity: 0, scale: 2, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                className="relative z-10 mb-4"
            >
                <motion.h3 
                    animate={{ x: [-2, 2, -2, 0], y: [2, -2, 2, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }} // Occasional jitter
                    className="font-display text-6xl md:text-7xl font-black text-white drop-shadow-[4px_4px_0_#000] text-stroke-text leading-none tracking-tighter transform -rotate-2" 
                    style={{ WebkitTextStroke: '2.5px black' }}
                >
                    YOU'RE<br/>IN!
                </motion.h3>
            </motion.div>

            {/* Badge - Slide Up Entrance & Tilt Idle */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="relative z-10 mb-10"
            >
                <motion.div
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white px-6 py-2 border-4 border-gen-dark shadow-neo transform rotate-2"
                >
                    <p className="font-mono font-bold uppercase tracking-widest text-lg">SEE YOU THERE</p>
                </motion.div>
            </motion.div>
            
            {/* Button - Spring Entrance & Heartbeat Idle */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="relative z-10 w-full max-w-xs"
            >
                <motion.a 
                    href={generateWALink()}
                    target="_blank"
                    rel="noreferrer"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full bg-gen-dark text-white border-4 border-gen-dark py-4 font-display font-black text-xl flex items-center justify-center gap-3 shadow-neo-lg transform -rotate-1 hover:bg-white hover:text-gen-dark hover:shadow-none transition-colors"
                >
                    <MessageCircle size={24} strokeWidth={3} />
                    CONFIRM VIA WA
                </motion.a>
            </motion.div>
            
            <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setSubmitted(false)}
                className="mt-8 text-xs font-mono font-bold uppercase tracking-[0.2em] hover:text-white text-gen-dark/60 transition-colors relative z-10"
            >
                Reset Form
            </motion.button>
        </div>
      )
  }

  return (
    <div className="h-full w-full flex flex-col pt-20 pb-32 px-6 overflow-y-auto no-scrollbar bg-gen-bg border-x-4 border-gen-dark relative overflow-hidden">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ 
               backgroundImage: 'linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(to right, #9ca3af 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
           }}
      ></div>

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -right-10 text-gen-yellow opacity-30 pointer-events-none"
      >
        <Star size={180} fill="currentColor" strokeWidth={1} />
      </motion.div>

      <motion.div 
         animate={{ y: [-15, 15, -15], rotate: [5, -5, 5] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
         className="absolute bottom-20 -left-10 text-gen-pink opacity-20 pointer-events-none"
      >
        <Mail size={140} strokeWidth={1.5} />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-md mx-auto w-full relative z-10"
      >
        <div className="mb-6">
            <motion.h2 variants={titleVariants} className="font-display text-7xl font-black mb-2 text-gen-dark tracking-tighter drop-shadow-sm">RSVP</motion.h2>
            <motion.div variants={badgeVariants} className="bg-gen-yellow p-2 border-2 border-gen-dark inline-block transform -rotate-1 shadow-neo-sm">
                <p className="font-mono text-xs font-bold uppercase tracking-wide">SECURE YOUR VIP SPOT</p>
            </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={fieldVariants} className="space-y-2">
                <label className="text-xs font-mono font-bold text-gen-dark uppercase ml-1 flex items-center gap-1">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-white border-4 border-gen-dark focus:shadow-[4px_4px_0_#FF4D94] focus:border-gen-fuchsia focus:-translate-y-1 outline-none transition-all font-bold text-lg rounded-none placeholder:text-gray-300"
                    placeholder="YOUR NAME HERE"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
                 <motion.div variants={fieldVariants} className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase ml-1">Guests</label>
                    <div className="relative group">
                        <select 
                            className="w-full px-4 py-3 bg-white border-4 border-gen-dark appearance-none rounded-none font-bold outline-none focus:shadow-[4px_4px_0_#FBCC14] focus:border-gen-yellow transition-all cursor-pointer"
                            value={formData.guests}
                            onChange={e => setFormData({...formData, guests: Number(e.target.value)})}
                        >
                            {[1, 2].map(n => <option key={n} value={n}>{n} Pax</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-0.5 transition-transform">▼</div>
                    </div>
                </motion.div>
                 <motion.div variants={fieldVariants} className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase ml-1">Status</label>
                    <div className="relative group">
                        <select 
                            className="w-full px-4 py-3 bg-white border-4 border-gen-dark appearance-none rounded-none font-bold outline-none focus:shadow-[4px_4px_0_#A3E635] focus:border-gen-green transition-all cursor-pointer"
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value as RsvpStatus})}
                        >
                            {Object.values(RsvpStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-0.5 transition-transform">▼</div>
                    </div>
                </motion.div>
            </div>

            <motion.div variants={fieldVariants} className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase ml-1">Session</label>
                <div className="grid grid-cols-3 gap-2">
                    {Object.values(SessionType).map(s => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({...formData, session: s})}
                            className={`py-2 text-xs font-bold border-4 transition-all uppercase relative overflow-hidden group ${
                                formData.session === s 
                                ? 'bg-gen-blue text-white border-gen-dark shadow-neo -translate-y-1' 
                                : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-gen-dark hover:text-gen-dark'
                            }`}
                        >
                            <span className="relative z-10">{s}</span>
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase ml-1">Message</label>
                <textarea 
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-4 border-gen-dark focus:shadow-neo outline-none transition-all font-bold rounded-none placeholder:text-gray-300 resize-none"
                    placeholder="DROP SOME LOVE..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                />
            </motion.div>

            <motion.button 
                variants={fieldVariants}
                whileHover={{ scale: 1.02, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 mt-6 bg-gen-fuchsia text-white border-4 border-gen-dark font-display font-black text-xl shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3 uppercase relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center gap-3">
                    SEND RSVP <Send size={24} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
