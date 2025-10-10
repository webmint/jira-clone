/**
 * UiButton Component Contract
 *
 * This contract defines the public API for the UiButton component.
 * All implementations must adhere to this interface.
 *
 * @feature 004-uibutton-component-you
 * @component UiButton
 * @location front/src/components/atoms/Button/UiButton.vue
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Button visual variants
 * - filled: Solid background with primary color
 * - outline: Transparent background with border
 * - text: No background or border, text only
 */
export type ButtonVariant = 'filled' | 'outline' | 'text';

/**
 * Button size variations
 * - xs: Extra small (compact UI)
 * - small: Small (dense layouts)
 * - medium: Medium (default, most common)
 * - large: Large (prominent actions)
 * - xl: Extra large (hero sections)
 */
export type ButtonSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

/**
 * HTML button type attribute values
 */
export type ButtonType = 'button' | 'submit' | 'reset';

// ============================================================================
// Props Interface
// ============================================================================

/**
 * UiButton component props
 */
export interface UiButtonProps {
  /**
   * Button label text
   * @default undefined
   * @optional Can be omitted if using default slot
   */
  label?: string;

  /**
   * Visual style variant
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Disabled state
   * When true, button is not interactive and shows 50% opacity
   * @default false
   */
  disabled?: boolean;

  /**
   * ARIA label for screen readers
   * Required for icon-only buttons to meet accessibility standards
   * @default undefined
   * @optional Use when button has no text content
   */
  ariaLabel?: string;

  /**
   * HTML button type attribute
   * @default 'button'
   */
  type?: ButtonType;
}

// ============================================================================
// Emits Interface
// ============================================================================

/**
 * UiButton component events
 */
export interface UiButtonEmits {
  /**
   * Emitted when button is clicked
   * @param event - Native MouseEvent from button click
   * @note Not emitted when button is disabled
   */
  click: (event: MouseEvent) => void;
}

// ============================================================================
// Slots Interface
// ============================================================================

/**
 * UiButton component slots
 */
export interface UiButtonSlots {
  /**
   * Default slot for button content (text)
   * Falls back to `label` prop if not provided
   */
  default?: () => any;

  /**
   * Slot for icon positioned before text
   * @example
   * <template #icon-left><SaveIcon /></template>
   */
  'icon-left'?: () => any;

  /**
   * Slot for icon positioned after text
   * @example
   * <template #icon-right><ChevronIcon /></template>
   */
  'icon-right'?: () => any;
}

// ============================================================================
// Design Token Mappings
// ============================================================================

/**
 * CSS custom properties used by UiButton component
 * All tokens automatically adapt to the active palette (10 variations)
 */
export const UiButtonTokens = {
  /**
   * Color tokens for filled variant
   */
  filled: {
    background: 'var(--color-primary-500)',
    backgroundHover: 'var(--color-primary-600)',
    backgroundActive: 'var(--color-primary-700)',
    text: 'var(--color-text-inverse)',
  },

  /**
   * Color tokens for outline variant
   */
  outline: {
    background: 'transparent',
    backgroundHover: 'var(--color-surface-raised)',
    border: 'var(--color-border-default)',
    text: 'var(--color-text-primary)',
  },

  /**
   * Color tokens for text variant
   */
  text: {
    background: 'transparent',
    backgroundHover: 'var(--color-primary-50)',
    text: 'var(--color-primary-500)',
  },

  /**
   * Shared tokens
   */
  shared: {
    focusOutline: 'var(--color-border-focus)',
    disabledOpacity: '0.5',
    fontWeight: 'var(--font-weight-medium)',
    transitionDuration: 'var(--transition-duration-fast)',
    transitionTiming: 'var(--transition-timing-ease-out)',
  },

  /**
   * Size-specific tokens
   */
  sizes: {
    xs: {
      padding: 'var(--spacing-1) var(--spacing-2)',
      fontSize: 'var(--font-size-xs)',
      borderRadius: 'var(--border-radius-sm)',
    },
    small: {
      padding: 'var(--spacing-1_5) var(--spacing-3)',
      fontSize: 'var(--font-size-sm)',
      borderRadius: 'var(--border-radius-md)',
    },
    medium: {
      padding: 'var(--spacing-2) var(--spacing-4)',
      fontSize: 'var(--font-size-base)',
      borderRadius: 'var(--border-radius-lg)',
    },
    large: {
      padding: 'var(--spacing-3) var(--spacing-6)',
      fontSize: 'var(--font-size-lg)',
      borderRadius: 'var(--border-radius-lg)',
    },
    xl: {
      padding: 'var(--spacing-4) var(--spacing-8)',
      fontSize: 'var(--font-size-xl)',
      borderRadius: 'var(--border-radius-xl)',
    },
  },
} as const;

// ============================================================================
// Accessibility Contract
// ============================================================================

/**
 * Accessibility requirements for UiButton component
 * MUST comply with WCAG 2.1 Level AAA
 */
export const UiButtonAccessibility = {
  /**
   * WCAG compliance level
   */
  wcagLevel: 'AAA',

  /**
   * Minimum contrast ratios
   */
  contrast: {
    normalText: 7, // 7:1 for normal text (AAA)
    largeText: 4.5, // 4.5:1 for large text (AAA)
  },

  /**
   * Required keyboard support
   */
  keyboard: {
    focus: 'Tab / Shift+Tab',
    activate: 'Enter / Space',
  },

  /**
   * Required ARIA attributes
   */
  aria: {
    role: 'button', // Implicit from <button> element
    'aria-label': 'Required for icon-only buttons',
    'aria-disabled': 'true when disabled prop is true',
  },

  /**
   * Focus indicator requirements
   */
  focus: {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: 'var(--color-border-focus)',
    outlineOffset: '2px',
  },
} as const;

// ============================================================================
// Component Contract Validation
// ============================================================================

/**
 * Validates that a button implementation meets the contract
 * Used for testing and development
 */
export function validateUiButtonContract(component: any): boolean {
  const requiredProps = ['variant', 'size', 'disabled', 'type'];
  const requiredEmits = ['click'];
  const requiredSlots = ['default', 'icon-left', 'icon-right'];

  // Validate props exist
  const hasProps = requiredProps.every((prop) =>
    component.props ? prop in component.props : false
  );

  // Validate emits exist
  const hasEmits = requiredEmits.every((emit) =>
    component.emits ? emit in component.emits : false
  );

  // Validate slots exist
  const hasSlots = requiredSlots.every((slot) =>
    component.$slots ? slot in component.$slots : false
  );

  return hasProps && hasEmits && hasSlots;
}

// ============================================================================
// Exports
// ============================================================================

export type { ButtonVariant, ButtonSize, ButtonType, UiButtonProps, UiButtonEmits, UiButtonSlots };

export { UiButtonTokens, UiButtonAccessibility, validateUiButtonContract };
