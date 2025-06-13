import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Card } from './card.js';
// import type { CardProps } from './card.js'; // CardProps is not used in this file

const commonCardStyles: React.CSSProperties = {
  maxWidth: '400px',
  margin: 'var(--spacing-medium)',
};

const SampleButton = ({ children, primary = false }: { children: React.ReactNode, primary?: boolean }) => (
  <button
    style={{
      backgroundColor: primary ? 'var(--colors-primary-default)' : 'var(--colors-surface-secondary)',
      color: primary ? 'var(--colors-text-inverse)' : 'var(--colors-text-primary)',
      padding: 'var(--spacing-x-small) var(--spacing-small)',
      border: `1px solid ${primary ? 'transparent' : 'var(--colors-border-default)'}`,
      borderRadius: 'var(--borders-radius-medium)',
      cursor: 'var(--interactions-cursor-pointer)',
      fontSize: 'var(--typography-sizes-button-small)',
      fontWeight: 'var(--typography-font-weight-medium)',
      fontFamily: 'inherit',
      marginRight: 'var(--spacing-x-small)',
    }}
  >
    {children}
  </button>
);

export const BasicProductCard = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <Card
          title="AI Powered Task Manager"
          variant="primary"
          style={commonCardStyles}
        >
          <p style={{ margin: 0, fontSize: 'var(--typography-sizes-body-default)', color: 'var(--colors-text-secondary)' }}>
            Organize your life with the smartest task manager. Integrates seamlessly with your existing tools.
            Perfect for teams and individuals looking to boost productivity.
          </p>
        </Card>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ProductLaunchCardWithImage = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', display: 'flex', flexWrap: 'wrap' }}>
        <Card
          title="LaunchDay: SaaS Analytics"
          image="https://images.unsplash.com/photo-1548504769-900b70ed122e?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXwyfHxvcmFuZ2V8MTc0OTU5Nzk2NXww&ixlib=rb-4.1.0"
          imageAlt="Abstract representation of data analytics"
          variant="secondary"
          interactive
          style={commonCardStyles}
          header={<h4 style={{ margin: 0, fontSize: 'var(--typography-sizes-label-default)', color: 'var(--colors-text-accent)' }}>🚀 New Launch!</h4>}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>Upvotes: 256</span>
              <SampleButton primary>View Product</SampleButton>
            </div>
          }
        >
          <p style={{ margin: 0, fontSize: 'var(--typography-sizes-body-default)', color: 'var(--colors-text-secondary)' }}>
            Track your SaaS metrics with beautiful dashboards and actionable insights.
            Today's featured launch on Product Discovery Platform.
          </p>
        </Card>

         <Card
          title="DevTools Pro Suite"
          image="https://images.unsplash.com/photo-1707332474972-d09ac7231426?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXwyfHxvcmFuZ2V8MTc0OTU5Nzk2NXww&ixlib=rb-4.1.0"
          imageAlt="Spiral design representing tool integration"
          variant="primary"
          interactive
          style={commonCardStyles}
          header={<h4 style={{ margin: 0, fontSize: 'var(--typography-sizes-label-default)', color: 'var(--colors-text-accent)' }}>🛠️ Editor's Pick</h4>}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <SampleButton>Learn More</SampleButton>
              <SampleButton primary>Get Started</SampleButton>
            </div>
          }
        >
          <p style={{ margin: 0, fontSize: 'var(--typography-sizes-body-default)', color: 'var(--colors-text-secondary)' }}>
            A comprehensive suite of tools for modern developers. Debug, test, and deploy faster.
          </p>
        </Card>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);


export const GhostCardForSubtleContent = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <Card
          title="Community Forum Update"
          variant="ghost"
          interactive
          style={commonCardStyles}
          footer={
             <a href="#" style={{ color: 'var(--colors-text-accent)', textDecoration: 'none', fontSize: 'var(--typography-sizes-body-small)' }}>
              Read Discussion &rarr;
            </a>
          }
        >
          <p style={{ margin: 0, fontSize: 'var(--typography-sizes-body-default)', color: 'var(--colors-text-secondary)' }}>
            New guidelines posted for product discussions. Please review before posting.
            This card uses the 'ghost' variant for a more subtle presentation.
          </p>
        </Card>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const FullFeaturedProductCard = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="dark">
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <Card
          title="InnovateOS: The Future of Operating Systems"
          image="https://images.unsplash.com/photo-1548504773-429e84f586d2?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXwyfHxvcmFuZ2V8MTc0OTU5Nzk2NXww&ixlib=rb-4.1.0"
          imageAlt="Abstract orange and white background representing innovation"
          variant="primary"
          interactive
          className="custom-product-card"
          style={commonCardStyles}
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: 'var(--typography-sizes-heading-h5)', color: 'var(--colors-text-primary)' }}>Just Launched!</h4>
              <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', padding: 'var(--spacing-xx-small) var(--spacing-x-small)', backgroundColor: 'var(--colors-status-positive-subtle)', color: 'var(--colors-status-positive-default)', borderRadius: 'var(--borders-radius-pill)'}}>
                Trending
              </span>
            </div>
          }
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{display: 'flex', gap: 'var(--spacing-small)', alignItems: 'center'}}>
                <img src="https://images.unsplash.com/photo-1640007689958-d49cef861e4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw2fHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXwyfHxvcmFuZ2V8MTc0OTU5Nzk2NXww&ixlib=rb-4.1.0&q=80&w=200" alt="Creator Avatar" style={{width: 'var(--sizes-avatar-medium)', height: 'var(--sizes-avatar-medium)', borderRadius: 'var(--borders-radius-circle)'}} />
                <span style={{ fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>By Innovatech Labs</span>
              </div>
              <SampleButton primary>Upvote (1.2k)</SampleButton>
            </div>
          }
        >
          <p style={{ margin: '0 0 var(--spacing-small) 0', fontSize: 'var(--typography-sizes-body-default)', color: 'var(--colors-text-secondary)' }}>
            Experience a blazingly fast, secure, and intuitive OS designed for creators and developers.
            With AI-powered features and a revolutionary UI.
          </p>
          <div style={{display: 'flex', gap: 'var(--spacing-x-small)', flexWrap: 'wrap'}}>
            {['AI', 'Productivity', 'Operating System', 'Tech'].map(tag => (
              <span key={tag} style={{fontSize: 'var(--typography-sizes-body-x-small)', padding: 'var(--spacing-xx-small) var(--spacing-x-small)', backgroundColor: 'var(--colors-surface-secondary)', color: 'var(--colors-text-primary)', borderRadius: 'var(--borders-radius-small)'}}>
                {tag}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);