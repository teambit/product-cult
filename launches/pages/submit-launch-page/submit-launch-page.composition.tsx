import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SubmitLaunchPage } from './submit-launch-page.js';

/**
 * Basic composition for the SubmitLaunchPage.
 * It renders the page within a MockProvider, which sets up the necessary
 * environment (theming, routing, Apollo client) for the component to operate.
 * Users can interact with the form fields. The submission behavior
 * will depend on the MockProvider's Apollo client configuration for the createLaunch mutation.
 */
export const BasicSubmitLaunchPage = () => {
  return (
    <MockProvider>
      <SubmitLaunchPage />
    </MockProvider>
  );
};

/**
 * Composition of SubmitLaunchPage with a custom class name.
 * This demonstrates how additional styling or layout adjustments can be applied
 * to the PageLayout root of the SubmitLaunchPage via the className prop.
 */
export const SubmitLaunchPageWithCustomStyling = () => {
  // Example of custom styles that might be defined in a global stylesheet or a <style> tag
  // For demonstration, these styles won't actually be applied unless defined elsewhere accessible to the composition.
  // e.g., in a global CSS file or a <style> tag in the .mdx docs or a wrapper.
  // Imagine 'custom-background-for-submit-page' changes the PageLayout background.
  const customStyles = `
    .custom-background-for-submit-page {
      /* This targets the PageLayout's root div inside SubmitLaunchPage */
      background-color: var(--colors-status-info-subtle, #e0f3ff); /* Example: Light blue background */
    }

    .custom-background-for-submit-page .formContainer {
        box-shadow: var(--effects-shadows-none); // Example: remove shadow from form container
    }
  `;

  return (
    <MockProvider>
      <style>{customStyles}</style>
      <SubmitLaunchPage className="custom-background-for-submit-page" />
    </MockProvider>
  );
};