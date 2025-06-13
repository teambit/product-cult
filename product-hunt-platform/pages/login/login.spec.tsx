import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Login } from './login.js';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAuth = {
  user: null,
  loading: false,
  login: vi.fn(),
  logout: vi.fn(),
  signup: vi.fn(),
  refetchCurrentUser: vi.fn(),
  error: undefined,
};

vi.mock('@infinity/product-hunt-platform.hooks.use-auth', () => ({
  useAuth: vi.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    (useAuth as any).mockReturnValue(mockAuth);
    mockNavigate.mockClear();
    mockAuth.login.mockClear();
  });

  it('renders the login form', () => {
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    expect(screen.getByText('Login to Product Hunt')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('displays an error message when login fails', async () => {
    mockAuth.login.mockRejectedValue(new Error('Invalid credentials'));
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('redirects to homepage if user is already authenticated', () => {
    (useAuth as any).mockReturnValue({ ...mockAuth, user: { id: '123' }, loading: false });
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});