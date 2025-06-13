import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Badge } from './badge.js';
import styles from './badge.module.scss';

describe('Badge Component', () => {
  it('should render the badge with the provided label', () => {
    const labelText = 'Test Badge';
    render(
      <MemoryRouter>
        <Badge label={labelText} />
      </MemoryRouter>
    );
    const badgeElement = screen.getByText(labelText);
    expect(badgeElement).toBeInTheDocument();
  });

  it('should apply the correct size class', () => {
    render(
      <MemoryRouter>
        <Badge label="Small Badge" size="small" />
      </MemoryRouter>
    );
    const badgeElement = screen.getByText('Small Badge').parentElement;
    expect(badgeElement).toHaveClass(styles.small);
  });

  it('should apply the correct variant class', () => {
    render(
      <MemoryRouter>
        <Badge label="Outlined Badge" variant="outlined" />
      </MemoryRouter>
    );
    const badgeElement = screen.getByText('Outlined Badge').parentElement;
    expect(badgeElement).toHaveClass(styles.outlined);
  });
});