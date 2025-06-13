import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SubmitProductPage } from './submit-product-page.js';
import styles from './submit-product-page.module.scss';

describe('SubmitProductPage', () => {
  it('renders the form with input fields', () => {
    const { container } = render(
      <MockProvider>
        <SubmitProductPage />
      </MockProvider>
    );

    expect(container.querySelector('#productName')).toBeInTheDocument();
    expect(container.querySelector('#description')).toBeInTheDocument();
    expect(container.querySelector('#imageUrl')).toBeInTheDocument();
    expect(container.querySelector('#categoryId')).toBeInTheDocument();
    expect(container.querySelector('#price')).toBeInTheDocument();
  });

  it('displays an error message when submitting an incomplete form', async () => {
    const { container } = render(
      <MockProvider>
        <SubmitProductPage />
      </MockProvider>
    );

    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(container.querySelector(`.${styles.errorMessage}`)).toBeInTheDocument();
    });
  });

  it('updates input values when typing', () => {
    const { container } = render(
      <MockProvider>
        <SubmitProductPage />
      </MockProvider>
    );

    const productNameInput = container.querySelector('#productName') as HTMLInputElement;
    fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
    expect(productNameInput.value).toBe('Test Product');
  });
});