import React from 'react';
import { createMounter } from '@teambit/react.mounter';
import { InfinityTheme } from '@infinity/design.infinity-theme';

/**
 * Provides the InfinityTheme to component compositions (previews).
 * This ensures that all components rendered in the preview context
 * are wrapped with the standard Infinity platform theme.
 * @param {object} props - The properties for the provider.
 * @param {React.ReactNode} props.children - The child components to render within the theme.
 * @returns {JSX.Element} The themed children components.
 */
export function InfinityEnvProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return <InfinityTheme>{children}</InfinityTheme>;
}

/**
 * The entry point for the preview runtime that renders component compositions.
 * This mounter utilizes the InfinityEnvProvider to wrap compositions with the InfinityTheme.
 * @see https://bit.dev/docs/react-env/component-previews#composition-mounter
 */
export default createMounter(InfinityEnvProvider) as any;