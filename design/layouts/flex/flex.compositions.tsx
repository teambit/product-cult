import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Flex } from './flex.js';

const commonItemStyle: React.CSSProperties = {
  padding: 'var(--spacing-medium)',
  border: '1px solid var(--colors-border-default)',
  borderRadius: 'var(--borders-radius-medium)',
  backgroundColor: 'var(--colors-surface-secondary)',
  color: 'var(--colors-text-primary)',
  textAlign: 'center',
  minHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--typography-font-family)',
  fontSize: 'var(--typography-sizes-body-default)',
};

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-medium)',
  border: '1px dashed var(--colors-border-subtle)',
  borderRadius: 'var(--borders-radius-large)',
  backgroundColor: 'var(--colors-surface-primary)',
  marginBottom: 'var(--spacing-large)',
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--typography-font-family)',
  color: 'var(--colors-text-primary)',
  fontSize: 'var(--typography-sizes-heading-h5)',
  marginBottom: 'var(--spacing-small)',
  marginTop: '0',
};

export const BasicRowAndColumn = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Row (Default)</h3>
          <Flex>
            <div style={commonItemStyle}>Item 1</div>
            <div style={commonItemStyle}>Item 2</div>
            <div style={commonItemStyle}>Item 3</div>
          </Flex>
        </div>

        <div style={containerStyle}>
          <h3 style={headingStyle}>Column</h3>
          <Flex direction="column">
            <div style={commonItemStyle}>Item A</div>
            <div style={commonItemStyle}>Item B</div>
            <div style={commonItemStyle}>Item C</div>
          </Flex>
        </div>

        <div style={containerStyle}>
          <h3 style={headingStyle}>Row Reverse</h3>
          <Flex direction="row-reverse">
            <div style={commonItemStyle}>First (Visually Last)</div>
            <div style={commonItemStyle}>Second</div>
            <div style={commonItemStyle}>Third (Visually First)</div>
          </Flex>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const AlignmentAndGap = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Justify Content: space-between, Align Items: center, Gap: medium</h3>
          <Flex justifyContent="space-between" alignItems="center" gap="var(--spacing-medium)">
            <div style={{ ...commonItemStyle, minHeight: '80px' }}>Item 1</div>
            <div style={commonItemStyle}>Item 2</div>
            <div style={{ ...commonItemStyle, minHeight: '40px' }}>Item 3</div>
          </Flex>
        </div>

        <div style={containerStyle}>
          <h3 style={headingStyle}>Justify Content: center, Align Items: flex-end, Column Gap: large</h3>
          <Flex direction="row" justifyContent="center" alignItems="flex-end" columnGap="var(--spacing-large)">
            <div style={{ ...commonItemStyle, height: '100px' }}>Tall Item</div>
            <div style={{ ...commonItemStyle, height: '60px' }}>Short Item</div>
            <div style={{ ...commonItemStyle, height: '120px' }}>Taller Item</div>
          </Flex>
        </div>
         <div style={containerStyle}>
          <h3 style={headingStyle}>Column with Start Alignment and Row Gap</h3>
          <Flex direction="column" alignItems="flex-start" rowGap="var(--spacing-small)">
            <div style={{ ...commonItemStyle, width: '150px' }}>Aligned Start 1</div>
            <div style={{ ...commonItemStyle, width: '200px' }}>Aligned Start 2</div>
            <div style={{ ...commonItemStyle, width: '100px' }}>Aligned Start 3</div>
          </Flex>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const WrappingAndSizing = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Wrapping Items with Fixed Container Width</h3>
          <Flex wrap="wrap" gap="var(--spacing-small)" style={{ maxWidth: '350px', border: '1px solid var(--colors-primary-default)', padding: 'var(--spacing-x-small)' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ ...commonItemStyle, flexBasis: '100px' }}>
                Item {i + 1}
              </div>
            ))}
          </Flex>
        </div>

        <div style={containerStyle}>
          <h3 style={headingStyle}>Flex Grow and Shrink</h3>
          <Flex gap="var(--spacing-small)">
            <div style={{ ...commonItemStyle, flexGrow: 1, backgroundColor: 'var(--colors-status-positive-subtle)' }}>Grows (1)</div>
            <div style={{ ...commonItemStyle, flexBasis: '200px', flexShrink: 0, backgroundColor: 'var(--colors-status-info-subtle)' }}>Fixed Basis (200px), No Shrink</div>
            <div style={{ ...commonItemStyle, flexGrow: 2, backgroundColor: 'var(--colors-status-warning-subtle)' }}>Grows More (2)</div>
          </Flex>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const UsingAsProp = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Flex as 'nav' element</h3>
          <Flex as="nav" gap="var(--spacing-medium)" style={{ padding: 'var(--spacing-small)', backgroundColor: 'var(--colors-surface-secondary)' }}>
            <a href="#home" style={{ ...commonItemStyle, textDecoration: 'none', color: 'var(--colors-text-accent)' }}>Home</a>
            <a href="#products" style={{ ...commonItemStyle, textDecoration: 'none', color: 'var(--colors-text-accent)' }}>Products</a>
            <a href="#contact" style={{ ...commonItemStyle, textDecoration: 'none', color: 'var(--colors-text-accent)' }}>Contact</a>
          </Flex>
        </div>

        <div style={containerStyle}>
          <h3 style={headingStyle}>Flex as 'section' with inline-flex display</h3>
          <Flex as="section" display="inline-flex" direction="column" gap="var(--spacing-x-small)" style={{ padding: 'var(--spacing-medium)', border: `2px solid var(--colors-secondary-default)` }}>
            <div style={{ ...commonItemStyle, fontSize: 'var(--typography-sizes-body-small)' }}>Section Item 1</div>
            <div style={{ ...commonItemStyle, fontSize: 'var(--typography-sizes-body-small)' }}>Section Item 2</div>
          </Flex>
          <span style={{ marginLeft: 'var(--spacing-small)', fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)' }}>
            (This text is next to the inline-flex container)
          </span>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);