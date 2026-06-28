/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeConfig, Profile, WeddingEvent, StoryEvent, GiftAccount, Wish } from './types';

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: 'islamic',
    name: 'Islamic Putih & Gold',
    primary: 'amber',
    bgLight: 'bg-cream',
    bgDark: 'bg-zinc-950',
    textLight: 'text-ink',
    textDark: 'text-zinc-100',
    accentLight: 'text-gold-dark',
    accentDark: 'text-gold-mid',
    cardLight: 'bg-white border border-gold-mid/20 shadow-[0_4px_24px_rgba(139,107,53,0.05)]',
    cardDark: 'bg-zinc-900 border border-gold-mid/15 shadow-[0_10px_30px_rgba(0,0,0,0.35)]',
    fontSerif: 'font-serif',
    fontSans: 'font-sans',
    fontScript: 'font-script',
    ornamentStyle: 'islamic',
  },
  {
    id: 'floral',
    name: 'Elegant Floral',
    primary: 'emerald',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950',
    textLight: 'text-slate-800',
    textDark: 'text-slate-100',
    accentLight: 'text-emerald-600',
    accentDark: 'text-emerald-400',
    cardLight: 'bg-white/95 border border-emerald-100/60 shadow-sm',
    cardDark: 'bg-slate-900/90 border border-emerald-500/10 shadow-lg shadow-black/20',
    fontSerif: 'font-serif',
    fontSans: 'font-sans',
    fontScript: 'font-script',
    ornamentStyle: 'floral',
  },
  {
    id: 'rustic',
    name: 'Warm Rustic',
    primary: 'orange',
    bgLight: 'bg-orange-50/30',
    bgDark: 'bg-stone-950',
    textLight: 'text-stone-800',
    textDark: 'text-stone-100',
    accentLight: 'text-orange-700',
    accentDark: 'text-orange-400',
    cardLight: 'bg-stone-100/80 border border-stone-200 shadow-sm',
    cardDark: 'bg-stone-900/90 border border-stone-800 shadow-md',
    fontSerif: 'font-serif',
    fontSans: 'font-sans',
    fontScript: 'font-script',
    ornamentStyle: 'rustic',
  },
  {
    id: 'minimalist',
    name: 'Modern White',
    primary: 'neutral',
    bgLight: 'bg-white',
    bgDark: 'bg-neutral-950',
    textLight: 'text-neutral-800',
    textDark: 'text-neutral-100',
    accentLight: 'text-neutral-900',
    accentDark: 'text-neutral-400',
    cardLight: 'bg-neutral-50 border border-neutral-200/60 shadow-none',
    cardDark: 'bg-neutral-900 border border-neutral-800 shadow-none',
    fontSerif: 'font-serif',
    fontSans: 'font-sans',
    fontScript: 'font-script',
    ornamentStyle: 'modern',
  }
];

export const GROOM_DATA: Profile = {
  name: 'Fahri',
  fullName: 'Fahri Assyauqi',
  parentFather: 'Bapak H. Ahmad Fauzi',
  parentMother: 'Ibu Hj. Siti Aminah',
  instagram: 'fahri_assyauqi',
  photoUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=600&h=800',
  isGroom: true
};

export const BRIDE_DATA: Profile = {
  name: 'Fatimah',
  fullName: 'Fatimah Az Zahra',
  parentFather: 'Bapak H. Muhammad Yusuf',
  parentMother: 'Ibu Hj. Fatimah Azzahra',
  instagram: 'fatimah_azzahra',
  photoUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600&h=800',
  isGroom: false
};

export const WEDDING_DATE = new Date('2026-07-20T09:00:00');

export const AKAD_EVENT: WeddingEvent = {
  title: 'Akad Nikah',
  date: 'Senin, 20 Juli 2026',
  time: '09:00 - 11:00 WIB',
  timezone: 'WIB',
  venueName: 'Masjid Jami\' Baiturrahman',
  address: 'Jln fajar baru utara no 72 RT/RW 04/09 kelurahan Cengkareng timur, Cengkareng Jakarta Barat',
  mapsUrl: 'https://maps.google.com/maps?q=Masjid%20Jami%27%20Baiturrahman%20Jln%20fajar%20baru%20utara%20no%2072%20RT/RW%2004/09%20Cengkareng%20timur%20Jakarta%20Barat',
  embedUrl: 'https://maps.google.com/maps?q=Masjid%20Jami%27%20Baiturrahman%20Jln%20fajar%20baru%20utara%20no%2072%20RT/RW%2004/09%20Cengkareng%20timur%20Jakarta%20Barat&t=&z=16&ie=UTF8&iwloc=&output=embed',
  iconType: 'mosque'
};

