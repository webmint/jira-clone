/**
 * Token Validation Tests
 *
 * Tests design token structure and values using Zod schemas.
 * Ensures all tokens conform to expected formats and types.
 */

import { describe, it, expect } from 'vitest';
import * as REF from '@/designSystem/tokens/reference.tokens';
import {
  fontSizeSchema,
  spacingSchema,
  shadowSchema,
  borderRadiusSchema,
  zIndexSchema,
  opacitySchema,
  transitionDurationSchema,
  transitionTimingSchema,
  validateTokenCompleteness,
} from '@/designSystem/tokens/validation';

describe('Token Validation', () => {
  describe('Typography Tokens', () => {
    describe('Font Family', () => {
      it('should have PRIMARY font family defined', () => {
        expect(REF.FONT_FAMILY.PRIMARY).toBeDefined();
        expect(typeof REF.FONT_FAMILY.PRIMARY).toBe('string');
        expect(REF.FONT_FAMILY.PRIMARY).toContain('Roboto');
      });

      it('should have MONO font family defined', () => {
        expect(REF.FONT_FAMILY.MONO).toBeDefined();
        expect(typeof REF.FONT_FAMILY.MONO).toBe('string');
        expect(REF.FONT_FAMILY.MONO).toContain('Roboto Mono');
      });
    });

    describe('Font Size', () => {
      it('should validate all font sizes', () => {
        Object.entries(REF.FONT_SIZE).forEach(([_key, value]) => {
          const result = fontSizeSchema.safeParse(value);
          expect(result.success).toBe(true);
        });
      });

      it('should have BASE font size of 1rem', () => {
        expect(REF.FONT_SIZE.BASE).toBe('1rem');
      });

      it('should have progressive scale', () => {
        const sizes = ['XS', 'SM', 'BASE', 'MD', 'LG', 'XL', '2XL', '3XL', '4XL'];
        sizes.forEach((size) => {
          expect(REF.FONT_SIZE[size as keyof typeof REF.FONT_SIZE]).toBeDefined();
        });
      });
    });

    describe('Font Weight', () => {
      it('should have all font weights', () => {
        expect(REF.FONT_WEIGHT.THIN).toBe(100);
        expect(REF.FONT_WEIGHT.LIGHT).toBe(300);
        expect(REF.FONT_WEIGHT.REGULAR).toBe(400);
        expect(REF.FONT_WEIGHT.MEDIUM).toBe(500);
        expect(REF.FONT_WEIGHT.BOLD).toBe(700);
        expect(REF.FONT_WEIGHT.BLACK).toBe(900);
      });

      it('should have numeric values', () => {
        Object.values(REF.FONT_WEIGHT).forEach((weight) => {
          expect(typeof weight).toBe('number');
          expect(weight).toBeGreaterThanOrEqual(100);
          expect(weight).toBeLessThanOrEqual(900);
        });
      });
    });

    describe('Line Height', () => {
      it('should have all line heights', () => {
        expect(REF.LINE_HEIGHT.TIGHT).toBe(1.25);
        expect(REF.LINE_HEIGHT.NORMAL).toBe(1.5);
        expect(REF.LINE_HEIGHT.RELAXED).toBe(1.75);
        expect(REF.LINE_HEIGHT.LOOSE).toBe(2);
      });

      it('should have numeric values', () => {
        Object.values(REF.LINE_HEIGHT).forEach((lineHeight) => {
          expect(typeof lineHeight).toBe('number');
          expect(lineHeight).toBeGreaterThan(1);
          expect(lineHeight).toBeLessThanOrEqual(2);
        });
      });
    });

    describe('Letter Spacing', () => {
      it('should have all letter spacing values', () => {
        expect(REF.LETTER_SPACING.TIGHT).toBeDefined();
        expect(REF.LETTER_SPACING.NORMAL).toBeDefined();
        expect(REF.LETTER_SPACING.WIDE).toBeDefined();
        expect(REF.LETTER_SPACING.WIDER).toBeDefined();
      });

      it('should have em values', () => {
        Object.values(REF.LETTER_SPACING).forEach((spacing) => {
          expect(typeof spacing).toBe('string');
          expect(spacing).toMatch(/^-?\d+(\.\d+)?em$/);
        });
      });
    });

    it('should have consistent typography token structure', () => {
      expect(REF.FONT_FAMILY).toBeDefined();
      expect(REF.FONT_SIZE).toBeDefined();
      expect(REF.FONT_WEIGHT).toBeDefined();
      expect(REF.LINE_HEIGHT).toBeDefined();
      expect(REF.LETTER_SPACING).toBeDefined();
    });
  });

  describe('Spacing Tokens', () => {
    it('should validate all spacing values', () => {
      Object.entries(REF.SPACING).forEach(([_key, value]) => {
        const result = spacingSchema.safeParse(value);
        expect(result.success).toBe(true);
      });
    });

    it('should have NONE spacing of 0', () => {
      expect(REF.SPACING.NONE).toBe('0');
    });

    it('should follow base-8 pattern', () => {
      expect(REF.SPACING['1']).toBe('0.5rem'); // 8px
      expect(REF.SPACING['2']).toBe('1rem'); // 16px
      expect(REF.SPACING['4']).toBe('2rem'); // 32px
      expect(REF.SPACING['8']).toBe('4rem'); // 64px
    });

    it('should have all required spacing values', () => {
      const requiredKeys = [
        'NONE',
        '0_5',
        '1',
        '1_5',
        '2',
        '2_5',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '10',
        '12',
        '16',
        '20',
      ];
      requiredKeys.forEach((key) => {
        expect(REF.SPACING[key as keyof typeof REF.SPACING]).toBeDefined();
      });
    });
  });

  describe('Shadow Tokens', () => {
    it('should validate all shadow values', () => {
      Object.entries(REF.SHADOW).forEach(([_key, value]) => {
        const result = shadowSchema.safeParse(value);
        expect(result.success).toBe(true);
      });
    });

    it('should have all shadow levels', () => {
      expect(REF.SHADOW.NONE).toBe('none');
      expect(REF.SHADOW.SM).toBeDefined();
      expect(REF.SHADOW.BASE).toBeDefined();
      expect(REF.SHADOW.MD).toBeDefined();
      expect(REF.SHADOW.LG).toBeDefined();
      expect(REF.SHADOW.XL).toBeDefined();
      expect(REF.SHADOW.INNER).toBeDefined();
    });

    it('should contain rgba colors', () => {
      const shadowsWithColor = ['SM', 'BASE', 'MD', 'LG', 'XL', 'INNER'];
      shadowsWithColor.forEach((key) => {
        const shadow = REF.SHADOW[key as keyof typeof REF.SHADOW];
        expect(shadow).toContain('rgba');
      });
    });
  });

  describe('Border Radius Tokens', () => {
    it('should validate all border radius values', () => {
      Object.entries(REF.BORDER_RADIUS).forEach(([_key, value]) => {
        const result = borderRadiusSchema.safeParse(value);
        expect(result.success).toBe(true);
      });
    });

    it('should have all radius levels', () => {
      expect(REF.BORDER_RADIUS.NONE).toBe('0');
      expect(REF.BORDER_RADIUS.SM).toBeDefined();
      expect(REF.BORDER_RADIUS.BASE).toBeDefined();
      expect(REF.BORDER_RADIUS.MD).toBeDefined();
      expect(REF.BORDER_RADIUS.LG).toBeDefined();
      expect(REF.BORDER_RADIUS.XL).toBeDefined();
      expect(REF.BORDER_RADIUS['2XL']).toBeDefined();
      expect(REF.BORDER_RADIUS.FULL).toBe('9999px');
    });
  });

  describe('Z-Index Tokens', () => {
    it('should validate all z-index values', () => {
      Object.entries(REF.Z_INDEX).forEach(([_key, value]) => {
        const result = zIndexSchema.safeParse(value);
        expect(result.success).toBe(true);
      });
    });

    it('should have all z-index levels', () => {
      expect(REF.Z_INDEX.HIDE).toBe(-1);
      expect(REF.Z_INDEX.BASE).toBe(0);
      expect(REF.Z_INDEX.DROPDOWN).toBe(10);
      expect(REF.Z_INDEX.STICKY).toBe(20);
      expect(REF.Z_INDEX.FIXED).toBe(30);
      expect(REF.Z_INDEX.MODAL_BACKDROP).toBe(40);
      expect(REF.Z_INDEX.MODAL).toBe(50);
      expect(REF.Z_INDEX.POPOVER).toBe(60);
      expect(REF.Z_INDEX.TOOLTIP).toBe(70);
    });

    it('should have progressive values', () => {
      expect(REF.Z_INDEX.DROPDOWN).toBeGreaterThan(REF.Z_INDEX.BASE);
      expect(REF.Z_INDEX.MODAL).toBeGreaterThan(REF.Z_INDEX.DROPDOWN);
      expect(REF.Z_INDEX.TOOLTIP).toBeGreaterThan(REF.Z_INDEX.MODAL);
    });
  });

  describe('Opacity Tokens', () => {
    it('should validate all opacity values', () => {
      Object.entries(REF.OPACITY).forEach(([_key, value]) => {
        const result = opacitySchema.safeParse(value);
        expect(result.success).toBe(true);
      });
    });

    it('should have all opacity levels', () => {
      expect(REF.OPACITY['0']).toBe('0');
      expect(REF.OPACITY['5']).toBe('0.05');
      expect(REF.OPACITY['10']).toBe('0.1');
      expect(REF.OPACITY['20']).toBe('0.2');
      expect(REF.OPACITY['30']).toBe('0.3');
      expect(REF.OPACITY['50']).toBe('0.5');
      expect(REF.OPACITY['60']).toBe('0.6');
      expect(REF.OPACITY['75']).toBe('0.75');
      expect(REF.OPACITY['90']).toBe('0.9');
      expect(REF.OPACITY['100']).toBe('1');
    });

    it('should have numeric string values between 0 and 1', () => {
      Object.values(REF.OPACITY).forEach((opacity) => {
        const numValue = parseFloat(opacity);
        expect(numValue).toBeGreaterThanOrEqual(0);
        expect(numValue).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Transition Tokens', () => {
    describe('Duration', () => {
      it('should validate all duration values', () => {
        Object.entries(REF.TRANSITION_DURATION).forEach(([_key, value]) => {
          const result = transitionDurationSchema.safeParse(value);
          expect(result.success).toBe(true);
        });
      });

      it('should have all duration levels', () => {
        expect(REF.TRANSITION_DURATION.INSTANT).toBe('0ms');
        expect(REF.TRANSITION_DURATION.FAST).toBe('150ms');
        expect(REF.TRANSITION_DURATION.BASE).toBe('200ms');
        expect(REF.TRANSITION_DURATION.MEDIUM).toBe('300ms');
        expect(REF.TRANSITION_DURATION.SLOW).toBe('500ms');
      });
    });

    describe('Timing', () => {
      it('should validate all timing values', () => {
        Object.entries(REF.TRANSITION_TIMING).forEach(([_key, value]) => {
          const result = transitionTimingSchema.safeParse(value);
          expect(result.success).toBe(true);
        });
      });

      it('should have all timing functions', () => {
        expect(REF.TRANSITION_TIMING.LINEAR).toBe('linear');
        expect(REF.TRANSITION_TIMING.EASE_IN).toBeDefined();
        expect(REF.TRANSITION_TIMING.EASE_OUT).toBeDefined();
        expect(REF.TRANSITION_TIMING.EASE_IN_OUT).toBeDefined();
        expect(REF.TRANSITION_TIMING.EASE).toBe('ease');
      });

      it('should have cubic-bezier functions', () => {
        expect(REF.TRANSITION_TIMING.EASE_IN).toContain('cubic-bezier');
        expect(REF.TRANSITION_TIMING.EASE_OUT).toContain('cubic-bezier');
        expect(REF.TRANSITION_TIMING.EASE_IN_OUT).toContain('cubic-bezier');
      });
    });
  });

  describe('Complete Token Schema', () => {
    it('should have consistent token structure', () => {
      // All token objects should be defined
      expect(REF.FONT_FAMILY).toBeDefined();
      expect(REF.FONT_SIZE).toBeDefined();
      expect(REF.FONT_WEIGHT).toBeDefined();
      expect(REF.LINE_HEIGHT).toBeDefined();
      expect(REF.LETTER_SPACING).toBeDefined();
      expect(REF.SPACING).toBeDefined();
      expect(REF.SHADOW).toBeDefined();
      expect(REF.BORDER_RADIUS).toBeDefined();
      expect(REF.Z_INDEX).toBeDefined();
      expect(REF.OPACITY).toBeDefined();
      expect(REF.TRANSITION_DURATION).toBeDefined();
      expect(REF.TRANSITION_TIMING).toBeDefined();
    });

    it('should have no undefined values', () => {
      const allValues = [
        ...Object.values(REF.FONT_FAMILY),
        ...Object.values(REF.FONT_SIZE),
        ...Object.values(REF.FONT_WEIGHT),
        ...Object.values(REF.LINE_HEIGHT),
        ...Object.values(REF.LETTER_SPACING),
        ...Object.values(REF.SPACING),
        ...Object.values(REF.SHADOW),
        ...Object.values(REF.BORDER_RADIUS),
        ...Object.values(REF.Z_INDEX),
        ...Object.values(REF.OPACITY),
        ...Object.values(REF.TRANSITION_DURATION),
        ...Object.values(REF.TRANSITION_TIMING),
      ];

      allValues.forEach((value) => {
        expect(value).toBeDefined();
        expect(value).not.toBeNull();
      });
    });
  });

  // NEW: Palette Switcher Feature Tests (T001)
  describe('Palette Token Completeness', () => {
    const palettes = [
      'corporate-trust',
      'creative-energy',
      'natural-harmony',
      'warm-welcome',
      'minimalist',
    ];
    const modes = ['light', 'dark'];

    it('should have validateTokenCompleteness function defined', () => {
      // This test will fail until we implement the function in T004
      expect(validateTokenCompleteness).toBeDefined();
      expect(typeof validateTokenCompleteness).toBe('function');
    });

    it('should validate that all 10 variations have identical token names', () => {
      // Mock variations with complete token sets
      const mockVariations = palettes.flatMap((palette) =>
        modes.map((mode) => ({
          palette,
          mode,
          tokens: {
            '--color-primary-500': '#000000',
            '--color-neutral-0': '#FFFFFF',
            '--color-text-primary': '#000000',
            '--color-background-default': '#FFFFFF',
          },
        }))
      );

      const result = validateTokenCompleteness(mockVariations);
      expect(result.valid).toBe(true);
      expect(result.missingTokens).toBeUndefined();
      expect(result.extraTokens).toBeUndefined();
    });

    it('should fail when a variation is missing tokens', () => {
      // Create variations where one is incomplete
      const incompleteVariations = palettes.flatMap((palette) =>
        modes.map((mode) => ({
          palette,
          mode,
          tokens:
            palette === 'creative-energy' && mode === 'dark'
              ? {
                  '--color-primary-500': '#000000',
                  // Missing other tokens
                }
              : {
                  '--color-primary-500': '#000000',
                  '--color-neutral-0': '#FFFFFF',
                  '--color-text-primary': '#000000',
                  '--color-background-default': '#FFFFFF',
                },
        }))
      );

      const result = validateTokenCompleteness(incompleteVariations);
      expect(result.valid).toBe(false);
      expect(result.missingTokens).toBeDefined();
      expect(result.missingTokens?.length).toBeGreaterThan(0);
      expect(result.missingTokens?.[0].variation).toBe('creative-energy.dark');
      expect(result.missingTokens?.[0].missing).toContain('--color-neutral-0');
    });

    it('should detect extra tokens in a variation', () => {
      // Create variations where one has extra tokens
      const variationsWithExtra = palettes.flatMap((palette) =>
        modes.map((mode) => ({
          palette,
          mode,
          tokens:
            palette === 'minimalist' && mode === 'light'
              ? {
                  '--color-primary-500': '#000000',
                  '--color-neutral-0': '#FFFFFF',
                  '--color-text-primary': '#000000',
                  '--color-background-default': '#FFFFFF',
                  '--color-extra-token': '#123456', // Extra token
                }
              : {
                  '--color-primary-500': '#000000',
                  '--color-neutral-0': '#FFFFFF',
                  '--color-text-primary': '#000000',
                  '--color-background-default': '#FFFFFF',
                },
        }))
      );

      const result = validateTokenCompleteness(variationsWithExtra);
      expect(result.valid).toBe(false);
      expect(result.extraTokens).toBeDefined();
      expect(result.extraTokens?.length).toBeGreaterThan(0);
      expect(result.extraTokens?.[0].variation).toBe('minimalist.light');
      expect(result.extraTokens?.[0].extra).toContain('--color-extra-token');
    });

    it('should handle multiple variations missing different tokens', () => {
      // Create variations where multiple are incomplete
      const multipleIncomplete = palettes.flatMap((palette) =>
        modes.map((mode) => {
          const baseTokens = {
            '--color-primary-500': '#000000',
            '--color-neutral-0': '#FFFFFF',
            '--color-text-primary': '#000000',
            '--color-background-default': '#FFFFFF',
          };

          if (palette === 'creative-energy' && mode === 'dark') {
            return { palette, mode, tokens: { '--color-primary-500': '#000000' } };
          }
          if (palette === 'natural-harmony' && mode === 'light') {
            return {
              palette,
              mode,
              tokens: {
                '--color-primary-500': '#000000',
                '--color-neutral-0': '#FFFFFF',
              },
            };
          }
          return { palette, mode, tokens: baseTokens };
        })
      );

      const result = validateTokenCompleteness(multipleIncomplete);
      expect(result.valid).toBe(false);
      expect(result.missingTokens).toBeDefined();
      expect(result.missingTokens?.length).toBe(2);
    });
  });
});
