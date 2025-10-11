/**
 * System Design Tokens
 *
 * Semantic mappings from reference tokens to system-level tokens.
 * These tokens bridge the gap between primitive values (reference tokens)
 * and component-specific usage (component tokens).
 *
 * Architecture: Reference → System → Component
 */

import * as REF from './reference.tokens.ts';

/* ==========================================================================
   COLOR SEMANTIC TOKENS
   ========================================================================== */

/**
 * Primary color tokens
 * Used for primary actions, links, and brand elements
 */
export const PRIMARY = {
  /** Default primary color */
  DEFAULT: 'var(--color-primary-500)',
  /** Hover state */
  HOVER: 'var(--color-primary-600)',
  /** Active/pressed state */
  ACTIVE: 'var(--color-primary-700)',
  /** Disabled state */
  DISABLED: 'var(--color-primary-300)',
} as const;

/**
 * Background color tokens
 * Used for page backgrounds, surfaces, and containers
 */
export const BACKGROUND = {
  /** Default page background */
  DEFAULT: 'var(--color-neutral-0)',
  /** Subtle surface background */
  SUBTLE: 'var(--color-neutral-50)',
  /** Muted surface background */
  MUTED: 'var(--color-neutral-100)',
} as const;

/**
 * Surface color tokens
 * Used for cards, panels, and elevated surfaces
 */
export const SURFACE = {
  /** Default surface */
  DEFAULT: 'var(--color-neutral-0)',
  /** Raised surface */
  RAISED: 'var(--color-neutral-50)',
  /** Overlay surface */
  OVERLAY: 'var(--color-neutral-100)',
} as const;

/**
 * Text color tokens
 * Used for all text content
 */
export const TEXT = {
  /** Primary text (headings, important content) */
  PRIMARY: 'var(--color-neutral-900)',
  /** Secondary text (body copy) */
  SECONDARY: 'var(--color-neutral-700)',
  /** Tertiary text (captions, metadata) */
  TERTIARY: 'var(--color-neutral-600)',
  /** Disabled text */
  DISABLED: 'var(--color-neutral-400)',
  /** Inverse text (on dark backgrounds) */
  INVERSE: 'var(--color-neutral-0)',
} as const;

/**
 * Border color tokens
 * Used for borders, dividers, and outlines
 */
export const BORDER = {
  /** Default border */
  DEFAULT: 'var(--color-neutral-200)',
  /** Subtle border */
  SUBTLE: 'var(--color-neutral-100)',
  /** Strong border */
  STRONG: 'var(--color-neutral-300)',
  /** Focus outline */
  FOCUS: 'var(--color-primary-500)',
} as const;

/**
 * Semantic state color tokens
 */
export const SUCCESS = {
  DEFAULT: 'var(--color-success-500)',
  TEXT: 'var(--color-success-700)',
  BACKGROUND: 'var(--color-success-100)',
} as const;

export const WARNING = {
  DEFAULT: 'var(--color-warning-500)',
  TEXT: 'var(--color-warning-700)',
  BACKGROUND: 'var(--color-warning-100)',
} as const;

export const ERROR = {
  DEFAULT: 'var(--color-error-500)',
  TEXT: 'var(--color-error-700)',
  BACKGROUND: 'var(--color-error-100)',
} as const;

export const INFO = {
  DEFAULT: 'var(--color-info-500)',
  TEXT: 'var(--color-info-700)',
  BACKGROUND: 'var(--color-info-100)',
} as const;

/* ==========================================================================
   TYPOGRAPHY SEMANTIC TOKENS
   ========================================================================== */

/**
 * Font family semantic tokens
 */
export const FONT_FAMILY = {
  /** Body text, UI elements */
  BODY: REF.FONT_FAMILY.PRIMARY,
  /** Headings */
  HEADING: REF.FONT_FAMILY.PRIMARY,
  /** Code, monospace */
  CODE: REF.FONT_FAMILY.MONO,
} as const;

