
import React, { useEffect, useRef } from 'react';
import { getYouTubeId } from '../utils';

interface MusicPlayerProps {
  source: string;
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ source, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const youtubeId = source ? getYouTubeId(source) : null;
  const isYouTube = !!youtubeId;

  // Toggle Play/Pause berdasarkan state (Untuk tombol floating music)
  useEffect(() => {
    if (!isYouTube && audioRef.current) {
      if (isPlaying) {
        // SAFETY CHECK: Hanya play jika sedang pause
        // Ini mencegah error "The play() request was interrupted" jika App.tsx sudah memainkannya duluan
        if (audioRef.current.paused) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
             playPromise.catch(e => console.log("State play blocked (handled):", e));
          }
        }
      } else {
        // Pause jika sedang playing
        if (!audioRef.current.paused) {
           audioRef.current.pause();
        }
      }
    }
  }, [isPlaying, isYouTube]);

  // Render YouTube (Legacy support)
  if (isYouTube && youtubeId) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return (
      <div className="fixed -bottom-[200px] left-0 w-1 h-1 opacity-0 pointer-events-none">
        <iframe
          id="youtube-player"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&mute=0&controls=0&loop=1&playlist=${youtubeId}&origin=${origin}&playsinline=1`}
          title="Wedding Music"
          allow="autoplay; encrypted-media"
        />
      </div>
    );
  }

  // Render MP3 Native
  return (
    <audio 
      ref={audioRef}
      id="wedding-audio" 
      src={source} 
      loop 
      preload="auto"
      // PENTING: playsInline membantu stabilitas di iOS Safari
      playsInline
      className="fixed bottom-0 left-0 w-1 h-1 opacity-0 pointer-events-none z-[-1]" 
    />
  );
};
