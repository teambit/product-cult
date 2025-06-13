import React, { useState, useEffect, useRef, useId } from 'react';
import classNames from 'classnames';
import styles from './dropdown.module.scss';

/**
 * Defines the possible positions for the dropdown overlay relative to its placeholder.
 * - `bottom-start`: Overlay appears below the placeholder, aligned to the start (left).
 * - `bottom-end`: Overlay appears below the placeholder, aligned to the end (right).
 * - `top-start`: Overlay appears above the placeholder, aligned to the start (left).
 * - `top-end`: Overlay appears above the placeholder, aligned to the end (right).
 */
export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/**
 * Props for the Dropdown component.
 */
export type DropdownProps = {
  /**
   * The content to be displayed inside the dropdown overlay.
   * This can be any interactive React content.
   */
  children: React.ReactNode;

  /**
   * The placeholder element that acts as the trigger for the dropdown.
   * Clicking this element will toggle the dropdown's visibility.
   */
  placeholder: React.ReactNode;

  /**
   * Specifies the position of the dropdown overlay relative to the placeholder.
   * Defaults to 'bottom-start'.
   */
  openPosition?: DropdownPosition;

  /**
   * Optional event handler that is called when the placeholder element is clicked or activated via keyboard.
   * This is in addition to the default behavior of toggling the dropdown.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;

  /**
   * An optional class name to apply to the main wrapper of the dropdown component.
   * Allows for custom styling or layout adjustments.
   */
  className?: string;

  /**
   * Optional class name to apply to the placeholder wrapper element.
   */
  placeholderClassName?: string;

  /**
   * Optional class name to apply to the dropdown overlay element.
   */
  overlayClassName?: string;

  /**
   * Optional inline styles to apply to the root dropdown container.
   */
  style?: React.CSSProperties;

  /**
   * Callback function invoked when the dropdown's open state changes.
   * Receives the new open state (true for open, false for closed) as an argument.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Controls the initial open state of the dropdown when it first mounts.
   * Defaults to false (closed).
   */
  initialIsOpen?: boolean;

  /**
   * If true, the dropdown will be disabled and cannot be opened.
   * The placeholder might also visually indicate a disabled state.
   * Defaults to false.
   */
  disabled?: boolean;
};

/**
 * A flexible and accessible dropdown component that renders interactive content
 * within a visually distinct overlay. It is triggered by a placeholder element.
 */
export function Dropdown({
  children,
  placeholder,
  openPosition = 'bottom-start',
  onClick,
  className,
  placeholderClassName,
  overlayClassName,
  style,
  onOpenChange,
  initialIsOpen = false,
  disabled = false,
}: DropdownProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const overlayId = useId();

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleDocumentClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isOpen]);

  const handlePlaceholderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsOpen((prevOpen) => !prevOpen);
    if (onClick) {
      onClick(event);
    }
  };

  const handlePlaceholderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen((prevOpen) => !prevOpen);
       // Also call onClick if it's provided, consistent with mouse click
      if (onClick) {
        onClick(event);
      }
    }
  };

  const positionStyles: Record<DropdownPosition, string> = {
    'bottom-start': styles.overlayPositionBottomStart,
    'bottom-end': styles.overlayPositionBottomEnd,
    'top-start': styles.overlayPositionTopStart,
    'top-end': styles.overlayPositionTopEnd,
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames(styles.dropdownContainer, className)}
      style={style}
    >
      <div
        className={classNames(
          styles.placeholderWrapper,
          placeholderClassName,
          { [styles.placeholderWrapperDisabled]: disabled }
        )}
        onClick={handlePlaceholderClick}
        onKeyDown={handlePlaceholderKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog" // More generic than "menu" for "interactive content"
        aria-expanded={isOpen}
        aria-controls={overlayId}
        aria-disabled={disabled}
      >
        {placeholder}
      </div>
      <div
        id={overlayId}
        role="dialog" // Using dialog role as it's interactive content, implies certain behaviors like Esc to close
        aria-modal="false" // It's not a modal dialog that traps focus outside
        aria-hidden={!isOpen}
        className={classNames(
          styles.overlay,
          overlayClassName,
          positionStyles[openPosition],
          { [styles.overlayVisible]: isOpen }
        )}
      >
        {isOpen ? children : null}
      </div>
    </div>
  );
}