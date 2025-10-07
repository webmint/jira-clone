# Data Model: Design System Foundation - Styles

**Feature**: 002-design-system
**Date**: 2025-10-06
**Type**: Design Token Schema

---

## Overview

This document defines the structure of design tokens for the design system. Since this is a styles-only feature (no backend/database), the "data model" refers to the TypeScript interfaces, type definitions, and token structure that will be used throughout the application.

---

## Token Architecture

### Three-Layer Hierarchy

```
Layer 1 (Reference Tokens) - Primitive values
    ↓
Layer 2 (System Tokens) - Semantic mappings
    ↓
Layer 3 (Component Tokens) - Component-specific values
```

---

## Layer 1: Reference Tokens

### Entity: ReferenceTokens

**Description**: Primitive design values that form the foundation of the design system.

**Schema** (`tokens/reference.tokens.ts`):

```typescript
interface ColorScale {
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

interface ReferenceTokens {
  COLORS: {
    GRAY: ColorScale;
    PRIMARY: ColorScale; // Based on selected palette
    SUCCESS: ColorScale;
    WARNING: ColorScale;
    ERROR: ColorScale;
    INFO: ColorScale;
  };

  SPACING: {
    0: '0px';
    1: '0.25rem';
    2: '0.5rem';
    3: '0.75rem';
    4: '1rem';
    5: '1.25rem';
    6: '1.5rem';
    8: '2rem';
    10: '2.5rem';
    12: '3rem';
    16: '4rem';
    20: '5rem';
    24: '6rem';
  };

  TYPOGRAPHY: {
    FONT_FAMILY: {
      SANS: string;
      MONO: string;
    };
    FONT_SIZE: {
      XS: '0.75rem';
      SM: '0.875rem';
      BASE: '1rem';
      LG: '1.125rem';
      XL: '1.25rem';
      XL2: '1.5rem';
      XL3: '1.875rem';
      XL4: '2.25rem';
      XL5: '3rem';
    };
    FONT_WEIGHT: {
      THIN: 100;
      LIGHT: 300;
      NORMAL: 400;
      MEDIUM: 500;
      BOLD: 700;
      BLACK: 900;
    };
    LINE_HEIGHT: {
      TIGHT: '1.25';
      NORMAL: '1.5';
      RELAXED: '1.75';
    };
  };

  SHADOWS: {
    SM: string;
    BASE: string;
    MD: string;
    LG: string;
    XL: string;
  };

  BORDER_RADIUS: {
    NONE: '0px';
    SM: '0.125rem';
    BASE: '0.25rem';
    MD: '0.375rem';
    LG: '0.5rem';
    XL: '0.75rem';
    FULL: '9999px';
  };

  Z_INDEX: {
    HIDE: -1;
    BASE: 0;
    DROPDOWN: 1000;
    STICKY: 1020;
    FIXED: 1030;
    MODAL_BACKDROP: 1040;
    MODAL: 1050;
    POPOVER: 1060;
    TOOLTIP: 1070;
  };

  OPACITY: {
    0: '0';
    5: '0.05';
    10: '0.1';
    20: '0.2';
    40: '0.4';
    60: '0.6';
    80: '0.8';
    100: '1';
  };

  TRANSITIONS: {
    DURATION: {
      FAST: '150ms';
      BASE: '200ms';
      SLOW: '300ms';
    };
    TIMING: {
      LINEAR: 'linear';
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)';
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)';
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)';
      EASE_FLUID: 'cubic-bezier(0.3, 0, 0, 1)';
    };
  };
}
```

**Validation Rules**:

- All color values must be valid OKLCH/hex strings
- All spacing values must use rem units
- All color scales must have 11 steps (50-950)
- Font family must include Roboto with fallbacks

---

## Layer 2: System Tokens

### Entity: SystemTokens

**Description**: Semantic mappings that reference primitive tokens. These define the application's intent (e.g., "background", "primary", "text-primary").

**Schema** (`tokens/system.tokens.ts`):

