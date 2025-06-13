import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import { UserCard } from './user-card.js';
import styles from './user-card.module.scss';

describe('UserCard', () => {
  it('should render user profile information', () => {
    const userProfile = createMockUserProfile({
      userId: 'test-user',
      name: 'Test User',
      bio: 'Test bio',
      imageUrl: 'test-image.jpg',
    });

    render(
      <MemoryRouter>
        <UserCard userProfile={userProfile} />
      </MemoryRouter>
    );

    const userNameElement = screen.getByRole('heading', { name: userProfile.name });
    expect(userNameElement).toBeInTheDocument();
    expect(userNameElement).toHaveClass(styles.userName);
    expect(userNameElement.textContent).toBe(userProfile.name);

    const userDescriptionElement = screen.getByText(userProfile.bio);
    expect(userDescriptionElement).toBeInTheDocument();
    expect(userDescriptionElement).toHaveClass(styles.userDescription);
    expect(userDescriptionElement.textContent).toBe(userProfile.bio);
    
    const avatarImg = screen.getByAltText(userProfile.name);
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', expect.stringContaining(userProfile.imageUrl || ''));
  });

  it('should call onAvatarClick when avatar is clicked', () => {
    const userProfile = createMockUserProfile({
      userId: 'test-user',
      name: 'Test User',
      bio: 'Test bio',
      imageUrl: 'test-image.jpg',
    });
    const onAvatarClick = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <UserCard userProfile={userProfile} onAvatarClick={onAvatarClick} />
      </MemoryRouter>
    );
    const avatarWrapper = container.querySelector(`.${styles.avatarWrapper}`);
    fireEvent.click(avatarWrapper as HTMLDivElement);
    expect(onAvatarClick).toHaveBeenCalledWith('test-user');
  });

  it('should call onNameClick when name is clicked', () => {
    const userProfile = createMockUserProfile({
      userId: 'test-user',
      name: 'Test User',
      bio: 'Test bio',
      imageUrl: 'test-image.jpg',
    });
    const onNameClick = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <UserCard userProfile={userProfile} onNameClick={onNameClick} />
      </MemoryRouter>
    );

    const nameWrapper = container.querySelector(`.${styles.nameWrapper}`);
    fireEvent.click(nameWrapper as HTMLDivElement);

    expect(onNameClick).toHaveBeenCalledWith('test-user');
  });
});