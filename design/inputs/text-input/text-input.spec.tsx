import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TextInput } from './text-input.js';
import styles from './text-input.module.scss';
import { MemoryRouter } from 'react-router-dom';

describe('TextInput', () => {
  it('should render a text input with the provided placeholder', () => {
    const placeholderText = 'Enter your text';
    const { container } = render(
      <MemoryRouter>
        <TextInput placeholder={placeholderText} />
      </MemoryRouter>
    );
    const inputElement = container.querySelector(`.${styles.textInput}`) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.placeholder).toBe(placeholderText);
  });

  it('should update the value when the input changes', () => {
    const onChange = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <TextInput onChange={onChange} />
      </MemoryRouter>
    );
    const inputElement = container.querySelector(`.${styles.textInput}`) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('should apply the provided className to the input element', () => {
    const customClassName = 'custom-input-class';
    const { container } = render(
      <MemoryRouter>
        <TextInput className={customClassName} />
      </MemoryRouter>
    );
    const inputElement = container.querySelector(`.${customClassName}`) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });
});