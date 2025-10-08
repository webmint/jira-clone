# Token Validation Contracts

**Feature**: Palette Switcher | **Date**: 2025-10-07

## Overview

This document defines the contracts (interfaces) for token validation functions. These functions ensure that all 10 palette variations have complete and accessible token sets.

---

## Contract: `validateTokenCompleteness`

### Purpose

Verify that all 10 palette variations define the exact same set of token names.

### Input

```typescript
interface PaletteVariation {
  palette:
    | 'corporate-trust'
    | 'creative-energy'
    | 'natural-harmony'
    | 'warm-welcome'
    | 'minimalist';
  mode: 'light' | 'dark';
  tokens: Record<string, string>; // Map of token name → value
}

type Variations = PaletteVariation[];
```

### Output

```typescript
interface ValidationResult {
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
```

### Behavior

1. Extract all unique token names from all 10 variations
2. For each variation, check if it defines all token names
3. Return validation result with details of any missing or extra tokens

### Example

```typescript
const result = validateTokenCompleteness(allVariations);

if (!result.valid) {
  console.error('Token completeness validation failed:');
  result.missingTokens?.forEach(({ variation, missing }) => {
    console.error(`  ${variation} missing: ${missing.join(', ')}`);
  });
}
```

---

## Contract: `validateContrastRatios`

### Purpose

Verify that all text/background and primary/background color pairs meet WCAG AA contrast requirements across all 10 variations.

### Input

```typescript
interface ContrastCheck {
  variation: string; // e.g., "natural-harmony.light"
  foregroundToken: string; // e.g., "--color-text-primary"
  backgroundToken: string; // e.g., "--color-background-default"
  minimumRatio: number; // 4.5 for normal text, 3.0 for large text/UI
}

type ContrastChecks = ContrastCheck[];
```

### Output

```typescript
interface ContrastValidationResult {
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
```

### Behavior

1. For each contrast check:
   - Get computed color value for foreground token in specified variation
   - Get computed color value for background token in specified variation
   - Calculate contrast ratio using WCAG formula
   - Compare against minimum ratio
2. Return validation result with details of any failures

### Example

```typescript
const checks = [
  {
    variation: 'corporate-trust.light',
    foregroundToken: '--color-text-primary',
    backgroundToken: '--color-background-default',
    minimumRatio: 4.5,
  },
  {
    variation: 'corporate-trust.dark',
    foregroundToken: '--color-text-primary',
    backgroundToken: '--color-background-default',
    minimumRatio: 4.5,
  },
  // ... repeat for all 10 variations
];

const result = validateContrastRatios(checks);

if (!result.valid) {
  console.error('Contrast validation failed:');
  result.failures?.forEach((failure) => {
    console.error(
      `  ${failure.variation}: ${failure.foreground} on ${failure.background} = ${failure.ratio.toFixed(2)} (required: ${failure.required})`
    );
  });
}
```

---

## Contract: `getCSSVariable`

### Purpose

Helper function to get the computed value of a CSS custom property for a specific palette variation.

### Input

```typescript
interface GetCSSVariableParams {
  tokenName: string; // e.g., "--color-text-primary"
  palette: string; // e.g., "corporate-trust"
  mode: string; // e.g., "light"
}
```

### Output

```typescript
type CSSVariableValue = string; // Hex color, e.g., "#0F172A"
```

### Behavior

1. Create a temporary element with specified palette and mode classes
2. Query the computed style for the CSS custom property
3. Return the resolved value
4. Clean up temporary element

### Example

```typescript
const textColor = getCSSVariable({
  tokenName: '--color-text-primary',
  palette: 'creative-energy',
  mode: 'dark',
});

console.log(textColor); // "#FFFFFF"
```

---

## Contract: `getContrastRatio`

### Purpose

Calculate the WCAG contrast ratio between two colors.

### Input

```typescript
interface GetContrastRatioParams {
  foreground: string; // Hex color, e.g., "#0F172A"
  background: string; // Hex color, e.g., "#FFFFFF"
}
```

### Output

```typescript
type ContrastRatio = number; // Range: 1.0 to 21.0
```

### Behavior

1. Parse hex colors to RGB values
2. Convert RGB to relative luminance using WCAG formula
3. Calculate contrast ratio: (lighter + 0.05) / (darker + 0.05)
4. Return ratio

### Formula

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B

where R, G, B are:
  if (component ≤ 0.03928) then component / 12.92
  else ((component + 0.055) / 1.055) ^ 2.4

Contrast Ratio = (L_lighter + 0.05) / (L_darker + 0.05)
```

### Example

```typescript
const ratio = getContrastRatio({
  foreground: '#0F172A', // Dark text
  background: '#FFFFFF', // White background
});

console.log(ratio); // 15.68 (passes WCAG AAA)
```

---

## Contract: `validateTokenNaming`

### Purpose

Verify that all token names follow the naming convention: `--{category}-{element}-{variant}`.

### Input

```typescript
interface TokenNamingParams {
  tokens: Record<string, string>; // Map of token name → value
}
```

### Output

```typescript
interface TokenNamingValidationResult {
  valid: boolean;
  invalidNames?: Array<{
    tokenName: string;
    reason: string; // Why it's invalid
  }>;
}
```

### Behavior

1. For each token name:
   - Verify it starts with `--`
   - Verify it follows the pattern with 2+ segments separated by `-`
   - Verify category is valid (color, spacing, font, etc.)
2. Return validation result with details of any invalid names

### Example

```typescript
const result = validateTokenNaming({
  tokens: {
    '--color-text-primary': '#0F172A',
    '--invalid-token': '#000000', // Missing category
    'no-prefix': '#FFFFFF', // Missing --
  },
});

if (!result.valid) {
  console.error('Token naming validation failed:');
  result.invalidNames?.forEach(({ tokenName, reason }) => {
    console.error(`  ${tokenName}: ${reason}`);
  });
}
```

---

## Vitest Test Structure

### Test Organization

```typescript
// tests/unit/designSystem/tokens/validation.spec.ts
describe('Token Validation', () => {
  describe('validateTokenCompleteness', () => {
    it('passes when all 10 variations have identical token sets', () => {
      const result = validateTokenCompleteness(mockVariations);
      expect(result.valid).toBe(true);
    });

    it('fails when a variation is missing tokens', () => {
      const incomplete = mockVariations.map((v, i) =>
        i === 0 ? { ...v, tokens: { ...v.tokens, '--color-text-primary': undefined } } : v
      );
      const result = validateTokenCompleteness(incomplete);
      expect(result.valid).toBe(false);
      expect(result.missingTokens).toHaveLength(1);
    });
  });

  describe('validateContrastRatios', () => {
    const palettes = [
      'corporate-trust',
      'creative-energy',
      'natural-harmony',
      'warm-welcome',
      'minimalist',
    ];
    const modes = ['light', 'dark'];

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
          });
        });
      });
    });
  });

  describe('validateTokenNaming', () => {
    it('accepts valid token names', () => {
      const result = validateTokenNaming({
        tokens: {
          '--color-text-primary': '#000',
          '--spacing-base': '1rem',
          '--font-size-lg': '1.25rem',
        },
      });
      expect(result.valid).toBe(true);
    });

    it('rejects tokens without -- prefix', () => {
      const result = validateTokenNaming({
        tokens: { invalid: '#000' },
      });
      expect(result.valid).toBe(false);
    });
  });
});
```

---

_Validation contracts complete: 2025-10-07_
