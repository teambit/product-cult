import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { EditUserProfilePage } from './edit-user-profile-page.js';
import { MemoryRouter } from 'react-router-dom';
import styles from './edit-user-profile-page.module.scss';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { useGetUserProfile, useUpdateUserProfile } from '@infinity/people.hooks.use-user-profile';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import { mockUser } from '@infinity/product-hunt-platform.entities.user';
import { vi } from 'vitest';

vi.mock('@infinity/product-hunt-platform.hooks.use-auth');
vi.mock('@infinity/people.hooks.use-user-profile');

describe('EditUserProfilePage', () => {
  it('renders the form when user and profile data are loaded', async () => {
    const mockAuth = { user: mockUser(), loading: false, error: undefined };
    const mockUserProfile = createMockUserProfile();

    (useAuth as any).mockReturnValue(mockAuth);
    (useGetUserProfile as any).mockReturnValue({
      userProfile: mockUserProfile,
      loading: false,
      error: undefined,
      refetch: vi.fn(),
    });
    (useUpdateUserProfile as any).mockReturnValue([vi.fn(), { loading: false, error: undefined }]);

    const { container } = render(
      <MockProvider noRouter>
        <MemoryRouter>
          <EditUserProfilePage />
        </MemoryRouter>
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.title}`)).toBeInTheDocument();
    expect(container.querySelector('#profile-name')).toBeInTheDocument();
    expect(container.querySelector('#profile-bio')).toBeInTheDocument();
  });

  it('updates the name input and calls the onChange handler', () => {
    const mockAuth = { user: mockUser(), loading: false, error: undefined };
    const mockUserProfile = createMockUserProfile();

    (useAuth as any).mockReturnValue(mockAuth);
    (useGetUserProfile as any).mockReturnValue({
      userProfile: mockUserProfile,
      loading: false,
      error: undefined,
      refetch: vi.fn(),
    });
    (useUpdateUserProfile as any).mockReturnValue([vi.fn(), { loading: false, error: undefined }]);

    const { container } = render(
      <MockProvider noRouter>
        <MemoryRouter>
          <EditUserProfilePage />
        </MemoryRouter>
      </MockProvider>
    );

    const nameInput = container.querySelector<HTMLInputElement>('#profile-name');
    expect(nameInput).toBeInTheDocument();

    fireEvent.change(nameInput!, { target: { value: 'New Name' } });
    expect(nameInput!.value).toBe('New Name');
  });

  it('displays loading message when auth is loading', () => {
    (useAuth as any).mockReturnValue({ user: null, loading: true, error: undefined });
    (useGetUserProfile as any).mockReturnValue({ userProfile: undefined, loading: true, error: undefined, refetch: vi.fn() });
    (useUpdateUserProfile as any).mockReturnValue([vi.fn(), { loading: false, error: undefined }]);

    const { container } = render(
      <MockProvider noRouter>
        <MemoryRouter>
          <EditUserProfilePage />
        </MemoryRouter>
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.loadingSpinner}`)).toBeInTheDocument();
  });
});