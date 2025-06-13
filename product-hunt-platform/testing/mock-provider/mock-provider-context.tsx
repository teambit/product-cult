import { createContext } from 'react';

/**
 * Context to determine if the application is running in a mock environment.
 * Consumers of this context can adapt their behavior based on whether they are in a mock setup.
 * The default value is `false`, meaning not in mock mode unless a `MockProvider` sets it to `true`.
 */
export const MockContext = createContext<boolean>(false);