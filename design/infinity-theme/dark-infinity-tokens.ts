import { DeepPartial } from '@bitdesign/sparks.sparks-theme';
import { InfinityThemeSchema } from "./infinity-theme-tokens.js";

/**
 * Override tokens for the dark theme for the Infinity platform.
 * This schema adjusts colors and surfaces for optimal readability and aesthetics in a dark environment.
 */
export const darkInfinityTokens: DeepPartial<InfinityThemeSchema> = {
  colors: {
    primary: {
      default: '#FF7A29', // Slightly brighter orange for dark mode
      hover: '#FF8C4A',
      active: '#FF9E6B',
    },
    secondary: {
      default: '#6CACF2', // Brighter blue for dark mode
      hover: '#7CB9F5',
      active: '#8CC6F8',
    },
    surface: {
      background: '#121212', // Very dark, near black for the main background
      primary: '#1E1E1E',    // Dark gray for primary content surfaces (cards, etc.)
      secondary: '#2A2A2A',  // Slightly lighter dark gray for secondary surfaces
    },
    text: {
      primary: '#E0E0E0',    // Light gray for primary text, ensuring high contrast on dark backgrounds
      secondary: '#A0A0A0',  // Medium gray for secondary text
      inverse: '#1A1A1A',    // Dark text for use on light backgrounds (if any in dark mode)
      accent: '#FF7A29',     // Accent color for links, matching primary
    },
    status: {
      positive: { default: '#34C759', subtle: '#2C3B30' }, // Adjusted green
      negative: { default: '#FF3B30', subtle: '#422B2A' }, // Adjusted red
      warning: { default: '#FF9500', subtle: '#423824' }, // Adjusted yellow
      info: { default: '#007AFF', subtle: '#243542' },    // Adjusted blue
    },
    border: {
      default: '#3A3A3A', // Lighter border color for dark mode
      subtle: '#2C2C2C',  // Even lighter for subtle borders
      focus: '#FF7A29',   // Focus ring color
    },
  },
  effects: {
    shadows: {
      // Shadows need to be more subtle or rely on light sources in dark mode
      xs: '0px 1px 2px rgba(0, 0, 0, 0.15)',
      small: '0px 2px 4px rgba(0, 0, 0, 0.2)',
      medium: '0px 4px 8px rgba(0, 0, 0, 0.25)',
      large: '0px 8px 16px rgba(0, 0, 0, 0.3)',
      xLarge: '0px 12px 24px rgba(0, 0, 0, 0.35)',
      inset: 'inset 0px 1px 3px rgba(0, 0, 0, 0.25)',
      primary: '0px 4px 12px rgba(255, 122, 41, 0.25)', // Adjusted primary shadow for dark mode
    },
    gradients: {
        primary: 'linear-gradient(135deg, #FF8C4A 0%, #FF7A29 100%)',
        secondary: 'linear-gradient(135deg, #7CB9F5 0%, #6CACF2 100%)',
        subtleSurface: 'linear-gradient(180deg, #1E1E1E 0%, #121212 100%)',
    },
  }
};