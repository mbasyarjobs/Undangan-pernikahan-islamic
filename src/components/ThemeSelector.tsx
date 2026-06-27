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
    <button
      id="btn-toggle-dark"
      onClick={(e) => {
        e.stopPropagation();
        onToggleDarkMode();
      }}
      className="fixed top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-stone-950/80 border border-stone-200/60 dark:border-white/10 shadow-sm backdrop-blur-md text-stone-600 dark:text-amber-400 transition-all hover:bg-stone-100 dark:hover:bg-stone-900/60 active:scale-95 cursor-pointer"
      title="Toggle Light/Dark Mode"
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4 text-amber-500 animate-pulse-subtle" />
      ) : (
        <Moon className="h-4 w-4 text-stone-500" />
      )}
    </button>
  );
}
