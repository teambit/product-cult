import { createTheme } from '@bitdesign/sparks.sparks-theme';
import { InfinityThemeSchema, infinityTokens } from './infinity-theme-tokens.js';

/**
 * Creating and declaring the infinity theme.
 * Define the theme schema as a type variable for proper type completions.
 */
export const InfinityThemeProvider = createTheme<InfinityThemeSchema>({
  tokens: infinityTokens,
});

/**
 * A react hook for contextual access to design tokens
 * from components.
 */
export const { useTheme } = InfinityThemeProvider;