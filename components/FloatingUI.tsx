
import React, { useState } from 'react';
import { Music, MapPin, Share2, Disc, MessageCircle, Check, Link as LinkIcon } from 'lucide-react';

interface FloatingUIProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  activeSection: string;
  openRSVP: () => void;
  goToMap: () => void;
}

export const FloatingUI: React.FC<FloatingUIProps> = ({ isPlaying, toggleMusic, activeSection, openRSVP, goToMap }) => {
  const [copied, setCopied] = useState(false);

  if (activeSection === 'splash') return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mpey & Adelliarn Wedding',
          text: 'You are invited to the wedding of Mpey & Adelliarn!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback for desktop/unsupported browsers
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy');
      }
    }
  };

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
        <div className="flex items-center justify-between bg-white p-2 border-4 border-gen-dark shadow-neo-lg relative">
          
          {/* Location Button */}
          <button 
            onClick={goToMap}
            className="p-3 hover:bg-gray-100 transition-colors border-r-2 border-gray-100 text-gen-dark"
            aria-label="Go to Map"
          >
            <MapPin size={24} strokeWidth={2.5} />
          </button>
          
          {/* RSVP Button (Main) */}
          <button 
            onClick={openRSVP}
            className="flex-1 mx-2 bg-gen-dark text-white py-3 font-display font-black text-sm uppercase tracking-wide hover:bg-gen-fuchsia transition-colors flex items-center justify-center gap-2 shadow-sm active:translate-y-0.5 active:shadow-none"
          >
            RSVP <MessageCircle size={16} />
          </button>

          {/* Share Button with Copied Feedback */}
          <button 
             onClick={handleShare}
             className="p-3 hover:bg-gray-100 transition-colors border-l-2 border-gray-100 text-gen-dark relative overflow-hidden w-[52px]"
             aria-label="Share"
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${copied ? '-translate-y-full' : 'translate-y-0'}`}>
                <Share2 size={24} strokeWidth={2.5} />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 bg-green-100 ${copied ? 'translate-y-0' : 'translate-y-full'}`}>
                <Check size={24} className="text-green-600" strokeWidth={3} />
            </div>
          </button>
        </div>
        
        {/* Toast for Desktop Copy Feedback */}
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gen-dark text-white text-xs font-mono py-1 px-3 pointer-events-none transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
            LINK COPIED!
        </div>
      </div>
    </>
  );
};
