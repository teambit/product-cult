import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { SectionLayout } from './section-layout.js';

const commonImageStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  borderRadius: 'var(--borders-radius-large)',
  objectFit: 'cover',
  margin: 'var(--spacing-medium) auto',
  display: 'block',
};

export const BasicSectionWithContent = () => (
  <MemoryRouter>
    <InfinityTheme>
      <SectionLayout>
        <Paragraph>
          Welcome to the latest product showcase! Here, we delve into new and exciting innovations
          that are making waves in the tech industry. This section simply presents content
          without any specific title or subtitle, allowing the content itself to take center stage.
          Ideal for focused product descriptions or feature highlights.
        </Paragraph>
        <img
          src="https://images.unsplash.com/photo-1649767428212-7590dbf20116?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjB3ZWIlMjBVSSUyMGNvbnRlbnQlMjBwcmVzZW50YXRpb258ZW58MXwwfHxvcmFuZ2V8MTc0OTU5ODYyM3ww&ixlib=rb-4.1.0"
          alt="Woman holding a laptop"
          style={commonImageStyle}
        />
        <Paragraph>
          Explore detailed reviews, maker stories, and upcoming launches. We aim to provide a
          comprehensive look at what's new and noteworthy.
        </Paragraph>
      </SectionLayout>
    </InfinityTheme>
  </MemoryRouter>
);

export const SectionWithAllTextElements = () => (
  <MemoryRouter>
    <InfinityTheme>
      <SectionLayout
        caption="Discover Daily"
        title="Featured Product Launches"
        subtitle="Explore the most innovative products hitting the market this week. Handpicked by our team and community."
      >
        <Paragraph>
          This week’s lineup includes groundbreaking AI tools, beautifully designed hardware, and
          game-changing software solutions. Each product featured here has been carefully selected
          for its potential to impact its respective field. We provide insights from early adopters,
          comparisons with existing solutions, and a direct line to the makers.
        </Paragraph>
        <img
          src="https://images.unsplash.com/photo-1573867607590-361ea324975e?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjB3ZWIlMjBVSSUyMGNvbnRlbnQlMjBwcmVzZW50YXRpb258ZW58MXwwfHxvcmFuZ2V8MTc0OTU5ODYyM3ww&ixlib=rb-4.1.0"
          alt="Website layout doodles"
          style={commonImageStyle}
        />
        <Paragraph>
          Dive deeper into each product by reading user reviews, joining forum discussions, or
          checking out upcoming live demo sessions. Your next favorite product might be just
          a click away!
        </Paragraph>
      </SectionLayout>
    </InfinityTheme>
  </MemoryRouter>
);

export const SectionWithCustomNodeTitleAndRichContent = () => (
  <MemoryRouter>
    <InfinityTheme>
      <SectionLayout
        caption="Innovate & Inspire"
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-small)' }}>
            <img
              src="https://images.unsplash.com/photo-1652156752342-c786f1e1d1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBVSSUyMGNvbnRlbnQlMjBwcmVzZW50YXRpb258ZW58MXwwfHxvcmFuZ2V8MTc0OTU5ODYyM3ww&ixlib=rb-4.1.0&q=80&w=200"
              alt="Magento Icon Thumbnail"
              style={{ width: 'var(--sizes-icon-large)', height: 'var(--sizes-icon-large)' }}
            />
            <Heading level={2} visualLevel={2} style={{ margin: 0, color: 'var(--colors-primary-default)' }}>
              Spotlight on E-commerce
            </Heading>
          </div>
        }
        subtitle="Explore products that push the boundaries of online retail technology and user experience design."
      >
        <Paragraph>
          The e-commerce landscape is constantly evolving. This section highlights platforms, tools,
          and integrations that are redefining how businesses sell online and how consumers shop.
          From AI-driven personalization to seamless checkout experiences, innovation is key.
        </Paragraph>
        <img
          src="https://images.unsplash.com/photo-1652156752342-c786f1e1d1ce?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBVSSUyMGNvbnRlbnQlMjBwcmVzZW50YXRpb258ZW58MXwwfHxvcmFuZ2V8MTc0OTU5ODYyM3ww&ixlib=rb-4.1.0"
          alt="Magento icon in 3D"
          style={commonImageStyle}
        />
        <Paragraph>
          We look at case studies, feature breakdowns, and expert opinions to help you
          understand the value these products bring to the market. Whether you're a merchant,
          developer, or designer, there's something here to spark your interest.
        </Paragraph>
      </SectionLayout>
    </InfinityTheme>
  </MemoryRouter>
);

export const SectionWithCustomStyling = () => (
  <MemoryRouter>
    <InfinityTheme>
      <SectionLayout
        title="Community Showcase & Forums"
        subtitle="See what our talented community is building, launching, and discussing. Join the conversation!"
        className="custom-community-section-background" // This class would be defined in a global/theme CSS file to change background or add patterns
      >
        <Paragraph>
          Our community is the heart of ProductSpotlight. Here, makers share their latest creations,
          users provide invaluable feedback, and enthusiasts discuss emerging trends. This section
          is styled with a custom class (`custom-community-section-background`) to give it a unique
          visual identity, perhaps a distinct background color or pattern defined elsewhere.
        </Paragraph>
        <div style={{ display: 'flex', gap: 'var(--spacing-large)', marginTop: 'var(--spacing-medium)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 300px', padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-primary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)'}}>
            <Heading level={4} visualLevel={5} style={{color: 'var(--colors-text-accent)'}}>Hot Topics</Heading>
            <ul style={{listStyleType: 'disc', paddingLeft: 'var(--spacing-medium)', color: 'var(--colors-text-secondary)'}}>
              <li>AI in Content Creation</li>
              <li>The Future of No-Code</li>
              <li>Sustainable Tech Products</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 300px', padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-primary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)'}}>
            <Heading level={4} visualLevel={5} style={{color: 'var(--colors-text-accent)'}}>Recent Launches</Heading>
            <Paragraph>Check out "InnovateAI", "ConnectSphere", and "EcoTracker" - all launched by community members this month!</Paragraph>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1649767662275-b1c8ff96cc28?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB3ZWIlMjBVSSUyMGNvbnRlbnQlMjBwcmVzZW50YXRpb258ZW58MXwwfHxvcmFuZ2V8MTc0OTU5ODYyM3ww&ixlib=rb-4.1.0"
          alt="Businessman holding a folder"
          style={{...commonImageStyle, marginTop: 'var(--spacing-large)'}}
        />
      </SectionLayout>
    </InfinityTheme>
  </MemoryRouter>
);