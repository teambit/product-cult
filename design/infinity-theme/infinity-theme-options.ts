import { darkInfinityTokens } from "./dark-infinity-tokens.js";
import { DeepPartial } from '@bitdesign/sparks.sparks-theme';
import { InfinityThemeSchema } from "./infinity-theme-tokens.js";


export type InfinityThemeOptions = {
  dark?: DeepPartial<InfinityThemeSchema>;
  // Add other theme variations here if needed in the future
  // e.g., highContrast?: DeepPartial<InfinityThemeSchema>;
};


/**
 * List of additional theme options.
 * The default (light) theme is applied directly by InfinityThemeProvider using infinityTokens.
 * This object provides overrides for alternative themes like 'dark'.
 */
export const infinityThemeOptions: InfinityThemeOptions = {
  dark: darkInfinityTokens,
};