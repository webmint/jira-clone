/**
 * useTheme Composable
 *
 * Vue composable for theme switching (light/dark/system) with localStorage persistence.
 * Automatically syncs with system theme preferences and persists user choice.
 */

import { ref, computed, watch, onMounted } from 'vue';
import { useStorage, usePreferredDark } from '@vueuse/core';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'design-system-theme';

/**
 * Theme management composable
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTheme } from '@/designSystem/composables/useTheme';
 *
 * const { theme, setTheme, resolvedTheme } = useTheme();
 * </script>
 *
 * <template>
 *   <button @click="setTheme('dark')">Dark</button>
 *   <button @click="setTheme('light')">Light</button>
 *   <button @click="setTheme('system')">System</button>
 *   <p>Current: {{ resolvedTheme }}</p>
 * </template>
 * ```
 */
export function useTheme() {
  // Store theme preference in localStorage
  const theme = useStorage<Theme>(STORAGE_KEY, 'system');

  // Detect system dark mode preference
  const prefersDark = usePreferredDark();

  // Track if mounted (for SSR safety)
  const isMounted = ref(false);

  /**
   * Resolved theme (light or dark)
   * When theme is 'system', resolves based on system preference
   */
  const resolvedTheme = computed<ResolvedTheme>(() => {
    if (theme.value === 'system') {
      return prefersDark.value ? 'dark' : 'light';
    }
    return theme.value;
  });

  /**
   * Check if dark theme is active
   */
  const isDark = computed(() => resolvedTheme.value === 'dark');

  /**
   * Check if light theme is active
   */
  const isLight = computed(() => resolvedTheme.value === 'light');

  /**
   * Check if using system theme
   */
  const isSystem = computed(() => theme.value === 'system');

  /**
   * Set theme preference
   */
  function setTheme(newTheme: Theme) {
    theme.value = newTheme;
  }

  /**
   * Toggle between light and dark
   * If currently using system, switches to opposite of current resolved theme
   */
  function toggleTheme() {
    if (theme.value === 'system') {
      // Switch to opposite of current system preference
      setTheme(prefersDark.value ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(theme.value === 'light' ? 'dark' : 'light');
    }
  }

  /**
   * Apply theme to document
   */
  function applyTheme(themeToApply: ResolvedTheme) {
    if (!isMounted.value) return;

    const html = document.documentElement;

    // Remove both classes first
    html.classList.remove('light', 'dark');

    // Add the resolved theme class
    html.classList.add(themeToApply);

    // Update data attribute for CSS selectors
    html.setAttribute('data-theme', themeToApply);

    // Update color-scheme for browser UI
    html.style.colorScheme = themeToApply;
  }

  /**
   * Initialize theme on mount
   */
  function initTheme() {
    isMounted.value = true;
    applyTheme(resolvedTheme.value);
  }

  // Watch for theme changes and apply
  watch(resolvedTheme, (newTheme) => {
    applyTheme(newTheme);
  });

  // Initialize on mount
  onMounted(() => {
    initTheme();
  });

  return {
    /** Current theme preference (light, dark, or system) */
    theme,
    /** Resolved theme (light or dark) */
    resolvedTheme,
    /** Whether dark theme is active */
    isDark,
    /** Whether light theme is active */
    isLight,
    /** Whether using system theme preference */
    isSystem,
    /** Set theme preference */
    setTheme,
    /** Toggle between light and dark */
    toggleTheme,
  };
}
