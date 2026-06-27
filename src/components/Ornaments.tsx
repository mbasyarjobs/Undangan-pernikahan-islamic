/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface OrnamentProps {
  type: 'mandala' | 'lantern' | 'corner' | 'sparkle' | 'divider';
  className?: string;
  themeId?: string;
}

export default function Ornaments({ type, className = '', themeId = 'islamic' }: OrnamentProps) {
  if (themeId === 'islamic') {
    switch (type) {
      case 'mandala':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5 }}
            className={`absolute pointer-events-none select-none ${className}`}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="animate-spin-slow text-gold-500"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="1,2" />
              <circle cx="50" cy="50" r="40" />
              {/* Geometric Islamic Star Pattern (8-point star combo) */}
              <path d="M 50 10 L 90 50 L 50 90 L 10 50 Z" />
              <path d="M 21.72 21.72 L 78.28 21.72 L 78.28 78.28 L 21.72 78.28 Z" transform="rotate(45 50 50)" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="10" strokeWidth="0.2" strokeDasharray="0.5, 0.5" />
              {/* Petals */}
              {Array.from({ length: 8 }).map((_, i) => (
                <path
                  key={i}
                  d="M 50 50 C 45 30, 55 30, 50 15 C 45 30, 55 30, 50 50"
                  transform={`rotate(${i * 45} 50 50)`}
                  strokeWidth="0.3"
                />
              ))}
            </svg>
          </motion.div>
        );

      case 'lantern':
        return (
          <div className={`absolute pointer-events-none select-none ${className}`}>
            <svg
              width="40"
              height="120"
              viewBox="0 0 40 120"
              fill="none"
              className="text-gold-500 animate-float-gentle"
            >
              {/* Rope */}
              <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1" />
              {/* Lantern cap */}
              <path d="M 12 40 L 28 40 L 20 30 Z" fill="currentColor" opacity="0.8" />
              {/* Lantern body */}
              <path d="M 8 45 L 32 45 L 36 75 L 20 90 L 4 75 Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(219, 187, 114, 0.05)" />
              {/* Geometric details inside lantern */}
              <line x1="20" y1="45" x2="20" y2="90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1,1" />
              <path d="M 14 55 Q 20 62 26 55" stroke="currentColor" strokeWidth="0.8" />
              <path d="M 14 65 Q 20 72 26 65" stroke="currentColor" strokeWidth="0.8" />
              <path d="M 16 75 L 20 85 L 24 75" stroke="currentColor" strokeWidth="0.8" />
              {/* Little tassel */}
              <line x1="20" y1="90" x2="20" y2="105" stroke="currentColor" strokeWidth="1" />
              <circle cx="20" cy="108" r="2" fill="currentColor" />
            </svg>
          </div>
        );

      case 'corner':
        return (
          <div className={`absolute pointer-events-none select-none ${className}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold-500/60">
              {/* Premium geometric corner framing */}
              <path d="M 2 40 L 2 2 L 40 2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 6 40 L 6 6 L 40 6" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
              <circle cx="4" cy="4" r="1.5" fill="currentColor" />
            </svg>
          </div>
        );

      case 'sparkle':
        return (
          <div className={`absolute pointer-events-none select-none ${className}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-400 animate-pulse"
            >
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" fill="currentColor" />
            </svg>
          </div>
        );

      case 'divider':
        return (
          <div className={`flex items-center justify-center gap-4 my-6 select-none ${className}`}>
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold-500">
              {/* Islamic Star */}
              <path
                d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5Z"
                fill="currentColor"
              />
              <circle cx="12" cy="11" r="2" fill="currentColor" className="text-white dark:text-zinc-900" />
            </svg>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
        );
    }
  }

  // Floral Ornaments as Fallback or other themes
  switch (type) {
    case 'mandala':
      return (
        <div className={`absolute pointer-events-none select-none opacity-10 ${className}`}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-spin-slow">
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d="M 50 50 C 40 30, 60 30, 50 10 C 40 30, 60 30, 50 50"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>
      );
    case 'lantern':
      return null; // Only for islamic
    case 'corner':
      return (
        <div className={`absolute pointer-events-none select-none opacity-40 ${className}`}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 0 0 C 15 0, 30 15, 30 30 C 30 20, 20 10, 0 0" />
            <circle cx="15" cy="15" r="2" fill="currentColor" />
          </svg>
        </div>
      );
    case 'divider':
      return (
        <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
          <div className="h-[1px] w-10 bg-current opacity-30" />
          <span className="text-lg">🌸</span>
          <div className="h-[1px] w-10 bg-current opacity-30" />
        </div>
      );
    case 'sparkle':
    default:
      return (
        <div className={`absolute pointer-events-none select-none opacity-60 animate-pulse ${className}`}>
          ✨
        </div>
      );
  }
}
