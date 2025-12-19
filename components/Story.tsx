
import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../site-config';

export const Story: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col pt-16 bg-white overflow-hidden relative border-x-4 border-gen-dark">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
             style={{ 
                 backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', 
                 backgroundSize: '24px 24px' 
             }}
        ></div>
        
        {/* Floating Background Elements */}
        <motion.div 
            animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[-50px] w-64 h-64 bg-gen-pink/10 rounded-full blur-3xl pointer-events-none z-0"
        />
        <motion.div 
            animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-[-50px] w-64 h-64 bg-gen-blue/10 rounded-full blur-3xl pointer-events-none z-0"
        />

        {/* Header */}
        <div className="flex-none mb-6 z-10 px-6 relative">
            <div className="inline-block bg-gen-dark text-white px-4 py-1 font-mono text-xs mb-2 rotate-[-2deg] shadow-neo-sm">
                CHAPTER 1 - THE BEGINNING
            </div>
            <h2 className="font-display font-black text-5xl text-gen-dark leading-none drop-shadow-neo-sm">
                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gen-pink to-gen-blue">LOVE</span>
            </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32 z-0 relative">
            {/* Dashed Timeline Line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-1 border-l-4 border-dashed border-gray-300 z-0"></div>

            <div className="flex flex-col gap-8 py-4 px-6 relative z-10">
                {config.story.map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", delay: index * 0.1 }}
                        className="relative pl-8"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-0 w-6 h-6 bg-gen-yellow border-4 border-gen-dark rounded-full z-10"></div>

                        <div className={`relative group p-4 border-4 border-gen-dark bg-white shadow-neo transition-transform hover:-translate-y-1
                            ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
                        `}>
                            <div className="flex justify-between items-start mb-2 border-b-2 border-black pb-2">
                                <span className="font-display font-black text-xl text-gen-fuchsia">{item.year}</span>
                                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded border border-black">
                                    EVENT_ID: 0{index+1}
                                </span>
                            </div>
                            <h3 className="font-display font-bold text-lg mb-1 leading-tight uppercase">{item.title}</h3>
                            <p className="font-mono text-xs leading-relaxed text-gray-600 font-bold">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
                
            {/* Photo Dump Section */}
            <div className="mt-12 mb-8 border-t-4 border-gen-dark pt-8 bg-gen-bg relative">
                {/* Background for Gallery section to differentiate */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                
                <div className="px-6 mb-4 relative z-10">
                    <h3 className="font-display font-black text-2xl text-gen-dark bg-white inline-block px-2 border-2 border-gen-dark shadow-neo-sm transform -rotate-1">
                        EVIDENCE 📸
                    </h3>
                </div>
                
                {/* Horizontal Scroll */}
                <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 gap-6 pb-8 py-4 relative z-10">
                    {config.images.gallery.map((img, i) => (
                        <motion.div 
                            key={i}
                            className="flex-none w-56 snap-center relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                        >
                            <div className={`bg-white p-2 shadow-neo border-4 border-gen-dark 
                                ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'} 
                                hover:rotate-0 transition-all duration-300`}
                            >
                                <div className="aspect-[3/4] overflow-hidden border-2 border-gen-dark grayscale hover:grayscale-0 transition-all">
                                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="mt-2 text-center border-t-2 border-gen-dark pt-1">
                                    <span className="font-mono text-[10px] font-bold">IMG_00{i+1}.JPG</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="w-2 flex-none"></div>
                </div>
            </div>
        </div>
    </div>
  );
};
