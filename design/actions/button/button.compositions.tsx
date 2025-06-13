import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Button } from './button.js';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  padding: 'var(--spacing-large)',
  alignItems: 'flex-start',
  fontFamily: 'var(--typography-font-family)',
  backgroundColor: 'var(--colors-surface-background)',
  color: 'var(--colors-text-primary)',
  minHeight: '200px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-medium)',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: 'var(--spacing-medium)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--typography-sizes-heading-h4)',
  color: 'var(--colors-text-primary)',
  marginBottom: 'var(--spacing-small)',
  marginTop: 'var(--spacing-large)',
  borderBottom: '1px solid var(--colors-border-subtle)',
  paddingBottom: 'var(--spacing-x-small)',
  width: '100%',
};

const handleButtonClick = (action: string) => {
  // eslint-disable-next-line no-alert
  alert(`${action} button clicked!`);
};

export const AllButtonAppearances = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Button Appearances</h3>
        <div style={rowStyle}>
          <Button appearance="primary" onClick={() => handleButtonClick('Primary Upvote')}>
            Upvote Product
          </Button>
          <Button appearance="secondary" onClick={() => handleButtonClick('Secondary View Comments')}>
            View Comments
          </Button>
          <Button appearance="tertiary" onClick={() => handleButtonClick('Tertiary Learn More')}>
            Learn More
          </Button>
        </div>

        <h3 style={sectionTitleStyle}>Custom ClassName (for additional styling)</h3>
        <style>{`
          .custom-product-launch-button {
            background-image: var(--effects-gradients-primary);
            border-color: transparent;
            box-shadow: var(--effects-shadows-primary);
            font-weight: var(--typography-font-weight-bold);
          }
          .custom-product-launch-button:hover {
              opacity: 0.9;
          }
        `}</style>
        <div style={rowStyle}>
          <Button
            appearance="primary"
            className="custom-product-launch-button"
            onClick={() => handleButtonClick('Custom Launch')}
          >
            Launch My Product!
          </Button>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ButtonsWithDifferentStatesAndTypes = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Disabled Buttons</h3>
        <div style={rowStyle}>
          <Button appearance="primary" disabled onClick={() => handleButtonClick('Disabled Primary')}>
            Submit Product (Disabled)
          </Button>
          <Button appearance="secondary" disabled onClick={() => handleButtonClick('Disabled Secondary')}>
            Join Discussion (Disabled)
          </Button>
          <Button appearance="tertiary" disabled onClick={() => handleButtonClick('Disabled Tertiary')}>
            Follow Topic (Disabled)
          </Button>
        </div>

        <h3 style={sectionTitleStyle}>Button HTML Types (within a form)</h3>
        <form
          style={{ padding: 'var(--spacing-medium)', border: `1px solid var(--colors-border-default)`, borderRadius: 'var(--borders-radius-medium)', backgroundColor: 'var(--colors-surface-primary)' }}
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-alert
            alert('Product review form submitted!');
          }}
          onReset={() => {
            // eslint-disable-next-line no-alert
            alert('Product review form reset!');
          }}
        >
          <p style={{color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', marginBottom: 'var(--spacing-medium)'}}>Submit your product review:</p>
          <div style={rowStyle}>
            <Button type="submit" appearance="primary" onClick={() => console.log('Submit button specific click')}>
              Submit Review
            </Button>
            <Button type="reset" appearance="secondary" onClick={() => console.log('Reset button specific click')}>
              Reset Form
            </Button>
            <Button type="button" appearance="tertiary" onClick={() => handleButtonClick('Generic action')}>
              Save Draft
            </Button>
          </div>
        </form>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ButtonsAsNavigationLinks = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <h3 style={sectionTitleStyle}>Buttons as Links</h3>
        <div style={rowStyle}>
          <Button href="/discover-products" appearance="primary" onClick={() => console.log('Navigating to discover products')}>
            Discover New Products
          </Button>
          <Button
            href="https://www.producthunt.com"
            external
            appearance="secondary"
            onClick={() => console.log('Navigating to external Product Hunt site')}
          >
            Visit Product Hunt Official
          </Button>
          <Button
            href="/submit-launch"
            appearance="tertiary"
            disabled
            onClick={() => handleButtonClick('Disabled Submit Launch Link')}
          >
            Post a Launch (Soon)
          </Button>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);