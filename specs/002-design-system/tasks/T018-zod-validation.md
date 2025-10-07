# Task T018: Create Zod Validation Schemas for Token Categories

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T005, T006, T007, T008, T009, T010, T011

## Description

Create Zod validation schemas for all token categories (colors, spacing, shadows, typography, etc.) enabling runtime validation and ensuring token structure integrity.

## Files to Create/Modify

- `src/tokens/validation.ts` - Zod validation schemas
- `tests/unit/tokens/validation.spec.ts` - Schema validation tests

## Dependencies

**Blocks**: T030 (token validation tests need schemas)
**Blocked By**: T005-T011 (reference token definitions must exist)

## Acceptance Criteria

- [ ] Color value schema validates OKLCH and HEX formats
- [ ] Color scale schema validates 11-step structure
- [ ] Spacing value schema validates rem units
- [ ] Shadow value schema validates CSS box-shadow format
- [ ] Border radius schema validates rem/px values
- [ ] Z-index schema validates numeric values
- [ ] Opacity schema validates 0-1 range
- [ ] Transition schema validates duration and timing functions
- [ ] Color palette schema validates complete palette structure
- [ ] All schemas export type inference for TypeScript integration
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] All tests pass with 100% coverage

## Implementation Notes

**Zod Schema Structure** (`src/tokens/validation.ts`):

```typescript
import { z } from 'zod';

/**
 * Color value validation (OKLCH or HEX format)
 */
export const colorValueSchema = z
  .string()
  .regex(
    /^(#[0-9A-Fa-f]{6}|oklch\(.+\))$/,
    'Color must be valid hex (#RRGGBB) or OKLCH format (oklch(L C H))'
  );

/**
 * Color scale validation (11-step: 50-950)
 */
export const colorScaleSchema = z.object({
  50: colorValueSchema,
  100: colorValueSchema,
  200: colorValueSchema,
  300: colorValueSchema,
  400: colorValueSchema,
  500: colorValueSchema,
  600: colorValueSchema,
  700: colorValueSchema,
  800: colorValueSchema,
  900: colorValueSchema,
  950: colorValueSchema,
});

/**
 * Spacing value validation (rem units)
 */
export const spacingValueSchema = z
  .string()
  .regex(/^(\d+(\.\d+)?rem|0px)$/, 'Spacing must be in rem units or 0px');

/**
 * Shadow value validation (CSS box-shadow format)
 */
export const shadowValueSchema = z
  .string()
  .regex(
    /^(\d+px\s+){2,4}rgb\(.*\)(\s*,\s*(\d+px\s+){2,4}rgb\(.*\))*$/,
    'Shadow must be valid CSS box-shadow format'
  );

/**
 * Border radius validation (rem, px, or special values)
 */
export const borderRadiusValueSchema = z
  .string()
  .regex(/^(\d+(\.\d+)?rem|\d+px|0px|9999px)$/, 'Border radius must be in rem, px, 0px, or 9999px');

/**
 * Z-index validation (integer values)
 */
export const zIndexValueSchema = z.number().int();

/**
 * Opacity validation (0 to 1 as string)
 */
export const opacityValueSchema = z
  .string()
  .regex(/^(0(\.\d+)?|1)$/, 'Opacity must be between 0 and 1');

/**
 * Transition duration validation (milliseconds)
 */
export const transitionDurationSchema = z
  .string()
  .regex(/^\d+ms$/, 'Duration must be in milliseconds (e.g., 150ms)');

/**
 * Transition timing function validation
 */
export const transitionTimingSchema = z
  .string()
  .regex(
    /^(linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\(.+\))$/,
    'Timing must be a valid CSS timing function'
  );

/**
 * Typography font size validation (rem units)
 */
export const fontSizeSchema = z
  .string()
  .regex(/^\d+(\.\d+)?rem$/, 'Font size must be in rem units');

/**
 * Font weight validation (100-900)
 */
export const fontWeightSchema = z.number().int().min(100).max(900);

/**
 * Line height validation (unitless)
 */
export const lineHeightSchema = z.string().regex(/^\d+(\.\d+)?$/, 'Line height must be unitless');

/**
 * Reference tokens validation schema
 */
export const referenceTokensSchema = z.object({
  TYPOGRAPHY: z.object({
    FONT_FAMILY: z.object({
      SANS: z.string().min(1),
      MONO: z.string().min(1),
    }),
    FONT_SIZE: z.record(fontSizeSchema),
    FONT_WEIGHT: z.record(fontWeightSchema),
    LINE_HEIGHT: z.record(lineHeightSchema),
  }),
  SPACING: z.record(spacingValueSchema),
  SHADOWS: z.record(shadowValueSchema),
  BORDER_RADIUS: z.record(borderRadiusValueSchema),
  Z_INDEX: z.record(zIndexValueSchema),
  OPACITY: z.record(opacityValueSchema),
  TRANSITIONS: z.object({
    DURATION: z.record(transitionDurationSchema),
    TIMING: z.record(transitionTimingSchema),
  }),
});

/**
 * Color palette validation schema
 */
export const colorPaletteSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be kebab-case (lowercase, hyphens only)'),
  name: z.string().min(1),
  description: z.string().min(1),
  targetAudience: z.array(z.string().min(1)),
  colors: z.object({
    primary: colorScaleSchema,
    accent: colorScaleSchema,
    success: colorScaleSchema,
    warning: colorScaleSchema,
    error: colorScaleSchema,
    info: colorScaleSchema,
    gray: colorScaleSchema,
  }),
  wcagCompliance: z.object({
    level: z.enum(['AA', 'AAA']),
    textContrast: z.number().min(3), // Minimum for WCAG A
    largeTextContrast: z.number().min(3),
    validated: z.boolean(),
  }),
});

// Export TypeScript types inferred from schemas
export type ColorValue = z.infer<typeof colorValueSchema>;
export type ColorScale = z.infer<typeof colorScaleSchema>;
export type ColorPalette = z.infer<typeof colorPaletteSchema>;
export type ReferenceTokens = z.infer<typeof referenceTokensSchema>;
```

**Validation Usage Example**:

```typescript
import { colorPaletteSchema } from './validation';

// Validate palette at runtime
const result = colorPaletteSchema.safeParse(modernTechPalette);

if (!result.success) {
  console.error('Palette validation failed:', result.error);
} else {
  console.log('Palette is valid!');
}
```

**Test Coverage** (`tests/unit/tokens/validation.spec.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import { colorValueSchema, colorScaleSchema, colorPaletteSchema } from '@/tokens/validation';

describe('Color Value Schema', () => {
  it('accepts valid HEX colors', () => {
    expect(colorValueSchema.safeParse('#FF5733').success).toBe(true);
  });

  it('accepts valid OKLCH colors', () => {
    expect(colorValueSchema.safeParse('oklch(0.55 0.22 240)').success).toBe(true);
  });

  it('rejects invalid formats', () => {
    expect(colorValueSchema.safeParse('rgb(255, 87, 51)').success).toBe(false);
    expect(colorValueSchema.safeParse('#FFF').success).toBe(false);
  });
});

// ... tests for all other schemas
```

## Testing Requirements

- [ ] Test that valid OKLCH colors pass validation
- [ ] Test that valid HEX colors pass validation
- [ ] Test that invalid color formats fail validation
- [ ] Test spacing validation (rem units required)
- [ ] Test shadow validation (CSS format required)
- [ ] Test z-index validation (integers only)
- [ ] Test opacity validation (0-1 range)
- [ ] Test complete palette validation
- [ ] Test error messages are descriptive
- [ ] Achieve 100% test coverage for all schemas

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T018-zod-validation`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
