import React, { createContext, useContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type Theme = 'light' | 'dark';
type ThemeValue = { theme: Theme; setTheme: Dispatch<SetStateAction<Theme>> };
const ThemeContext = createContext<ThemeValue | null>(null);

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme 需要 ThemeProvider');
  return value;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    {theme === 'light' ? '切换到深色' : '切换到浅色'}
  </button>;
}

export function Page({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return <main data-theme={theme}>{children}</main>;
}
