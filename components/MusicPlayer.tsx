
import React, { useEffect, useRef } from 'react';
import { getYouTubeId } from '../utils';

interface MusicPlayerProps {
  source: string;
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ source, isPlaying }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const youtubeId = source ? getYouTubeId(source) : null;
  const isYouTube = !!youtubeId;

  // Function to send commands to YouTube Iframe
  const sendCommand = (func: string, args: any[] = []) => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      }
    } catch (e) {
      console.warn("YouTube control error:", e);
    }
  };

  // React State Handling (For toggling music via the floating button)
  useEffect(() => {
    if (isYouTube) {
      if (isPlaying) {
        sendCommand('playVideo');
      } else {
        sendCommand('pauseVideo');
      }
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          // We catch the error here just in case, but the main play 
          // should happen in App.tsx handleOpen for the first time
          audioRef.current.play().catch(err => {
            console.log("State-based play blocked (expected if no interaction):", err);
          });
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [isPlaying, isYouTube]);

  // If YouTube
  if (isYouTube && youtubeId) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    // Added allow="autoplay" explicitly
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&mute=0&controls=0&loop=1&playlist=${youtubeId}&origin=${origin}&playsinline=1&rel=0`;

    return (
      <div className="fixed -bottom-[500px] left-0 w-1 h-1 opacity-0 pointer-events-none z-[-1] overflow-hidden">
        <iframe
          ref={iframeRef}
          id="youtube-player"
          width="100%"
          height="100%"
          src={embedUrl}
          title="Wedding Music"
          allow="autoplay; encrypted-media"
          style={{ border: 0 }}
        />
      </div>
    );
  }

  // If Direct MP3
  // PENTING: ID "wedding-audio" digunakan oleh App.tsx untuk memaksa play saat tombol diklik
  return (
    <audio 
      ref={audioRef}
      id="wedding-audio" 
      src={source} 
      loop 
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
};
