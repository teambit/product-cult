import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { MockProvider } from './mock-provider.js';
import { useIsMock } from './use-is-mock.js';

// Helper component to display mock status and router information
const MockStatusDisplay = () => {
  const isMock = useIsMock();

  return (
    <div style={{
      padding: 'var(--spacing-medium, 16px)',
      border: '1px dashed var(--colors-border-default, #ccc)',
      borderRadius: 'var(--borders-radius-medium, 8px)',
      margin: 'var(--spacing-medium, 16px) 0',
      backgroundColor: 'var(--colors-surface-primary, #f9f9f9)',
      color: 'var(--colors-text-primary, #333)',
      fontFamily: 'var(--typography-font-family, sans-serif)'
    }}>
      <h3 style={{ marginTop: 0, color: 'var(--colors-text-primary, #333)', fontSize: 'var(--typography-sizes-heading-h5, 1.2em)' }}>Mock Environment Status</h3>
      <p style={{ margin: 'var(--spacing-small, 8px) 0', fontSize: 'var(--typography-sizes-body-default, 1em)' }}>
        Currently running in mock mode: <strong>{isMock ? 'Yes' : 'No'}</strong>
      </p>
    </div>
  );
};

// Example "ProductCard" component
const ProductCard = ({ name, tagline }: { name: string, tagline: string }) => (
  <div style={{
    border: '1px solid var(--colors-border-default, #ddd)',
    padding: 'var(--spacing-medium, 16px)',
    borderRadius: 'var(--borders-radius-large, 12px)',
    backgroundColor: 'var(--colors-surface-secondary, #fff)',
    boxShadow: 'var(--effects-shadows-small, 0 2px 4px rgba(0,0,0,0.1))',
    marginBottom: 'var(--spacing-medium, 16px)',
    color: 'var(--colors-text-primary, #333)',
    fontFamily: 'var(--typography-font-family, sans-serif)'
  }}>
    <h4 style={{ margin: '0 0 var(--spacing-xSmall, 4px) 0', fontSize: 'var(--typography-sizes-heading-h4, 1.4em)', color: 'var(--colors-text-primary, #111)' }}>{name}</h4>
    <p style={{ margin: 0, fontSize: 'var(--typography-sizes-body-default, 1em)', color: 'var(--colors-text-secondary, #555)' }}>{tagline}</p>
    <button style={{
        marginTop: 'var(--spacing-small, 8px)',
        padding: 'var(--spacing-xSmall, 6px) var(--spacing-small, 12px)',
        backgroundColor: 'var(--colors-primary-default, #FF6B6B)',
        color: 'var(--colors-text-inverse, white)',
        border: 'none',
        borderRadius: 'var(--borders-radius-medium, 8px)',
        cursor: 'var(--interactions-cursor-pointer, pointer)',
        fontSize: 'var(--typography-sizes-button-medium, 0.9em)'
    }}>
        View Product
    </button>
  </div>
);

// Example Page Components for Routing Demo
const HomePage = () => (
    <div>
        <h2 style={{fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary, #333)'}}>Product Hunt - Home</h2>
        <ProductCard name="AI Launchpad" tagline="Discover the latest AI tools before anyone else." />
        <Link to="/launches" style={{ color: 'var(--colors-text-accent, #FF6B6B)', marginRight: 'var(--spacing-small, 8px)' }}>View Recent Launches</Link>
        <Link to="/news" style={{ color: 'var(--colors-text-accent, #FF6B6B)' }}>Tech News</Link>
        <MockStatusDisplay />
    </div>
);
const LaunchesPage = () => (
    <div>
        <h2 style={{fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary, #333)'}}>Recent Launches</h2>
        <ProductCard name="DevFlow AI" tagline="AI-powered code generation and review." />
        <ProductCard name="InnovateDB" tagline="Next-gen serverless database." />
        <Link to="/" style={{ color: 'var(--colors-text-accent, #FF6B6B)' }}>Back to Home</Link>
        <MockStatusDisplay />
    </div>
);
const NewsPage = () => (
    <div>
        <h2 style={{fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary, #333)'}}>Tech News</h2>
        <p style={{fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-secondary, #555)'}}>Stay updated with the latest happenings in the tech world. Today's highlight: The rise of decentralized product discovery platforms.</p>
        <Link to="/" style={{ color: 'var(--colors-text-accent, #FF6B6B)' }}>Back to Home</Link>
        <MockStatusDisplay />
    </div>
);


export const BasicMockProvider = () => {
  return (
    <MockProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launches" element={<LaunchesPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </MockProvider>
  );
};

export const MockProviderNoTheme = () => {
  return (
    <MockProvider noTheme>
        <style>{`body { background-color: #f0f0f0; font-family: Arial, sans-serif; color: #333 }`}</style>
        <div style={{padding: '20px', border: '2px solid #aaa', borderRadius: '5px'}}>
            <h2 style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>Content Without InfinityTheme</h2>
            <p>This content is rendered by MockProvider but without the InfinityTheme applied.</p>
            <p>Custom styles can be applied directly or via a different theme provider if needed.</p>
            <MockStatusDisplay />
            <ProductCard name="Retro Gadget" tagline="A cool gadget from the past, styled without theme." />
        </div>
    </MockProvider>
  );
};


export const MockProviderNoRouter = () => {
  return (
    <MockProvider noRouter>
      <div>
        <h2 style={{fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary, #333)'}}>Content With Router Disabled</h2>
        <p style={{fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-secondary, #555)'}}>
            The MemoryRouter is not active in this example. Any `Link` or `Routes` components would not function as expected.
        </p>
        <ProductCard name="Static Product Showcase" tagline="Displayed in a router-less mock environment." />
        <MockStatusDisplay />
      </div>
    </MockProvider>
  );
};

export const MockProviderFullDisabled = () => {
    return (
      <MockProvider noRouter noTheme>
        <style>{`body { background-color: #e0e0e0; font-family: 'Courier New', Courier, monospace; color: #111 }`}</style>
        <div style={{padding: '20px', border: '3px dotted #555', borderRadius: '0px'}}>
            <h2 style={{borderBottom: '2px solid #777', paddingBottom: '10px'}}>Minimal Mock Environment</h2>
            <p>This example has both InfinityTheme and MemoryRouter disabled.</p>
            <p>This is useful for testing components in isolation from theme and routing concerns, relying only on Apollo MockedProvider and the mock context itself.</p>
            <MockStatusDisplay />
            <ProductCard name="Barebones Component" tagline="Testing with minimal provider overhead." />
        </div>
      </MockProvider>
    );
  };