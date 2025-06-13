import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Home } from './home.js';


export const DefaultUnauthenticatedHome = () => {
  return (
    <MockProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockProvider>
  );
};

export const AuthenticatedUserHome = () => {
  // This composition will rely on MockProvider to setup an authenticated state,
  // or it will show the default Home behavior (likely unauthenticated)
  // as jest.mock/vi.mock is not allowed in composition files.
  // const testUser = mockUser({
  //   userId: 'usr_auth_123',
  //   username: 'ProductHunter22',
  //   email: 'hunter22@example.com',
  //   imageUrl: 'https://images.unsplash.com/photo-1649767662275-b1c8ff96cc28?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw2fHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk4NjE1fDA&ixlib=rb-4.1.0',
  // });

  return (
    <MockProvider>
      <MemoryRouter>
        <Home greetingAuthenticatedFormat="Hey {username}, what's new?" />
      </MemoryRouter>
    </MockProvider>
  );
};

export const CustomizedUnauthenticatedHome = () => {
  return (
    <MockProvider>
      <MemoryRouter>
        <Home
          heroTitleUnauthenticated="Explore Cutting-Edge Innovations!"
          heroSubtitleUnauthenticated="Dive into a world of new tech. Find, discuss, and share the future, today."
          heroCtaTextUnauthenticated="Discover Now"
          heroCtaLinkUnauthenticated="/all-products"
          heroBackgroundImageUrl="https://images.unsplash.com/photo-1603899122724-98440dd9c400?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk4NjE1fDA&ixlib=rb-4.1.0"
          mainContentTitle="Freshly Launched 🚀"
        />
      </MemoryRouter>
    </MockProvider>
  );
};

export const LoadingStateHome = () => {
  // This composition will rely on MockProvider to setup a loading state,
  // or it will show the default Home behavior as jest.mock/vi.mock is not allowed.
  return (
    <MockProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockProvider>
  );
};

export const ErrorStateHome = () => {
  // This composition will rely on MockProvider to setup an error state,
  // or it will show the default Home behavior as jest.mock/vi.mock is not allowed.
  // Example error: new ApolloError({ errorMessage: 'Failed to connect to the server. Please check your connection.' })
  return (
    <MockProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </MockProvider>
  );
};