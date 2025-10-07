/**
 * Theme Switching Tests
 *
 * Tests the useTheme composable for light/dark mode switching,
 * system preference detection, and localStorage persistence.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from '@/designSystem/composables/useTheme';

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
      const { theme } = useTheme();
      expect(theme.value).toBe('system');
    });

    it('should expose theme ref', () => {
      const { theme } = useTheme();
      expect(theme.value).toBeDefined();
    });

    it('should expose resolvedTheme computed', () => {
      const { resolvedTheme } = useTheme();
      expect(resolvedTheme.value).toMatch(/^(light|dark)$/);
    });
  });

  describe('Theme Switching', () => {
    it('should set theme to light', () => {
      const { theme, setTheme } = useTheme();
      setTheme('light');
      expect(theme.value).toBe('light');
    });

    it('should set theme to dark', () => {
      const { theme, setTheme } = useTheme();
      setTheme('dark');
      expect(theme.value).toBe('dark');
    });

    it('should set theme to system', () => {
      const { theme, setTheme } = useTheme();
      setTheme('system');
      expect(theme.value).toBe('system');
    });

    it('should toggle between light and dark', () => {
      const { theme, setTheme, toggleTheme } = useTheme();
      setTheme('light');
      toggleTheme();
      expect(theme.value).toBe('dark');
      toggleTheme();
      expect(theme.value).toBe('light');
    });
  });

  describe('Resolved Theme', () => {
    it('should resolve light theme correctly', () => {
      const { setTheme, resolvedTheme } = useTheme();
      setTheme('light');
      expect(resolvedTheme.value).toBe('light');
    });

    it('should resolve dark theme correctly', () => {
      const { setTheme, resolvedTheme } = useTheme();
      setTheme('dark');
      expect(resolvedTheme.value).toBe('dark');
    });

    it('should resolve system theme to light or dark', () => {
      const { setTheme, resolvedTheme } = useTheme();
      setTheme('system');
      expect(['light', 'dark']).toContain(resolvedTheme.value);
    });
  });

  describe('Theme Helpers', () => {
    it('should identify dark theme', () => {
      const { setTheme, isDark } = useTheme();
      setTheme('dark');
      expect(isDark.value).toBe(true);
    });

    it('should identify light theme', () => {
      const { setTheme, isLight } = useTheme();
      setTheme('light');
      expect(isLight.value).toBe(true);
    });

    it('should identify system theme', () => {
      const { setTheme, isSystem } = useTheme();
      setTheme('system');
      expect(isSystem.value).toBe(true);
    });

    it('should not be system when explicitly set to light', () => {
      const { setTheme, isSystem } = useTheme();
      setTheme('light');
      expect(isSystem.value).toBe(false);
    });
  });

  describe('Return Values', () => {
    it('should return all expected properties', () => {
      const result = useTheme();

      expect(result).toHaveProperty('theme');
      expect(result).toHaveProperty('resolvedTheme');
      expect(result).toHaveProperty('isDark');
      expect(result).toHaveProperty('isLight');
      expect(result).toHaveProperty('isSystem');
      expect(result).toHaveProperty('setTheme');
      expect(result).toHaveProperty('toggleTheme');
    });

    it('should have correct property types', () => {
      const { theme, resolvedTheme, isDark, setTheme, toggleTheme } = useTheme();

      expect(typeof theme.value).toBe('string');
      expect(typeof resolvedTheme.value).toBe('string');
      expect(typeof isDark.value).toBe('boolean');
      expect(typeof setTheme).toBe('function');
      expect(typeof toggleTheme).toBe('function');
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should persist theme to localStorage', () => {
      const { setTheme } = useTheme();
      setTheme('dark');
      expect(localStorageMock.getItem('design-system-theme')).toBeTruthy();
    });

    it('should load theme from localStorage', () => {
      localStorageMock.setItem('design-system-theme', '"dark"');
      const { theme } = useTheme();
      // useStorage wraps values in quotes
      expect(theme.value).toMatch(/dark/);
    });
  });
});
