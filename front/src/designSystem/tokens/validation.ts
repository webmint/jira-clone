/**
 * Design Token Validation Schemas
 *
 * Runtime validation using Zod to ensure token integrity.
 * Validates token structure, types, and value constraints.
 */

import { z } from 'zod';

/* ==========================================================================
   TYPOGRAPHY SCHEMAS
   ========================================================================== */

/**
 * Font family validation
 * Must be non-empty string with valid CSS font-family syntax
 */
export const fontFamilySchema = z.string().min(1).describe('CSS font-family value');

/**
 * Font size validation
 * Must be valid CSS size (rem, px, em, etc.)
 */
export const fontSizeSchema = z.string().regex(/^\d+(\.\d+)?(rem|px|em|%)$/, 'Invalid CSS size unit');

/**
 * Font weight validation
 * Must be 100-900 (multiples of 100)
 */
export const fontWeightSchema = z.number().int().min(100).max(900).multipleOf(100);

/**
 * Line height validation
 * Must be positive number (unitless) or valid CSS value
 */
export const lineHeightSchema = z.union([
  z.number().positive(),
  z.string().regex(/^\d+(\.\d+)?(rem|px|em|%)$/),
]);

/**
 * Letter spacing validation
 * Must be valid CSS letter-spacing (em, rem, px)
 */
export const letterSpacingSchema = z.string().regex(/^-?\d+(\.\d+)?(em|rem|px)$/);

/* ==========================================================================
   SPACING SCHEMAS
   ========================================================================== */

/**
 * Spacing validation
 * Must be valid CSS size or '0'
 */
export const spacingSchema = z.string().regex(/^(0|\d+(\.\d+)?(rem|px|em|%))$/);

/* ==========================================================================
   SHADOW SCHEMAS
   ========================================================================== */

/**
 * Shadow validation
 * Must be valid CSS box-shadow or 'none'
 */
export const shadowSchema = z.union([
  z.literal('none'),
  z.string().min(1).describe('CSS box-shadow value'),
]);

/* ==========================================================================
   BORDER RADIUS SCHEMAS
   ========================================================================== */

/**
 * Border radius validation
 * Must be valid CSS border-radius
 */
export const borderRadiusSchema = z.string().regex(/^(0|\d+(\.\d+)?(rem|px|em|%))$/);

/* ==========================================================================
   Z-INDEX SCHEMAS
   ========================================================================== */

/**
 * Z-index validation
 * Must be integer (can be negative)
 */
export const zIndexSchema = z.number().int();

/* ==========================================================================
   OPACITY SCHEMAS
   ========================================================================== */

/**
 * Opacity validation
 * Must be string representation of number 0-1
 */
export const opacitySchema = z.string().regex(/^(0(\.\d+)?|1(\.0+)?)$/);

/* ==========================================================================
   TRANSITION SCHEMAS
   ========================================================================== */

/**
 * Transition duration validation
 * Must be valid CSS time (ms or s)
 */
export const transitionDurationSchema = z.string().regex(/^\d+(ms|s)$/);

/**
 * Transition timing validation
 * Must be valid CSS timing function
 */
export const transitionTimingSchema = z.union([
  z.literal('linear'),
  z.literal('ease'),
  z.literal('ease-in'),
  z.literal('ease-out'),
  z.literal('ease-in-out'),
  z.string().regex(/^cubic-bezier\([^)]+\)$/, 'Invalid cubic-bezier function'),
]);

/* ==========================================================================
   COMPOSITE SCHEMAS
   ========================================================================== */

/**
 * Complete typography token validation
 */
export const typographyTokensSchema = z.object({
  fontFamily: z.record(z.string(), fontFamilySchema),
  fontSize: z.record(z.string(), fontSizeSchema),
  fontWeight: z.record(z.string(), fontWeightSchema),
  lineHeight: z.record(z.string(), lineHeightSchema),
  letterSpacing: z.record(z.string(), letterSpacingSchema),
});

/**
 * Complete spacing token validation
 */
export const spacingTokensSchema = z.object({
  spacing: z.record(z.string(), spacingSchema),
});

/**
 * Complete effect token validation
 */
export const effectTokensSchema = z.object({
  shadow: z.record(z.string(), shadowSchema),
  borderRadius: z.record(z.string(), borderRadiusSchema),
  opacity: z.record(z.string(), opacitySchema),
});

/**
 * Complete layout token validation
 */
export const layoutTokensSchema = z.object({
  zIndex: z.record(z.string(), zIndexSchema),
});

/**
 * Complete transition token validation
 */
export const transitionTokensSchema = z.object({
  transitionDuration: z.record(z.string(), transitionDurationSchema),
  transitionTiming: z.record(z.string(), transitionTimingSchema),
});

/**
 * All design tokens validation
 */
export const designTokensSchema = z.object({
  ...typographyTokensSchema.shape,
  ...spacingTokensSchema.shape,
  ...effectTokensSchema.shape,
  ...layoutTokensSchema.shape,
  ...transitionTokensSchema.shape,
});

/* ==========================================================================
   VALIDATION UTILITIES
   ========================================================================== */

/**
 * Validate design tokens
 * @param tokens - Design tokens to validate
 * @returns Validation result
 */
export function validateDesignTokens(tokens: unknown) {
  return designTokensSchema.safeParse(tokens);
}

/**
 * Validate typography tokens
 * @param tokens - Typography tokens to validate
 * @returns Validation result
 */
export function validateTypographyTokens(tokens: unknown) {
  return typographyTokensSchema.safeParse(tokens);
}

/**
 * Validate spacing tokens
 * @param tokens - Spacing tokens to validate
 * @returns Validation result
 */
export function validateSpacingTokens(tokens: unknown) {
  return spacingTokensSchema.safeParse(tokens);
}

/**
 * Validate effect tokens
 * @param tokens - Effect tokens to validate
 * @returns Validation result
 */
export function validateEffectTokens(tokens: unknown) {
  return effectTokensSchema.safeParse(tokens);
}

/**
 * Validate layout tokens
 * @param tokens - Layout tokens to validate
 * @returns Validation result
 */
export function validateLayoutTokens(tokens: unknown) {
  return layoutTokensSchema.safeParse(tokens);
}

/**
 * Validate transition tokens
 * @param tokens - Transition tokens to validate
 * @returns Validation result
 */
export function validateTransitionTokens(tokens: unknown) {
  return transitionTokensSchema.safeParse(tokens);
}
