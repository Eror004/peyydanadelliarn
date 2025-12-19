
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
import { MusicPlayer } from './components/MusicPlayer';
import { config } from './site-config';

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    // Slight delay to ensure DOM is ready for Youtube/Audio trigger if needed
    setTimeout(() => {
        setIsPlaying(true);
    }, 100);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-[100dvh] bg-white text-gen-dark overflow-hidden font-body">
      {/* Global Noise Texture */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-[9999]"></div>

      {/* Handles both MP3 and YouTube */}
      <MusicPlayer source={config.audio.source} isPlaying={isPlaying} />

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
