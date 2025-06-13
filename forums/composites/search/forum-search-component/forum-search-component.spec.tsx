import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ForumSearchComponent } from './forum-search-component.js';
import { vi, describe, it, expect, afterEach } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ForumSearchComponent', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component with input and button', () => {
    const { container } = render(
      <MemoryRouter>
        <ForumSearchComponent />
      </MemoryRouter>
    );

    const inputElement = container.querySelector('input');
    const buttonElement = container.querySelector('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update the input value on change', () => {
    const { container } = render(
      <MemoryRouter>
        <ForumSearchComponent />
      </MemoryRouter>
    );

    const inputElement = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    expect(inputElement.value).toBe('test query');
  });

  it('should navigate to search page with query on button click', () => {
    const { container } = render(
      <MemoryRouter>
        <ForumSearchComponent />
      </MemoryRouter>
    );
    const inputElement = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    const buttonElement = container.querySelector('button');
    fireEvent.click(buttonElement as Element);

    expect(mockNavigate).toHaveBeenCalledWith('/search?q=test%20query&type=forums');
  });
});