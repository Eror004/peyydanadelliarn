
import React, { useEffect, useRef } from 'react';
import { getYouTubeId } from '../utils';

interface MusicPlayerProps {
  source: string;
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ source, isPlaying }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Safely check if source is YouTube
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

  useEffect(() => {
    if (isYouTube) {
      if (isPlaying) {
        sendCommand('playVideo');
        sendCommand('unMute');
        // Retry play for robustness
        const t = setTimeout(() => sendCommand('playVideo'), 1000);
        return () => clearTimeout(t);
      } else {
        sendCommand('pauseVideo');
      }
    } else {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch(err => {
            console.warn("Audio play blocked or failed:", err);
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
  return (
    <audio 
      ref={audioRef} 
      src={source} 
      loop 
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
};