export const RESEPSI_EVENT: WeddingEvent = {
  title: 'Resepsi Pernikahan',
  date: 'Senin, 20 Juli 2026',
  time: '12:00 - 17:00 WIB',
  timezone: 'WIB',
  venueName: 'Kediaman Mempelai Wanita',
  address: 'Jln fajar baru utara no 72 RT/RW 04/09 kelurahan Cengkareng timur, Cengkareng Jakarta Barat',
  mapsUrl: 'https://maps.google.com/maps?q=Jln%20fajar%20baru%20utara%20no%2072%20RT/RW%2004/09%20kelurahan%20Cengkareng%20timur%20Cengkareng%20Jakarta%20Barat',
  embedUrl: 'https://maps.google.com/maps?q=Jln%20fajar%20baru%20utara%20no%2072%20RT/RW%2004/09%20kelurahan%20Cengkareng%20timur%20Cengkareng%20Jakarta%20Barat&t=&z=16&ie=UTF8&iwloc=&output=embed',
  iconType: 'ring'
};

export const LOVE_STORIES: StoryEvent[] = [
  {
    year: '2024',
    title: 'Pertemuan Pertama',
    description: 'Kami dipertemukan melalui majelis ilmu keagamaan yang sama. Kesamaan visi untuk belajar dan tumbuh bersama menumbuhkan rasa hormat dan kekaguman satu sama lain.',
    imageUrl: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    year: '2025',
    title: 'Khithbah (Pertunangan)',
    description: 'Dengan niat ibadah menyempurnakan setengah agama, Fahri mendatangi kediaman orang tua Fatimah untuk memohon restu melakukan Khithbah secara resmi dan kekeluargaan.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    year: '2026',
    title: 'Melangkah ke Pelaminan',
    description: 'Atas izin Allah dan restu kedua orang tua, kami memutuskan untuk mengikat janji suci pernikahan kami dalam akad nikah pada tanggal 20 Juli 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export const GALLERY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=800&h=1000',
    title: 'Kebersamaan Indah'
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800&h=600',
    title: 'Momen Kebahagiaan'
  },
  {
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800&h=1000',
    title: 'Fatimah Az Zahra'
  },
  {
    url: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=800&h=1000',
    title: 'Fahri Assyauqi'
  },
  {
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800&h=600',
    title: 'Dekorasi Elegan'
  },
  {
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800&h=600',
    title: 'Langkah Suci'
  }
];

export const GIFT_ACCOUNTS: GiftAccount[] = [
  {
    bankName: 'Bank Syariah Indonesia (BSI)',
    accountNumber: '7148902144',
    accountHolder: 'Fahri Assyauqi'
  },
  {
    bankName: 'Bank Mandiri',
    accountNumber: '1180009476532',
    accountHolder: 'Fatimah Az Zahra'
  }
];

export const DEFAULT_WISHES: Wish[] = [
  {
    id: 'w1',
    name: 'Ustadz Hilman Fauzi',
    relation: 'Keluarga',
    message: 'Barakallahu lakuma wa baaraka alaikuma wa jama\'a bainakuma fii khair. Semoga menjadi keluarga sakinah, mawaddah, warahmah yang selalu diberkahi Allah SWT. Aamiin.',
    timestamp: '2026-06-25T10:00:00Z',
    isAttending: 'Hadir'
  },
  {
    id: 'w2',
    name: 'Syaikh Abdul Karim',
    relation: 'Keluarga',
    message: 'Selamat menempuh hidup baru Akhi Fahri dan Ukhti Fatimah. Semoga dikaruniai keturunan yang sholeh dan sholehah serta selalu istiqomah di jalan-Nya.',
    timestamp: '2026-06-26T14:32:00Z',
    isAttending: 'Hadir'
  },
  {
    id: 'w3',
    name: 'Rian Hidayat',
    relation: 'Teman',
    message: 'Mantap Bro Fahri! Lancar sampai hari H ya. Semoga berkah pernikahannya, menjadi imam yang hebat buat Fatimah.',
    timestamp: '2026-06-27T02:15:00Z',
    isAttending: 'Hadir'
  }
];
