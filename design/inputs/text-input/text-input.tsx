import React from 'react';
import classNames from 'classnames';
import styles from './text-input.module.scss';

export type TextInputProps = {
  /**
   * The unique identifier for the input element.
   * This is used to associate labels with the input field.
   */
  id?: string;
  /**
   * The current value of the input field.
   * Should be controlled by the parent component for a controlled input.
   */
  value?: string;
  /**
   * Callback function triggered when the input value changes.
   * It receives the new string value of the input.
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder text to display when the input is empty.
   * Provides a hint to the user about the expected input.
   */
  placeholder?: string;
  /**
   * The type of the input field (e.g., 'text', 'password', 'email', 'number').
   * Defaults to 'text'.
   */
  type?: string;
  /**
   * The name attribute for the input element.
   * Useful for form submission and identification.
   */
  name?: string;
  /**
   * Optional CSS class name to apply to the root input element.
   * Allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root input element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * TextInput component renders a styled input field consistent with the Infinity theme.
 * It supports various input types and provides a clean, modern interface for text entry.
 */
export function TextInput({
  id,
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  name,
  className,
  style,
}: TextInputProps): React.JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={classNames(styles.textInput, className)}
      style={style}
      aria-label={placeholder || name || 'text input'}
    />
  );
}