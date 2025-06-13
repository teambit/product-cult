import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Flex } from './flex.js';
import styles from './flex.module.scss';

describe('Flex Component', () => {
  it('should render children within a flex container', () => {
    const { container } = render(
      <MemoryRouter>
        <Flex>
          <div>Child 1</div>
          <div>Child 2</div>
        </Flex>
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.flex}`)).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('should apply the correct flex direction when direction prop is set', () => {
    const { container } = render(
      <MemoryRouter>
        <Flex direction="column">
          <div>Child 1</div>
          <div>Child 2</div>
        </Flex>
      </MemoryRouter>
    );

    const flexContainer = container.querySelector(`.${styles.flex}`);
    expect(flexContainer).toHaveStyle('flex-direction: column');
  });

  it('should render as a nav element when as prop is set to nav', () => {
    const { container } = render(
      <MemoryRouter>
        <Flex as="nav">
          <div>Home</div>
        </Flex>
      </MemoryRouter>
    );

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass(styles.flex);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});