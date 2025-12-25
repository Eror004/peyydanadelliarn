
import React from 'react';

// Komponen ini sekarang kosong karena element <audio> dipindah ke App.tsx
// untuk kontrol DOM langsung yang lebih reliable.
// Logic UI (Tombol Mute/Unmute) ada di FloatingUI.tsx
interface MusicPlayerProps {
  source: string;
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = () => {
  return null; 
};
