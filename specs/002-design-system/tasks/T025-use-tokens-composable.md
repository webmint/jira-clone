# Task T025: Create useTokens Composable for Type-Safe Token Access

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T020, T021, T022, T023

## Description

Create a Vue composable for type-safe design token access in components. This provides a convenient API for using tokens in computed styles and templates with full TypeScript autocomplete.

## Files to Create/Modify

- `src/composables/useTokens.ts` - Token access composable
- `tests/unit/composables/useTokens.spec.ts` - Token composable tests

## Dependencies

**Blocks**: None (optional helper, not blocking other tasks)
**Blocked By**: T020-T023 (CSS tokens and utilities must exist)

## Acceptance Criteria

- [ ] Type-safe token accessors for all categories
- [ ] Reactive token value updates (respond to theme changes)
- [ ] Support for direct token values and CSS variable references
- [ ] Helper methods for common operations (spacing, colors, etc.)
- [ ] Composable works in both <script> and <template>
- [ ] SSR-safe implementation
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Test coverage: 100%

## Implementation Notes

**useTokens Composable** (`src/composables/useTokens.ts`):

```typescript
import { computed } from 'vue';
import type {
  ColorToken,
  SpacingToken,
  ShadowToken,
  BorderRadiusToken,
  ZIndexToken,
  OpacityToken,
  TransitionDurationToken,
  TransitionTimingToken,
} from '@/tokens/types';
import {
  getColorToken,
  getSpacingToken,
  getShadowToken,
  getBorderRadiusToken,
  getZIndexToken,
  getOpacityToken,
  getTransitionDuration,
  getTransitionTiming,
  buildTransition,
} from '@/tokens/utils';

/**
 * Vue composable for type-safe design token access
 *
 * Provides convenient methods for accessing design tokens
 * with full TypeScript autocomplete and type safety.
 *
 * @example
 * const { color, spacing, shadow } = useTokens();
 * const buttonBg = color('PRIMARY.500');
 * const padding = spacing('MD');
 * const elevation = shadow('BASE');
 */
export function useTokens() {
  /**
   * Get a color token value
   * @param token - Color token path (e.g., 'PRIMARY.500')
   * @returns CSS variable reference
   */
  const color = (token: ColorToken): string => {
    return getColorToken(token);
  };

  /**
   * Get a spacing token value
   * @param token - Spacing token key (e.g., 'MD')
   * @returns CSS variable reference
   */
  const spacing = (token: keyof typeof import('@/tokens/system.tokens').SYSTEM.SPACING): string => {
    return getSpacingToken(token);
  };

  /**
   * Get a shadow token value
   * @param token - Shadow token key (e.g., 'BASE')
   * @returns CSS variable reference
   */
  const shadow = (token: ShadowToken): string => {
    return getShadowToken(token);
  };

  /**
   * Get a border radius token value
   * @param token - Border radius token key (e.g., 'BASE')
   * @returns CSS variable reference
   */
  const radius = (token: BorderRadiusToken): string => {
    return getBorderRadiusToken(token);
  };

  /**
   * Get a z-index token value
   * @param token - Z-index token key (e.g., 'MODAL')
   * @returns CSS variable reference
   */
  const zIndex = (token: ZIndexToken): string => {
    return getZIndexToken(token);
  };

  /**
   * Get an opacity token value
   * @param token - Opacity token key (e.g., '40')
   * @returns CSS variable reference
   */
  const opacity = (token: OpacityToken): string => {
    return getOpacityToken(token);
  };

  /**
   * Build a transition string
   * @param property - CSS property to transition
   * @param duration - Transition duration token
   * @param timing - Transition timing function token
   * @returns Complete transition string
   */
  const transition = (
    property: string,
    duration: TransitionDurationToken = 'BASE',
    timing: TransitionTimingToken = 'EASE_OUT'
  ): string => {
    return buildTransition(property, duration, timing);
  };

  /**
   * Get computed style object for common patterns
   */
  const styles = {
    /**
     * Card style preset
     */
    card: computed(() => ({
      backgroundColor: color('SURFACE'),
      borderColor: color('BORDER'),
      borderRadius: radius('MD'),
      boxShadow: shadow('BASE'),
      padding: spacing('MD'),
    })),

    /**
     * Button primary style preset
     */
    buttonPrimary: computed(() => ({
      backgroundColor: color('PRIMARY.500'),
      color: 'white',
      borderRadius: radius('BASE'),
      padding: `${spacing('SM')} ${spacing('MD')}`,
      transition: transition('all', 'FAST', 'EASE_OUT'),
    })),

    /**
     * Text primary style preset
     */
    textPrimary: computed(() => ({
      color: color('TEXT.PRIMARY'),
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-normal)',
    })),
  };

  /**
   * Get a computed style object
   * Useful for binding to :style in templates
   */
  const styleObject = (fn: () => Record<string, string>) => computed(fn);

  return {
    // Token accessors
    color,
    spacing,
    shadow,
    radius,
    zIndex,
    opacity,
    transition,

    // Style presets
    styles,
    styleObject,
  };
}
```

