import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './card.js';
import styles from './card.module.scss';

describe('Card Component', () => {
  it('should render the card with title and children', () => {
    const title = 'Test Card';
    const children = <p>This is a test card content.</p>;
    const { container } = render(
      <MemoryRouter>
        <Card title={title}>{children}</Card>
      </MemoryRouter>
    );

    const cardTitle = container.querySelector(`.${styles.cardTitle}`);
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle?.textContent).toBe(title);

    const cardBody = container.querySelector(`.${styles.cardBody}`);
    expect(cardBody).toBeInTheDocument();
    expect(cardBody?.textContent).toContain('This is a test card content.');
  });

  it('should render the card with header and footer', () => {
    const header = <div>Test Header</div>;
    const footer = <div>Test Footer</div>;
    const { container } = render(
      <MemoryRouter>
        <Card header={header} footer={footer}>
          <p>Card content</p>
        </Card>
      </MemoryRouter>
    );

    const cardHeader = container.querySelector(`.${styles.cardHeader}`);
    expect(cardHeader).toBeInTheDocument();
    expect(cardHeader?.textContent).toBe('Test Header');

    const cardFooter = container.querySelector(`.${styles.cardFooter}`);
    expect(cardFooter).toBeInTheDocument();
    expect(cardFooter?.textContent).toBe('Test Footer');
  });

  it('should apply interactive class when interactive prop is true', () => {
    const { container } = render(
      <MemoryRouter>
        <Card interactive>
          <p>Interactive card content</p>
        </Card>
      </MemoryRouter>
    );

    const cardElement = container.querySelector(`.${styles.card}`);
    expect(cardElement).toHaveClass(styles.interactive);
  });
});