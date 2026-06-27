/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Instagram,
  ArrowUp,
  BookOpen,
  Sparkles,
  Map,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

// Core imports
import { ThemeConfig, Wish, RSVP } from './types';
import {
  THEME_PRESETS,
  GROOM_DATA,
  BRIDE_DATA,
  WEDDING_DATE,
  AKAD_EVENT,
  RESEPSI_EVENT,
  LOVE_STORIES,
  GALLERY_PHOTOS,
  GIFT_ACCOUNTS,
  DEFAULT_WISHES
} from './data';

// Component imports
import Ornaments from './components/Ornaments';
import WeddingCover from './components/WeddingCover';
import Countdown from './components/Countdown';
import RSVPForm from './components/RSVPForm';
import WishesList from './components/WishesList';
import GiftSection from './components/GiftSection';
import AudioPlayer from './components/AudioPlayer';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEME_PRESETS[0]); // Default to Islamic Putih & Gold
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and load audio element on mount
  useEffect(() => {
    // Beautiful, romantic, high-quality direct streaming wedding audio
    const audio = new Audio('https://archive.org/download/christina-perri-a-thousand-years_202108/christina-perri-a-thousand-years_202108.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const fallbacks = [
      'https://assets.mixkit.co/music/preview/mixkit-wedding-bells-2182.mp3',
      'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    ];
    let fallbackIndex = 0;

    const handleError = () => {
      if (fallbackIndex < fallbacks.length) {
        console.warn('Primary audio failed, switching to fallback...');
        audio.src = fallbacks[fallbackIndex];
        fallbackIndex++;
        // If it was already supposed to play, keep playing
        if (isPlaying) {
          audio.play().catch(e => console.log('Fallback autoplay deferred:', e));
        }
      }
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Synchronize mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Load and save state
  useEffect(() => {
    // Guestbook localStorage loading
    const savedWishes = localStorage.getItem('wedding_wishes_basyar_khadijah');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    } else {
      setWishes(DEFAULT_WISHES);
    }

    // Scroll display toggle
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme-Mode syncing
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Playback block on open:', err);
      });
    }
  };

  const handleTogglePlay = (playing: boolean) => {
    setIsPlaying(playing);
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch((err) => {
          console.warn('Playback block on toggle:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleSelectTheme = (theme: ThemeConfig) => {
    setCurrentTheme(theme);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddRSVP = (rsvp: RSVP) => {
    const newWish: Wish = {
      id: `w-${Date.now()}`,
      name: rsvp.name,
      relation: rsvp.relation as any,
      message: rsvp.wishes,
      timestamp: new Date().toISOString(),
      isAttending: rsvp.isAttending,
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes_basyar_khadijah', JSON.stringify(updatedWishes));
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Human date formatting for the hero header
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(WEDDING_DATE);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-gold-500 selection:text-white ${
        currentTheme.bgLight
      } dark:${currentTheme.bgDark} ${
        isDarkMode ? 'dark text-zinc-100' : 'text-stone-800'
      }`}
    >
      {/* 1. Cover Welcome Screen */}
      <AnimatePresence>
        {!isOpen && (
          <WeddingCover
            groomName={GROOM_DATA.name}
            brideName={BRIDE_DATA.name}
            dateString="Senin, 20 Juli 2026"
            theme={currentTheme}
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Invitation Content */}
      {isOpen && (
        <div className="relative w-full">
          {/* Theme Switcher controls at top */}
          <ThemeSelector
            currentTheme={currentTheme}
            onSelectTheme={handleSelectTheme}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />

          {/* Background Audio control floating at bottom */}
          <AudioPlayer
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted(!isMuted)}
          />

          {/* Core Content Shell - Centered container that maximizes phone visual appeal and expands cleanly on desktop */}
          <main className="w-full max-w-[480px] mx-auto min-h-screen relative shadow-2xl bg-white dark:bg-zinc-950 border-x border-stone-200/50 dark:border-zinc-800/80">
            {/* Geometric balance pattern overlay */}
            <div className="geometric-pattern" />

            {/* Global background sparkles */}
            <div className="sparkle-particles opacity-30 dark:opacity-20" />

            {/* A. Hero Banner / Cover Section */}
            <section className="relative min-h-[92vh] flex flex-col justify-between items-center p-6 text-center overflow-hidden">
              <Ornaments type="mandala" className="w-[110%] h-[110%] top-[-10%] opacity-[0.05]" />
              {currentTheme.id === 'islamic' && <Ornaments type="lantern" className="top-16 left-12" />}
              {currentTheme.id === 'islamic' && <Ornaments type="lantern" className="top-16 right-12" />}

              <div className="mt-20 z-10">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-600 dark:text-gold-400 font-bold block mb-1">
                  WALIMATUL 'URS
                </span>
                <span className="h-[1px] w-12 bg-gold-400 mx-auto block my-2" />
              </div>

              {/* Central Couple Name with custom layout */}
              <div className="z-10 py-10">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-script text-5xl md:text-6xl text-gold-500 block mb-1"
                >
                  The Wedding of
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-600 dark:text-gold-200 uppercase tracking-wide leading-tight px-4"
                >
                  {GROOM_DATA.fullName}
                  <span className="block font-script text-4xl text-gold-500 font-normal my-1 text-transform-none lowercase">
                    dan
                  </span>
                  {BRIDE_DATA.fullName}
                </motion.h2>
              </div>

              {/* Date & Location summary */}
              <div className="mb-12 z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 dark:bg-gold-500/20 px-4 py-1.5 text-xs font-bold text-gold-600 dark:text-gold-400 border border-gold-500/20">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formattedDate}</span>
                </span>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] max-w-[280px] mx-auto leading-relaxed">
                  Cengkareng, Jakarta Barat
                </p>
                <div className="flex justify-center text-gold-500/80">
                  <Sparkles className="h-5 w-5 animate-bounce" />
                </div>
              </div>
            </section>

            {/* B. Opening Q.S. Ar-Rum Verse */}
            <section className="px-6 py-16 text-center relative overflow-hidden bg-stone-50/50 dark:bg-zinc-900/20 border-y border-stone-200/30 dark:border-zinc-800/30">
              <div className="absolute inset-0 bg-radial-gradient from-gold-500/5 via-transparent to-transparent opacity-40" />
              <div className="relative z-10 max-w-sm mx-auto space-y-6">
                <Ornaments type="divider" themeId={currentTheme.id} />

                {currentTheme.id === 'islamic' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="font-arabic text-xl md:text-2xl text-gold-600 dark:text-gold-400 leading-loose"
                  >
                    وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                  </motion.p>
                )}

                <motion.blockquote
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-xs md:text-sm italic leading-relaxed text-stone-600 dark:text-stone-300"
                >
                  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
                  <span className="block font-bold mt-2 not-italic text-[10px] uppercase tracking-wider text-gold-600">
                    — Q.S. Ar-Rum: 21
                  </span>
                </motion.blockquote>

                <p className="text-xs text-stone-500 leading-relaxed mt-4">
                  Assalamu'alaikum Warahmatullahi Wabarakatuh.
                  <br />
                  Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:
                </p>

                <Ornaments type="divider" themeId={currentTheme.id} />
              </div>
            </section>

            {/* C. Mempelai (Bride & Groom Profiles) */}
            <section className="px-6 py-20 relative overflow-hidden space-y-16">
              <div className="text-center z-10 relative">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">MEMPELAI</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-800 dark:text-gold-200">
                  Kedua Mempelai
                </h3>
              </div>

              {/* Groom Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Photo Frame Container */}
                <div className="relative">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-gold-400/40 animate-spin-slow pointer-events-none" />
                  <div className="absolute -inset-1 rounded-full border border-gold-500 pointer-events-none" />
                  <div className="h-44 w-44 rounded-full overflow-hidden shadow-2xl relative">
                    <img
                      src={GROOM_DATA.photoUrl}
                      alt={GROOM_DATA.fullName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-gold-200">
                    {GROOM_DATA.fullName}
                  </h4>
                  <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold tracking-wider italic">
                    — M. Khoirul Basyar —
                  </p>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Putra kedua dari pasangan:
                  <br />
                  <span className="font-bold text-stone-700 dark:text-stone-200 block mt-1">
                    {GROOM_DATA.parentFather}
                  </span>
                  dan {GROOM_DATA.parentMother}
                </div>

                <a
                  id="link-groom-instagram"
                  href={`https://instagram.com/${GROOM_DATA.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 dark:bg-zinc-900 py-1.5 px-4 text-xs font-semibold text-stone-600 hover:text-gold-600 dark:text-stone-400 dark:hover:text-gold-400 transition-colors border border-stone-200/50 dark:border-zinc-800"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span>@{GROOM_DATA.instagram}</span>
                </a>
              </motion.div>

              {/* Heart Accent Spacer */}
              <div className="flex items-center justify-center text-gold-500 animate-pulse">
                <Heart className="h-6 w-6 fill-current" />
              </div>

              {/* Bride Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Photo Frame Container */}
                <div className="relative">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-gold-400/40 animate-spin-slow pointer-events-none" />
                  <div className="absolute -inset-1 rounded-full border border-gold-500 pointer-events-none" />
                  <div className="h-44 w-44 rounded-full overflow-hidden shadow-2xl relative">
                    <img
                      src={BRIDE_DATA.photoUrl}
                      alt={BRIDE_DATA.fullName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-gold-200">
                    {BRIDE_DATA.fullName}
                  </h4>
                  <p className="text-xs text-gold-600 dark:text-gold-400 font-semibold tracking-wider italic">
                    — Khadijah —
                  </p>
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Putri pertama dari pasangan:
                  <br />
                  <span className="font-bold text-stone-700 dark:text-stone-200 block mt-1">
                    {BRIDE_DATA.parentFather}
                  </span>
                  dan {BRIDE_DATA.parentMother}
                </div>

                <a
                  id="link-bride-instagram"
                  href={`https://instagram.com/${BRIDE_DATA.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 dark:bg-zinc-900 py-1.5 px-4 text-xs font-semibold text-stone-600 hover:text-gold-600 dark:text-stone-400 dark:hover:text-gold-400 transition-colors border border-stone-200/50 dark:border-zinc-800"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span>@{BRIDE_DATA.instagram}</span>
                </a>
              </motion.div>
            </section>

            {/* D. Countdown Clock */}
            <section className="px-6 py-16 bg-gradient-to-b from-stone-50/50 to-amber-50/10 dark:from-zinc-900/10 dark:to-zinc-950/40 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-gold-500/5 via-transparent to-transparent opacity-40 pointer-events-none" />
              <div className="relative z-10 max-w-sm mx-auto space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">MOMENTUM</span>
                <h3 className="font-serif text-2xl font-bold text-stone-800 dark:text-gold-200 mb-2">
                  Menghitung Mundur Hari
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 max-w-[280px] mx-auto leading-relaxed">
                  Insya Allah ikatan suci kami akan diselenggarakan dalam:
                </p>

                <Countdown targetDate={WEDDING_DATE} theme={currentTheme} />
              </div>
            </section>

            {/* E. Detail Acara (Akad & Resepsi) */}
            <section className="px-6 py-20 relative overflow-hidden space-y-10">
              <div className="text-center z-10 relative">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">RITUAL & PESTA</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-800 dark:text-gold-200">
                  Agenda Pernikahan
                </h3>
              </div>

              {/* Akad Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`p-6 rounded-3xl relative overflow-hidden ${currentTheme.cardLight} dark:${currentTheme.cardDark}`}
              >
                {/* Decorative border frame corners */}
                <Ornaments type="corner" className="top-4 left-4" />
                <Ornaments type="corner" className="top-4 right-4 rotate-90" />
                <Ornaments type="corner" className="bottom-4 left-4 -rotate-90" />
                <Ornaments type="corner" className="bottom-4 right-4 rotate-180" />

                <div className="flex flex-col items-center text-center space-y-4 py-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-gold-500/10 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-gold-100">
                    {AKAD_EVENT.title}
                  </h4>
                  <div className="h-[1px] w-16 bg-gold-400/50" />

                  <div className="space-y-2 text-xs md:text-sm text-stone-600 dark:text-stone-300">
                    <p className="font-bold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gold-500" />
                      <span>{AKAD_EVENT.date}</span>
                    </p>
                    <p className="flex items-center justify-center gap-1.5">
                      <Clock className="h-4 w-4 text-gold-500" />
                      <span>{AKAD_EVENT.time}</span>
                    </p>
                    <p className="font-bold text-gold-600 dark:text-gold-400 mt-4">
                      {AKAD_EVENT.venueName}
                    </p>
                    <p className="text-[11px] leading-relaxed max-w-xs mx-auto text-stone-500 dark:text-stone-400">
                      {AKAD_EVENT.address}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Resepsi Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`p-6 rounded-3xl relative overflow-hidden ${currentTheme.cardLight} dark:${currentTheme.cardDark}`}
              >
                {/* Decorative border frame corners */}
                <Ornaments type="corner" className="top-4 left-4" />
                <Ornaments type="corner" className="top-4 right-4 rotate-90" />
                <Ornaments type="corner" className="bottom-4 left-4 -rotate-90" />
                <Ornaments type="corner" className="bottom-4 right-4 rotate-180" />

                <div className="flex flex-col items-center text-center space-y-4 py-4 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-gold-500/10 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-gold-100">
                    {RESEPSI_EVENT.title}
                  </h4>
                  <div className="h-[1px] w-16 bg-gold-400/50" />

                  <div className="space-y-2 text-xs md:text-sm text-stone-600 dark:text-stone-300">
                    <p className="font-bold text-stone-800 dark:text-stone-100 flex items-center justify-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gold-500" />
                      <span>{RESEPSI_EVENT.date}</span>
                    </p>
                    <p className="flex items-center justify-center gap-1.5">
                      <Clock className="h-4 w-4 text-gold-500" />
                      <span>{RESEPSI_EVENT.time}</span>
                    </p>
                    <p className="font-bold text-gold-600 dark:text-gold-400 mt-4">
                      {RESEPSI_EVENT.venueName}
                    </p>
                    <p className="text-[11px] leading-relaxed max-w-xs mx-auto text-stone-500 dark:text-stone-400">
                      {RESEPSI_EVENT.address}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* F. Google Maps Location Embed */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-4 max-w-sm mx-auto"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 dark:border-zinc-800 h-52 relative">
                  <iframe
                    src={AKAD_EVENT.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Google Maps Location"
                    className="filter dark:invert dark:hue-rotate-180"
                  />
                </div>

                <a
                  id="link-google-maps"
                  href={AKAD_EVENT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100 py-3 text-xs font-semibold text-white shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <Map className="h-4 w-4" />
                  <span>Buka Petunjuk di Google Maps</span>
                </a>
              </motion.div>
            </section>

            {/* G. Love Story / Timeline */}
            <section className="px-6 py-20 bg-stone-50/50 dark:bg-zinc-900/10 border-y border-stone-200/30 dark:border-zinc-800/30 relative overflow-hidden">
              <div className="text-center z-10 relative mb-12">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">STORY</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-800 dark:text-gold-200">
                  Kisah Cinta Kami
                </h3>
              </div>

              {/* Vertical Timeline */}
              <div className="relative border-l border-gold-300 dark:border-gold-800/60 ml-4 pl-6 space-y-12">
                {LOVE_STORIES.map((story, index) => (
                  <motion.div
                    key={story.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative space-y-3"
                  >
                    {/* Circle Indicator on vertical line */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 ring-4 ring-white dark:ring-zinc-950">
                      <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-zinc-900" />
                    </span>

                    {/* Timeline bubble */}
                    <div className="flex flex-col space-y-1">
                      <span className="font-serif text-sm font-bold text-gold-600 dark:text-gold-400">
                        {story.year}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-100 uppercase tracking-wider">
                        {story.title}
                      </h4>
                    </div>

                    {story.imageUrl && (
                      <div className="h-32 w-full rounded-xl overflow-hidden shadow border border-stone-200/50 dark:border-zinc-800">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}

                    <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                      {story.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* H. Wedding Photo Gallery */}
            <section className="px-6 py-20 relative overflow-hidden">
              <div className="text-center z-10 relative mb-12">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">MOMENTS</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-800 dark:text-gold-200">
                  Galeri Kebahagiaan
                </h3>
              </div>

              {/* Photo Masonry Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                {GALLERY_PHOTOS.map((photo, index) => (
                  <motion.div
                    key={photo.url}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 2) * 0.1, duration: 0.5 }}
                    onClick={() => setSelectedImage(photo.url)}
                    className={`relative group rounded-2xl overflow-hidden shadow-md border border-stone-200/50 dark:border-zinc-800 cursor-pointer ${
                      index % 3 === 0 ? 'col-span-1 h-44' : 'h-36'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <Maximize2 className="h-5 w-5 text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* I. RSVP Form confirmation */}
            <section className="px-6 py-20 bg-stone-50/50 dark:bg-zinc-900/10 border-y border-stone-200/30 dark:border-zinc-800/30 relative overflow-hidden">
              <div className="text-center z-10 relative mb-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">KEHADIRAN</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-800 dark:text-gold-200">
                  Konfirmasi Kehadiran
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  Mohon konfirmasikan kehadiran Anda melalui formulir digital di bawah ini:
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <RSVPForm theme={currentTheme} onSubmitRSVP={handleAddRSVP} />
              </div>
            </section>

            {/* J. Guest Wishes Feed */}
            <section className="px-6 py-20 relative overflow-hidden">
              <div className="max-w-sm mx-auto">
                <WishesList theme={currentTheme} wishes={wishes} />
              </div>
            </section>

            {/* K. Gift Section / Gifting */}
            <section className="px-6 py-20 bg-stone-50/50 dark:bg-zinc-900/10 border-t border-stone-200/30 dark:border-zinc-800/30 relative overflow-hidden">
              <div className="text-center z-10 relative mb-10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-bold block mb-1">CASH GIFT</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-800 dark:text-gold-200">
                  Kado Digital
                </h3>
              </div>

              <div className="max-w-sm mx-auto">
                <GiftSection
                  theme={currentTheme}
                  giftAccounts={GIFT_ACCOUNTS}
                  shippingAddress="jln fajar baru utara no 72 RT/RW 04/09 kelurahan Cengkareng timur, Cengkareng Jakarta Barat"
                />
              </div>
            </section>

            {/* L. Penutup / Farewell Footer */}
            <section className="px-6 py-24 text-center relative overflow-hidden bg-stone-950 text-stone-300 dark:bg-black border-t border-gold-500/20">
              {/* Islamic Star overlay */}
              <Ornaments type="mandala" className="w-[100%] h-[100%] opacity-[0.03] bottom-0 left-0" />

              <div className="max-w-sm mx-auto space-y-6 z-10 relative">
                <Heart className="h-8 w-8 text-gold-500 mx-auto fill-current animate-pulse-subtle" />

                <h4 className="font-serif text-lg font-bold text-gold-200">
                  Terima Kasih
                </h4>

                <p className="text-xs leading-relaxed text-stone-400">
                  Ungkapan terima kasih yang tulus dari kami beserta keluarga besar atas kehadiran serta doa restu yang Anda berikan kepada kami.
                </p>

                {currentTheme.id === 'islamic' && (
                  <p className="font-arabic text-xl text-gold-400 font-semibold pt-4">
                    وَالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
                  </p>
                )}

                <div className="pt-8 text-[10px] text-stone-500 tracking-wider">
                  Keluarga Besar Mempelai:
                  <br />
                  <span className="font-serif font-bold text-stone-300 block mt-1.5 text-xs">
                    Kel. {GROOM_DATA.parentFather.split('. ')[1]} & Kel. {BRIDE_DATA.parentFather.split('. ')[1]}
                  </span>
                </div>

                <div className="h-[1px] w-full bg-stone-800 my-8" />

                <p className="text-[9px] text-stone-600 tracking-widest uppercase">
                  © 2026 BASYAR & KHADIJAH. ALL RIGHTS RESERVED.
                </p>
              </div>
            </section>
          </main>
        </div>
      )}

      {/* 3. Global Lightbox Modal for Gallery Photos */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close button top right */}
            <button
              id="btn-lightbox-close"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white z-[160] cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Centered Image */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] relative rounded-xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src={selectedImage}
                alt="Enlarged gallery capture"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Scroll To Top Back Button */}
      <AnimatePresence>
        {showScrollTop && isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            id="btn-scroll-top"
            onClick={handleScrollToTop}
            className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900/80 text-white shadow-xl backdrop-blur-md border border-white/10 transition-all hover:bg-stone-800 dark:bg-white/80 dark:text-stone-900 dark:hover:bg-white cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
