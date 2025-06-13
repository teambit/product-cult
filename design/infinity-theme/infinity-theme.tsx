import React, { ReactNode, useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import { DeepPartial } from '@bitdesign/sparks.sparks-theme';
import { InfinityThemeProvider } from './infinity-theme-provider.js';
import { InfinityThemeSchema } from './infinity-theme-tokens.js';
import { InfinityThemeContext, ThemeContextValue, ThemeMode } from './infinity-theme-controller.js';
import { infinityThemeOptions } from './infinity-theme-options.js';
import styles from './infinity-theme.module.scss';

export type InfinityThemeProps = {
  /**
   * The root ReactNode for the component tree to which the theme will be applied.
   * Children components will inherit the theme's design tokens and styles.
   */
  children?: ReactNode;

  /**
   * An optional class name to apply to the theme's root element.
   * This allows for custom styling or overrides from parent components.
   */
  className?: string;

  /**
   * An optional object to override specific tokens in the current theme schema.
   * This allows for fine-grained customization of the theme on a per-instance basis.
   * The overrides are deeply merged with the active theme's tokens.
   */
  overrides?: DeepPartial<InfinityThemeSchema>;

  /**
   * The initial theme mode to apply when the component mounts.
   * Can be 'light' or 'dark'. Defaults to 'light' if not specified.
   */
  initialTheme?: ThemeMode;

  /**
   * Optional inline styles to apply to the theme's root element.
   * Use sparingly; prefer token overrides or className for styling.
   */
  style?: React.CSSProperties;
};

/**
 * InfinityTheme is a comprehensive theming solution for the Infinity platform.
 * It provides design tokens for colors, typography, spacing, and more,
 * supporting both light and dark modes. It wraps children in a theme provider,
 * making tokens available via CSS custom properties and a React context.
 */
export function InfinityTheme({
  children,
  initialTheme = 'light',
  className,
  style,
  overrides: propsOverrides,
}: InfinityThemeProps) {
  const [currentThemeMode, setCurrentThemeModeState] = useState<ThemeMode>(initialTheme);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setCurrentThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setCurrentThemeModeState(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const themeContextValue: ThemeContextValue = useMemo(() => ({
    themeMode: currentThemeMode,
    toggleTheme,
    setThemeMode,
  }), [currentThemeMode, toggleTheme, setThemeMode]);

  const activeThemeOverrides = useMemo(() => {
    const themeModeSpecificOverrides = currentThemeMode === 'dark' ? infinityThemeOptions.dark : undefined;
    
    let finalOverrides: DeepPartial<InfinityThemeSchema> | undefined;

    if (themeModeSpecificOverrides && propsOverrides) {
      // Shallow merge: propsOverrides will take precedence for top-level keys.
      // Sparks ThemeProvider is expected to handle the deep merge with base tokens.
      finalOverrides = { ...themeModeSpecificOverrides, ...propsOverrides };
    } else if (propsOverrides) {
      finalOverrides = propsOverrides;
    } else if (themeModeSpecificOverrides) {
      finalOverrides = themeModeSpecificOverrides;
    }
    // If finalOverrides is an empty object {}, pass it as is.
    // If it's undefined, pass undefined.
    return finalOverrides;
  }, [currentThemeMode, propsOverrides]);


  return (
    <InfinityThemeContext.Provider value={themeContextValue}>
      <InfinityThemeProvider.ThemeProvider
        className={classNames(styles.infinityTheme, className)}
        style={style}
        overrides={activeThemeOverrides as any}
      >
        {children}
      </InfinityThemeProvider.ThemeProvider>
    </InfinityThemeContext.Provider>
  );
}