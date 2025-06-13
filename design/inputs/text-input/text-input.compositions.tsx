import React, { useState } from 'react';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { MemoryRouter } from 'react-router-dom';
import { TextInput } from './text-input.js';

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  maxWidth: '400px',
  margin: '0 auto',
  backgroundColor: 'var(--colors-surface-background)', // Ensuring contrast
};

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--typography-font-family)',
  color: 'var(--colors-text-primary)',
  fontSize: 'var(--typography-sizes-heading-h4)',
  marginBottom: 'var(--spacing-small)',
};

export const BasicTextInput = () => {
  const [value, setValue] = useState('');
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Basic Text Input</h3>
          <TextInput
            id="basic-username"
            placeholder="Enter your username"
            value={value}
            onChange={setValue}
            name="username"
          />
          <p style={{ fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>
            Current value: {value || '(empty)'}
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const PasswordInput = () => {
  const [password, setPassword] = useState('');
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Password Input</h3>
          <TextInput
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            name="password"
          />
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const EmailInputWithInitialValue = () => {
  const [email, setEmail] = useState('example@producthunt.com');
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Email Input with Initial Value</h3>
          <TextInput
            id="contact-email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={setEmail}
            name="email"
          />
          <p style={{ fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>
            Email: {email}
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const CustomStyledTextInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Define a custom class in a separate SCSS or inline for simplicity here
  const customClassName = 'custom-search-input'; // This class would need to be defined elsewhere or in a <style> tag for this example if not in a module

  // Example inline style for the custom class (if not using a global stylesheet for demo)
  const customInputStyle = `
    .${customClassName} {
      border-color: var(--colors-primary-default);
      background-color: var(--colors-surface-secondary);
      font-weight: var(--typography-font-weight-semiBold);
    }
    .${customClassName}::placeholder {
      color: var(--colors-text-accent);
      font-style: italic;
    }
     .${customClassName}:focus {
      box-shadow: 0 0 0 2px var(--colors-primary-hover);
      border-color: var(--colors-primary-hover);
    }
  `;

  return (
    <MemoryRouter>
      <InfinityTheme>
        <style>{customInputStyle}</style>
        <div style={containerStyle}>
          <h3 style={headingStyle}>Custom Styled Search Input</h3>
          <TextInput
            id="product-search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={setSearchTerm}
            name="search"
            className={customClassName} // Apply custom class
          />
          <p style={{ fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>
            Searching for: {searchTerm || '(nothing yet)'}
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};