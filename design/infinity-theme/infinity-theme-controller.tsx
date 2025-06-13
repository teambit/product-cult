import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  /**
   * Current theme mode (light or dark).
   */
  themeMode: ThemeMode;
  
  /**
   * Function to toggle between light and dark modes.
   */
  toggleTheme: () => void;
  
  /**
   * Function to set a specific theme mode.
   */
  setThemeMode: (mode: ThemeMode) => void;
}

/**
 * Context for theme management.
 * Provides access to the current theme mode and functions to change it.
 */
export const InfinityThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook for accessing and controlling the current theme state.
 * Provides the current theme mode and functions to toggle or set the theme.
 * This hook must be used within an InfinityTheme component.
 * @returns {ThemeContextValue} The theme context value.
 * @throws {Error} If used outside of an InfinityTheme provider.
 */
export function useInfinityThemeController(): ThemeContextValue {
  const context = useContext(InfinityThemeContext);
  
  if (context === undefined) {
    throw new Error('useInfinityThemeController must be used within an InfinityTheme component');
  }
  
  return context;
}