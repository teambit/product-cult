import React from 'react';
import { SubmitProductPage } from './submit-product-page.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';

export const BasicSubmitProductPage = () => {
  return (
    <MockProvider>
      <SubmitProductPage />
    </MockProvider>
  );
};

export const SubmitProductPageWithCustomStyle = () => {
  return (
    <MockProvider>
      <style>{`
        .custom-submit-page-style .pageTitle {
          color: var(--colors-text-accent);
        }
        .custom-submit-page-style .form {
          border: 2px solid var(--colors-primary-default);
        }
        .custom-submit-page-style .submitButton {
          background-image: var(--effects-gradients-primary);
          font-weight: var(--typography-font-weight-bold);
        }
      `}</style>
      <SubmitProductPage className="custom-submit-page-style" />
    </MockProvider>
  );
};