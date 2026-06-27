/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Calendar, Check, X, HelpCircle, Users } from 'lucide-react';
import { ThemeConfig, Wish } from '../types';

interface WishesListProps {
  theme: ThemeConfig;
  wishes: Wish[];
}

export default function WishesList({ theme, wishes }: WishesListProps) {
  const [filter, setFilter] = useState<'Semua' | 'Hadir' | 'Tidak Hadir'>('Semua');

  const filteredWishes = wishes.filter((wish) => {
    if (filter === 'Semua') return true;
    return wish.isAttending === filter;
  });

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      // Premium Indonesian formatting
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Intl.DateTimeFormat('id-ID', options).format(date);
    } catch (e) {
      return 'Baru saja';
    }
  };

  const getStatusBadge = (status: Wish['isAttending']) => {
    switch (status) {
      case 'Hadir':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Check className="h-2.5 w-2.5" />
            <span>Hadir</span>
          </span>
        );
      case 'Tidak Hadir':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <X className="h-2.5 w-2.5" />
            <span>Absen</span>
          </span>
        );
      case 'Ragu-ragu':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <HelpCircle className="h-2.5 w-2.5" />
            <span>Ragu</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* List Header and Filter Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-4 select-none">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gold-dark" />
          <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-gold-200">
            Ucapan Doa & Harapan ({wishes.length})
          </h3>
        </div>

        {/* Attendance Filters */}
        <div className="flex rounded-lg bg-stone-100 dark:bg-zinc-900 p-0.5 border border-stone-200 dark:border-stone-800">
          {(['Semua', 'Hadir', 'Tidak Hadir'] as const).map((tab) => (
            <button
              key={tab}
              id={`wishes-tab-${tab.replace(' ', '-')}`}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-white dark:bg-zinc-800 text-gold-dark dark:text-gold-light shadow-sm'
                  : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Guest Wishes Feed */}
      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-gold-dark">
        {filteredWishes.length === 0 ? (
          <div className="text-center py-12 text-stone-400 text-xs">
            Belum ada ucapan yang cocok dengan filter ini.
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredWishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                className={`p-4 rounded-3xl border transition-all ${
                  theme.id === 'islamic'
                    ? 'bg-white/70 dark:bg-zinc-900/50 border-gold-mid/30 dark:border-gold-mid/10 hover:border-gold-dark'
                    : 'bg-stone-50/80 dark:bg-zinc-900/40 border-stone-200/50 dark:border-stone-800 hover:border-stone-400/50'
                }`}
              >
                {/* Wish Metadata Header */}
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-100 flex items-center gap-1.5 flex-wrap">
                      <span>{wish.name}</span>
                      <span className="inline-flex items-center gap-1 rounded bg-stone-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-medium text-stone-500 dark:text-stone-400">
                        <Users className="h-2 w-2" />
                        <span>{wish.relation}</span>
                      </span>
                    </h4>
                    <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{formatDate(wish.timestamp)}</span>
                    </span>
                  </div>
                  {getStatusBadge(wish.isAttending)}
                </div>

                {/* Message Bubble Body */}
                <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line bg-stone-100/40 dark:bg-stone-950/30 p-2.5 rounded-xl border border-stone-200/20">
                  {wish.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
