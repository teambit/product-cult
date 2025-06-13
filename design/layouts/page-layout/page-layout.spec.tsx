import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageLayout } from './page-layout.js';
import styles from './page-layout.module.scss';

describe('PageLayout', () => {
  it('should render children within the content slot', () => {
    const { container } = render(
      <MemoryRouter>
        <PageLayout>
          <div>Test Content</div>
        </PageLayout>
      </MemoryRouter>
    );
    const contentSlot = container.querySelector(`.${styles.contentSlot}`);
    expect(contentSlot).toBeInTheDocument();
    expect(contentSlot?.textContent).toBe('Test Content');
  });

  it('should render the header when provided', () => {
    const { container } = render(
      <MemoryRouter>
        <PageLayout header={<div>Test Header</div>}>
          <div>Test Content</div>
        </PageLayout>
      </MemoryRouter>
    );
    const headerSlot = container.querySelector(`.${styles.headerSlot}`);
    expect(headerSlot).toBeInTheDocument();
    expect(headerSlot?.textContent).toBe('Test Header');
  });

  it('should render the footer when provided', () => {
    const { container } = render(
      <MemoryRouter>
        <PageLayout footer={<div>Test Footer</div>}>
          <div>Test Content</div>
        </PageLayout>
      </MemoryRouter>
    );
    const footerSlot = container.querySelector(`.${styles.footerSlot}`);
    expect(footerSlot).toBeInTheDocument();
    expect(footerSlot?.textContent).toBe('Test Footer');
  });
});