```typescript
interface SystemTokens {
  COLORS: {
    // Brand colors
    PRIMARY: {
      50: string; // CSS variable reference: '--color-primary-50'
      500: string; // CSS variable reference: '--color-primary-500'
      900: string; // CSS variable reference: '--color-primary-900'
    };

    // Semantic colors (theme-aware)
    BACKGROUND: string; // '--color-background'
    SURFACE: string; // '--color-surface'
    SURFACE_VARIANT: string; // '--color-surface-variant'
    BORDER: string; // '--color-border'

    // Text colors
    TEXT: {
      PRIMARY: string; // '--color-text-primary'
      SECONDARY: string; // '--color-text-secondary'
      TERTIARY: string; // '--color-text-tertiary'
    };

    // Semantic feedback colors
    SUCCESS: string; // '--color-success'
    WARNING: string; // '--color-warning'
    ERROR: string; // '--color-error'
    INFO: string; // '--color-info'
  };

  SPACING: {
    XS: string; // '--spacing-xs' → maps to REFERENCE.SPACING[2]
    SM: string; // '--spacing-sm' → maps to REFERENCE.SPACING[4]
    MD: string; // '--spacing-md' → maps to REFERENCE.SPACING[6]
    LG: string; // '--spacing-lg' → maps to REFERENCE.SPACING[8]
    XL: string; // '--spacing-xl' → maps to REFERENCE.SPACING[12]
  };
}
```

**Relationships**:

- `SystemTokens.COLORS.PRIMARY` → References `ReferenceTokens.COLORS.PRIMARY`
- `SystemTokens.SPACING.SM` → References `ReferenceTokens.SPACING[4]`

**Validation Rules**:

- All values must be valid CSS variable references (start with `--`)
- Must map to existing reference tokens
- Semantic color names must be consistent (success = green, error = red, etc.)

---

## Layer 3: Component Tokens

### Entity: ComponentTokens

**Description**: Component-specific token sets that reference system tokens. These will be created as components are built (future phase).

**Schema Example** (for reference):

```typescript
interface ButtonTokens {
  PRIMARY: {
    padding: string; // References SYSTEM.SPACING.SM
    backgroundColor: string; // References SYSTEM.COLORS.PRIMARY[500]
    textColor: string; // References SYSTEM.COLORS.TEXT.PRIMARY
    borderRadius: string; // References REFERENCE.BORDER_RADIUS.BASE
  };
}
```

**Note**: Component tokens are not part of this phase (styles only).

---

## Token Type Definitions

### Entity: TokenTypes

**Description**: TypeScript type definitions for autocomplete and type safety.

**Schema** (`tokens/types.ts`):

```typescript
// Deep key extraction for nested token objects
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string
          ? K
          : `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

// Color token paths
export type ColorToken = DeepKeys<SystemTokens['COLORS']>;
// Result: 'PRIMARY.50' | 'PRIMARY.500' | 'BACKGROUND' | 'TEXT.PRIMARY' | ...

// Spacing token paths
export type SpacingToken = keyof SystemTokens['SPACING'];
// Result: 'XS' | 'SM' | 'MD' | 'LG' | 'XL'

// Shadow token paths
export type ShadowToken = keyof ReferenceTokens['SHADOWS'];
// Result: 'SM' | 'BASE' | 'MD' | 'LG' | 'XL'

// Border radius token paths
export type BorderRadiusToken = keyof ReferenceTokens['BORDER_RADIUS'];
// Result: 'NONE' | 'SM' | 'BASE' | 'MD' | 'LG' | 'XL' | 'FULL'

// Z-index token paths
export type ZIndexToken = keyof ReferenceTokens['Z_INDEX'];
// Result: 'HIDE' | 'BASE' | 'DROPDOWN' | 'MODAL' | ...

// Opacity token paths
export type OpacityToken = keyof ReferenceTokens['OPACITY'];
// Result: '0' | '5' | '10' | '20' | ...

// Transition token paths
export type TransitionDurationToken = keyof ReferenceTokens['TRANSITIONS']['DURATION'];
export type TransitionTimingToken = keyof ReferenceTokens['TRANSITIONS']['TIMING'];
```

**Validation Rules**:

- All exported types must be literal unions (no `string` type)
- Token paths must be autocomplete-friendly
- Types must match runtime token structure

---

## Color Palette Entity

### Entity: ColorPalette

**Description**: One of 5 professional color palettes for user selection.

**Schema**:

```typescript
interface ColorPalette {
  id: string; // e.g., 'corporate-trust'
  name: string; // e.g., 'Corporate Trust'
  description: string; // e.g., 'Professional, trustworthy, conservative'
  targetAudience: string[]; // e.g., ['Finance', 'Legal', 'Enterprise']

