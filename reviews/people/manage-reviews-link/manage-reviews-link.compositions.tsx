import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ManageReviewsLink } from './manage-reviews-link.js';

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  backgroundColor: 'var(--colors-surface-background)',
  minHeight: '150px',
  fontFamily: 'var(--typography-font-family)',
  color: 'var(--colors-text-primary)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 'var(--typography-sizes-heading-h4)',
  color: 'var(--colors-text-primary)',
  marginBottom: 'var(--spacing-small)',
  borderBottom: '1px solid var(--colors-border-subtle)',
  paddingBottom: 'var(--spacing-x-small)',
};

export const BasicManageReviewsLink = () => (
  <MockProvider>
    <div style={containerStyle}>
      <h3 style={sectionTitleStyle}>Default Link</h3>
      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
        This is the default appearance of the Manage Reviews link. It navigates to '/user/reviews'.
      </p>
      <ManageReviewsLink href="/user/reviews" />
    </div>
  </MockProvider>
);

export const CustomTextManageReviewsLink = () => (
  <MockProvider>
    <div style={containerStyle}>
      <h3 style={sectionTitleStyle}>Link with Custom Text</h3>
      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
        The link text can be customized. Here, it says "View and Edit My Product Feedback".
      </p>
      <ManageReviewsLink href="/user/feedback">
        View and Edit My Product Feedback
      </ManageReviewsLink>
    </div>
  </MockProvider>
);

export const StyledManageReviewsLink = () => (
  <MockProvider>
    <div style={containerStyle}>
      <h3 style={sectionTitleStyle}>Link with Custom Styling</h3>
      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
        Additional styles can be applied using the `className` or `style` prop. This example uses a custom class for a different look.
      </p>
      <style>{`
        .custom-reviews-link {
          background-color: var(--colors-primary-default);
          color: var(--colors-text-inverse) !important;
          padding: var(--spacing-small) var(--spacing-medium);
          border-radius: var(--borders-radius-medium);
          text-decoration: none;
          display: inline-block;
          font-weight: var(--typography-font-weight-bold);
        }
        .custom-reviews-link:hover {
          background-color: var(--colors-primary-hover);
          color: var(--colors-text-inverse) !important;
          text-decoration: none;
        }
      `}</style>
      <ManageReviewsLink href="/user/reviews-dashboard" className="custom-reviews-link">
        Go to My Reviews Dashboard
      </ManageReviewsLink>
      <ManageReviewsLink
        href="/user/archived-reviews"
        style={{
          marginTop: 'var(--spacing-medium)',
          fontSize: 'var(--typography-sizes-body-small)',
          color: 'var(--colors-status-info-default)',
        }}
      >
        View Archived Reviews (inline style)
      </ManageReviewsLink>
    </div>
  </MockProvider>
);