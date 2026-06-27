/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Gift, Landmark, User, MapPin } from 'lucide-react';
import { ThemeConfig, GiftAccount } from '../types';

interface GiftSectionProps {
  theme: ThemeConfig;
  giftAccounts: GiftAccount[];
  shippingAddress: string;
}

export default function GiftSection({ theme, giftAccounts, shippingAddress }: GiftSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAccount = (accountNumber: string, index: number) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(shippingAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Intro Text */}
      <div className="text-center max-w-sm mx-auto">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-dark/10 dark:bg-gold-mid/20 text-gold-dark dark:text-gold-light mb-3 shadow-inner">
          <Gift className="h-6 w-6" />
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda ingin memberikan ungkapan tanda kasih (amplop digital atau kado fisik), Anda dapat menyalurkannya melalui pilihan di bawah ini:
        </p>
      </div>

      {/* Credit-Card Style Bank Accounts */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        {giftAccounts.map((account, index) => (
          <motion.div
            key={account.accountNumber}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between h-48 border shadow-lg transition-all hover:-translate-y-1 ${
              theme.id === 'islamic'
                ? 'bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950 text-amber-100 border-gold-mid/20 shadow-black/40'
                : 'bg-gradient-to-br from-stone-50 via-white to-stone-100 text-stone-800 border-stone-200/80'
            }`}
          >
            {/* Glossy Reflective Glass Background Mesh */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-dark/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header: Bank & Icon */}
            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-gold-light" />
                <span className="text-xs font-bold uppercase tracking-wider">{account.bankName}</span>
              </div>
              <span className="text-[10px] font-mono opacity-50">DEBIT CARD</span>
            </div>

            {/* Middle: Card Number */}
            <div className="z-10 my-4">
              <span className="text-[10px] tracking-[0.2em] uppercase opacity-60 block mb-1">Nomor Rekening</span>
              <span className="font-mono text-lg md:text-xl font-semibold tracking-wider block text-gold-light">
                {account.accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
              </span>
            </div>

            {/* Footer: Holder Name & Copy Button */}
            <div className="flex justify-between items-end z-10">
              <div className="max-w-[70%]">
                <span className="text-[9px] uppercase tracking-wider opacity-60 block">Atas Nama</span>
                <span className="font-serif text-xs font-bold tracking-wide truncate block">{account.accountHolder}</span>
              </div>

              {/* Copy Action Pill */}
              <button
                id={`btn-copy-account-${index}`}
                onClick={() => handleCopyAccount(account.accountNumber, index)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
                  copiedIndex === index
                    ? 'bg-emerald-500 text-white'
                    : theme.id === 'islamic'
                    ? 'bg-gold-dark text-white hover:bg-gold-mid border border-gold-light/20'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-3 w-3 animate-scale" />
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Salin No.</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shipping Address for Physical Gifts */}
      {shippingAddress && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`max-w-xl mx-auto rounded-3xl p-5 border text-center ${
            theme.id === 'islamic'
              ? 'bg-stone-900/30 border-gold-mid/10 text-stone-300'
              : 'bg-stone-50 border-stone-200 text-stone-600'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-gold-dark dark:text-gold-light">
            <MapPin className="h-4 w-4" />
            <h4 className="font-serif text-sm font-bold text-stone-800 dark:text-stone-200">
              Alamat Pengiriman Kado Fisik
            </h4>
          </div>
          <p className="text-xs leading-relaxed max-w-md mx-auto mb-4 italic">
            "{shippingAddress}"
          </p>
          <button
            id="btn-copy-address"
            onClick={handleCopyAddress}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              copiedAddress
                ? 'bg-emerald-500 text-white'
                : 'bg-gold-dark hover:bg-gold-mid text-white border border-gold-light/20'
            }`}
          >
            {copiedAddress ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Alamat Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Salin Alamat Pengiriman</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}
