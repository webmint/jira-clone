# Task T023: Create Token Utility Functions

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T022

## Description

Create utility functions for working with design tokens including getToken (retrieves token value), resolveToken (resolves nested token references), and helper functions for type-safe token access.

## Files to Create/Modify

- `src/tokens/utils.ts` - Token utility functions
- `tests/unit/tokens/utils.spec.ts` - Utility function tests

## Dependencies

**Blocks**: T024, T025 (composables use token utilities)
**Blocked By**: T022 (both light and dark themes must exist)

## Acceptance Criteria

- [ ] `getToken` function retrieves token value by path
- [ ] `resolveToken` function resolves nested token references
- [ ] `getCSSVariable` function returns var(--token-name) syntax
- [ ] Type-safe token accessors for each category
- [ ] Helper functions handle dot-notation paths ('PRIMARY.500')
- [ ] Functions work with both reference and system tokens
- [ ] Comprehensive error handling for invalid tokens
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Test coverage: 100% for all utility functions

## Implementation Notes

**Utility Functions** (`src/tokens/utils.ts`):

```typescript
import type {
  ColorToken,
  SpacingToken,
  ShadowToken,
  BorderRadiusToken,
  ZIndexToken,
  OpacityToken,
  TransitionDurationToken,
  TransitionTimingToken,
} from './types';
import { REFERENCE } from './reference.tokens';
import { SYSTEM } from './system.tokens';

/**
 * Get a token value from a dot-notation path
 * @example getToken(REFERENCE, 'SPACING.4') → '1rem'
 */
export function getToken<T extends Record<string, any>>(
  tokenObject: T,
  path: string
): string | number {
  const keys = path.split('.');
  let value: any = tokenObject;

  for (const key of keys) {
    if (value[key] === undefined) {
      throw new Error(`Token path "${path}" not found in token object`);
    }
    value = value[key];
  }

  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error(`Token path "${path}" does not resolve to a primitive value`);
  }

  return value;
}

/**
 * Resolve a token reference (e.g., 'var(--spacing-sm)' → '1rem')
 * Handles nested CSS variable references
 */
export function resolveToken(tokenValue: string): string {
  // If it's a CSS variable reference, extract the variable name
  const varMatch = tokenValue.match(/^var\((--[\w-]+)\)$/);
  if (varMatch) {
    const varName = varMatch[1];
    // Get computed value from :root
    if (typeof window !== 'undefined') {
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return value || tokenValue; // Fallback to original if not found
    }
  }
  return tokenValue;
}

/**
 * Get a CSS variable syntax for a token
 * @example getCSSVariable('spacing-sm') → 'var(--spacing-sm)'
 */
export function getCSSVariable(tokenName: string): string {
  // Add -- prefix if not present
  const varName = tokenName.startsWith('--') ? tokenName : `--${tokenName}`;
  return `var(${varName})`;
}

/**
 * Type-safe color token accessor
 * @example getColorToken('PRIMARY.500') → 'var(--color-primary-500)'
 */
export function getColorToken(token: ColorToken): string {
  const path = token.replace(/\./g, '-').toLowerCase();
  return getCSSVariable(`color-${path}`);
}

/**
 * Type-safe spacing token accessor
 * @example getSpacingToken('MD') → 'var(--spacing-md)'
 */
export function getSpacingToken(token: keyof typeof SYSTEM.SPACING): string {
  return getCSSVariable(`spacing-${token.toLowerCase()}`);
}

/**
 * Type-safe shadow token accessor
 * @example getShadowToken('MD') → 'var(--shadow-md)'
 */
export function getShadowToken(token: ShadowToken): string {
  return getCSSVariable(`shadow-${token.toLowerCase()}`);
}

/**
 * Type-safe border radius token accessor
 * @example getBorderRadiusToken('BASE') → 'var(--radius-base)'
 */
export function getBorderRadiusToken(token: BorderRadiusToken): string {
  return getCSSVariable(`radius-${token.toLowerCase()}`);
}

/**
 * Type-safe z-index token accessor
 * @example getZIndexToken('MODAL') → 'var(--z-modal)'
 */
export function getZIndexToken(token: ZIndexToken): string {
  return getCSSVariable(`z-${token.toLowerCase()}`);
}

/**
 * Type-safe opacity token accessor
 * @example getOpacityToken('40') → 'var(--opacity-40)'
 */
export function getOpacityToken(token: OpacityToken): string {
  return getCSSVariable(`opacity-${token}`);
}

/**
 * Type-safe transition duration token accessor
 * @example getTransitionDuration('FAST') → 'var(--duration-fast)'
 */
export function getTransitionDuration(token: TransitionDurationToken): string {
  return getCSSVariable(`duration-${token.toLowerCase()}`);
}

/**
 * Type-safe transition timing token accessor
 * @example getTransitionTiming('EASE_OUT') → 'var(--ease-out)'
 */
export function getTransitionTiming(token: TransitionTimingToken): string {
  return getCSSVariable(`ease-${token.toLowerCase().replace(/_/g, '-')}`);
}

/**
 * Build a complete transition string
 * @example buildTransition('background-color', 'FAST', 'EASE_OUT')
 *   → 'background-color var(--duration-fast) var(--ease-out)'
 */
export function buildTransition(
  property: string,
  duration: TransitionDurationToken,
  timing: TransitionTimingToken
): string {
  return `${property} ${getTransitionDuration(duration)} ${getTransitionTiming(timing)}`;
}

/**
 * Get all tokens of a specific category
 * Useful for documentation and debugging
 */
export function getAllTokens(category: keyof typeof REFERENCE): Record<string, any> {
  return REFERENCE[category];
}

/**
 * Check if a CSS variable is defined in the current document
 */
export function isCSSVariableDefined(varName: string): boolean {
  if (typeof window === 'undefined') return false;

  const name = varName.startsWith('--') ? varName : `--${varName}`;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value.trim().length > 0;
}
```

