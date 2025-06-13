import { useContext } from 'react';
import { MockContext } from './mock-provider-context.js';

/**
 * Custom hook to determine if a component is running within a mock environment.
 * It consumes the `MockContext` provided by `MockProvider`.
 * @returns {boolean} True if the component is inside a `MockProvider` (i.e., in mock mode), false otherwise.
 */
export function useIsMock(): boolean {
  const isMock = useContext(MockContext);
  return Boolean(isMock);
}