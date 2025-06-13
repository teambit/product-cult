import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BasicMockProvider, MockProviderNoTheme, MockProviderNoRouter, MockProviderFullDisabled } from './mock-provider.compositions.js';
import { MockProvider } from './mock-provider.js';
import { useIsMock } from './use-is-mock.js';

describe('MockProvider', () => {
  it('should render children within the mock providers', () => {
    render(<BasicMockProvider />);
    expect(screen.getByText('Product Hunt - Home')).toBeInTheDocument();
  });

  it('should display "Yes" when useIsMock is true inside MockProvider', () => {
    const MockComponent = () => {
      const isMock = useIsMock();
      return <div>Is Mock: {isMock ? 'Yes' : 'No'}</div>;
    };

    render(
      <MockProvider>
        <MockComponent />
      </MockProvider>
    );
    expect(screen.getByText('Is Mock: Yes')).toBeInTheDocument();
  });

  it('should render content with router disabled when noRouter is true', () => {
    render(<MockProviderNoRouter />);
    expect(screen.getByText('Content With Router Disabled')).toBeInTheDocument();
  });

  it('should navigate between routes when using BasicMockProvider', () => {
    render(<BasicMockProvider />);
    expect(screen.getByText('Product Hunt - Home')).toBeInTheDocument();

    fireEvent.click(screen.getByText('View Recent Launches'));
    expect(screen.getByText('Recent Launches')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Back to Home'));
    expect(screen.getByText('Product Hunt - Home')).toBeInTheDocument();
  });
});