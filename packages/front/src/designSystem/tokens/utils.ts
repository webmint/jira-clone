/**
 * Design Token Utility Functions
 *
 * Helper functions for accessing and resolving design tokens.
 * Provides type-safe access to token values.
 */

import * as REF from './reference.tokens.ts';

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
export function getToken<T extends keyof typeof REF, K extends keyof (typeof REF)[T]>(
  category: T,
  key: K
): (typeof REF)[T][K] {
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
  element: HTMLElement = document.documentElement
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
  element: HTMLElement = document.documentElement
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
  element: HTMLElement = document.documentElement
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
export function getTokensByCategory<T extends keyof typeof REF>(category: T): (typeof REF)[T] {
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

/* ==========================================================================
   PALETTE-SPECIFIC UTILITIES (T003)
   ========================================================================== */

/**
 * Get a CSS variable value for a specific palette variation
 * Creates a temporary element with palette and mode classes to resolve the value
 *
 * @param tokenName - CSS variable name (e.g., "--color-text-primary")
 * @param palette - Palette name (e.g., "corporate-trust", "creative-energy")
 * @param mode - Mode name ("light" or "dark")
 * @returns Resolved CSS variable value (e.g., "#0F172A")
 *
 * @example
 * ```ts
 * getCSSVariableForPalette('--color-text-primary', 'creative-energy', 'dark')
 * // returns "#FFFFFF"
 * ```
 */
export function getCSSVariableForPalette(tokenName: string, palette: string, mode: string): string {
  // Create a temporary element
  const tempElement = document.createElement('div');

  // Add palette and mode classes
  tempElement.className = `${palette} ${mode}`;

  // Hide the element completely
  tempElement.style.position = 'absolute';
  tempElement.style.visibility = 'hidden';
  tempElement.style.pointerEvents = 'none';

  // Append to body
  document.body.appendChild(tempElement);

  try {
    // Ensure token name has -- prefix
    const varName = tokenName.startsWith('--') ? tokenName : `--${tokenName}`;

    // Get computed style
    const value = getComputedStyle(tempElement).getPropertyValue(varName).trim();

    return value;
  } finally {
    // Always clean up
    document.body.removeChild(tempElement);
  }
}

/**
 * Convert hex color to RGB components
 * @internal
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');

  // Handle 3-digit hex codes
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }

  // Handle 6-digit hex codes
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Calculate relative luminance of an RGB color
 * Implements WCAG 2.1 formula
 * @internal
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  // Convert to 0-1 range and apply gamma correction
  const [rs, gs, bs] = [r, g, b].map((component) => {
    const val = component / 255;
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  // Apply WCAG luminance weights
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate WCAG contrast ratio between two hex colors
 * Implements the WCAG 2.1 relative luminance formula
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * @param foreground - Foreground hex color (e.g., "#0F172A")
 * @param background - Background hex color (e.g., "#FFFFFF")
 * @returns Contrast ratio (range: 1.0 to 21.0)
 *
 * @example
 * ```ts
 * getContrastRatio('#0F172A', '#FFFFFF')
 * // returns 15.68 (passes WCAG AAA)
 * ```
 */
export function getContrastRatio(foreground: string, background: string): number {
  const rgb1 = hexToRgb(foreground);
  const rgb2 = hexToRgb(background);

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}