  colors: {
    primary: ColorScale; // 11-step scale (50-950)
    accent: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
    gray: ColorScale;
  };

  wcagCompliance: {
    level: 'AA' | 'AAA';
    textContrast: number; // e.g., 7.1 (for AAA)
    largeTextContrast: number; // e.g., 4.5
    validated: boolean;
  };
}
```

**Instances** (5 palettes):

1. Corporate Trust (Blue-Gray)
2. Modern Tech (Teal-Slate)
3. Sophisticated Luxury (Charcoal-Gold)
4. Clean Minimal (Pure Neutrals)
5. Vibrant Professional (Purple-Green)

**Validation Rules**:

- All palettes must pass WCAG 2.1 AAA (7:1 contrast for normal text)
- Each color scale must have exactly 11 steps
- Colors must be in OKLCH or HEX format
- Palette ID must be kebab-case

---

## Theme Configuration Entity

### Entity: ThemeConfig

**Description**: Configuration for light/dark theme support.

**Schema**:

```typescript
interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  tokens: {
    light: {
      background: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
    };
    dark: {
      background: string;
      surface: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
    };
  };
}
```

**Validation Rules**:

- Light and dark tokens must have matching keys
- All color values must pass WCAG contrast checks in their respective themes
- System mode respects `prefers-color-scheme` media query

---

## Zod Validation Schemas

### Entity: TokenValidationSchemas

**Description**: Runtime validation schemas for design tokens.

**Schema** (`tokens/validation.ts`):

```typescript
import { z } from 'zod';

// Color value validation (OKLCH or HEX)
const colorValueSchema = z
  .string()
  .regex(/^(#[0-9A-Fa-f]{6}|oklch\(.+\))$/, 'Must be valid hex or OKLCH color');

// Color scale validation
const colorScaleSchema = z.object({
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

// Spacing value validation (rem units)
const spacingValueSchema = z.string().regex(/^\d+(\.\d+)?rem$/, 'Must be in rem units');

// Reference tokens validation
export const referenceTokensSchema = z.object({
  COLORS: z.object({
    GRAY: colorScaleSchema,
    PRIMARY: colorScaleSchema,
    SUCCESS: colorScaleSchema,
    WARNING: colorScaleSchema,
    ERROR: colorScaleSchema,
    INFO: colorScaleSchema,
  }),
  SPACING: z.record(spacingValueSchema),
  // ... other token categories
});

// Palette validation
export const colorPaletteSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'Must be kebab-case'),
  name: z.string().min(1),
  description: z.string().min(1),
  targetAudience: z.array(z.string()),
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
    textContrast: z.number().min(4.5),
    largeTextContrast: z.number().min(3),
    validated: z.boolean(),
  }),
});
```

---

## File Structure

```
src/tokens/
├── reference.tokens.ts      # Layer 1 implementation
├── system.tokens.ts         # Layer 2 implementation
├── types.ts                 # TypeScript type definitions
├── validation.ts            # Zod validation schemas
└── utils.ts                 # Token helper functions

src/palettes/
├── corporate-trust.palette.ts
├── modern-tech.palette.ts
├── sophisticated-luxury.palette.ts
├── clean-minimal.palette.ts
└── vibrant-professional.palette.ts

src/assets/styles/
└── tokens.css               # CSS @theme definitions
```

---

## Relationships

```
ColorPalette (user selects 1 of 5)
    ↓
ReferenceTokens.COLORS.PRIMARY (maps to selected palette)
    ↓
SystemTokens.COLORS.PRIMARY (semantic reference)
    ↓
CSS Variables (--color-primary-500)
    ↓
Component Usage (class="bg-primary-500")
```

---

## Summary

**Total Entities**: 7

- ReferenceTokens
- SystemTokens
- ComponentTokens (placeholder for future)
- TokenTypes
- ColorPalette (5 instances)
- ThemeConfig
- TokenValidationSchemas

**Key Relationships**:

- ColorPalette → ReferenceTokens (1:1, user selection)
- ReferenceTokens → SystemTokens (N:M, semantic mapping)
- SystemTokens → CSS Variables (1:1, output)
- ThemeConfig → SystemTokens (1:N, light/dark variants)

**Validation Strategy**:

- Zod schemas for runtime validation
- TypeScript types for compile-time safety
- WCAG contrast validation for all color pairings
- Format validation (rem, OKLCH/hex, kebab-case IDs)
