import React from 'react';
import { Music, MapPin, Share2, Disc, MessageCircle } from 'lucide-react';

interface FloatingUIProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  activeSection: string;
  openRSVP: () => void;
}

export const FloatingUI: React.FC<FloatingUIProps> = ({ isPlaying, toggleMusic, activeSection, openRSVP }) => {
  if (activeSection === 'splash') return null;

  return (
    <>
      {/* Music Player - Top Right */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 group"
      >
        <div className={`relative bg-white border-2 border-gen-dark p-2 shadow-neo transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${isPlaying ? 'bg-gen-yellow' : ''}`}>
           <div className={`${isPlaying ? 'animate-spin-slow' : ''}`}>
             {isPlaying ? <Disc className="w-6 h-6 text-gen-dark" /> : <Music className="w-6 h-6 text-gray-400" />}
           </div>
        </div>
      </button>

      {/* Side Navigation Dots - Rectangular Style */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 items-center">
        {['hero', 'story', 'savedate', 'events', 'rsvp', 'wishes', 'gift'].map((sec) => (
          <div 
             key={sec} 
             className={`transition-all duration-300 border border-gen-dark ${activeSection === sec ? 'w-4 h-4 bg-gen-fuchsia shadow-neo-sm' : 'w-2 h-2 bg-white'}`}
          />
        ))}
      </div>

      {/* Bottom Dock - Brutalist */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4">
        <div className="flex items-center justify-between bg-white p-2 border-4 border-gen-dark shadow-neo-lg">
          
          <a href="#events" className="p-3 hover:bg-gray-100 transition-colors border-r-2 border-gray-100">
            <MapPin size={24} strokeWidth={2.5} className="text-gen-dark" />
          </a>
          
          <button 
            onClick={openRSVP}
            className="flex-1 mx-2 bg-gen-dark text-white py-3 font-display font-black text-sm uppercase tracking-wide hover:bg-gen-fuchsia transition-colors flex items-center justify-center gap-2"
          >
            RSVP <MessageCircle size={16} />
          </button>

          <button 
             onClick={() => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Mpey & Adelliarn Wedding',
                        text: 'You are invited!',
                        url: window.location.href
                    })
                }
             }}
             className="p-3 hover:bg-gray-100 transition-colors border-l-2 border-gray-100"
          >
            <Share2 size={24} strokeWidth={2.5} className="text-gen-dark" />
          </button>
        </div>
      </div>
    </>
  );
};