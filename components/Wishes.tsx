
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Sparkles, Zap, Sticker, MessageCircle } from 'lucide-react';

interface WishItem {
  id: number;
  name: string;
  message: string;
  color: string;
  rotation: number;
  likes: number;
  stamp: string | null;
  tapeColor: string;
}

const COLORS = ['bg-white', 'bg-gen-pink-light', 'bg-gen-blue-light', 'bg-gen-bg'];
const TAPE_COLORS = ['bg-gen-yellow/80', 'bg-gen-pink/80', 'bg-gen-blue/80', 'bg-gen-green/80'];
const STAMPS = ['🔥', '💯', 'SHEESH', 'VALID', 'GOKIL', 'SLAY'];

const INITIAL_WISHES: WishItem[] = [
  { id: 1, name: "Bestie 1", message: "Congrats you two!! 🔥 Akhirnyaaa!", color: "bg-white", rotation: -2, likes: 5, stamp: "VALID", tapeColor: "bg-gen-yellow/80" },
  { id: 2, name: "Geng Futsal", message: "Gaspol rem blong! Happy wedding bro!", color: "bg-gen-blue-light", rotation: 1, likes: 12, stamp: "GOKIL", tapeColor: "bg-gen-pink/80" },
  { id: 3, name: "Adel's Cousin", message: "Can't wait for the party! 💃🕺", color: "bg-gen-bg", rotation: -1, likes: 3, stamp: null, tapeColor: "bg-gen-green/80" },
  { id: 4, name: "Anonim", message: "Langgeng terus yaaa! See you soon!", color: "bg-white", rotation: 2, likes: 8, stamp: "💯", tapeColor: "bg-gen-blue/80" },
];

export const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishItem = {
      id: Date.now(),
      name,
      message,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3
      likes: 0,
      stamp: Math.random() > 0.5 ? STAMPS[Math.floor(Math.random() * STAMPS.length)] : null,
      tapeColor: TAPE_COLORS[Math.floor(Math.random() * TAPE_COLORS.length)],
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const handleLike = (id: number) => {
      setWishes(wishes.map(w => w.id === id ? { ...w, likes: w.likes + 1 } : w));
  };

  return (
    <div className="h-full w-full flex flex-col bg-gen-dark relative overflow-hidden border-x-4 border-gen-dark">
      
      {/* Background Decor: Floating Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-20 left-10 text-4xl opacity-20">💖</motion.div>
          <motion.div animate={{ y: [20, -20, 20], x: [10, -10, 10] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-40 right-10 text-5xl opacity-20">🎉</motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
             <div className="w-[500px] h-[500px] border-[20px] border-dashed border-white rounded-full"></div>
          </motion.div>
      </div>
      
      {/* Header Section */}
      <div className="flex-none pt-20 px-6 bg-gen-yellow border-b-4 border-gen-dark z-20 shadow-neo pb-6 relative">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
        
        <div className="relative z-10 flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse border border-black"></div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-gen-dark">Live Feed</span>
                </div>
                <h2 className="font-display font-black text-5xl text-gen-dark leading-[0.85] drop-shadow-sm">
                    HYPE<br/><span className="text-white text-stroke-text" style={{ WebkitTextStroke: '1.5px black' }}>WALL</span>
                </h2>
            </div>
            <div className="bg-white p-2 border-4 border-gen-dark shadow-neo rotate-3">
                <Sticker size={32} className="text-gen-fuchsia" />
            </div>
        </div>
      </div>

      {/* Input Form - Sticky */}
      <div className="flex-none bg-white p-4 border-b-4 border-gen-dark z-20 relative">
         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
             <div className="flex gap-2">
                 <div className="flex-1 relative">
                    <div className="absolute top-2 left-2 text-gen-fuchsia pointer-events-none">
                        <Sparkles size={12} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="YOUR NAME"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gen-bg border-4 border-gen-dark px-3 py-3 pl-6 font-bold font-mono text-sm focus:bg-white focus:shadow-[4px_4px_0_#FF4D94] outline-none transition-all rounded-none placeholder:text-gray-400"
                    />
                 </div>
             </div>
             <div className="flex gap-2 h-14">
                <input 
                    type="text"
                    placeholder="SAY SOMETHING..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-[3] h-full bg-gen-bg border-4 border-gen-dark px-3 font-bold text-sm focus:bg-white focus:shadow-[4px_4px_0_#A3E635] outline-none transition-all rounded-none placeholder:text-gray-400"
                />
                <button 
                    type="submit"
                    className="flex-1 h-full bg-gen-dark text-white border-4 border-gen-dark hover:bg-gen-fuchsia transition-colors flex items-center justify-center shadow-neo active:shadow-none active:translate-x-1 active:translate-y-1 active:border-gen-dark"
                >
                    <Send size={20} strokeWidth={3} />
                </button>
             </div>
         </form>
      </div>

      {/* Infinite Marquee Divider */}
      <div className="bg-gen-fuchsia border-b-4 border-gen-dark py-1 overflow-hidden flex-none z-10">
          <div className="animate-marquee whitespace-nowrap font-mono text-xs font-bold text-white">
              DROP YOUR WISHES • SPREAD THE LOVE • NO BAD VIBES • ONLY HYPE • DROP YOUR WISHES • SPREAD THE LOVE •
          </div>
      </div>

      {/* Scrollable List - The "Wall" */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32 bg-[#e5e5e5] relative"
        style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      >
        <AnimatePresence initial={false}>
            {wishes.map((wish, index) => (
                <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: wish.rotation }}
                    className={`relative ${wish.color} border-4 border-gen-dark p-5 shadow-[6px_6px_0_rgba(0,0,0,0.2)] group max-w-[320px] ${index % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'}`}
                >
                    {/* Washi Tape Effect */}
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${wish.tapeColor} opacity-90 rotate-[-2deg] border-l border-r border-white/20 backdrop-blur-sm z-20 shadow-sm`}></div>

                    {/* Stamp Effect */}
                    {wish.stamp && (
                        <div className="absolute -right-4 -top-4 w-16 h-16 border-4 border-gen-dark rounded-full flex items-center justify-center bg-white/90 text-gen-dark font-black font-display text-xs rotate-12 z-30 shadow-neo-sm opacity-90 mix-blend-hard-light">
                            {wish.stamp}
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-gen-dark rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white">
                                 {wish.name.charAt(0).toUpperCase()}
                             </div>
                             <div>
                                 <h4 className="font-display font-bold text-base leading-none text-gen-dark">{wish.name}</h4>
                                 <p className="font-mono text-[10px] text-gray-500 leading-tight">MEMBER</p>
                             </div>
                        </div>
                        <button 
                            onClick={() => handleLike(wish.id)}
                            className="flex flex-col items-center gap-0 group/btn"
                        >
                            <Heart size={20} className={`transition-all ${wish.likes > 0 ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-300 group-hover/btn:text-red-400'}`} />
                            <span className="text-[10px] font-black font-mono text-gen-dark">{wish.likes}</span>
                        </button>
                    </div>

                    <div className="relative z-10">
                        <p className="font-bold text-gen-dark text-lg leading-snug font-body tracking-tight">
                            "{wish.message}"
                        </p>
                    </div>

                    {/* Corner decor */}
                    <div className="absolute bottom-1 right-1 opacity-10">
                        <Zap size={40} />
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>

        <div className="text-center py-8">
            <p className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-200 inline-block px-3 py-1 rounded-full">
                End of Wall
            </p>
        </div>
      </div>
    </div>
  );
};
