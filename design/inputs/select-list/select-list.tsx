import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import type { SelectListOption } from './select-list-option-type.js';
import styles from './select-list.module.scss';

/**
 * Props for the SelectList component.
 */
export type SelectListProps = {
  /**
   * A unique identifier for the select list. Used for ARIA attributes and label association.
   */
  id?: string;
  /**
   * An array of option objects to populate the select list.
   * Each option must conform to the `SelectListOption` type.
   */
  options: SelectListOption[];
  /**
   * The currently selected value(s).
   * For single select, this is a string. For multiple select, it's an array of strings.
   * This prop makes the component controlled.
   */
  value?: string | string[];
  /**
   * Callback function invoked when the selected value changes.
   * Receives the new value (string or string[]) as an argument.
   */
  onChange: (value: string | string[]) => void;
  /**
   * If true, allows multiple options to be selected.
   * @default false
   */
  multiple?: boolean;
  /**
   * Placeholder text to display when no option is selected.
   * @default "Select..."
   */
  placeholder?: string;
  /**
   * If true, the select list is disabled and cannot be interacted with.
   * @default false
   */
  disabled?: boolean;
  /**
   * An optional label to display above the select list.
   */
  label?: string;
  /**
   * Marks the select list as required in a form context.
   * @default false
   */
  required?: boolean;
  /**
   * The name attribute for the select list, useful for form submission.
   */
  name?: string;
  /**
   * Maximum height for the dropdown list, e.g., "200px".
   * @default "250px"
   */
  dropdownMaxHeight?: string;
  /**
   * Custom CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Custom inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
  /**
   * Optional function to customize the rendering of each option in the dropdown.
   * Receives the option data and a boolean indicating if it's currently selected.
   */
  renderOption?: (option: SelectListOption, isSelected: boolean, isHighlighted: boolean) => React.ReactNode;
  /**
   * Optional function to customize the rendering of the selected value(s) in the input display area.
   * Receives the current selected value(s), all options, and the placeholder.
   */
  renderSelectedValue?: (
    selectedValue: string | string[] | undefined,
    options: SelectListOption[],
    placeholder?: string
  ) => React.ReactNode;
  /**
   * Tab index for the select list trigger element.
   */
  tabIndex?: number;
  /**
   * Message to display when no options are available or match a filter (if filtering were implemented).
   * @default "No options available"
   */
  emptyMessage?: string;
};

