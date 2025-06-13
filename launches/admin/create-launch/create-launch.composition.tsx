import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { CreateLaunchPage } from './create-launch.js';

export const BasicCreateLaunchForm = () => {
  return (
    <MockProvider>
      <CreateLaunchPage />
    </MockProvider>
  );
};

export const CustomStyledCreateLaunchForm = () => {
  return (
    <MockProvider>
      <>
        <style>{`
          .custom-launch-page-wrapper {
            border: 2px dashed var(--colors-primary-hover);
            border-radius: var(--borders-radius-large);
            background-color: var(--colors-surface-secondary); /* Slightly different background */
          }

          /* Example: Targeting a known child structure, if stable.
             Alternatively, the CreateLaunchPage component itself would need to be designed
             to use CSS variables or props for deeper themeing driven by its parent. */
          .custom-launch-page-wrapper h1 { /* Assuming the main title is an h1 */
            color: var(--colors-primary-default); /* Change title color */
          }
        `}</style>
        <CreateLaunchPage
          className="custom-launch-page-wrapper"
          style={{ padding: 'var(--spacing-x-large)' }}
        />
      </>
    </MockProvider>
  );
};