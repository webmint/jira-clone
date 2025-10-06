/**
 * Design System Reference Tokens
 *
 * Reference tokens are the foundational design values that define
 * the visual language of the system. They are primitive values that
 * are referenced by system tokens and component tokens.
 *
 * Architecture: Reference → System → Component
 */

/* ==========================================================================
   TYPOGRAPHY
   ========================================================================== */

/**
 * Font Family Tokens
 *
 * Primary font: Roboto (Google Fonts)
 * Should be loaded via CDN in index.html or Storybook preview
 */
export const FONT_FAMILY = {
  /** Primary font for body text, headings, and UI elements */
  PRIMARY: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  /** Monospace font for code blocks */
  MONO: "'Roboto Mono', 'Courier New', monospace",
} as const;

/**
 * Font Size Tokens (rem-based)
 *
 * Base size: 16px (1rem)
 * Scale: Minor third (1.2 ratio)
 */
export const FONT_SIZE = {
  XS: '0.75rem', // 12px - captions, labels
  SM: '0.875rem', // 14px - small text, metadata
  BASE: '1rem', // 16px - body text
  MD: '1.125rem', // 18px - subheadings
  LG: '1.25rem', // 20px - section headings
  XL: '1.5rem', // 24px - page headings
  '2XL': '1.875rem', // 30px - hero headings
  '3XL': '2.25rem', // 36px - display headings
  '4XL': '3rem', // 48px - large displays
} as const;

/**
 * Font Weight Tokens
 *
 * Roboto supports: 100, 300, 400, 500, 700, 900
 */
export const FONT_WEIGHT = {
  THIN: 100,
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
  BLACK: 900,
} as const;

/**
 * Line Height Tokens
 *
 * Optimized for readability across different text sizes
 */
export const LINE_HEIGHT = {
  /** Tight line height for headings */
  TIGHT: 1.25,
  /** Normal line height for body text */
  NORMAL: 1.5,
  /** Relaxed line height for large text blocks */
  RELAXED: 1.75,
  /** Loose line height for enhanced readability */
  LOOSE: 2,
} as const;

/**
 * Letter Spacing Tokens (em-based)
 *
 * Subtle adjustments for different text sizes
 */
export const LETTER_SPACING = {
  /** Tighter letter spacing for large headings */
  TIGHT: '-0.025em',
  /** Normal letter spacing */
  NORMAL: '0em',
  /** Wider letter spacing for small text */
  WIDE: '0.025em',
  /** Widest letter spacing for labels/buttons */
  WIDER: '0.05em',
} as const;