**Test Examples** (`tests/unit/tokens/utils.spec.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import {
  getToken,
  getCSSVariable,
  getColorToken,
  getSpacingToken,
  buildTransition,
} from '@/tokens/utils';
import { REFERENCE } from '@/tokens/reference.tokens';

describe('getToken', () => {
  it('retrieves nested token values', () => {
    expect(getToken(REFERENCE, 'SPACING.4')).toBe('1rem');
  });

  it('throws error for invalid paths', () => {
    expect(() => getToken(REFERENCE, 'INVALID.PATH')).toThrow(
      'Token path "INVALID.PATH" not found'
    );
  });
});

describe('getCSSVariable', () => {
  it('wraps token name in var() syntax', () => {
    expect(getCSSVariable('spacing-sm')).toBe('var(--spacing-sm)');
  });

  it('handles existing -- prefix', () => {
    expect(getCSSVariable('--spacing-sm')).toBe('var(--spacing-sm)');
  });
});

describe('getColorToken', () => {
  it('converts dot notation to CSS variable', () => {
    expect(getColorToken('PRIMARY.500')).toBe('var(--color-primary-500)');
  });
});

describe('buildTransition', () => {
  it('builds complete transition string', () => {
    const result = buildTransition('opacity', 'FAST', 'EASE_OUT');
    expect(result).toBe('opacity var(--duration-fast) var(--ease-out)');
  });
});
```

## Testing Requirements

- [ ] Test getToken with valid paths
- [ ] Test getToken with invalid paths (should throw)
- [ ] Test resolveToken with CSS variable references
- [ ] Test getCSSVariable formatting
- [ ] Test all type-safe accessor functions
- [ ] Test buildTransition with different parameters
- [ ] Test isCSSVariableDefined (browser environment)
- [ ] Achieve 100% test coverage

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T023-token-utilities`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
