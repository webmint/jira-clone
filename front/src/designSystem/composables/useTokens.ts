/**
 * useTokens Composable
 *
 * Vue composable for type-safe access to design tokens in components.
 * Provides reactive access to token values with TypeScript support.
 */

import { computed } from 'vue';
import * as REF from '../tokens/reference.tokens';
import { getToken, resolveToken } from '../tokens/utils';

/**
 * Type-safe token access composable
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTokens } from '@/designSystem/composables/useTokens';
 *
 * const { token, tokens } = useTokens();
 *
 * const fontSize = token('FONT_SIZE', 'BASE'); // Type-safe
 * const spacing = token('SPACING', '4');
 * </script>
 *
 * <template>
 *   <div :style="{ fontSize, padding: spacing }">
 *     Content
 *   </div>
 * </template>
 * ```
 */
export function useTokens() {
  /**
   * Get a specific token value (type-safe)
   */
  function token<T extends keyof typeof REF, K extends keyof (typeof REF)[T]>(
    category: T,
    key: K
  ): (typeof REF)[T][K] {
    return getToken(category, key);
  }

  /**
   * Resolve a token from a path string
   */
  function tokenPath(path: string): string | number {
    return resolveToken(path);
  }

  /**
   * All available tokens (reactive reference)
   */
  const tokens = computed(() => REF);

  /**
   * Typography tokens (reactive)
   */
  const typography = computed(() => ({
    fontFamily: REF.FONT_FAMILY,
    fontSize: REF.FONT_SIZE,
    fontWeight: REF.FONT_WEIGHT,
    lineHeight: REF.LINE_HEIGHT,
    letterSpacing: REF.LETTER_SPACING,
  }));

  /**
   * Spacing tokens (reactive)
   */
  const spacing = computed(() => REF.SPACING);

  /**
   * Shadow tokens (reactive)
   */
  const shadow = computed(() => REF.SHADOW);

  /**
   * Border radius tokens (reactive)
   */
  const borderRadius = computed(() => REF.BORDER_RADIUS);

  /**
   * Z-index tokens (reactive)
   */
  const zIndex = computed(() => REF.Z_INDEX);

  /**
   * Opacity tokens (reactive)
   */
  const opacity = computed(() => REF.OPACITY);

  /**
   * Transition tokens (reactive)
   */
  const transition = computed(() => ({
    duration: REF.TRANSITION_DURATION,
    timing: REF.TRANSITION_TIMING,
  }));

  return {
    /** Get a specific token value (type-safe) */
    token,
    /** Resolve a token from a path string */
    tokenPath,
    /** All available tokens */
    tokens,
    /** Typography tokens */
    typography,
    /** Spacing tokens */
    spacing,
    /** Shadow tokens */
    shadow,
    /** Border radius tokens */
    borderRadius,
    /** Z-index tokens */
    zIndex,
    /** Opacity tokens */
    opacity,
    /** Transition tokens */
    transition,
  };
}
