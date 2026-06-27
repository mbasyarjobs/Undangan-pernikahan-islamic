/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, MapPin } from 'lucide-react';
import { ThemeConfig } from '../types';
import Ornaments from './Ornaments';

interface WeddingCoverProps {
  groomName: string;
  brideName: string;
  dateString: string;
  theme: ThemeConfig;
  onOpen: () => void;
}

export default function WeddingCover({
  groomName,
  brideName,
  dateString,
  theme,
  onOpen,
}: WeddingCoverProps) {
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');

  useEffect(() => {
    // Read query parameter for guest name (e.g. ?to=Bapak+Rahmat or ?guest=...)
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('guest') || params.get('nama');
    if (to) {
      setGuestName(decodeURIComponent(to));
    }
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-6 overflow-hidden ${
        theme.id === 'islamic'
          ? 'bg-cream text-ink'
          : theme.id === 'floral'
          ? 'bg-gradient-to-b from-slate-50 via-slate-100 to-emerald-50 text-slate-800'
          : theme.id === 'rustic'
          ? 'bg-gradient-to-b from-orange-50/20 via-orange-100/10 to-stone-100 text-stone-800'
          : 'bg-white text-neutral-800'
      }`}
    >
      {/* Geometric balance pattern overlay */}
      <div className="geometric-pattern" />

      {/* Dynamic theme background ornaments */}
      {theme.id === 'islamic' && (
        <>
          <Ornaments type="mandala" className="w-[120%] h-[120%] top-[-30%] left-[-10%] opacity-[0.04]" />
          <Ornaments type="mandala" className="w-[120%] h-[120%] bottom-[-40%] right-[-10%] opacity-[0.04]" />
          <Ornaments type="lantern" className="top-0 left-8" />
          <Ornaments type="lantern" className="top-0 right-8" />
        </>
      )}

      {/* Header Decorative */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mt-12 z-10"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-bold mb-1 block">
          UNDANGAN PERNIKAHAN
        </span>
        {theme.id === 'islamic' ? (
          <h2 className="font-arabic text-3xl md:text-4xl text-gold-dark font-semibold mb-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </h2>
        ) : (
          <div className="h-[2px] w-12 bg-current mx-auto my-2 opacity-30" />
        )}
      </motion.div>

      {/* Main Bride & Groom Titles */}
      <div className="text-center my-auto py-8 z-10 flex flex-col items-center justify-center">
        {theme.id === 'islamic' && (
          <span className="font-arabic text-4xl md:text-5xl text-gold-dark/80 mb-4 tracking-wide block animate-pulse-subtle">
            بارَكَ اللهُ لَكُما
          </span>
        )}

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold-dark font-bold tracking-tight px-4 leading-normal"
        >
          {groomName}
          <span className="block font-script text-4xl sm:text-5xl md:text-6xl text-gold-mid my-2 font-normal">
            &
          </span>
          {brideName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 flex items-center gap-3 text-sm text-stone-600 font-medium"
        >
          <Calendar className="h-4 w-4 text-gold-dark" />
          <span>{dateString}</span>
        </motion.div>
      </div>

      {/* Guest Greeting and Button Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full max-w-sm text-center mb-12 z-10 px-4"
      >
        <div className="rounded-3xl bg-white/80 dark:bg-stone-900/60 p-6 shadow-[0_4px_24px_rgba(139,107,53,0.06)] border border-gold-mid/20 backdrop-blur-md mb-6">
          <p className="text-xs text-stone-500 tracking-wider mb-2 uppercase">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h3 className="font-serif text-lg md:text-xl font-bold text-ink dark:text-gold-light px-2 line-clamp-2">
            {guestName}
          </h3>
          <p className="text-[11px] text-stone-400 mt-2 italic">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Buka Undangan Button */}
        <button
          id="btn-open-invitation"
          onClick={onOpen}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark to-gold-mid py-3.5 px-8 text-sm font-semibold text-white shadow-xl hover:shadow-gold-dark/20 active:scale-95 transition-all cursor-pointer border border-gold-light"
        >
          <Mail className="h-4 w-4 animate-bounce" />
          <span>Buka Undangan</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
