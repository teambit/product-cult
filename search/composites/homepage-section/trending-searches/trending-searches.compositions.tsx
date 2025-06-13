import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { TrendingSearches } from './trending-searches.js';
import type { TrendingSearchItem } from './trending-search-item-type.js';

/**
 * Basic composition demonstrating TrendingSearches with default props.
 * It will display the default title and a predefined list of trending search terms.
 */
export const BasicTrendingSearches = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <TrendingSearches />
    </div>
  </MockProvider>
);

/**
 * Composition showcasing TrendingSearches with custom title, subtitle, and items.
 * This demonstrates how to tailor the component for specific contexts or data sources.
 */
const customItems: readonly TrendingSearchItem[] = [
  { term: 'Next-Gen Gaming Consoles' },
  { term: 'Virtual Reality Experiences' },
  { term: 'Smart Home Automation' },
  { term: 'Advanced Cybersecurity' },
  { term: 'Personalized Health Tech' },
  { term: 'Future of Work Software' },
  { term: 'AI-Powered Analytics' },
];

export const CustomTrendingSearches = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <TrendingSearches
        title="Hot Topics This Week"
        subtitle="Discover what the Product Hunt community is buzzing about in tech and innovation."
        items={customItems}
      />
    </div>
  </MockProvider>
);

/**
 * Composition illustrating the component's appearance when there are no trending items.
 * This shows the fallback message defined within the component.
 */
export const EmptyTrendingSearches = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <TrendingSearches
        title="Trending Now"
        subtitle="Explore popular search terms. Currently, there are no trending items available."
        items={[]}
      />
    </div>
  </MockProvider>
);

/**
 * Composition demonstrating the use of the `className` prop to apply custom styling.
 * This allows for deeper visual integration or unique section treatments.
 * The `style` prop could also be used for inline styles if necessary.
 */
const featuredItems: readonly TrendingSearchItem[] = [
  { term: 'Open Source SaaS' },
  { term: 'Indie Game Development' },
  { term: 'UI/UX Design Kits' },
  { term: 'Decentralized Applications (dApps)' },
  { term: 'Productivity Hacks' },
];

export const FeaturedTrendingSearchesWithCustomStyling = () => (
  <MockProvider>
    <style>
      {`
        .custom-featured-trending-section {
          background: var(--effects-gradients-subtle-surface); /* Using a theme gradient */
          border-top: 3px solid var(--colors-primary-default);
          border-bottom: 3px solid var(--colors-primary-default);
          border-radius: var(--borders-radius-large);
          margin: var(--spacing-large) 0;
          box-shadow: var(--effects-shadows-large);
        }

        /* Example of styling the title passed to SectionLayout if it were a custom node,
           or overriding SectionLayout's default title styling if needed (use with care).
           TrendingSearches passes title as string, so SectionLayout handles its h2 styling.
           This is more for illustrating potential complex customization. */
        .custom-featured-trending-section h2 { /* Targets the H2 rendered by SectionLayout for the title */
          color: var(--colors-primary-default) !important; /* Make title color primary */
          font-size: var(--typography-sizes-display-small) !important; /* Custom font size */
        }

        .custom-featured-trending-section .itemsContainer {
            gap: var(--spacing-large); /* Increased gap between trending items */
            padding-top: var(--spacing-large);
            padding-bottom: var(--spacing-large);
        }

        /* Note: Directly targeting internal classes of child components (like .itemsContainer from TrendingSearches)
           can make the styling brittle. Prefer using props for configuration or CSS variables if exposed by the child.
           This is shown for illustrative purposes of what \`className\` allows at a higher level. */
      `}
    </style>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <TrendingSearches
        title="Spotlight Searches"
        subtitle="Hand-picked trending topics and tools to supercharge your projects."
        items={featuredItems}
        className="custom-featured-trending-section"
        // Example of using the style prop for minor adjustments:
        // style={{ paddingBottom: 'var(--spacing-xx-large)' }}
      />
    </div>
  </MockProvider>
);