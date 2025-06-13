import type { ReactNode, ReactElement } from 'react';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { EmptyContainer } from './empty-container.js';
import { MockContext } from './mock-provider-context.js';

export type MockProviderProps = {
  /**
   * The child components to be rendered within the mock environment.
   */
  children?: ReactNode;

  /**
   * If true, the `MemoryRouter` will not be used.
   * Defaults to false, meaning `MemoryRouter` is active.
   */
  noRouter?: boolean;

  /**
   * If true, the `InfinityTheme` will not be applied.
   * Defaults to false, meaning `InfinityTheme` is active.
   */
  noTheme?: boolean;
};

/**
 * A mock provider component that sets up a simulated environment for testing or showcasing components.
 * It wraps children with `MockContext.Provider` (setting mock mode to true),
 * `MemoryRouter` for routing, `InfinityTheme` for theming, and `MockedProvider` for Apollo Client.
 * These wrappers can be conditionally disabled via props.
 * @param {MockProviderProps} props - The component props.
 * @returns {React.ReactElement} The children wrapped in the mock provider setup.
 */
export function MockProvider({ children, noRouter, noTheme }: MockProviderProps): React.ReactElement {
  const ThemeWrapper = noTheme ? EmptyContainer : InfinityTheme;
  const RouterWrapper = noRouter ? EmptyContainer : MemoryRouter;
  
  return (
    <MockContext.Provider value={true}>
      <RouterWrapper>
        <ThemeWrapper>
          <MockedProvider addTypename={false} showWarnings={false}>
            {children}
          </MockedProvider>
        </ThemeWrapper>
      </RouterWrapper>
    </MockContext.Provider>
  );
}