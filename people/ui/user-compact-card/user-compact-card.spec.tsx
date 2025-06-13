import React from 'react';
import { render } from '@testing-library/react';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import { UserCompactCard } from './user-compact-card.js';
import styles from './user-compact-card.module.scss';

describe('UserCompactCard', () => {
  it('renders user name and bio', () => {
    const user = createMockUserProfile({
      name: 'Test User',
      bio: 'Test bio.',
      userId: 'user1',
      createdAt: new Date().toISOString(),
    });
    const { container } = render(
        <UserCompactCard user={user} />
    );

    expect(container.querySelector(`.${styles.name}`)?.textContent).toBe('Test User');
    expect(container.querySelector(`.${styles.description}`)?.textContent).toBe('Test bio.');
  });

  it('renders "Unnamed User" when name is not provided', () => {
    const user = createMockUserProfile({
      name: '',
      bio: 'Test bio.',
      userId: 'user1',
      createdAt: new Date().toISOString(),
    });
    const { container } = render(
        <UserCompactCard user={user} />
    );
    expect(container.querySelector(`.${styles.name}`)?.textContent).toBe('Unnamed User');
  });

  it('applies clickable class when onClick is provided', () => {
    const user = createMockUserProfile({
      name: 'Test User',
      bio: 'Test bio.',
      userId: 'user1',
      createdAt: new Date().toISOString(),
    });
    const onClick = vi.fn();
    const { container } = render(
        <UserCompactCard user={user} onClick={onClick} />
    );
    expect(container.querySelector(`.${styles.userCompactCardRoot}`)?.classList.contains(styles.clickable)).toBe(true);
  });
});