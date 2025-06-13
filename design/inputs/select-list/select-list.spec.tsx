import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SelectList } from './select-list.js';
import type { SelectListOption } from './select-list-option-type.js';
import styles from './select-list.module.scss';

const options: SelectListOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

describe('SelectList', () => {
  it('should render the select list with options', () => {
    const { container } = render(
      <MemoryRouter>
        <SelectList options={options} onChange={() => {}} />
      </MemoryRouter>
    );

    const inputWrapper = container.querySelector(`.${styles.selectListInputWrapper}`);
    expect(inputWrapper).toBeInTheDocument();
  });
});