/**
 * Font size semantic tokens
 */
export const FONT_SIZE = {
  /** Headings */
  H1: REF.FONT_SIZE['4XL'],
  H2: REF.FONT_SIZE['3XL'],
  H3: REF.FONT_SIZE['2XL'],
  H4: REF.FONT_SIZE.XL,
  H5: REF.FONT_SIZE.LG,
  H6: REF.FONT_SIZE.MD,
  /** Body text */
  BODY: REF.FONT_SIZE.BASE,
  BODY_SMALL: REF.FONT_SIZE.SM,
  /** UI elements */
  CAPTION: REF.FONT_SIZE.XS,
  LABEL: REF.FONT_SIZE.SM,
} as const;

/**
 * Font weight semantic tokens
 */
export const FONT_WEIGHT = {
  /** Normal body text */
  NORMAL: REF.FONT_WEIGHT.REGULAR,
  /** Medium emphasis */
  MEDIUM: REF.FONT_WEIGHT.MEDIUM,
  /** Strong emphasis, headings */
  BOLD: REF.FONT_WEIGHT.BOLD,
} as const;

/**
 * Line height semantic tokens
 */
export const LINE_HEIGHT = {
  /** Headings */
  HEADING: REF.LINE_HEIGHT.TIGHT,
  /** Body text */
  BODY: REF.LINE_HEIGHT.NORMAL,
  /** Relaxed reading */
  RELAXED: REF.LINE_HEIGHT.RELAXED,
} as const;

/* ==========================================================================
   SPACING SEMANTIC TOKENS
   ========================================================================== */

/**
 * Spacing semantic tokens
 */
export const SPACING = {
  /** Component internal spacing */
  COMPONENT_XS: REF.SPACING['1'],
  COMPONENT_SM: REF.SPACING['2'],
  COMPONENT_MD: REF.SPACING['3'],
  COMPONENT_LG: REF.SPACING['4'],
  /** Layout spacing */
  LAYOUT_SM: REF.SPACING['6'],
  LAYOUT_MD: REF.SPACING['8'],
  LAYOUT_LG: REF.SPACING['12'],
  LAYOUT_XL: REF.SPACING['16'],
} as const;

/* ==========================================================================
   EFFECT SEMANTIC TOKENS
   ========================================================================== */

/**
 * Shadow semantic tokens
 */
export const SHADOW = {
  /** Buttons, inputs */
  SMALL: REF.SHADOW.SM,
  /** Cards, panels */
  MEDIUM: REF.SHADOW.BASE,
  /** Dropdowns, popovers */
  LARGE: REF.SHADOW.MD,
  /** Modals, dialogs */
  XLARGE: REF.SHADOW.LG,
} as const;

/**
 * Border radius semantic tokens
 */
export const BORDER_RADIUS = {
  /** Buttons, inputs */
  SMALL: REF.BORDER_RADIUS.SM,
  /** Cards, panels */
  MEDIUM: REF.BORDER_RADIUS.BASE,
  /** Large containers */
  LARGE: REF.BORDER_RADIUS.MD,
  /** Pills, badges */
  FULL: REF.BORDER_RADIUS.FULL,
} as const;

/* ==========================================================================
   TRANSITION SEMANTIC TOKENS
   ========================================================================== */

/**
 * Transition semantic tokens
 */
export const TRANSITION = {
  /** Fast UI feedback */
  FAST: `${REF.TRANSITION_DURATION.FAST} ${REF.TRANSITION_TIMING.EASE_OUT}`,
  /** Default transitions */
  NORMAL: `${REF.TRANSITION_DURATION.BASE} ${REF.TRANSITION_TIMING.EASE_IN_OUT}`,
  /** Emphasized transitions */
  SLOW: `${REF.TRANSITION_DURATION.MEDIUM} ${REF.TRANSITION_TIMING.EASE_IN_OUT}`,
} as const;
