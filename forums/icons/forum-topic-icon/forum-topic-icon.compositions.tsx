import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumTopicIcon } from './forum-topic-icon.js';

const CompositionSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ 
    marginBottom: 'var(--spacing-large, 24px)', 
    padding: 'var(--spacing-medium, 16px)', 
    border: '1px solid var(--colors-border-subtle, #ccc)', 
    borderRadius: 'var(--borders-radius-medium, 8px)', 
    backgroundColor: 'var(--colors-surface-primary, #f8f8f8)' 
  }}>
    <h3 style={{ 
      marginTop: 0, 
      marginBottom: 'var(--spacing-medium, 16px)', 
      color: 'var(--colors-text-primary, #333)', 
      fontSize: 'var(--typography-sizes-heading-h5, 1.2em)',
      fontFamily: 'var(--typography-font-family, sans-serif)'
    }}>{title}</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium, 16px)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary)' }}>
      {children}
    </div>
  </div>
);

export const BasicForumTopicIcon = () => {
  return (
    <MockProvider>
      <CompositionSection title="Default Forum Topic Icon">
        <ForumTopicIcon />
        <span>Default (24px, currentColor, "Forum Topic" title)</span>
      </CompositionSection>
    </MockProvider>
  );
};

export const SizedAndColoredForumTopicIcons = () => {
  return (
    <MockProvider>
      <CompositionSection title="Sized and Colored Forum Topic Icons">
        <div>
          <ForumTopicIcon size={16} title="Small Topic" />
          <span>16px</span>
        </div>
        <div>
          <ForumTopicIcon size={32} title="Medium Topic" />
          <span>32px</span>
        </div>
        <div>
          <ForumTopicIcon size={48} title="Large Topic" />
          <span>48px</span>
        </div>
        <div>
          <ForumTopicIcon color="var(--colors-primary-default)" title="Primary Color Topic" />
          <span>Primary Color</span>
        </div>
        <div>
          <ForumTopicIcon color="var(--colors-status-positive-default)" title="Success Topic" />
          <span>Positive Status Color</span>
        </div>
        <div>
          <ForumTopicIcon color="#8E44AD" title="Custom Color Topic" />
          <span>Custom Hex Color (#8E44AD)</span>
        </div>
      </CompositionSection>
    </MockProvider>
  );
};

export const ClickableAndCustomTitleForumTopicIcon = () => {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('Forum Topic Icon Clicked!');
  };

  return (
    <MockProvider>
      <CompositionSection title="Clickable and Custom Title Forum Topic Icon">
        <div>
          <ForumTopicIcon 
            onClick={handleClick} 
            title="Start New Discussion" 
            style={{ cursor: 'var(--interactions-cursor-pointer, pointer)' }} 
          />
          <span>Clickable, Custom Title: "Start New Discussion"</span>
        </div>
        <div>
          <ForumTopicIcon 
            className="custom-class-example"
            title="Archived Topics"
            style={{ border: '1px dashed var(--colors-border-default)', padding: '4px', borderRadius: 'var(--borders-radius-small)'}}
          />
           <span>With Custom Class & Style (hover to see border)</span>
        </div>
      </CompositionSection>
    </MockProvider>
  );
};