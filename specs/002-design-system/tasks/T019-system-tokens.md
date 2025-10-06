# Task T019: Create System Tokens with Semantic Mappings

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T005, T006, T007, T008, T009, T010, T011

## Description

Create system tokens (Layer 2) with semantic mappings that reference primitive tokens from Layer 1. These define the application's intent (background, surface, text-primary, etc.) and provide the foundation for theme-aware components.

## Files to Create/Modify

- `src/tokens/system.tokens.ts` - System token definitions with semantic names

## Dependencies

**Blocks**: T020 (CSS generation needs system tokens), T024, T025 (composables need system tokens)
**Blocked By**: T005-T011 (reference tokens must exist to be mapped)

## Acceptance Criteria

- [ ] Semantic color tokens defined (BACKGROUND, SURFACE, TEXT.PRIMARY, etc.)
- [ ] Semantic spacing tokens defined (XS, SM, MD, LG, XL)
- [ ] All system tokens reference Layer 1 reference tokens
- [ ] Token values use CSS variable names (e.g., '--color-background')
- [ ] Clear separation between reference (primitives) and system (semantic)
- [ ] Token structure uses `as const` for literal types
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] System tokens integrate with existing reference tokens

## Implementation Notes

**System Token Structure** (`src/tokens/system.tokens.ts`):

```typescript
import { REFERENCE } from './reference.tokens';

/**
 * System Tokens (Layer 2) - Semantic mappings
 *
 * These tokens define the application's intent and reference Layer 1 primitives.
 * They provide theme-aware values that adapt to light/dark modes.
 */
export const SYSTEM = {
  COLORS: {
    // Brand colors (reference primary palette)
    PRIMARY: {
      50: '--color-primary-50',
      100: '--color-primary-100',
      200: '--color-primary-200',
      300: '--color-primary-300',
      400: '--color-primary-400',
      500: '--color-primary-500',
      600: '--color-primary-600',
      700: '--color-primary-700',
      800: '--color-primary-800',
      900: '--color-primary-900',
      950: '--color-primary-950',
    },

    // Semantic theme colors (adapt to light/dark)
    BACKGROUND: '--color-background',
    SURFACE: '--color-surface',
    SURFACE_VARIANT: '--color-surface-variant',
    BORDER: '--color-border',

    // Text colors (theme-aware)
    TEXT: {
      PRIMARY: '--color-text-primary',
      SECONDARY: '--color-text-secondary',
      TERTIARY: '--color-text-tertiary',
      DISABLED: '--color-text-disabled',
    },

    // Semantic feedback colors
    SUCCESS: '--color-success',
    WARNING: '--color-warning',
    ERROR: '--color-error',
    INFO: '--color-info',
  },

  SPACING: {
    XS: '--spacing-xs', // Maps to REFERENCE.SPACING[2] = 0.5rem
    SM: '--spacing-sm', // Maps to REFERENCE.SPACING[4] = 1rem
    MD: '--spacing-md', // Maps to REFERENCE.SPACING[6] = 1.5rem
    LG: '--spacing-lg', // Maps to REFERENCE.SPACING[8] = 2rem
    XL: '--spacing-xl', // Maps to REFERENCE.SPACING[12] = 3rem
  },
} as const;

/**
 * Helper function to resolve system token to reference value
 * This is a placeholder - actual implementation in T023 (utils.ts)
 */
export function getSystemTokenValue(token: string): string {
  // Will be implemented in T023
  return `var(${token})`;
}
```

**Semantic Token Naming Principles**:

1. **BACKGROUND**: Page/app background color
2. **SURFACE**: Card/panel background color
3. **SURFACE_VARIANT**: Alternative surface (e.g., sidebar)
4. **BORDER**: Default border color
5. **TEXT.PRIMARY**: Main text color (high contrast)
6. **TEXT.SECONDARY**: Secondary text (medium contrast)
7. **TEXT.TERTIARY**: Tertiary text (low contrast, metadata)
8. **TEXT.DISABLED**: Disabled/inactive text
9. **SUCCESS/WARNING/ERROR/INFO**: Semantic feedback colors

**Layer Relationship**:

```
Layer 1 (Reference)         Layer 2 (System)           Layer 3 (Component)
-------------------         -----------------          -------------------
REFERENCE.SPACING[4]    →   SYSTEM.SPACING.SM     →   ButtonPadding
REFERENCE.COLORS.PRIMARY →  SYSTEM.COLORS.PRIMARY →   ButtonBackground
```

**Why Semantic Tokens?**:

- **Theme adaptation**: Change theme by swapping CSS variable values
- **Intent-based naming**: Code expresses purpose, not implementation
- **Consistency**: Same semantic token used across components
- **Maintainability**: Change one mapping, update everywhere

**Usage Example**:

```typescript
// ❌ DON'T: Direct reference to primitive
const padding = REFERENCE.SPACING[4]; // '1rem'

// ✅ DO: Use semantic system token
const padding = SYSTEM.SPACING.SM; // '--spacing-sm'

// In CSS (after T020 defines CSS variables):
// --spacing-sm: 1rem; (maps to REFERENCE.SPACING[4])
```

## Testing Requirements

- [ ] Verify all system tokens are defined
- [ ] Check that system tokens reference CSS variable names
- [ ] Test TypeScript autocomplete for system tokens
- [ ] Verify semantic naming is clear and consistent
- [ ] Ensure system tokens integrate with reference tokens
- [ ] Validate token structure follows Layer 2 conventions

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T019-system-tokens`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
