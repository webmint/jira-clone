# Task T017: Create TypeScript Type Definitions for Design Tokens

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T005, T006, T007, T008, T009, T010, T011

## Description

Create comprehensive TypeScript type definitions for design tokens with deep key extraction utilities, enabling autocomplete and compile-time validation throughout the application.

## Files to Create/Modify

- `src/tokens/types.ts` - TypeScript type definitions and utility types

## Dependencies

**Blocks**: T023 (token utility functions need types), T024, T025 (composables need types)
**Blocked By**: T005-T011 (reference token definitions must exist)

## Acceptance Criteria

- [ ] Deep key extraction type utilities defined (DeepKeys)
- [ ] Color token path types exported (e.g., 'PRIMARY.50' | 'BACKGROUND')
- [ ] Spacing token path types exported
- [ ] Shadow token path types exported
- [ ] Border radius token path types exported
- [ ] Z-index token path types exported
- [ ] Opacity token path types exported
- [ ] Transition token path types exported (duration and timing)
- [ ] All types are literal unions (no generic `string` type)
- [ ] Types provide autocomplete in IDE
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Deep Key Extraction Utility** (`src/tokens/types.ts`):

```typescript
/**
 * Recursively extracts all valid key paths from a nested object type
 * @example
 * type MyType = { a: { b: string } }
 * DeepKeys<MyType> = 'a.b'
 */
export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string | number
          ? K
          : `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

/**
 * Color palette definition with 11-step scale
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Color palette entity with metadata
 */
export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  targetAudience: string[];
  colors: {
    primary: ColorScale;
    accent: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
    gray: ColorScale;
  };
  wcagCompliance: {
    level: 'AA' | 'AAA';
    textContrast: number;
    largeTextContrast: number;
    validated: boolean;
  };
}

/**
 * Reference tokens interface (Layer 1)
 */
export interface ReferenceTokens {
  TYPOGRAPHY: {
    FONT_FAMILY: {
      SANS: string;
      MONO: string;
    };
    FONT_SIZE: {
      XS: string;
      SM: string;
      BASE: string;
      LG: string;
      XL: string;
      XL2: string;
      XL3: string;
      XL4: string;
      XL5: string;
    };
    FONT_WEIGHT: {
      THIN: number;
      LIGHT: number;
      NORMAL: number;
      MEDIUM: number;
      BOLD: number;
      BLACK: number;
    };
    LINE_HEIGHT: {
      TIGHT: string;
      NORMAL: string;
      RELAXED: string;
    };
  };
  SPACING: Record<number, string>;
  SHADOWS: {
    SM: string;
    BASE: string;
    MD: string;
    LG: string;
    XL: string;
  };
  BORDER_RADIUS: {
    NONE: string;
    SM: string;
    BASE: string;
    MD: string;
    LG: string;
    XL: string;
    FULL: string;
  };
  Z_INDEX: {
    HIDE: number;
    BASE: number;
    DROPDOWN: number;
    STICKY: number;
    FIXED: number;
    MODAL_BACKDROP: number;
    MODAL: number;
    POPOVER: number;
    TOOLTIP: number;
  };
  OPACITY: {
    0: string;
    5: string;
    10: string;
    20: string;
    40: string;
    60: string;
    80: string;
    100: string;
  };
  TRANSITIONS: {
    DURATION: {
      FAST: string;
      BASE: string;
      SLOW: string;
    };
    TIMING: {
      LINEAR: string;
      EASE_IN: string;
      EASE_OUT: string;
      EASE_IN_OUT: string;
      EASE_FLUID: string;
    };
  };
}

/**
 * System tokens interface (Layer 2 - will be defined in T019)
 */
export interface SystemTokens {
  COLORS: {
    PRIMARY: ColorScale;
    BACKGROUND: string;
    SURFACE: string;
    SURFACE_VARIANT: string;
    BORDER: string;
    TEXT: {
      PRIMARY: string;
      SECONDARY: string;
      TERTIARY: string;
    };
    SUCCESS: string;
    WARNING: string;
    ERROR: string;
    INFO: string;
  };
  SPACING: {
    XS: string;
    SM: string;
    MD: string;
    LG: string;
    XL: string;
  };
}

// Export specific token path types
export type FontSizeToken = keyof ReferenceTokens['TYPOGRAPHY']['FONT_SIZE'];
export type FontWeightToken = keyof ReferenceTokens['TYPOGRAPHY']['FONT_WEIGHT'];
export type LineHeightToken = keyof ReferenceTokens['TYPOGRAPHY']['LINE_HEIGHT'];
export type SpacingToken = keyof ReferenceTokens['SPACING'];
export type ShadowToken = keyof ReferenceTokens['SHADOWS'];
export type BorderRadiusToken = keyof ReferenceTokens['BORDER_RADIUS'];
export type ZIndexToken = keyof ReferenceTokens['Z_INDEX'];
export type OpacityToken = keyof ReferenceTokens['OPACITY'];
export type TransitionDurationToken = keyof ReferenceTokens['TRANSITIONS']['DURATION'];
export type TransitionTimingToken = keyof ReferenceTokens['TRANSITIONS']['TIMING'];

// Color token paths (from SystemTokens)
export type ColorToken = DeepKeys<SystemTokens['COLORS']>;
// Result: 'PRIMARY.50' | 'PRIMARY.500' | 'BACKGROUND' | 'TEXT.PRIMARY' | ...

// System spacing token paths
export type SystemSpacingToken = keyof SystemTokens['SPACING'];
// Result: 'XS' | 'SM' | 'MD' | 'LG' | 'XL'
```

**Key Design Decisions**:

- Use literal union types instead of `string` for autocomplete
- Deep key extraction enables dot-notation paths ('PRIMARY.500')
- Separate reference vs system token types
- Number types for numeric values (font-weight, z-index)
- String types for CSS values (rem, px, ms)

## Testing Requirements

- [ ] Import types and verify autocomplete works in IDE
- [ ] Test that DeepKeys correctly extracts nested paths
- [ ] Verify ColorToken type includes all expected paths
- [ ] Check that number types are used for numeric values
- [ ] Ensure no `any` or `unknown` types are used
- [ ] TypeScript compiler validates all type definitions

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T017-typescript-types`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
