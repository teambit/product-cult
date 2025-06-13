import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumList } from './forum-list.js';
import { mockForums } from '@infinity/forums.entities.forum';
import styles from './forum-list.module.scss';

describe('ForumList', () => {
  it('renders a list of forums', () => {
    const mockForumsData = mockForums();

    const { container } = render(
      <MockProvider>
        <ForumList mockForumsData={mockForumsData} />
      </MockProvider>
    );

    const forumItems = container.querySelectorAll(`.${styles.forumItemLink}`);
    expect(forumItems.length).toBe(mockForumsData.length);
  });

  it('renders a message when there are no forums', () => {
    render(
      <MockProvider>
        <ForumList mockForumsData={[]} />
      </MockProvider>
    );
    expect(screen.getByText('No forums found.')).toBeInTheDocument();
  });

  it('renders loading message when forums are loading', () => {
    render(
      <MockProvider>
        <ForumList mockForumsData={undefined} />
      </MockProvider>
    );
    expect(screen.getByText('Loading forums...')).toBeInTheDocument();
  });
});