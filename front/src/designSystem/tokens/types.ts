/**
 * Design Token Type Definitions
 *
 * Type-safe access to design tokens with deep key extraction.
 * Provides autocomplete and type checking for all token values.
 */

import type {
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  LETTER_SPACING,
  SPACING,
  SHADOW,
  BORDER_RADIUS,
  Z_INDEX,
  OPACITY,
  TRANSITION_DURATION,
  TRANSITION_TIMING,
} from './reference.tokens';

/* ==========================================================================
   UTILITY TYPES
   ========================================================================== */

/**
 * Extract keys from const object
 */
type KeysOf<T> = keyof T;

/**
 * Extract values from const object
 */
type ValuesOf<T> = T[keyof T];

/* ==========================================================================
   TYPOGRAPHY TYPES
   ========================================================================== */

export type FontFamilyKey = KeysOf<typeof FONT_FAMILY>;
export type FontFamilyValue = ValuesOf<typeof FONT_FAMILY>;

export type FontSizeKey = KeysOf<typeof FONT_SIZE>;
export type FontSizeValue = ValuesOf<typeof FONT_SIZE>;

export type FontWeightKey = KeysOf<typeof FONT_WEIGHT>;
export type FontWeightValue = ValuesOf<typeof FONT_WEIGHT>;

export type LineHeightKey = KeysOf<typeof LINE_HEIGHT>;
export type LineHeightValue = ValuesOf<typeof LINE_HEIGHT>;

export type LetterSpacingKey = KeysOf<typeof LETTER_SPACING>;
export type LetterSpacingValue = ValuesOf<typeof LETTER_SPACING>;

/* ==========================================================================
   SPACING TYPES
   ========================================================================== */

export type SpacingKey = KeysOf<typeof SPACING>;
export type SpacingValue = ValuesOf<typeof SPACING>;

/* ==========================================================================
   SHADOW TYPES
   ========================================================================== */

export type ShadowKey = KeysOf<typeof SHADOW>;
export type ShadowValue = ValuesOf<typeof SHADOW>;

/* ==========================================================================
   BORDER RADIUS TYPES
   ========================================================================== */

export type BorderRadiusKey = KeysOf<typeof BORDER_RADIUS>;
export type BorderRadiusValue = ValuesOf<typeof BORDER_RADIUS>;

/* ==========================================================================
   Z-INDEX TYPES
   ========================================================================== */

export type ZIndexKey = KeysOf<typeof Z_INDEX>;
export type ZIndexValue = ValuesOf<typeof Z_INDEX>;

/* ==========================================================================
   OPACITY TYPES
   ========================================================================== */

export type OpacityKey = KeysOf<typeof OPACITY>;
export type OpacityValue = ValuesOf<typeof OPACITY>;

/* ==========================================================================
   TRANSITION TYPES
   ========================================================================== */

export type TransitionDurationKey = KeysOf<typeof TRANSITION_DURATION>;
export type TransitionDurationValue = ValuesOf<typeof TRANSITION_DURATION>;

export type TransitionTimingKey = KeysOf<typeof TRANSITION_TIMING>;
export type TransitionTimingValue = ValuesOf<typeof TRANSITION_TIMING>;

/* ==========================================================================
   COMPOSITE TYPES
   ========================================================================== */

/**
 * All typography-related token keys
 */
export type TypographyTokenKey =
  | `fontFamily.${FontFamilyKey}`
  | `fontSize.${FontSizeKey}`
  | `fontWeight.${FontWeightKey}`
  | `lineHeight.${LineHeightKey}`
  | `letterSpacing.${LetterSpacingKey}`;

/**
 * All spacing-related token keys
 */
export type SpacingTokenKey = `spacing.${SpacingKey}`;

/**
 * All visual effect token keys
 */
export type EffectTokenKey =
  | `shadow.${ShadowKey}`
  | `borderRadius.${BorderRadiusKey}`
  | `opacity.${OpacityKey}`;

/**
 * All layout-related token keys
 */
export type LayoutTokenKey = `zIndex.${ZIndexKey}`;

/**
 * All transition-related token keys
 */
export type TransitionTokenKey =
  | `transitionDuration.${TransitionDurationKey}`
  | `transitionTiming.${TransitionTimingKey}`;

/**
 * Union of all design token keys
 */
export type DesignTokenKey =
  | TypographyTokenKey
  | SpacingTokenKey
  | EffectTokenKey
  | LayoutTokenKey
  | TransitionTokenKey;

/**
 * Design token value (string or number)
 */
export type DesignTokenValue = string | number;

/**
 * Design token map for type-safe access
 */
export interface DesignTokenMap {
  fontFamily: Record<FontFamilyKey, FontFamilyValue>;
  fontSize: Record<FontSizeKey, FontSizeValue>;
  fontWeight: Record<FontWeightKey, FontWeightValue>;
  lineHeight: Record<LineHeightKey, LineHeightValue>;
  letterSpacing: Record<LetterSpacingKey, LetterSpacingValue>;
  spacing: Record<SpacingKey, SpacingValue>;
  shadow: Record<ShadowKey, ShadowValue>;
  borderRadius: Record<BorderRadiusKey, BorderRadiusValue>;
  zIndex: Record<ZIndexKey, ZIndexValue>;
  opacity: Record<OpacityKey, OpacityValue>;
  transitionDuration: Record<TransitionDurationKey, TransitionDurationValue>;
  transitionTiming: Record<TransitionTimingKey, TransitionTimingValue>;
}
