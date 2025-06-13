import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CalendarIcon } from './calendar-icon.js';
import { expect, vi } from 'vitest';

describe('CalendarIcon', () => {
  it('renders the CalendarIcon with default props', () => {
    const { container } = render(
      <MemoryRouter>
        <CalendarIcon title="Calendar" />
      </MemoryRouter>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    // Check for title element within SVG for accessibility
    const titleElement = svgElement?.querySelector('title');
    expect(titleElement).toHaveTextContent('Calendar');
  });

  it('renders the CalendarIcon with a click handler', () => {
    const onClick = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <CalendarIcon onClick={onClick} title="Clickable Calendar" />
      </MemoryRouter>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    fireEvent.click(svgElement!);
    expect(onClick).toHaveBeenCalled();
  });

  it('passes other SVG props like aria-label and role', () => {
    render(
      <MemoryRouter>
        <CalendarIcon title="Accessible Calendar" aria-label="Open calendar" role="button" />
      </MemoryRouter>
    );
    const svgElement = screen.getByRole('button', { name: 'Open calendar' }); // Icon sets aria-label if title is provided
    expect(svgElement).toBeInTheDocument();
     // The Icon component might set aria-labelledby to the title's ID if title is present.
     // If an explicit aria-label is given, it should use that.
     // We are testing that the role is applied and aria-label is passed.
     // The Icon component itself has logic for how title and aria-attributes are handled.
     // Here we verify that CalendarIcon forwards these props.
    expect(svgElement).toHaveAttribute('aria-label', 'Open calendar');
  });
});