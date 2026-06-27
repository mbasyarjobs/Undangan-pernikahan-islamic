/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayAfterInteraction: boolean;
  isPlaying: boolean;
  onTogglePlay: (playing: boolean) => void;
}

export default function AudioPlayer({
  autoPlayAfterInteraction,
  isPlaying,
  onTogglePlay,
}: AudioPlayerProps) {
  // Use a beautiful version of Christina Perri - A Thousand Years
  const audioUrl = 'https://archive.org/download/christina-perri-a-thousand-years_202108/christina-perri-a-thousand-years_202108.mp3'; // Highly reliable wedding background music
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Create audio element lazily
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay blocked or audio interrupted:', error);
          onTogglePlay(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, onTogglePlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTogglePlay = () => {
    onTogglePlay(!isPlaying);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        id="btn-music-mute"
        onClick={handleToggleMute}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900/80 text-white shadow-lg backdrop-blur-md transition-all hover:bg-stone-800 dark:bg-white/80 dark:text-stone-900 dark:hover:bg-white"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5 animate-pulse" />}
      </button>

      <button
        id="btn-music-play"
        onClick={handleTogglePlay}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-105 ${
          isPlaying
            ? 'bg-amber-600 dark:bg-amber-500 animate-spin-slow'
            : 'bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100'
        }`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <div className="relative">
            <Music className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white dark:bg-stone-950 animate-ping" />
          </div>
        ) : (
          <Play className="h-6 w-6 ml-1 text-white dark:text-stone-900" />
        )}
      </button>
    </div>
  );
}
