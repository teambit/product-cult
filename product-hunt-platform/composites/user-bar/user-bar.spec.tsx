import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { UserBar } from './user-bar.js';
import styles from './user-bar.module.scss';
import { mockUser } from '@infinity/product-hunt-platform.entities.user';

// Mock useAuth hook
vi.mock('@infinity/product-hunt-platform.hooks.use-auth');

const mockNavigate = vi.fn();
// Mock useNavigate from the custom Link component
vi.mock('@infinity/design.navigation.link', async () => {
  const actual = await vi.importActual('@infinity/design.navigation.link');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserBar', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  it('renders "Get started" button and "Login" link when the user is logged out', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, loading: false, login: vi.fn(), signup: vi.fn(), logout: vi.fn(), refetchCurrentUser: vi.fn() });
    render(
      <MockProvider>
        <UserBar menuItems={[]} />
      </MockProvider>
    );

    expect(screen.getByRole('link', { name: /Get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  it('renders user avatar when the user is logged in', () => {
    const testUser = mockUser({ username: 'Test User', imageUrl: 'https://example.com/avatar.jpg' });
    vi.mocked(useAuth).mockReturnValue({ user: testUser, loading: false, login: vi.fn(), signup: vi.fn(), logout: vi.fn(), refetchCurrentUser: vi.fn() });

    render(
      <MockProvider>
        <UserBar menuItems={[]} />
      </MockProvider>
    );

    expect(screen.getByAltText(testUser.username as string)).toBeInTheDocument();
    // Check for placeholder class as an additional assertion if needed
    expect(screen.getByAltText(testUser.username as string).closest(`.${styles.avatarPlaceholder}`)).toBeInTheDocument();
  });

  it('calls logout and navigates to homepage when logout button is clicked', async () => {
    const testUser = mockUser({ username: 'Test User', imageUrl: 'https://example.com/avatar.jpg', roles: [] });
    const mockLogout = vi.fn().mockResolvedValue(true);

    vi.mocked(useAuth).mockReturnValue({ user: testUser, loading: false, login: vi.fn(), signup: vi.fn(), logout: mockLogout, refetchCurrentUser: vi.fn() });

    render(
      <MockProvider>
        <UserBar menuItems={[]} />
      </MockProvider>
    );

    // Click the avatar to open the dropdown
    const avatarElement = screen.getByAltText(testUser.username as string);
    fireEvent.click(avatarElement);

    // Find and click the logout button
    // The button might appear asynchronously if Dropdown has transitions
    const logoutButton = await screen.findByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    
    // Wait for async operations like navigation to complete
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});