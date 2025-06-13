/**
 * Infinity Theme tokens.
 * Include all tokens in this object.
 * These tokens define the visual language for the Infinity platform,
 * aiming for a modern, clean, and engaging user experience.
 */
export function infinityTokens() {
  const tokens = {
    /**
     * Color Palette: Defines the core colors used across the platform.
     * Primary color is vibrant for calls to action, while supporting colors ensure clarity and hierarchy.
     */
    colors: {
      primary: {
        default: '#FF6B00', // Vibrant orange for main actions and branding
        hover: '#E86000',   // Slightly darker orange for hover states
        active: '#D15700',  // Even darker for active/pressed states
      },
      secondary: {
        default: '#4A90E2', // A calm blue for secondary actions or informational elements
        hover: '#4281CB',   // Darker blue for hover
        active: '#3A72B4',  // Darker blue for active
      },
      surface: {
        background: '#F8F9FA', // Light, neutral background for the overall page
        primary: '#FFFFFF',    // Primary content surface (e.g., cards, modals)
        secondary: '#EFF3F6',  // Secondary surface for subtle differentiation (e.g., sidebars, highlighted sections)
      },
      text: {
        primary: '#212529',    // Dark gray for primary text, ensuring high readability
        secondary: '#6C757D',  // Lighter gray for secondary text, subtitles, and captions
        inverse: '#FFFFFF',    // White text for use on dark or colored backgrounds
        accent: '#FF6B00',     // Accent color for links or important text snippets
      },
      status: {
        positive: { default: '#28A745', subtle: '#D4EDDA' }, // Green for success messages
        negative: { default: '#DC3545', subtle: '#F8D7DA' }, // Red for error messages
        warning: { default: '#FFC107', subtle: '#FFF3CD' }, // Yellow for warnings
        info: { default: '#17A2B8', subtle: '#D1ECF1' },    // Blue for informational messages
      },
      overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for overlays like modals
      border: {
        default: '#DEE2E6', // Standard border color for elements
        subtle: '#E9ECEF',  // Lighter border for less emphasis
        focus: '#FF6B00',   // Focus ring color, matching primary
      },
    },

    /**
     * Borders: Defines border styles and radii for UI elements.
     */
    borders: {
      default: {
        color: 'var(--colors-border-default)', // Reference to color token
        width: '1px',
        style: 'solid',
      },
      focus: {
        color: 'var(--colors-border-focus)',
        width: '2px',
        style: 'solid',
        offset: '2px',
      },
      radius: {
        small: '4px',    // For small elements like tags, input fields
        medium: '8px',   // For standard elements like buttons, cards
        large: '16px',   // For larger containers or modal dialogs
        circle: '50%',   // For circular elements like avatars
        pill: '9999px',  // For pill-shaped elements
      },
    },

    /**
     * Typography System: Defines font families, sizes, weights, and line heights.
     * Uses a modern sans-serif font for readability and a clean aesthetic.
     */
    typography: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      sizes: {
        display: { large: '60px', medium: '48px', small: '40px' }, // For hero titles or major headings
        heading: {
          h1: '36px', // Page titles
          h2: '32px', // Section titles
          h3: '28px', // Sub-section titles
          h4: '24px', // Card titles
          h5: '20px', // Smaller headings
          h6: '18px', // Even smaller headings
        },
        body: {
          large: '18px',  // For lead paragraphs or emphasized body text
          medium: '16px', // Default body text size
          default: '16px',// Default body text size
          small: '14px',  // For secondary text, captions, or legal text
          xSmall: '12px', // For very small text like tags or footnotes
        },
        button: {
          large: '16px',
          medium: '14px',
          small: '12px',
        },
        label: {
          default: '14px',
          small: '12px',
        },
      },
      lineHeight: {
        base: '1.6',     // Comfortable reading for body text
        heading: '1.3',  // Tighter leading for headings
        condensed: '1.2',// For UI elements or tight spaces
        relaxed: '1.8',  // For more spacious text blocks
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
      },
      letterSpacing: {
        tight: '-0.02em', // For display text or large headings
        normal: '0',      // Default letter spacing
        wide: '0.025em',  // For specific stylistic choices, e.g., uppercase titles
      },
    },

    /**
     * Spacing & Layout: Defines consistent spacing units for margins, paddings, and gaps.
     * Uses a base unit (8px) and multiples for a harmonious layout.
     */
    spacing: {
      xxSmall: '4px',  // 0.5x base
      xSmall: '8px',   // 1x base
      small: '12px',   // 1.5x base
      medium: '16px',  // 2x base
      large: '24px',   // 3x base
      xLarge: '32px',  // 4x base
      xxLarge: '48px', // 6x base
      xxxLarge: '64px',// 8x base
    },

    layout: {
      /** Maximum width for page content, ensuring readability and aesthetics on large screens. */
      maxPageWidth: '1320px',
      /** Standard gutter width for grid layouts and spacing between major layout sections. */
      gutter: '24px',
      /** Breakpoints for responsive design, though these are typically handled in CSS media queries. */
      breakpoints: {
        mobile: '0px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },
      containerPadding: '16px', // Default padding for main content containers
    },

    /**
     * Visual Effects: Defines shadows, opacities, and other visual enhancements.
     */
    effects: {
      shadows: {
        xs: '0px 1px 2px rgba(0, 0, 0, 0.04)',                           // Extra small, subtle shadow
        small: '0px 2px 4px rgba(0, 0, 0, 0.06)',                         // Small shadow for cards, buttons
        medium: '0px 4px 8px rgba(0, 0, 0, 0.08)',                        // Medium shadow for elevated elements
        large: '0px 8px 16px rgba(0, 0, 0, 0.1)',                         // Large shadow for modals, popovers
        xLarge: '0px 12px 24px rgba(0, 0, 0, 0.12)',                      // Extra large shadow for significant elevation
        inset: 'inset 0px 1px 3px rgba(0, 0, 0, 0.1)',                    // Inset shadow for pressed states or wells
        primary: '0px 4px 12px rgba(255, 107, 0, 0.3)',                   // Shadow using primary color for emphasis
      },
      opacity: {
        disabled: '0.5', // For disabled UI elements
        hover: '0.8',    // General hover opacity effect if needed
        faint: '0.2',    // Very subtle opacity
        semiOpaque: '0.7',// For semi-transparent overlays or backgrounds
      },
      gradients: {
        primary: 'linear-gradient(135deg, #FF8A48 0%, #FF6B00 100%)', // Primary brand gradient
        secondary: 'linear-gradient(135deg, #6BA9E8 0%, #4A90E2 100%)', // Secondary accent gradient
        subtleSurface: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)', // Subtle gradient for backgrounds
      },
      blur: {
        small: 'blur(4px)',  // Small blur effect
        medium: 'blur(8px)', // Medium blur effect
        large: 'blur(16px)', // Large blur effect for backgrounds under modals
      },
    },

    /**
     * Interaction & Motion: Defines properties for interactive states and animations.
     */
    interactions: {
      cursor: {
        pointer: 'pointer',
        disabled: 'not-allowed',
        text: 'text',
        grab: 'grab',
        grabbing: 'grabbing',
      },
      zIndex: {
        base: '1',
        dropdown: '1000',
        sticky: '1020',
        overlay: '1030',
        modal: '1050',
        popover: '1060',
        tooltip: '1070',
        toast: '1090', // For notifications/toasts
      },
      transitions: {
        duration: {
          fast: '0.15s',    // For quick feedback like hover effects
          medium: '0.3s',   // Standard duration for transitions
          slow: '0.5s',     // For larger or more significant transitions
          verySlow: '0.8s', // For modals or page transitions
        },
        easing: {
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',     // Standard ease-in-out
          easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',       // Decelerate
          easeIn: 'cubic-bezier(0.4, 0, 1, 1)',         // Accelerate
          sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',        // Material Design sharp curve
          spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring-like bounce
        },
        property: {
          all: 'all',
          transform: 'transform',
          opacity: 'opacity',
          color: 'color, background-color, border-color', // Combined color properties
          shadow: 'box-shadow',
        },
      },
      hoverEffect: {
        scale: 'scale(1.03)',                 // Slight scale up on hover
        translateY: 'translateY(-2px)',       // Slight lift on hover
        shadow: 'var(--effects-shadows-medium)', // Enhanced shadow on hover
        brightness: 'brightness(0.95)',       // Slight dimming for dark elements or brightening for light
      },
    },
    /**
     * Sizes: Defines common sizing units for UI elements like icons, avatars, inputs.
     */
    sizes: {
        icon: {
            small: '16px',
            medium: '20px',
            large: '24px',
            xLarge: '32px',
        },
        avatar: {
            small: '24px',
            medium: '32px',
            large: '48px',
            xLarge: '64px',
        },
        inputHeight: {
            small: '32px',
            medium: '40px',
            large: '48px',
        },
        buttonHeight: { // Consistent with input heights for alignment
            small: '32px',
            medium: '40px',
            large: '48px',
        },
        // Add other common element sizes as needed
    },
  };

  return tokens;
}

// Create a theme type schema to allow new themes to override
// or implement a different theme variation like dark theme.
/**
 * Use tokens from this schema as CSS variables in your components.
 * For example, use `surfaceBackground` as CSS variable `--surface-background` (Note: Sparks converts camelCase to kebab-case).
 */
export type InfinityThemeSchema = ReturnType<typeof infinityTokens>;