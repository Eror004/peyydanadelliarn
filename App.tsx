
import React, { useState, useEffect } from 'react';
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

  // === AUDIO LOGIC "BRUTE FORCE" ===
  // Kita pasang "jebakan" interaction. Jika audio belum jalan padahal harusnya jalan (isOpened=true),
  // sentuhan jari user berikutnya DI MANA SAJA akan memaksa audio nyala.
  useEffect(() => {
    const forcePlay = () => {
        const audio = document.getElementById('bg-music') as HTMLAudioElement;
        if (audio && isOpened && isPlaying && audio.paused) {
            audio.play().then(() => {
                console.log("Audio forced via global interaction");
                // Kalau sudah berhasil play, kita cabut listenernya biar ga berat
                document.removeEventListener('click', forcePlay);
                document.removeEventListener('touchstart', forcePlay);
                document.removeEventListener('scroll', forcePlay);
            }).catch(e => console.error("Force play blocked:", e));
        }
    };

    if (isOpened && isPlaying) {
        document.addEventListener('click', forcePlay);
        document.addEventListener('touchstart', forcePlay);
        document.addEventListener('scroll', forcePlay); // Scroll juga dihitung interaksi di beberapa browser
    }

    return () => {
        document.removeEventListener('click', forcePlay);
        document.removeEventListener('touchstart', forcePlay);
        document.removeEventListener('scroll', forcePlay);
    };
  }, [isOpened, isPlaying]);

  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    
    // DIRECT DOM ATTACK
    // Langsung cari elemen dan paksa play saat event click tombol "OPEN" terjadi.
    // Ini adalah momen paling krusial agar browser mengizinkan audio.
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
        audio.volume = 0.5; // Mulai volume sedang
        audio.play().then(() => {
            console.log("Audio started immediately!");
        }).catch((error) => {
            console.warn("Autoplay blocked immediately, waiting for fallback...", error);
            // Fallback akan ditangani oleh useEffect di atas
        });
    }
  };

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (!audio) return;

    if (audio.paused) {
        audio.play();
        setIsPlaying(true);
    } else {
        audio.pause();
        setIsPlaying(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-[100dvh] bg-white text-gen-dark overflow-hidden font-body">
      <div className="bg-noise pointer-events-none fixed inset-0 z-[9999]"></div>
      
      {/* ELEMENT AUDIO INI SELALU ADA DI DOM, TIDAK DI-RENDER KONDISIONAL */}
      <audio 
        id="bg-music"
        src={config.audio.source}
        loop
        preload="auto"
        playsInline // Penting buat iOS
        className="hidden" // Sembunyikan visualnya
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
