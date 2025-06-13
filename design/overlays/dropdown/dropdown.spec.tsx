import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dropdown } from './dropdown.js';
import styles from './dropdown.module.scss';
import { MemoryRouter } from 'react-router-dom';

describe('Dropdown Component', () => {
  it('should open and close the dropdown on placeholder click', () => {
    const placeholderText = 'Open Dropdown';
    const { container } = render(
      <MemoryRouter>
        <Dropdown placeholder={<button>{placeholderText}</button>} >
          <div>Dropdown Content</div>
        </Dropdown>
      </MemoryRouter>
    );

    const placeholder = container.querySelector('button');
    expect(placeholder).toHaveTextContent(placeholderText);

    fireEvent.click(placeholder as Element);
    expect(container.querySelector(`.${styles.overlayVisible}`)).toBeInTheDocument();

    fireEvent.click(placeholder as Element);
    expect(container.querySelector(`.${styles.overlayVisible}`)).not.toBeInTheDocument();
  });

  it('should call onClick handler when placeholder is clicked', () => {
    const onClickMock = vi.fn();
    const placeholderText = 'Clickable Placeholder';
    const { container } = render(
      <MemoryRouter>
        <Dropdown placeholder={<button>{placeholderText}</button>} onClick={onClickMock}>
          <div>Dropdown Content</div>
        </Dropdown>
      </MemoryRouter>
    );

    const placeholder = container.querySelector('button');
    expect(placeholder).toHaveTextContent(placeholderText);

    fireEvent.click(placeholder as Element);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should not open the dropdown when disabled', () => {
    const placeholderText = 'Disabled Dropdown';
    const { container } = render(
      <MemoryRouter>
        <Dropdown placeholder={<button>{placeholderText}</button>} disabled>
          <div>Dropdown Content</div>
        </Dropdown>
      </MemoryRouter>
    );

    const placeholder = container.querySelector('button');
    expect(placeholder).toHaveTextContent(placeholderText);

    fireEvent.click(placeholder as Element);
    expect(container.querySelector(`.${styles.overlayVisible}`)).not.toBeInTheDocument();
  });
});