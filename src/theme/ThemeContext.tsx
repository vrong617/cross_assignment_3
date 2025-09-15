import React, { createContext, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import { palettes, type ThemeColors, type ThemeName } from './palette';

type ThemeCtx = {
  theme: ThemeName;
  colors: ThemeColors;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const system = Appearance.getColorScheme();
  const initial: ThemeName = system === 'dark' ? 'dark' : 'light';

  const [theme, setTheme] = useState<ThemeName>(initial);

  const value = useMemo<ThemeCtx>(() => ({
    theme,
    colors: palettes[theme],
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
