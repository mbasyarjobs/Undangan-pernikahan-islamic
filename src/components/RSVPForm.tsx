/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, User, Users, HeartHandshake, HelpCircle } from 'lucide-react';
import { ThemeConfig, RSVP } from '../types';

interface RSVPFormProps {
  theme: ThemeConfig;
  onSubmitRSVP: (rsvp: RSVP) => void;
}

export default function RSVPForm({ theme, onSubmitRSVP }: RSVPFormProps) {
  const [name, setName] = useState('');
  const [totalGuests, setTotalGuests] = useState(1);
  const [isAttending, setIsAttending] = useState<'Hadir' | 'Tidak Hadir' | 'Ragu-ragu'>('Hadir');
  const [relation, setRelation] = useState('Teman');
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    // Simulate slight commercial loading delay
    setTimeout(() => {
      onSubmitRSVP({
        name,
        totalGuests: isAttending === 'Hadir' ? totalGuests : 0,
        isAttending,
        wishes,
        relation,
      });
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setName('');
    setTotalGuests(1);
    setIsAttending('Hadir');
    setRelation('Teman');
    setWishes('');
    setIsSubmitted(false);
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl ${theme.cardLight} dark:${theme.cardDark}`}>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mb-4 shadow-inner">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-gold-200">
            Terima Kasih Banyak!
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-xs mx-auto">
            Konfirmasi kehadiran Anda berhasil dikirim dan tersimpan dengan aman. Doa restu Anda sangat berarti bagi kami.
          </p>
          <button
            id="btn-rsvp-reset"
            onClick={handleReset}
            className="mt-6 text-xs text-gold-600 hover:text-gold-700 font-semibold underline decoration-gold-400"
          >
            Kirim konfirmasi kehadiran baru
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                id="rsvp-input-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-3.5 pl-10 pr-4 text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-gold-dark/50 focus:border-gold-dark"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                Hubungan
              </label>
              <select
                id="rsvp-select-relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-3.5 px-3 text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-gold-dark/50 focus:border-gold-dark"
              >
                <option value="Keluarga">Keluarga</option>
                <option value="Teman">Teman</option>
                <option value="Rekan Kerja">Rekan Kerja</option>
                <option value="Tetangga">Tetangga</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {isAttending === 'Hadir' && (
              <div>
                <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
                  Jumlah Tamu
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <select
                    id="rsvp-select-guests"
                    value={totalGuests}
                    onChange={(e) => setTotalGuests(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-3.5 pl-10 pr-3 text-sm text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-gold-dark/50 focus:border-gold-dark"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5">5 Orang</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Hadir', label: 'Hadir', icon: CheckCircle2, color: 'text-emerald-500' },
                { id: 'Tidak Hadir', label: 'Absen', icon: HeartHandshake, color: 'text-rose-500' },
                { id: 'Ragu-ragu', label: 'Ragu', icon: HelpCircle, color: 'text-amber-500' },
              ].map((item) => {
                const isSelected = isAttending === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`rsvp-status-${item.id}`}
                    type="button"
                    onClick={() => setIsAttending(item.id as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-gold-dark bg-gold-dark/10 dark:bg-gold-mid/25'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-1 ${item.color}`} />
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Ucapan Selamat & Doa Restu
            </label>
            <textarea
              id="rsvp-input-wishes"
              required
              rows={4}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder="Tulis ucapan selamat dan doa tulus untuk kedua mempelai di sini..."
              className="w-full rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 py-3 px-4 text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-gold-dark/50 focus:border-gold-dark resize-none"
            />
          </div>

          <button
            id="btn-rsvp-submit"
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-dark to-gold-mid py-3.5 px-4 text-sm font-semibold text-white shadow-lg hover:shadow-gold-dark/20 active:scale-98 transition-all cursor-pointer border border-gold-light"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Kirim Konfirmasi Kehadiran</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
