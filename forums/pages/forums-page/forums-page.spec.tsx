import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Forum } from '@infinity/forums.entities.forum';
import { ForumsPage } from './forums-page.js';
import styles from './forums-page.module.scss';

describe('ForumsPage', () => {
  const mockForums = [
    new Forum('Test Forum 1', 'Description for forum one', new Date().toISOString(), new Date().toISOString(), undefined, 'forum-id-1'),
    new Forum('Another Forum', 'Description for forum two', new Date().toISOString(), new Date().toISOString(), undefined, 'forum-id-2'),
  ];

  it('renders the page title', () => {
    const pageTitle = 'Test Forums';
    render(
      <MockProvider>
        <ForumsPage pageTitle={pageTitle} mockForumsData={mockForums} />
      </MockProvider>
    );
    const headingElement = screen.getByRole('heading', { name: pageTitle, level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  it('displays "No forums found" message when search with mockData yields no results', () => {
    render(
      <MockProvider>
        <ForumsPage mockForumsData={mockForums} />
      </MockProvider>
    );
    const searchInput = screen.getByPlaceholderText('Search forums...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent search term' } });
    // The message includes the search term and a period at the end.
    expect(screen.getByText(/No forums found matching your search for 'nonexistent search term'\./i)).toBeInTheDocument();
  });

  it('displays "No forums found" message when mockForumsData is empty and a search is performed', () => {
    render(
      <MockProvider>
        <ForumsPage mockForumsData={[]} />
      </MockProvider>
    );
    const searchInput = screen.getByPlaceholderText('Search forums...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText(/No forums found matching your search for 'nonexistent'\./i)).toBeInTheDocument();
  });


  it('renders the forum list when forums are available', () => {
    const { container } = render(
      <MockProvider>
        <ForumsPage mockForumsData={mockForums} />
      </MockProvider>
    );
    const forumListWrapper = container.querySelector(`.${styles.forumListWrapper}`);
    expect(forumListWrapper).toBeInTheDocument();

    expect(screen.getByText(mockForums[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockForums[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockForums[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockForums[1].description)).toBeInTheDocument();
  });

  it('filters forums correctly when mockForumsData is provided and search term changes', () => {
    render(
      <MockProvider>
        <ForumsPage mockForumsData={mockForums} />
      </MockProvider>
    );
    const searchInput = screen.getByPlaceholderText('Search forums...');

    // Search for "Test Forum 1" (by name)
    fireEvent.change(searchInput, { target: { value: 'Test Forum 1' } });
    expect(screen.getByText('Test Forum 1')).toBeInTheDocument();
    expect(screen.queryByText('Another Forum')).not.toBeInTheDocument();

    // Search for "forum two" (by description, partial match)
    fireEvent.change(searchInput, { target: { value: 'forum two' } });
    expect(screen.queryByText('Test Forum 1')).not.toBeInTheDocument();
    expect(screen.getByText('Another Forum')).toBeInTheDocument();
    expect(screen.getByText('Description for forum two')).toBeInTheDocument();
    
    // Search for "description for" (present in both)
    fireEvent.change(searchInput, { target: { value: 'description for' } });
    expect(screen.getByText('Test Forum 1')).toBeInTheDocument();
    expect(screen.getByText('Another Forum')).toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Test Forum 1')).toBeInTheDocument();
    expect(screen.getByText('Another Forum')).toBeInTheDocument();

    // Search for something not present
    fireEvent.change(searchInput, { target: { value: 'absolutelynothinghere' } });
    expect(screen.queryByText('Test Forum 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Another Forum')).not.toBeInTheDocument();
    expect(screen.getByText(/No forums found matching your search for 'absolutelynothinghere'\./i)).toBeInTheDocument();
  });
});