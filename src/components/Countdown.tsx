/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ThemeConfig } from '../types';

interface CountdownProps {
  targetDate: Date;
  theme: ThemeConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function Countdown({ targetDate, theme }: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    } else {
      timeLeft.isExpired = true;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeItems = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  if (timeLeft.isExpired) {
    return (
      <div className="text-center p-6 rounded-3xl bg-gold-dark/10 border border-gold-mid/20 max-w-sm mx-auto">
        <h4 className="font-serif font-bold text-gold-dark dark:text-gold-light text-lg">
          Acara Sedang / Telah Berlangsung!
        </h4>
        <p className="text-xs text-stone-500 mt-1">
          Atas doa restu Anda, kami mengucapkan terima kasih.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 my-4 select-none">
      {timeItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`flex flex-col items-center justify-center w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-3xl bg-glass ${
            theme.id === 'islamic'
              ? 'bg-white/80 dark:bg-zinc-900/80 border border-gold-mid/35 dark:border-gold-mid/20 shadow-lg shadow-gold-dark/5'
              : theme.id === 'floral'
              ? 'bg-white/80 dark:bg-slate-900/80 border border-emerald-200/50 dark:border-emerald-500/20 shadow-md'
              : 'bg-stone-100/90 dark:bg-zinc-900/90 border border-stone-200 dark:border-stone-800'
          }`}
        >
          {/* Digits with a very slight glowing overlay */}
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-gold-dark dark:text-gold-light tracking-tight leading-none">
            {item.value.toString().padStart(2, '0')}
          </span>
          
          {/* Label underneath */}
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-widest text-stone-500 dark:text-stone-400 uppercase mt-2">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
