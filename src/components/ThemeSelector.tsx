/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeConfig } from '../types';
import { THEME_PRESETS } from '../data';

interface ThemeSelectorProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function ThemeSelector({
  currentTheme,
  onSelectTheme,
  isDarkMode,
  onToggleDarkMode,
}: ThemeSelectorProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-stone-900/80 p-1 shadow-lg backdrop-blur-md border border-white/10">
      {/* Light/Dark Toggle */}
      <button
        id="btn-toggle-dark"
        onClick={onToggleDarkMode}
        className="flex h-9 w-9 items-center justify-center rounded-full text-amber-400 transition-all hover:bg-white/10 active:scale-95"
        title="Toggle Light/Dark Mode"
      >
        {isDarkMode ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5 text-stone-300" />}
      </button>
    </div>
  );
}