**Usage in Components**:

```vue
<template>
  <div>
    <!-- Using token values directly -->
    <div :style="{ backgroundColor: color('SURFACE'), padding: spacing('MD') }">Card content</div>

    <!-- Using style presets -->
    <div :style="styles.card">Card with preset styles</div>

    <!-- Using custom computed style -->
    <button :style="buttonStyle">Custom button</button>
  </div>
</template>

<script setup lang="ts">
import { useTokens } from '@/composables/useTokens';

const { color, spacing, shadow, radius, transition, styles, styleObject } = useTokens();

// Custom computed style
const buttonStyle = styleObject(() => ({
  backgroundColor: color('PRIMARY.500'),
  color: 'white',
  padding: `${spacing('SM')} ${spacing('LG')}`,
  borderRadius: radius('BASE'),
  boxShadow: shadow('SM'),
  transition: transition('all', 'FAST', 'EASE_OUT'),
}));
</script>
```

**Alternative Usage (CSS-in-JS)**:

```vue
<script setup lang="ts">
import { useTokens } from '@/composables/useTokens';

const { color, spacing } = useTokens();

// Generate CSS class dynamically
const buttonClass = {
  backgroundColor: color('PRIMARY.500'),
  padding: spacing('MD'),
  // ... more styles
};
</script>
```

**Test Coverage** (`tests/unit/composables/useTokens.spec.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import { useTokens } from '@/composables/useTokens';

describe('useTokens', () => {
  it('returns color token values', () => {
    const { color } = useTokens();
    expect(color('PRIMARY.500')).toBe('var(--color-primary-500)');
  });

  it('returns spacing token values', () => {
    const { spacing } = useTokens();
    expect(spacing('MD')).toBe('var(--spacing-md)');
  });

  it('returns shadow token values', () => {
    const { shadow } = useTokens();
    expect(shadow('BASE')).toBe('var(--shadow-base)');
  });

  it('builds transition strings', () => {
    const { transition } = useTokens();
    const result = transition('opacity', 'FAST', 'EASE_OUT');
    expect(result).toBe('opacity var(--duration-fast) var(--ease-out)');
  });

  it('provides card style preset', () => {
    const { styles } = useTokens();
    const cardStyle = styles.card.value;
    expect(cardStyle).toHaveProperty('backgroundColor');
    expect(cardStyle).toHaveProperty('padding');
    expect(cardStyle).toHaveProperty('borderRadius');
  });
});
```

## Testing Requirements

- [ ] Test all token accessor functions
- [ ] Test transition builder
- [ ] Test style presets
- [ ] Test styleObject helper
- [ ] Verify type safety (TypeScript compilation)
- [ ] Test computed reactivity
- [ ] Ensure SSR safety
- [ ] Achieve 100% test coverage

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T025-use-tokens-composable`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
