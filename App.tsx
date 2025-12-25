
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Splash } from './components/Splash';
import { Section } from './components/Section';
import { FloatingUI } from './components/FloatingUI';
import { Hero } from './components/Hero';
import { SaveTheDate } from './components/SaveTheDate';
import { Story } from './components/Story';
import { EventsAndMap } from './components/EventsAndMap';
import { RSVP } from './components/RSVP';
import { Wishes } from './components/Wishes';
import { Gift } from './components/Gift';
import { Footer } from './components/Footer';
import { config } from './site-config';

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Ref langsung ke elemen audio
  const audioRef = useRef<HTMLAudioElement>(null);

  // Scroll Spy Logic
  useEffect(() => {
    if (!isOpened) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isOpened]);

  // === STRATEGI AUDIO "NUCLEAR" ===
  
  // 1. Sync State React dengan Audio Element
  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) {
            // Coba play, tangkap error jika browser blokir
            audioRef.current.play().catch(err => {
                console.warn("Autoplay blocked via Effect:", err);
                // Jangan set isPlaying false disini, biarkan user interaction handler menangani
            });
        } else {
            audioRef.current.pause();
        }
    }
  }, [isPlaying]);

  // 2. Fallback: Global Interaction Listener
  // Jika tombol OPEN gagal memutar lagu (biasanya di iOS),
  // sentuhan jari berikutnya di MANA SAJA akan memicu lagu.
  useEffect(() => {
    const handleGlobalClick = () => {
        if (isOpened && isPlaying && audioRef.current && audioRef.current.paused) {
            audioRef.current.play().then(() => {
                console.log("Audio started via Global Click Fallback");
            }).catch(e => console.error("Global click play failed", e));
        }
    };

    // Pasang listener di window
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('touchstart', handleGlobalClick);

    return () => {
        window.removeEventListener('click', handleGlobalClick);
        window.removeEventListener('touchstart', handleGlobalClick);
    };
  }, [isOpened, isPlaying]);


  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    
    // 3. Direct Play pada Event Click "OPEN"
    if (audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().then(() => {
            console.log("Audio started directly on Open");
        }).catch((error) => {
            console.error("Audio failed on Open button (Waiting for fallback):", error);
        });
    }
  };

  const toggleMusic = () => {
    setIsPlaying(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-[100dvh] bg-white text-gen-dark overflow-hidden font-body">
      <div className="bg-noise pointer-events-none fixed inset-0 z-[9999]"></div>

      {/* AUDIO ELEMENT DI ROOT - SELALU ADA DI DOM */}
      {/* Menggunakan opacity 0, bukan hidden, agar browser tidak mematikan resource */}
      <audio 
        ref={audioRef}
        id="wedding-audio"
        src={config.audio.source}
        loop
        preload="auto"
        playsInline
        className="fixed bottom-0 left-0 w-1 h-1 opacity-0 pointer-events-none z-[-1]"
      />

      <AnimatePresence mode="wait">
        {!isOpened && <Splash key="splash" onOpen={handleOpen} />}
      </AnimatePresence>

      <main 
        className={`h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth transition-opacity duration-700 ${isOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Section id="hero"><Hero /></Section>
        <Section id="story"><Story /></Section>
        <Section id="savedate"><SaveTheDate /></Section>
        <Section id="events"><EventsAndMap /></Section>
        <Section id="rsvp"><RSVP /></Section>
        <Section id="wishes"><Wishes /></Section>
        <Section id="gift"><Gift /></Section>
        <Section id="footer"><Footer /></Section>
      </main>

      {isOpened && (
        <FloatingUI 
            isPlaying={isPlaying} 
            toggleMusic={toggleMusic} 
            activeSection={activeSection}
            openRSVP={() => scrollToSection('rsvp')}
            goToMap={() => scrollToSection('events')}
        />
      )}
    </div>
  );
};

export default App;
