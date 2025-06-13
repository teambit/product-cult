import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { EditUserProfilePage } from './edit-user-profile-page.js';

/**
 * Basic composition for the EditUserProfilePage.
 *
 * This composition renders the EditUserProfilePage within the standard `MockProvider`
 * and `InfinityTheme`. The `MockProvider` sets up a mock environment, including
 * a `MockedProvider` for Apollo Client.
 *
 * The behavior of the `EditUserProfilePage` regarding data fetching and display
 * (e.g., loading states, error messages, pre-filled form data) will depend on:
 * 1.  How the internal hooks (`useAuth`, `useGetUserProfile`) behave within this
 *     mock environment. If they have built-in default mock data or behaviors
 *     when `useIsMock()` is true (provided by `MockProvider`), the page might
 *     render with sample data.
 * 2.  How GraphQL queries made by these hooks are handled by the `MockedProvider`
 *     set up by `MockProvider`. If no specific Apollo mocks are configured for these
 *     queries (and the `MockProvider` API provided doesn't show a way to pass them),
 *     the queries might result in errors, which would showcase the component's
 *     error handling capabilities.
 *
 * This setup adheres to the constraint of not mocking hook modules directly from
 * the composition file.
 */
export const BasicEditUserProfilePage = () => {
  return (
    <MockProvider>
      <InfinityTheme initialTheme="light">
        <EditUserProfilePage />
      </InfinityTheme>
    </MockProvider>
  );
};

/**
 * Composition to demonstrate the EditUserProfilePage with a custom CSS class.
 *
 * This shows how custom styles can be applied to the page.
 * The actual content displayed will still depend on the behavior of the internal
 * data-fetching hooks within the `MockProvider` environment, as described in
 * the `BasicEditUserProfilePage` composition.
 *
 * Note: For the custom styles targeting internal elements (like `.title`) to work,
 * the `edit-user-profile-page.module.scss` file's class names would need to be
 * correctly referenced, potentially requiring importing `styles` from the SCSS module
 * if class names are hashed. For simplicity in this example, a global-like CSS
 * selector approach is hinted at, but using CSS modules correctly is preferred in practice.
 */
export const StyledEditUserProfilePage = () => {
  return (
    <MockProvider>
      <InfinityTheme initialTheme="light">
        <style>{`
          .custom-profile-page-wrapper {
            border: 2px dashed var(--colors-secondary-default);
            background-color: var(--colors-surface-secondary);
          }
          /* Example of targeting a known child class if EditUserProfilePage renders it */
          /* This depends on the internal structure and might need styles from module.scss */
          .custom-profile-page-wrapper .title-class-from-module { 
            color: var(--colors-text-accent);
          }
        `}</style>
        <EditUserProfilePage className="custom-profile-page-wrapper" />
      </InfinityTheme>
    </MockProvider>
  );
};