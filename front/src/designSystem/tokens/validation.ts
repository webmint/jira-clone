/**
 * Design Token Validation Schemas
 *
 * Runtime validation using Zod to ensure token integrity.
 * Validates token structure, types, and value constraints.
 */

import { z } from 'zod';

/* ==========================================================================
   PALETTE VALIDATION FUNCTIONS (T004, T005)
   ========================================================================== */

import { getCSSVariableForPalette, getContrastRatio } from './utils';

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
export const fontSizeSchema = z
  .string()
  .regex(/^\d+(\.\d+)?(rem|px|em|%)$/, 'Invalid CSS size unit');

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

/**
 * Palette variation interface
 */
export interface PaletteVariation {
  palette:
    | 'corporate-trust'
    | 'creative-energy'
    | 'natural-harmony'
    | 'warm-welcome'
    | 'minimalist';
  mode: 'light' | 'dark';
  tokens: Record<string, string>; // Map of token name → value
}

/**
 * Token completeness validation result
 */
export interface TokenCompletenessResult {
  valid: boolean;
  missingTokens?: Array<{
    variation: string; // e.g., "creative-energy.dark"
    missing: string[]; // Array of missing token names
  }>;
  extraTokens?: Array<{
    variation: string;
    extra: string[]; // Array of unexpected token names
  }>;
}

/**
 * Contrast check parameters
 */
export interface ContrastCheck {
  variation: string; // e.g., "natural-harmony.light"
  foregroundToken: string; // e.g., "--color-text-primary"
  backgroundToken: string; // e.g., "--color-background-default"
  minimumRatio: number; // 4.5 for normal text, 3.0 for large text/UI
}

/**
 * Contrast validation result
 */
export interface ContrastValidationResult {
  valid: boolean;
  failures?: Array<{
    variation: string;
    foreground: string;
    foregroundValue: string; // Hex color
    background: string;
    backgroundValue: string; // Hex color
    ratio: number; // Actual contrast ratio
    required: number; // Required contrast ratio
  }>;
}

/**
 * Validate that all palette variations have complete and identical token sets
 * (T004 - Token Completeness Validation)
 *
 * @param variations - Array of palette variations to validate
 * @returns Validation result with details of missing or extra tokens
 *
 * @example
 * ```ts
 * const result = validateTokenCompleteness(allVariations);
 * if (!result.valid) {
 *   result.missingTokens?.forEach(({ variation, missing }) => {
 *     console.error(`${variation} missing: ${missing.join(', ')}`);
 *   });
 * }
 * ```
 */
export function validateTokenCompleteness(variations: PaletteVariation[]): TokenCompletenessResult {
  if (!variations || variations.length === 0) {
    return {
      valid: false,
      missingTokens: [{ variation: 'none', missing: ['No variations provided'] }],
    };
  }

  // Step 1: Find the intersection of tokens (tokens present in ALL variations)
  // Start with tokens from the first variation
  const firstVariationTokens = new Set(Object.keys(variations[0].tokens));

  // Intersect with tokens from all other variations
  variations.slice(1).forEach((variation) => {
    const variationTokens = new Set(Object.keys(variation.tokens));
    // Remove tokens from intersection that aren't in this variation
    firstVariationTokens.forEach((token) => {
      if (!variationTokens.has(token)) {
        firstVariationTokens.delete(token);
      }
    });
  });

  // Also collect the union of all tokens to find "extra" tokens
  const allUniqueTokens = new Set<string>();
  variations.forEach((variation) => {
    Object.keys(variation.tokens).forEach((tokenName) => {
      allUniqueTokens.add(tokenName);
    });
  });

  // Expected tokens = intersection (tokens ALL variations have)
  const expectedTokens = Array.from(firstVariationTokens).sort();

  // All tokens = union (for finding extras)
  const unionTokens = Array.from(allUniqueTokens).sort();

  // Step 2: Check each variation for missing or extra tokens
  const missingTokens: Array<{ variation: string; missing: string[] }> = [];
  const extraTokens: Array<{ variation: string; extra: string[] }> = [];

  variations.forEach((variation) => {
    const variationName = `${variation.palette}.${variation.mode}`;
    const variationTokens = Object.keys(variation.tokens);

    // Find missing tokens (in unionTokens but not in this variation)
    const missing = unionTokens.filter((token) => !variationTokens.includes(token));

    // Find extra tokens (in this variation but not in expectedTokens/intersection)
    const extra = variationTokens.filter((token) => !expectedTokens.includes(token));

    if (missing.length > 0) {
      missingTokens.push({ variation: variationName, missing: missing.sort() });
    }

    if (extra.length > 0) {
      extraTokens.push({ variation: variationName, extra: extra.sort() });
    }
  });

  // Step 3: Return validation result
  const valid = missingTokens.length === 0 && extraTokens.length === 0;

  return {
    valid,
    ...(missingTokens.length > 0 && { missingTokens }),
    ...(extraTokens.length > 0 && { extraTokens }),
  };
}

/**
 * Validate that color pairs meet WCAG contrast requirements
 * (T005 - Contrast Ratio Validation)
 *
 * @param checks - Array of contrast checks to perform
 * @returns Validation result with details of any failures
 *
 * @example
 * ```ts
 * const result = validateContrastRatios([
 *   {
 *     variation: 'corporate-trust.light',
 *     foregroundToken: '--color-text-primary',
 *     backgroundToken: '--color-background-default',
 *     minimumRatio: 4.5,
 *   },
 * ]);
 * ```
 */
export function validateContrastRatios(checks: ContrastCheck[]): ContrastValidationResult {
  const failures: ContrastValidationResult['failures'] = [];

  checks.forEach((check) => {
    try {
      // Parse variation into palette and mode
      const [palette, mode] = check.variation.split('.');
      if (!palette || !mode) {
        failures?.push({
          variation: check.variation,
          foreground: check.foregroundToken,
          foregroundValue: 'N/A',
          background: check.backgroundToken,
          backgroundValue: 'N/A',
          ratio: 0,
          required: check.minimumRatio,
        });
        return;
      }

      // Get computed color values for the specific variation
      const foregroundValue = getCSSVariableForPalette(check.foregroundToken, palette, mode);
      const backgroundValue = getCSSVariableForPalette(check.backgroundToken, palette, mode);

      // Skip if values are empty (tokens not defined yet)
      if (!foregroundValue || !backgroundValue) {
        failures?.push({
          variation: check.variation,
          foreground: check.foregroundToken,
          foregroundValue: foregroundValue || 'N/A',
          background: check.backgroundToken,
          backgroundValue: backgroundValue || 'N/A',
          ratio: 0,
          required: check.minimumRatio,
        });
        return;
      }

      // Calculate contrast ratio
      const ratio = getContrastRatio(foregroundValue, backgroundValue);

      // Check if it meets the minimum requirement
      if (ratio < check.minimumRatio) {
        failures?.push({
          variation: check.variation,
          foreground: check.foregroundToken,
          foregroundValue,
          background: check.backgroundToken,
          backgroundValue,
          ratio,
          required: check.minimumRatio,
        });
      }
    } catch (error) {
      // Handle any errors (invalid colors, etc.)
      failures?.push({
        variation: check.variation,
        foreground: check.foregroundToken,
        foregroundValue: 'ERROR',
        background: check.backgroundToken,
        backgroundValue: 'ERROR',
        ratio: 0,
        required: check.minimumRatio,
      });
    }
  });

  return {
    valid: failures.length === 0,
    ...(failures.length > 0 && { failures }),
  };
}
