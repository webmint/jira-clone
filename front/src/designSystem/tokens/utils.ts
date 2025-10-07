/**
 * Design Token Utility Functions
 *
 * Helper functions for accessing and resolving design tokens.
 * Provides type-safe access to token values.
 */

import * as REF from './reference.tokens';

/* ==========================================================================
   TOKEN ACCESS UTILITIES
   ========================================================================== */

/**
 * Get a reference token value by category and key
 *
 * @example
 * ```ts
 * getToken('FONT_SIZE', 'BASE') // returns '1rem'
 * getToken('SPACING', '4') // returns '2rem'
 * ```
 */
export function getToken<
  T extends keyof typeof REF,
  K extends keyof (typeof REF)[T],
>(category: T, key: K): (typeof REF)[T][K] {
  return REF[category][key];
}

/**
 * Resolve a token path to its value
 *
 * @example
 * ```ts
 * resolveToken('FONT_SIZE.BASE') // returns '1rem'
 * resolveToken('SPACING.4') // returns '2rem'
 * ```
 */
export function resolveToken(path: string): string | number {
  const [category, key] = path.split('.');

  if (!category || !key) {
    throw new Error(`Invalid token path: ${path}`);
  }

  const tokenCategory = REF[category as keyof typeof REF];
  if (!tokenCategory) {
    throw new Error(`Unknown token category: ${category}`);
  }

  const value = (tokenCategory as Record<string, unknown>)[key];
  if (value === undefined) {
    throw new Error(`Unknown token key "${key}" in category "${category}"`);
  }

  return value as string | number;
}

/* ==========================================================================
   CSS VARIABLE UTILITIES
   ========================================================================== */

/**
 * Get a CSS variable value from the document
 *
 * @param variableName - CSS variable name (with or without --)
 * @param element - Element to get the value from (defaults to document root)
 */
export function getCSSVariable(
  variableName: string,
  element: HTMLElement = document.documentElement,
): string {
  const varName = variableName.startsWith('--') ? variableName : `--${variableName}`;
  return getComputedStyle(element).getPropertyValue(varName).trim();
}

/**
 * Set a CSS variable value on an element
 *
 * @param variableName - CSS variable name (with or without --)
 * @param value - Value to set
 * @param element - Element to set the value on (defaults to document root)
 */
export function setCSSVariable(
  variableName: string,
  value: string,
  element: HTMLElement = document.documentElement,
): void {
  const varName = variableName.startsWith('--') ? variableName : `--${variableName}`;
  element.style.setProperty(varName, value);
}

/**
 * Remove a CSS variable from an element
 *
 * @param variableName - CSS variable name (with or without --)
 * @param element - Element to remove the value from (defaults to document root)
 */
export function removeCSSVariable(
  variableName: string,
  element: HTMLElement = document.documentElement,
): void {
  const varName = variableName.startsWith('--') ? variableName : `--${variableName}`;
  element.style.removeProperty(varName);
}

/* ==========================================================================
   TOKEN CONVERSION UTILITIES
   ========================================================================== */

/**
 * Convert rem to px based on root font size
 *
 * @param remValue - Value in rem (e.g., '1rem' or 1)
 * @param rootFontSize - Root font size in px (defaults to 16)
 */
export function remToPx(remValue: string | number, rootFontSize = 16): number {
  const rem = typeof remValue === 'string' ? parseFloat(remValue) : remValue;
  return rem * rootFontSize;
}

/**
 * Convert px to rem based on root font size
 *
 * @param pxValue - Value in px (e.g., '16px' or 16)
 * @param rootFontSize - Root font size in px (defaults to 16)
 */
export function pxToRem(pxValue: string | number, rootFontSize = 16): string {
  const px = typeof pxValue === 'string' ? parseFloat(pxValue) : pxValue;
  return `${px / rootFontSize}rem`;
}

/* ==========================================================================
   TOKEN INSPECTION UTILITIES
   ========================================================================== */

/**
 * Get all tokens from a category
 *
 * @example
 * ```ts
 * getTokensByCategory('FONT_SIZE')
 * // returns { XS: '0.75rem', SM: '0.875rem', ... }
 * ```
 */
export function getTokensByCategory<T extends keyof typeof REF>(
  category: T,
): (typeof REF)[T] {
  return REF[category];
}

/**
 * Get all available token categories
 */
export function getTokenCategories(): Array<keyof typeof REF> {
  return Object.keys(REF) as Array<keyof typeof REF>;
}

/**
 * Check if a token exists
 */
export function hasToken(category: string, key: string): boolean {
  const tokenCategory = REF[category as keyof typeof REF];
  if (!tokenCategory) return false;
  return key in (tokenCategory as Record<string, unknown>);
}
