# Task T024: Create useTheme Composable for Theme Switching

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T020, T021, T022, T023

## Description

Create a Vue composable for managing theme switching (light/dark/system) with localStorage persistence and system preference detection. This provides a user-friendly interface for theme management throughout the application.

## Files to Create/Modify

- `src/composables/useTheme.ts` - Theme management composable
- `tests/unit/composables/useTheme.spec.ts` - Theme composable tests

## Dependencies

**Blocks**: T032 (theme switching integration tests need this composable)
**Blocked By**: T020-T023 (CSS themes and utilities must exist)

## Acceptance Criteria

- [ ] Theme state management (light, dark, system)
- [ ] localStorage persistence for user preference
- [ ] System preference detection (prefers-color-scheme)
- [ ] Automatic theme application on mount
- [ ] Reactive theme value updates
- [ ] Type-safe theme values ('light' | 'dark' | 'system')
- [ ] SSR-safe implementation (check for window)
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Test coverage: 100% for theme logic

## Implementation Notes

**useTheme Composable** (`src/composables/useTheme.ts`):

```typescript
import { ref, watchEffect, computed, onMounted } from 'vue';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme-preference';

/**
 * Vue composable for theme management
 *
 * Supports three modes:
 * - 'light': Force light theme
 * - 'dark': Force dark theme
 * - 'system': Follow system preference (prefers-color-scheme)
 *
 * Theme preference is persisted in localStorage.
 *
 * @example
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 * setTheme('dark'); // Switch to dark theme
 * toggleTheme(); // Toggle between light and dark
 */
export function useTheme() {
  // Current theme preference (user's choice)
  const theme = ref<Theme>('system');

  // Resolved theme (actual theme being displayed)
  const resolvedTheme = ref<ResolvedTheme>('light');

  /**
   * Get system color scheme preference
   */
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  /**
   * Apply theme to DOM
   */
  const applyTheme = (themeValue: Theme) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Resolve theme ('system' → 'light' or 'dark')
    const resolved = themeValue === 'system' ? getSystemTheme() : themeValue;
    resolvedTheme.value = resolved;

    // Apply .dark class to <html>
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Store preference in localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeValue);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  /**
   * Set theme preference
   */
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    applyTheme(newTheme);
  };

  /**
   * Toggle between light and dark themes
   * (System theme toggles to explicit light/dark)
   */
  const toggleTheme = () => {
    if (theme.value === 'system') {
      // If system, toggle to opposite of current resolved theme
      setTheme(resolvedTheme.value === 'light' ? 'dark' : 'light');
    } else {
      // If explicit theme, toggle between light and dark
      setTheme(theme.value === 'light' ? 'dark' : 'light');
    }
  };

  /**
   * Reset to system preference
   */
  const resetTheme = () => {
    setTheme('system');
  };

  /**
   * Initialize theme from localStorage or system preference
   */
  const initializeTheme = () => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        theme.value = stored;
      } else {
        theme.value = 'system';
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
      theme.value = 'system';
    }

    applyTheme(theme.value);
  };

  /**
   * Listen for system theme changes
   */
  const setupSystemThemeListener = () => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme.value === 'system') {
        applyTheme('system');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange);
    }

    // Return cleanup function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  };

  // Initialize theme on mount
  onMounted(() => {
    initializeTheme();
    setupSystemThemeListener();
  });

  // Computed properties
  const isDark = computed(() => resolvedTheme.value === 'dark');
  const isLight = computed(() => resolvedTheme.value === 'light');
  const isSystem = computed(() => theme.value === 'system');

  return {
    theme,
    resolvedTheme,
    isDark,
    isLight,
    isSystem,
    setTheme,
    toggleTheme,
    resetTheme,
  };
}
```

**Usage in Components**:

```vue
<template>
  <div>
    <p>Current theme: {{ theme }}</p>
    <p>Resolved theme: {{ resolvedTheme }}</p>

    <!-- Theme toggle button -->
    <button @click="toggleTheme" class="p-2 bg-primary-500 text-white rounded-base">
      Switch to {{ isDark ? 'Light' : 'Dark' }} Mode
    </button>

    <!-- Theme selector -->
    <select v-model="theme" @change="setTheme(theme)">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { theme, resolvedTheme, isDark, setTheme, toggleTheme } = useTheme();
</script>
```

**Test Coverage** (`tests/unit/composables/useTheme.spec.ts`):

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useTheme } from '@/composables/useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('initializes with system theme by default', () => {
    const { theme } = useTheme();
    expect(theme.value).toBe('system');
  });

  it('applies dark class when theme is dark', () => {
    const { setTheme } = useTheme();
    setTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when theme is light', () => {
    const { setTheme } = useTheme();
    setTheme('dark');
    setTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme preference to localStorage', () => {
    const { setTheme } = useTheme();
    setTheme('dark');
    expect(localStorage.getItem('theme-preference')).toBe('dark');
  });

  it('toggles between light and dark', () => {
    const { theme, setTheme, toggleTheme } = useTheme();
    setTheme('light');
    toggleTheme();
    expect(theme.value).toBe('dark');
    toggleTheme();
    expect(theme.value).toBe('light');
  });
});
```

## Testing Requirements

- [ ] Test theme initialization from localStorage
- [ ] Test theme persistence to localStorage
- [ ] Test .dark class application to <html>
- [ ] Test system preference detection
- [ ] Test theme toggle functionality
- [ ] Test theme reset to system
- [ ] Test computed properties (isDark, isLight, isSystem)
- [ ] Test SSR safety (no window errors)
- [ ] Achieve 100% test coverage

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T024-use-theme-composable`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
