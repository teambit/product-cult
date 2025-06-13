import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Dropdown } from './dropdown.js';

const commonWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-xx-large)',
  padding: 'var(--spacing-large)',
  alignItems: 'flex-start',
  minHeight: '300px', // To ensure space for top-opening dropdowns
};

const placeholderBaseStyle: React.CSSProperties = {
  padding: 'var(--spacing-small) var(--spacing-medium)',
  border: 'var(--borders-default-width) var(--borders-default-style) var(--colors-border-default)',
  borderRadius: 'var(--borders-radius-medium)',
  backgroundColor: 'var(--colors-surface-secondary)',
  color: 'var(--colors-text-primary)',
  cursor: 'var(--interactions-cursor-pointer)',
  fontFamily: 'var(--typography-font-family)',
  fontSize: 'var(--typography-sizes-button-medium)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--spacing-small)',
};

const placeholderImageStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: 'var(--borders-radius-circle)',
  objectFit: 'cover',
  border: '2px solid var(--colors-border-subtle)',
};

const dropdownContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-x-small)',
  color: 'var(--colors-text-primary)',
  fontFamily: 'var(--typography-font-family)',
};

const dropdownItemStyle: React.CSSProperties = {
  padding: 'var(--spacing-small) var(--spacing-medium)',
  borderRadius: 'var(--borders-radius-small)',
  cursor: 'var(--interactions-cursor-pointer)',
  fontSize: 'var(--typography-sizes-body-default)',
  textAlign: 'left',
  backgroundColor: 'transparent', // Ensuring it inherits from overlay
  color: 'var(--colors-text-primary)', // Ensuring text color
  border: 'none', // Reset button border if it's a button
  width: '100%',
};

const dropdownItemHoverStyle: React.CSSProperties = {
  backgroundColor: 'var(--colors-surface-secondary)',
  color: 'var(--colors-text-accent)',
};


const PlaceholderButton = ({ text, icon }: { text: string; icon?: string }) => (
  <div style={placeholderBaseStyle}>
    {icon && <span style={{ fontSize: 'var(--typography-sizes-icon-medium)' }}>{icon}</span>}
    {text}
  </div>
);

const DropdownMenuLink = ({ children, href = '#' }: { children: React.ReactNode, href?: string }) => (
  <a
    href={href}
    style={dropdownItemStyle}
    onClick={(e) => e.preventDefault()} // Prevent actual navigation in composition
    onMouseEnter={(e) => Object.assign(e.currentTarget.style, dropdownItemHoverStyle)}
    onMouseLeave={(e) => Object.assign(e.currentTarget.style, dropdownItemStyle)} // Reset to base
  >
    {children}
  </a>
);


export const BasicProductActionsDropdown = () => {
  const handleClick = () => {
    console.log('Placeholder clicked!');
  };

  const handleOpenChange = (isOpen: boolean) => {
    console.log('Dropdown open state changed:', isOpen);
  };

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={commonWrapperStyle}>
          <Dropdown
            placeholder={<PlaceholderButton text="Product Actions" icon="🚀" />}
            onClick={handleClick}
            onOpenChange={handleOpenChange}
          >
            <div style={dropdownContentStyle}>
              <DropdownMenuLink>View Details</DropdownMenuLink>
              <DropdownMenuLink>Add to Watchlist</DropdownMenuLink>
              <DropdownMenuLink>Write a Review</DropdownMenuLink>
              <DropdownMenuLink>Share Product</DropdownMenuLink>
            </div>
          </Dropdown>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const UserProfileDropdown = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={commonWrapperStyle}>
          <Dropdown
            placeholder={
              <div style={placeholderBaseStyle}>
                <img
                  src="https://images.unsplash.com/photo-1600375104627-c94c416deefa?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHx1c2VyJTIwaW50ZXJmYWNlfGVufDF8Mnx8b3JhbmdlfDE3NDk1OTc5Njl8MA&ixlib=rb-4.1.0&q=80&w=200"
                  alt="User Avatar"
                  style={placeholderImageStyle}
                />
                <span>My Account</span>
              </div>
            }
            openPosition="bottom-end"
            onOpenChange={(isOpen) => console.log('User profile dropdown open:', isOpen)}
          >
            <div style={dropdownContentStyle}>
              <DropdownMenuLink>My Profile</DropdownMenuLink>
              <DropdownMenuLink>My Submissions</DropdownMenuLink>
              <DropdownMenuLink>Launch Dashboard</DropdownMenuLink>
              <DropdownMenuLink>Settings</DropdownMenuLink>
              <hr style={{ width: '100%', border: 0, borderTop: '1px solid var(--colors-border-subtle)', margin: 'var(--spacing-x-small) 0' }}/>
              <DropdownMenuLink>Logout</DropdownMenuLink>
            </div>
          </Dropdown>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const AdvancedFeaturesDropdown = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ ...commonWrapperStyle, alignItems: 'flex-end', minHeight: '400px' }}>
          <div style={{ marginBottom: 'var(--spacing-large)'}}>
            <p style={{color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)'}}>Initially Open (top-start):</p>
            <Dropdown
              placeholder={<PlaceholderButton text="Notifications" icon="🔔" />}
              openPosition="top-start"
              initialIsOpen={true}
              onOpenChange={(isOpen) => console.log('Initially open dropdown state:', isOpen)}
            >
              <div style={dropdownContentStyle}>
                <DropdownMenuLink>New comment on "AI Writer Pro"</DropdownMenuLink>
                <DropdownMenuLink>Product Hunt Weekly Digest</DropdownMenuLink>
                <DropdownMenuLink>"DevToolkit X" reached 100 upvotes!</DropdownMenuLink>
              </div>
            </Dropdown>
          </div>

          <div style={{ marginBottom: 'var(--spacing-large)'}}>
            <p style={{color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)'}}>Disabled Dropdown (bottom-start):</p>
            <Dropdown
              placeholder={<PlaceholderButton text="Submit Product (Disabled)" icon="➕" />}
              disabled={true}
              onClick={() => console.log('This should not fire for disabled dropdown')}
            >
              <div style={dropdownContentStyle}>
                <DropdownMenuLink>This content won't show</DropdownMenuLink>
              </div>
            </Dropdown>
          </div>
          
           <div style={{ marginBottom: 'var(--spacing-large)'}}>
            <p style={{color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)'}}>Top-End Position:</p>
            <Dropdown
              placeholder={<PlaceholderButton text="Filters" icon="⚙️" />}
              openPosition="top-end"
              onOpenChange={(isOpen) => console.log('Filters dropdown (top-end) state:', isOpen)}
            >
              <div style={dropdownContentStyle}>
                <DropdownMenuLink>Sort by: Newest</DropdownMenuLink>
                <DropdownMenuLink>Sort by: Popular</DropdownMenuLink>
                <DropdownMenuLink>Category: SaaS</DropdownMenuLink>
                <DropdownMenuLink>Category: AI</DropdownMenuLink>
              </div>
            </Dropdown>
          </div>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};