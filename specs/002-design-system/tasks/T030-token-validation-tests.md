# Task T030: Write Token Validation Tests Using Zod Schemas

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T018

## Description

Write comprehensive unit tests for design token validation using Zod schemas. Tests should verify token structure, format validation, and ensure all tokens meet defined constraints.

## Files to Create/Modify

- `tests/unit/tokens/validation.spec.ts` - Token validation tests

## Dependencies

**Blocks**: T031 (contrast tests can run after)
**Blocked By**: T018 (Zod schemas must exist)

## Acceptance Criteria

- [ ] Tests validate all color formats (OKLCH, HEX)
- [ ] Tests verify color scale structure (11 steps)
- [ ] Tests validate spacing values (rem units)
- [ ] Tests verify shadow format (CSS box-shadow)
- [ ] Tests validate border radius values
- [ ] Tests verify z-index numeric values
- [ ] Tests validate opacity range (0-1)
- [ ] Tests verify transition format
- [ ] Tests validate complete palette structure
- [ ] Test coverage: 100% for validation schemas
- [ ] All tests pass
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Test Suite** (`tests/unit/tokens/validation.spec.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import {
  colorValueSchema,
  colorScaleSchema,
  colorPaletteSchema,
  spacingValueSchema,
  shadowValueSchema,
  borderRadiusValueSchema,
  zIndexValueSchema,
  opacityValueSchema,
  transitionDurationSchema,
  transitionTimingSchema,
  referenceTokensSchema,
} from '@/tokens/validation';

describe('Token Validation Schemas', () => {
  describe('colorValueSchema', () => {
    it('accepts valid HEX colors', () => {
      expect(colorValueSchema.safeParse('#FF5733').success).toBe(true);
      expect(colorValueSchema.safeParse('#000000').success).toBe(true);
      expect(colorValueSchema.safeParse('#FFFFFF').success).toBe(true);
    });

    it('accepts valid OKLCH colors', () => {
      expect(colorValueSchema.safeParse('oklch(0.55 0.22 240)').success).toBe(true);
      expect(colorValueSchema.safeParse('oklch(0.98 0.01 60)').success).toBe(true);
      expect(colorValueSchema.safeParse('oklch(1 0 0)').success).toBe(true);
    });

    it('rejects invalid color formats', () => {
      expect(colorValueSchema.safeParse('rgb(255, 87, 51)').success).toBe(false);
      expect(colorValueSchema.safeParse('#FFF').success).toBe(false); // Short hex
      expect(colorValueSchema.safeParse('blue').success).toBe(false); // Named color
      expect(colorValueSchema.safeParse('').success).toBe(false);
    });

    it('provides descriptive error messages', () => {
      const result = colorValueSchema.safeParse('invalid');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.message).toContain('Color must be valid hex');
      }
    });
  });

  describe('colorScaleSchema', () => {
    it('accepts valid 11-step color scale', () => {
      const validScale = {
        50: '#FAFAFA',
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
        950: '#09090B',
      };
      expect(colorScaleSchema.safeParse(validScale).success).toBe(true);
    });

    it('rejects incomplete color scales', () => {
      const incompleteScale = {
        50: '#FAFAFA',
        500: '#71717A',
        900: '#18181B',
      };
      expect(colorScaleSchema.safeParse(incompleteScale).success).toBe(false);
    });

    it('rejects scales with invalid color values', () => {
      const invalidScale = {
        50: 'invalid-color',
        // ... rest of scale
      };
      expect(colorScaleSchema.safeParse(invalidScale).success).toBe(false);
    });
  });

  describe('spacingValueSchema', () => {
    it('accepts valid rem values', () => {
      expect(spacingValueSchema.safeParse('0.25rem').success).toBe(true);
      expect(spacingValueSchema.safeParse('1rem').success).toBe(true);
      expect(spacingValueSchema.safeParse('1.5rem').success).toBe(true);
    });

    it('accepts 0px as special case', () => {
      expect(spacingValueSchema.safeParse('0px').success).toBe(true);
    });

    it('rejects px values (except 0px)', () => {
      expect(spacingValueSchema.safeParse('16px').success).toBe(false);
      expect(spacingValueSchema.safeParse('24px').success).toBe(false);
    });

    it('rejects unitless values', () => {
      expect(spacingValueSchema.safeParse('1').success).toBe(false);
      expect(spacingValueSchema.safeParse('1.5').success).toBe(false);
    });
  });

  describe('shadowValueSchema', () => {
    it('accepts valid box-shadow values', () => {
      expect(shadowValueSchema.safeParse('0 1px 2px 0 rgb(0 0 0 / 0.05)').success).toBe(true);
      expect(
        shadowValueSchema.safeParse('0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)')
          .success
      ).toBe(true);
    });

    it('rejects invalid shadow formats', () => {
      expect(shadowValueSchema.safeParse('0 0 0 black').success).toBe(false);
      expect(shadowValueSchema.safeParse('invalid').success).toBe(false);
    });
  });

  describe('borderRadiusValueSchema', () => {
    it('accepts valid rem values', () => {
      expect(borderRadiusValueSchema.safeParse('0.25rem').success).toBe(true);
      expect(borderRadiusValueSchema.safeParse('0.5rem').success).toBe(true);
    });

    it('accepts special values', () => {
      expect(borderRadiusValueSchema.safeParse('0px').success).toBe(true);
      expect(borderRadiusValueSchema.safeParse('9999px').success).toBe(true); // Full/pill
    });

    it('rejects arbitrary px values', () => {
      expect(borderRadiusValueSchema.safeParse('4px').success).toBe(false);
      expect(borderRadiusValueSchema.safeParse('8px').success).toBe(false);
    });
  });

  describe('zIndexValueSchema', () => {
    it('accepts valid integer values', () => {
      expect(zIndexValueSchema.safeParse(0).success).toBe(true);
      expect(zIndexValueSchema.safeParse(1000).success).toBe(true);
      expect(zIndexValueSchema.safeParse(-1).success).toBe(true);
    });

    it('rejects non-integer values', () => {
      expect(zIndexValueSchema.safeParse(1.5).success).toBe(false);
      expect(zIndexValueSchema.safeParse('1000').success).toBe(false); // String
    });
  });

  describe('opacityValueSchema', () => {
    it('accepts valid opacity values', () => {
      expect(opacityValueSchema.safeParse('0').success).toBe(true);
      expect(opacityValueSchema.safeParse('0.5').success).toBe(true);
      expect(opacityValueSchema.safeParse('1').success).toBe(true);
    });

    it('rejects out-of-range values', () => {
      expect(opacityValueSchema.safeParse('1.5').success).toBe(false);
      expect(opacityValueSchema.safeParse('-0.1').success).toBe(false);
    });
  });

  describe('transitionDurationSchema', () => {
    it('accepts valid millisecond values', () => {
      expect(transitionDurationSchema.safeParse('150ms').success).toBe(true);
      expect(transitionDurationSchema.safeParse('200ms').success).toBe(true);
    });

    it('rejects non-ms values', () => {
      expect(transitionDurationSchema.safeParse('0.2s').success).toBe(false);
      expect(transitionDurationSchema.safeParse('200').success).toBe(false);
    });
  });

  describe('transitionTimingSchema', () => {
    it('accepts valid timing functions', () => {
      expect(transitionTimingSchema.safeParse('linear').success).toBe(true);
      expect(transitionTimingSchema.safeParse('ease-out').success).toBe(true);
      expect(transitionTimingSchema.safeParse('cubic-bezier(0.4, 0, 0.2, 1)').success).toBe(true);
    });

    it('rejects invalid timing functions', () => {
      expect(transitionTimingSchema.safeParse('invalid').success).toBe(false);
    });
  });

  describe('colorPaletteSchema', () => {
    it('accepts valid complete palette', () => {
      const validPalette = {
        id: 'corporate-trust',
        name: 'Corporate Trust',
        description: 'Professional blue-gray palette',
        targetAudience: ['Finance', 'Legal'],
        colors: {
          primary: createValidColorScale(),
          accent: createValidColorScale(),
          success: createValidColorScale(),
          warning: createValidColorScale(),
          error: createValidColorScale(),
          info: createValidColorScale(),
          gray: createValidColorScale(),
        },
        wcagCompliance: {
          level: 'AAA',
          textContrast: 7.0,
          largeTextContrast: 4.5,
          validated: true,
        },
      };
      expect(colorPaletteSchema.safeParse(validPalette).success).toBe(true);
    });

    it('rejects invalid palette IDs (not kebab-case)', () => {
      const invalidPalette = {
        id: 'CorporateTrust', // PascalCase, not kebab-case
        // ... rest of palette
      };
      const result = colorPaletteSchema.safeParse(invalidPalette);
      expect(result.success).toBe(false);
    });

    it('requires all color categories', () => {
      const incompletePalette = {
        id: 'test-palette',
        name: 'Test',
        description: 'Test palette',
        targetAudience: ['Test'],
        colors: {
          primary: createValidColorScale(),
          // Missing accent, success, etc.
        },
        wcagCompliance: {
          level: 'AAA',
          textContrast: 7.0,
          largeTextContrast: 4.5,
          validated: true,
        },
      };
      expect(colorPaletteSchema.safeParse(incompletePalette).success).toBe(false);
    });
  });

  describe('referenceTokensSchema', () => {
    it('validates complete reference tokens', () => {
      const validTokens = {
        TYPOGRAPHY: {
          FONT_FAMILY: {
            SANS: 'Roboto, sans-serif',
            MONO: 'Roboto Mono, monospace',
          },
          FONT_SIZE: {
            BASE: '1rem',
            LG: '1.125rem',
          },
          FONT_WEIGHT: {
            NORMAL: 400,
            BOLD: 700,
          },
          LINE_HEIGHT: {
            NORMAL: '1.5',
            TIGHT: '1.25',
          },
        },
        SPACING: {
          0: '0px',
          4: '1rem',
        },
        SHADOWS: {
          BASE: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        BORDER_RADIUS: {
          BASE: '0.25rem',
        },
        Z_INDEX: {
          BASE: 0,
          MODAL: 1050,
        },
        OPACITY: {
          0: '0',
          100: '1',
        },
        TRANSITIONS: {
          DURATION: {
            BASE: '200ms',
          },
          TIMING: {
            LINEAR: 'linear',
          },
        },
      };

      expect(referenceTokensSchema.safeParse(validTokens).success).toBe(true);
    });
  });
});

// Helper function to create valid color scale
function createValidColorScale() {
  return {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  };
}
```

## Testing Requirements

- [ ] All schema tests pass
- [ ] Test coverage: 100% for validation.ts
- [ ] Test both valid and invalid cases
- [ ] Test error messages are descriptive
- [ ] Run tests in CI/CD pipeline
- [ ] No flaky tests

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T030-token-validation-tests`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
