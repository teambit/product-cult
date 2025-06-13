import React from 'react';
import classNames from 'classnames';
import { useInfinityThemeController } from '@infinity/design.infinity-theme';
import { SunIcon as DefaultSunIcon } from './sun-icon.js';
import { MoonIcon as DefaultMoonIcon } from './moon-icon.js';
import type { IconProps } from './icon-props-type.js';
import styles from './theme-toggler.module.scss';

/**
 * Properties for the ThemeToggler component.
 */
export type ThemeTogglerProps = {
  /**
   * Optional CSS class name to apply to the toggler button.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the toggler button.
   * Prefer using `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
  /**
   * Custom component for the sun icon, displayed when the current theme is dark (to switch to light).
   * If not provided, a default sun icon will be used.
   * The component should accept IconProps.
   */
  sunIcon?: React.ComponentType<IconProps>;
  /**
   * Custom component for the moon icon, displayed when the current theme is light (to switch to dark).
   * If not provided, a default moon icon will be used.
   * The component should accept IconProps.
   */
  moonIcon?: React.ComponentType<IconProps>;
  /**
   * Base accessible label for the theme toggler button. The component will append dynamic state information.
   * @default 'Toggle theme'
   */
  ariaLabel?: string;
  /**
   * Size for the icons, applied to width and height.
   * @default 20
   */
  iconSize?: string | number;
};

/**
 * A theme toggler component that allows users to switch between light and dark themes.
 * It displays a sun icon to activate light mode and a moon icon to activate dark mode.
 * This component relies on `useInfinityThemeController` from `@infinity/design.infinity-theme`
 * and must be used within an `InfinityTheme` provider.
 */
export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  className,
  style,
  sunIcon,
  moonIcon,
  ariaLabel = 'Toggle theme',
  iconSize = 20,
}) => {
  const themeController = useInfinityThemeController();

  // This check is a safeguard. useInfinityThemeController should throw if not within a provider.
  if (!themeController) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'ThemeToggler: useInfinityThemeController did not return a context. Ensure the component is rendered within an InfinityTheme provider.'
      );
    }
    return null;
  }

  const { themeMode, toggleTheme } = themeController;

  const SunComponent = sunIcon || DefaultSunIcon;
  const MoonComponent = moonIcon || DefaultMoonIcon;

  const IconToRender = themeMode === 'dark' ? SunComponent : MoonComponent;
  const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
  const fullAriaLabel = `${ariaLabel}: currently ${themeMode} mode, activate ${nextTheme} mode.`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={classNames(styles.themeToggler, className)}
      style={style}
      aria-label={fullAriaLabel}
      title={fullAriaLabel}
    >
      <IconToRender size={iconSize} className={styles.icon} aria-hidden="true" />
    </button>
  );
};