const ArrowIcon: React.FC<{ isOpen: boolean; className?: string }> = ({ isOpen, className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    className={classNames(styles.selectListArrowIcon, className, { [styles.open]: isOpen })}
    aria-hidden="true"
  >
    <path d="M4.046 6.032a.75.75 0 011.06-.096L8 8.592l2.894-2.656a.75.75 0 11.968 1.152l-3.25 3a.75.75 0 01-1.064 0l-3.25-3a.75.75 0 01-.096-1.06z" />
  </svg>
);

/**
 * A SelectList component for choosing one or more options from a list.
 * It supports single and multiple selections, custom rendering, and is themeable.
 */
export function SelectList({
  id,
  options,
  value,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  disabled = false,
  label,
  name,
  dropdownMaxHeight = '250px',
  className,
  style,
  renderOption,
  renderSelectedValue,
  tabIndex,
  emptyMessage = 'No options available',
}: SelectListProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const getVisibleOptions = useCallback(() => options.filter(opt => !opt.hidden), [options]);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, getVisibleOptions().length);
  }, [options, getVisibleOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const visibleOptions = getVisibleOptions();
      let initialIndex = -1;
      if (value !== undefined) {
        if (multiple && Array.isArray(value) && value.length > 0) {
          initialIndex = visibleOptions.findIndex(opt => opt.value === value[0]);
        } else if (!multiple && typeof value === 'string') {
          initialIndex = visibleOptions.findIndex(opt => opt.value === value);
        }
      }
      if (initialIndex === -1) {
         initialIndex = visibleOptions.findIndex(opt => !opt.disabled);
      }
      setHighlightedIndex(initialIndex);
      optionRefs.current[initialIndex]?.scrollIntoView({ block: 'nearest' });

    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen, value, multiple, getVisibleOptions]);


  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? [...value] : [];
      const optionIndex = currentValue.indexOf(optionValue);
      if (optionIndex > -1) {
        currentValue.splice(optionIndex, 1);
      } else {
        currentValue.push(optionValue);
      }
      onChange(currentValue);
      // For multiple, typically keep dropdown open unless user explicitly closes
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const visibleOptions = getVisibleOptions();

    switch (event.key) {
      case 'Enter':
      case ' ': // Space key
        event.preventDefault();
        if (isOpen) {
          if (highlightedIndex >= 0 && highlightedIndex < visibleOptions.length) {
            const selectedOption = visibleOptions[highlightedIndex];
            if (selectedOption && !selectedOption.disabled) {
              handleOptionClick(selectedOption.value);
            }
          }
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (visibleOptions.length > 0) {
          let nextIndex = highlightedIndex;
          do {
            nextIndex = (nextIndex + 1) % visibleOptions.length;
          } while (visibleOptions[nextIndex]?.disabled && nextIndex !== highlightedIndex);
          
          if (!visibleOptions[nextIndex]?.disabled || nextIndex === highlightedIndex) {
            setHighlightedIndex(nextIndex);
            optionRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
          }
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (visibleOptions.length > 0) {
           let prevIndex = highlightedIndex;
           do {
            prevIndex = (prevIndex - 1 + visibleOptions.length) % visibleOptions.length;
           } while (visibleOptions[prevIndex]?.disabled && prevIndex !== highlightedIndex);

          if (!visibleOptions[prevIndex]?.disabled || prevIndex === highlightedIndex) {
            setHighlightedIndex(prevIndex);
            optionRefs.current[prevIndex]?.scrollIntoView({ block: 'nearest' });
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false); // Close dropdown on Tab out
        }
        break;
      default:
        break;
    }
  };

  const defaultRenderSelectedValue = () => {
    if (multiple) {
      const selectedCount = Array.isArray(value) ? value.length : 0;
      if (selectedCount === 0) return <span className={styles.placeholder}>{placeholder}</span>;
      if (selectedCount === 1) {
         const singleSelectedOption = options.find(opt => opt.value === (value as string[])[0]);
         return singleSelectedOption ? singleSelectedOption.label : `${selectedCount} selected`;
      }
      return `${selectedCount} selected`;
    }
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : <span className={styles.placeholder}>{placeholder}</span>;
  };

  const defaultRenderOption = (option: SelectListOption, isSelected: boolean, isHighlighted: boolean) => {
    const IconComponent = option.icon;
    return (
      <>
        {IconComponent && <IconComponent className={styles.optionIcon} />}
        {option.label}
      </>
    );
  };

  const dropdownId = id ? `${id}-dropdown` : undefined;
  const labelId = id && label ? `${id}-label` : undefined;

  const visibleOptions = getVisibleOptions();


  return (
    <div
      ref={containerRef}
      className={classNames(styles.selectListContainer, className)}
      style={style}
      onKeyDown={handleKeyDown}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={disabled ? -1 : tabIndex ?? 0}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby={labelId}
      aria-controls={isOpen ? dropdownId : undefined}
      {...(disabled && { 'aria-disabled': true })}
    >
      {label && (
        <label htmlFor={id} id={labelId} className={styles.selectListLabel}>
          {label}
        </label>
      )}
      <div
        className={classNames(styles.selectListInputWrapper, { [styles.disabled]: disabled, [styles.focused]: isFocused && !disabled })}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-hidden // This element is for presentation, actual ARIA is on the container
      >
        <div className={styles.selectListInputDisplay}>
          {renderSelectedValue
            ? renderSelectedValue(value, options, placeholder)
            : defaultRenderSelectedValue()}
        </div>
        <ArrowIcon isOpen={isOpen} />
      </div>

      {isOpen && !disabled && (
        <ul
          ref={dropdownRef}
          id={dropdownId}
          className={styles.selectListDropdown}
          style={{ maxHeight: dropdownMaxHeight }}
          role="listbox"
          aria-labelledby={labelId}
          {...(multiple && { 'aria-multiselectable': true })}
        >
          {visibleOptions.length > 0 ? (
            visibleOptions.map((option, index) => {
              const isSelected = multiple
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value;
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  key={option.value}
                  ref={el => { optionRefs.current[index] = el; }}
                  className={classNames(styles.selectListOption, {
                    [styles.selected]: isSelected,
                    [styles.disabled]: option.disabled,
                    [styles.highlighted]: isHighlighted,
                  })}
                  onClick={() => !option.disabled && handleOptionClick(option.value)}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                  {...(option.disabled && { 'aria-disabled': true })}
                >
                  {renderOption
                    ? renderOption(option, isSelected, isHighlighted)
                    : defaultRenderOption(option, isSelected, isHighlighted)}
                </li>
              );
            })
          ) : (
            <li className={styles.emptyMessage}>{emptyMessage}</li>
          )}
        </ul>
      )}
      {name && <input type="hidden" name={name} value={Array.isArray(value) ? value.join(',') : value || ''} />}
    </div>
  );
}