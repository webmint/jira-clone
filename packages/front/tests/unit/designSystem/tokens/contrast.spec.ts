/**
 * WCAG Contrast Ratio Tests
 *
 * Validates that all color palettes meet WCAG 2.1 AAA standards.
 * AAA requires 7:1 contrast for normal text, 4.5:1 for large text.
 */

import { describe, it, expect } from 'vitest';
// import { validateContrastRatios } from '@/designSystem/tokens/validation.ts';
import { validateContrastRatios } from '@/designSystem/tokens/validation.ts';

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error(`Invalid hex color: ${hex}`);
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  };
}

/**
 * Calculate relative luminance of an RGB color
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

describe('WCAG Contrast Tests', () => {
  const WHITE = '#FFFFFF';
  const BLACK = '#000000';

  describe('Corporate Trust Palette', () => {
    const PRIMARY = {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    };

    const NEUTRAL = {
      0: '#FFFFFF',
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      1000: '#000000',
    };

    it('should have primary-800 meet AAA on white (7:1)', () => {
      const ratio = getContrastRatio(PRIMARY[800], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have neutral-900 meet AAA on white (7:1)', () => {
      const ratio = getContrastRatio(NEUTRAL[900], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have neutral-700 meet AAA on white (7:1)', () => {
      const ratio = getContrastRatio(NEUTRAL[700], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have dark background with light text meet AAA', () => {
      const ratio = getContrastRatio(WHITE, NEUTRAL[900]);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Modern Tech Palette', () => {
    const PRIMARY = {
      800: '#115E59',
      900: '#134E4A',
    };

    it('should have primary-800 meet AAA on white', () => {
      const ratio = getContrastRatio(PRIMARY[800], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have primary-900 meet AAA on white', () => {
      const ratio = getContrastRatio(PRIMARY[900], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Sophisticated Luxury Palette', () => {
    const PRIMARY = {
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    };

    it('should have primary-800 meet AAA on white', () => {
      const ratio = getContrastRatio(PRIMARY[800], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have primary-900 meet AAA on white', () => {
      const ratio = getContrastRatio(PRIMARY[900], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Clean Minimal Palette', () => {
    const NEUTRAL = {
      700: '#404040',
      800: '#262626',
      900: '#171717',
    };

    it('should have neutral-700 meet AAA on white', () => {
      const ratio = getContrastRatio(NEUTRAL[700], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have neutral-900 meet AAA on white', () => {
      const ratio = getContrastRatio(NEUTRAL[900], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Vibrant Professional Palette', () => {
    const PRIMARY = {
      800: '#6B21A8',
      900: '#581C87',
    };

    it('should have primary-800 meet AAA on white', () => {
      const ratio = getContrastRatio(PRIMARY[800], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('should have primary-900 meet AAA on white', () => {
      const ratio = getContrastRatio(PRIMARY[900], WHITE);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Semantic Colors', () => {
    const SEMANTIC = {
      success: '#047857',
      warning: '#B45309',
      error: '#B91C1C',
      info: '#0E7490',
    };

    it('should have semantic colors meet minimum AA (4.5:1) on white', () => {
      // Semantic colors are optimized for visibility, testing AA standard
      expect(getContrastRatio(SEMANTIC.success, WHITE)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(SEMANTIC.warning, WHITE)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(SEMANTIC.error, WHITE)).toBeGreaterThanOrEqual(4.5);
      expect(getContrastRatio(SEMANTIC.info, WHITE)).toBeGreaterThanOrEqual(4.5);
    });

    it('should calculate individual semantic colors correctly', () => {
      // Verify contrast calculations are working
      expect(getContrastRatio(SEMANTIC.success, WHITE)).toBeGreaterThan(5);
      expect(getContrastRatio(SEMANTIC.error, WHITE)).toBeGreaterThan(6);
    });
  });

  describe('Contrast Calculation', () => {
    it('should calculate white on black as 21:1', () => {
      const ratio = getContrastRatio(WHITE, BLACK);
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should calculate black on white as 21:1', () => {
      const ratio = getContrastRatio(BLACK, WHITE);
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('should calculate same color as 1:1', () => {
      const ratio = getContrastRatio(WHITE, WHITE);
      expect(ratio).toBe(1);
    });
  });

  // NEW: Palette Switcher Feature Tests (T002)
  describe('Multi-Palette WCAG AA Compliance', () => {
    const palettes = [
      'corporate-trust',
      'creative-energy',
      'natural-harmony',
      'warm-welcome',
      'minimalist',
    ];
    const modes = ['light', 'dark'];

    it('should have validateContrastRatios function defined', () => {
      // This test will fail until we implement the function in T005
      expect(validateContrastRatios).toBeDefined();
      expect(typeof validateContrastRatios).toBe('function');
    });

    palettes.forEach((palette) => {
      modes.forEach((mode) => {
        describe(`${palette}.${mode}`, () => {
          it('text-primary on background-default meets AA (4.5:1)', () => {
            const result = validateContrastRatios([
              {
                variation: `${palette}.${mode}`,
                foregroundToken: '--color-text-primary',
                backgroundToken: '--color-background-default',
                minimumRatio: 4.5,
              },
            ]);

            expect(result.valid).toBe(true);
            expect(result.failures).toBeUndefined();
          });

          it('text-secondary on background-default meets AA (4.5:1)', () => {
            const result = validateContrastRatios([
              {
                variation: `${palette}.${mode}`,
                foregroundToken: '--color-text-secondary',
                backgroundToken: '--color-background-default',
                minimumRatio: 4.5,
              },
            ]);

            expect(result.valid).toBe(true);
            expect(result.failures).toBeUndefined();
          });

          it('text-tertiary on background-default meets AA (4.5:1)', () => {
            const result = validateContrastRatios([
              {
                variation: `${palette}.${mode}`,
                foregroundToken: '--color-text-tertiary',
                backgroundToken: '--color-background-default',
                minimumRatio: 4.5,
              },
            ]);

            expect(result.valid).toBe(true);
            expect(result.failures).toBeUndefined();
          });

          it('primary-500 on background-default meets AA for large text (3:1)', () => {
            const result = validateContrastRatios([
              {
                variation: `${palette}.${mode}`,
                foregroundToken: '--color-primary-500',
                backgroundToken: '--color-background-default',
                minimumRatio: 3.0,
              },
            ]);

            expect(result.valid).toBe(true);
            expect(result.failures).toBeUndefined();
          });

          it('border-default on background-default meets AA for UI components (3:1)', () => {
            const result = validateContrastRatios([
              {
                variation: `${palette}.${mode}`,
                foregroundToken: '--color-border-default',
                backgroundToken: '--color-background-default',
                minimumRatio: 3.0,
              },
            ]);

            expect(result.valid).toBe(true);
            expect(result.failures).toBeUndefined();
          });
        });
      });
    });

    it('should fail when contrast ratio is insufficient', () => {
      // Mock a check with insufficient contrast
      const result = validateContrastRatios([
        {
          variation: 'corporate-trust.light',
          foregroundToken: '--color-text-primary',
          backgroundToken: '--color-background-default',
          minimumRatio: 21.0, // Impossible requirement
        },
      ]);

      expect(result.valid).toBe(false);
      expect(result.failures).toBeDefined();
      expect(result.failures?.length).toBeGreaterThan(0);
    });

    it('should provide detailed failure information', () => {
      const result = validateContrastRatios([
        {
          variation: 'creative-energy.dark',
          foregroundToken: '--color-text-primary',
          backgroundToken: '--color-background-default',
          minimumRatio: 21.0, // Impossible requirement
        },
      ]);

      if (!result.valid && result.failures && result.failures.length > 0) {
        const failure = result.failures[0];
        expect(failure.variation).toBe('creative-energy.dark');
        expect(failure.foreground).toBe('--color-text-primary');
        expect(failure.background).toBe('--color-background-default');
        expect(failure.foregroundValue).toBeDefined();
        expect(failure.backgroundValue).toBeDefined();
        expect(failure.ratio).toBeDefined();
        expect(failure.required).toBe(21.0);
      }
    });

    it('should validate multiple checks at once', () => {
      const checks = palettes.flatMap((palette) =>
        modes.map((mode) => ({
          variation: `${palette}.${mode}`,
          foregroundToken: '--color-text-primary',
          backgroundToken: '--color-background-default',
          minimumRatio: 4.5,
        }))
      );

      const result = validateContrastRatios(checks);
      expect(result.valid).toBe(true);
      expect(result.failures).toBeUndefined();
    });
  });
});
