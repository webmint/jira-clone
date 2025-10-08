/**
 * Theme Switching Tests
 *
 * Tests the useTheme composable for light/dark mode switching,
 * system preference detection, and localStorage persistence.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { useTheme } from '@/designSystem/composables/useTheme';

/**
 * Helper to test composables with proper component context
 * Avoids "onMounted called outside component instance" warnings
 */
function withSetup<T>(composable: () => T): T {
  let result: T;
  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    },
  });
  app.mount(document.createElement('div'));
  return result!;
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useTheme Composable', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('Theme State', () => {
    it('should initialize with system theme by default', () => {
      const { theme } = withSetup(() => useTheme());
      expect(theme.value).toBe('system');
    });

    it('should expose theme ref', () => {
      const { theme } = withSetup(() => useTheme());
      expect(theme.value).toBeDefined();
    });

    it('should expose resolvedTheme computed', () => {
      const { resolvedTheme } = withSetup(() => useTheme());
      expect(resolvedTheme.value).toMatch(/^(light|dark)$/);
    });
  });

  describe('Theme Switching', () => {
    it('should set theme to light', () => {
      const { theme, setTheme } = withSetup(() => useTheme());
      setTheme('light');
      expect(theme.value).toBe('light');
    });

    it('should set theme to dark', () => {
      const { theme, setTheme } = withSetup(() => useTheme());
      setTheme('dark');
      expect(theme.value).toBe('dark');
    });

    it('should set theme to system', () => {
      const { theme, setTheme } = withSetup(() => useTheme());
      setTheme('system');
      expect(theme.value).toBe('system');
    });

    it('should toggle between light and dark', () => {
      const { theme, setTheme, toggleTheme } = withSetup(() => useTheme());
      setTheme('light');
      toggleTheme();
      expect(theme.value).toBe('dark');
      toggleTheme();
      expect(theme.value).toBe('light');
    });
  });

  describe('Resolved Theme', () => {
    it('should resolve light theme correctly', () => {
      const { setTheme, resolvedTheme } = withSetup(() => useTheme());
      setTheme('light');
      expect(resolvedTheme.value).toBe('light');
    });

    it('should resolve dark theme correctly', () => {
      const { setTheme, resolvedTheme } = withSetup(() => useTheme());
      setTheme('dark');
      expect(resolvedTheme.value).toBe('dark');
    });

    it('should resolve system theme to light or dark', () => {
      const { setTheme, resolvedTheme } = withSetup(() => useTheme());
      setTheme('system');
      expect(['light', 'dark']).toContain(resolvedTheme.value);
    });
  });

  describe('Theme Helpers', () => {
    it('should identify dark theme', () => {
      const { setTheme, isDark } = withSetup(() => useTheme());
      setTheme('dark');
      expect(isDark.value).toBe(true);
    });

    it('should identify light theme', () => {
      const { setTheme, isLight } = withSetup(() => useTheme());
      setTheme('light');
      expect(isLight.value).toBe(true);
    });

    it('should identify system theme', () => {
      const { setTheme, isSystem } = withSetup(() => useTheme());
      setTheme('system');
      expect(isSystem.value).toBe(true);
    });

    it('should not be system when explicitly set to light', () => {
      const { setTheme, isSystem } = withSetup(() => useTheme());
      setTheme('light');
      expect(isSystem.value).toBe(false);
    });
  });

  describe('Return Values', () => {
    it('should return all expected properties', () => {
      const result = withSetup(() => useTheme());

      expect(result).toHaveProperty('theme');
      expect(result).toHaveProperty('resolvedTheme');
      expect(result).toHaveProperty('isDark');
      expect(result).toHaveProperty('isLight');
      expect(result).toHaveProperty('isSystem');
      expect(result).toHaveProperty('setTheme');
      expect(result).toHaveProperty('toggleTheme');
    });

    it('should have correct property types', () => {
      const { theme, resolvedTheme, isDark, setTheme, toggleTheme } = withSetup(() => useTheme());

      expect(typeof theme.value).toBe('string');
      expect(typeof resolvedTheme.value).toBe('string');
      expect(typeof isDark.value).toBe('boolean');
      expect(typeof setTheme).toBe('function');
      expect(typeof toggleTheme).toBe('function');
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should persist theme to localStorage', () => {
      const { setTheme } = withSetup(() => useTheme());
      setTheme('dark');
      expect(localStorageMock.getItem('design-system-theme')).toBeTruthy();
    });

    it('should load theme from localStorage', () => {
      localStorageMock.setItem('design-system-theme', '"dark"');
      const { theme } = withSetup(() => useTheme());
      // useStorage wraps values in quotes
      expect(theme.value).toMatch(/dark/);
    });
  });
});
