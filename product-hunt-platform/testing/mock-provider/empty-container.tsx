import React from 'react';

/**
 * An empty container component that renders its children without any wrapping DOM element.
 * Useful for conditionally applying wrapper components.
 * @param {React.PropsWithChildren} props - The component props.
 * @param {React.ReactNode} props.children - The children to render.
 * @returns {React.ReactElement} The rendered children.
 */
export function EmptyContainer({ children }: React.PropsWithChildren): React.ReactElement {
  return <>{children}</>;
}