/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Music, Play, VolumeX, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: (playing: boolean) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function AudioPlayer({
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
}: AudioPlayerProps) {
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTogglePlay(!isPlaying);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMute();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            id="btn-music-mute"
            onClick={handleToggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-stone-900/95 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800/80 shadow-md backdrop-blur-md transition-all hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer active:scale-95"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Suara Hidup' : 'Senyap'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-rose-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-500" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <button
        id="btn-music-play"
        onClick={handleTogglePlay}
        className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95 ${
          isPlaying
            ? 'bg-gold-dark border-gold-mid/30 text-white shadow-gold-dark/10'
            : 'bg-white/90 dark:bg-stone-900/95 border-stone-200/60 dark:border-stone-800/80 text-gold-dark dark:text-gold-light'
        }`}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="flex items-center justify-center"
          >
            <Music className="h-4 w-4 text-white" />
          </motion.div>
        ) : (
          <Play className="h-4 w-4 ml-0.5 text-gold-dark dark:text-gold-light" />
        )}
      </button>
    </div>
  );
}
