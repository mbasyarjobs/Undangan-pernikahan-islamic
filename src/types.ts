/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ThemeConfig {
  id: string;
  name: string;
  primary: string; // e.g., 'gold'
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
  accentLight: string;
  accentDark: string;
  cardLight: string;
  cardDark: string;
  fontSerif: string;
  fontSans: string;
  fontScript: string;
  ornamentStyle: 'islamic' | 'floral' | 'modern' | 'rustic';
}

export interface Profile {
  name: string;
  fullName: string;
  parentFather: string;
  parentMother: string;
  instagram: string;
  photoUrl: string;
  isGroom: boolean;
}

export interface WeddingEvent {
  title: string;
  date: string;
  time: string;
  timezone: string;
  venueName: string;
  address: string;
  mapsUrl: string;
  embedUrl: string;
  iconType: 'ring' | 'heart' | 'mosque' | 'calendar';
}

export interface StoryEvent {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface GiftAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
}

export interface Wish {
  id: string;
  name: string;
  relation: 'Keluarga' | 'Teman' | 'Rekan Kerja' | 'Tetangga' | 'Lainnya';
  message: string;
  timestamp: string;
  isAttending: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';
}

export interface RSVP {
  name: string;
  totalGuests: number;
  isAttending: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';
  wishes: string;
  relation: string;
}
