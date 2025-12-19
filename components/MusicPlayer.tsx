
import React, { useEffect, useRef } from 'react';
import { getYouTubeId } from '../utils';

interface MusicPlayerProps {
  source: string;
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ source, isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  
  const youtubeId = getYouTubeId(source);
  const isYouTube = !!youtubeId;

  useEffect(() => {
    if (!isYouTube) {
      // Handle HTML5 Audio
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        } else {
          audioRef.current.pause();
        }
      }
    } else {
      // Handle YouTube Iframe
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const action = isPlaying ? 'playVideo' : 'pauseVideo';
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: action, args: [] }), 
          '*'
        );
      }
    }
  }, [isPlaying, isYouTube]);

  if (isYouTube && youtubeId) {
    return (
      <div className="fixed -bottom-[200px] left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1`}
          title="Background Music"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
      </div>
    );
  }

  return (
    <audio 
        ref={audioRef} 
        src={source} 
        loop 
        preload="auto"
    />
  );
};
