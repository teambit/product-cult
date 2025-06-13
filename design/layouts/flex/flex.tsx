import React from 'react';
import classNames from 'classnames';
import styles from './flex.module.scss';

/**
 * Properties specific to the Flex component's behavior and styling.
 * These properties control the flex container and its items.
 */
interface FlexSpecificProps {
  /**
   * The content to be rendered inside the flex container.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class names to apply to the flex container.
   */
  className?: string;
  /**
   * Inline styles to apply to the flex container.
   * These will be merged with styles generated from other props, with these taking precedence.
   */
  style?: React.CSSProperties;
  /**
   * Specifies the display type of the flex container. Defaults to 'flex'.
   */
  display?: 'flex' | 'inline-flex';
  /**
   * Defines the direction of the main axis. Corresponds to the CSS flexDirection property.
   * If not specified, browser default (typically 'row') applies.
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /**
   * Aligns items along the main axis. Corresponds to the CSS justifyContent property.
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right';
  /**
   * Aligns items along the cross axis. Corresponds to the CSS alignItems property.
   */
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end';
  /**
   * Aligns lines within the flex container when there is extra space in the cross-axis.
   * Only applies if 'wrap' is 'wrap' or 'wrap-reverse' and there are multiple lines.
   * Corresponds to the CSS alignContent property.
   */
  alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'baseline';
  /**
   * Specifies whether flex items are forced onto one line or can wrap onto multiple lines.
   * Corresponds to the CSS flexWrap property.
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /**
   * Shorthand for 'rowGap' and 'columnGap'. Specifies the gap between flex items.
   * Can be a number (interpreted as pixels) or a string (e.g. 'var(--spacing-medium)', or '1rem').
   */
  gap?: string | number;
  /**
   * Specifies the gap between rows when items wrap.
   * Can be a number (interpreted as pixels) or a string.
   */
  rowGap?: string | number;
  /**
   * Specifies the gap between columns.
   * Can be a number (interpreted as pixels) or a string.
   */
  columnGap?: string | number;
  /**
   * Defines the ability for a flex item to grow if necessary.
   * Corresponds to the CSS flexGrow property.
   */
  flexGrow?: number | string;
  /**
   * Defines the ability for a flex item to shrink if necessary.
   * Corresponds to the CSS flexShrink property.
   */
  flexShrink?: number | string;
  /**
   * Defines the default size of an element before the remaining space is distributed.
   * Corresponds to the CSS flexBasis property.
   */
  flexBasis?: string | number;
  /**
   * Shorthand for 'flexGrow', 'flexShrink', and 'flexBasis'.
   * Corresponds to the CSS flex property.
   */
  flex?: string;
  /**
   * Defines the order of a flex item relative to the rest of the flex items.
   * Corresponds to the CSS order property.
   */
  order?: number;
  /**
   * Allows the default alignment (or the one specified by 'alignItems') to be overridden for individual flex items.
   * Corresponds to the CSS alignSelf property.
   */
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

/**
 * Props for the Flex component.
 * Allows specifying the rendered HTML element type via the 'as' prop,
 * and automatically types HTML attributes for that element.
 * @template C The HTML element type to render, defaults to 'div'.
 */
export type FlexProps<C extends keyof React.JSX.IntrinsicElements = 'div'> = {
  /**
   * The HTML element type to render. Defaults to 'div'.
   * For example, to render a flex container as a 'nav' element, use as='nav'.
   */
  as?: C;
} & FlexSpecificProps & Omit<React.ComponentPropsWithoutRef<C>, keyof FlexSpecificProps | 'as'>;


/**
 * A versatile layout component using CSS Flexbox.
 * It allows for easy arrangement of child elements in rows or columns,
 * with fine-grained control over alignment, justification, and spacing.
 * The component can be rendered as different HTML elements using the 'as' prop.
 * @template C The HTML element type to render, defaults to 'div'.
 */
export function Flex<C extends keyof React.JSX.IntrinsicElements = 'div'>(
  initialProps: FlexProps<C>
) {
  const {
    as,
    children,
    className,
    style,
    display = 'flex',
    direction,
    justifyContent,
    alignItems,
    alignContent,
    wrap,
    gap,
    rowGap,
    columnGap,
    flexGrow,
    flexShrink,
    flexBasis,
    flex,
    order,
    alignSelf,
    ...rest
  } = initialProps;

  const ComponentToRender = as || 'div' as any;

  const dynamicStyles: React.CSSProperties = {
    display,
    flexDirection: direction,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap: wrap,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    rowGap: typeof rowGap === 'number' ? `${rowGap}px` : rowGap,
    columnGap: typeof columnGap === 'number' ? `${columnGap}px` : columnGap,
    flexGrow,
    flexShrink,
    flexBasis,
    flex,
    order,
    alignSelf,
  };

  const MappedDynamicStyles = Object.entries(dynamicStyles).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof any] = value;
    }
    return acc;
  }, {} as React.CSSProperties);

  const combinedStyles: React.CSSProperties = { ...MappedDynamicStyles, ...style };

  return (
    <ComponentToRender
      className={classNames(styles.flex, className)}
      style={combinedStyles}
      {...rest}
    >
      {children}
    </ComponentToRender>
  );
}