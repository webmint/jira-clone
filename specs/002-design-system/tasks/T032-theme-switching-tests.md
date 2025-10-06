# Task T032: Write Theme Switching Integration Tests

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T031

## Description

Write comprehensive integration tests for theme switching functionality including light/dark mode toggling, system preference detection, localStorage persistence, and CSS variable updates.

## Files to Create/Modify

- `tests/unit/composables/useTheme.spec.ts` - Theme composable unit tests
- `tests/integration/theme-switching.spec.ts` - Theme switching integration tests

## Dependencies

**Blocks**: None (final testing task)
**Blocked By**: T031 (WCAG tests should pass first)

## Acceptance Criteria

- [ ] Tests verify theme state management (light, dark, system)
- [ ] Tests validate localStorage persistence
- [ ] Tests check system preference detection (prefers-color-scheme)
- [ ] Tests verify .dark class application to `<html>`
- [ ] Tests validate CSS variable updates on theme change
- [ ] Tests check theme toggle functionality
- [ ] Tests verify SSR safety (no window errors)
- [ ] Test coverage: 100% for useTheme composable
- [ ] All tests pass
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Unit Tests** (`tests/unit/composables/useTheme.spec.ts`):

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useTheme } from '@/composables/useTheme';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    mockMatchMedia(false); // Light mode by default
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('initializes with system theme by default', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { theme } = useTheme();
          return { theme };
        },
        template: '<div></div>',
      })
    );

    expect(wrapper.vm.theme).toBe('system');
  });

  it('loads theme from localStorage on mount', () => {
    localStorage.setItem('theme-preference', 'dark');

    const wrapper = mount(
      defineComponent({
        setup() {
          const { theme } = useTheme();
          return { theme };
        },
        template: '<div></div>',
      })
    );

    expect(wrapper.vm.theme).toBe('dark');
  });

  it('applies dark class to html when theme is dark', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { setTheme } = useTheme();
          return { setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes dark class when theme is light', async () => {
    document.documentElement.classList.add('dark');

    const wrapper = mount(
      defineComponent({
        setup() {
          const { setTheme } = useTheme();
          return { setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('persists theme preference to localStorage', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { setTheme } = useTheme();
          return { setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();

    expect(localStorage.getItem('theme-preference')).toBe('dark');
  });

  it('toggles between light and dark themes', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { theme, setTheme, toggleTheme } = useTheme();
          return { theme, setTheme, toggleTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.theme).toBe('light');

    wrapper.vm.toggleTheme();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.theme).toBe('dark');

    wrapper.vm.toggleTheme();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.theme).toBe('light');
  });

  it('resolves system theme based on matchMedia', async () => {
    mockMatchMedia(true); // Dark system preference

    const wrapper = mount(
      defineComponent({
        setup() {
          const { resolvedTheme, setTheme } = useTheme();
          return { resolvedTheme, setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('system');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.resolvedTheme).toBe('dark');
  });

  it('computes isDark correctly', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { isDark, setTheme } = useTheme();
          return { isDark, setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isDark).toBe(true);

    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isDark).toBe(false);
  });

  it('computes isLight correctly', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { isLight, setTheme } = useTheme();
          return { isLight, setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isLight).toBe(true);

    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isLight).toBe(false);
  });

  it('computes isSystem correctly', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { isSystem, setTheme } = useTheme();
          return { isSystem, setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('system');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isSystem).toBe(true);

    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isSystem).toBe(false);
  });

  it('resets to system theme', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { theme, setTheme, resetTheme } = useTheme();
          return { theme, setTheme, resetTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.theme).toBe('dark');

    wrapper.vm.resetTheme();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.theme).toBe('system');
  });
});
```

**Integration Tests** (`tests/integration/theme-switching.spec.ts`):

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useTheme } from '@/composables/useTheme';

describe('Theme Switching Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('updates CSS variables when switching themes', async () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          const { setTheme } = useTheme();
          return { setTheme };
        },
        template: '<div></div>',
      })
    );

    // Set light theme
    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();

    // Check light theme variables
    const lightBg = getComputedStyle(document.documentElement).getPropertyValue(
      '--color-background'
    );
    expect(lightBg).toBeTruthy();

    // Set dark theme
    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();

    // Dark class should be applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('maintains theme across page reloads', async () => {
    // First mount - set theme
    const wrapper1 = mount(
      defineComponent({
        setup() {
          const { setTheme } = useTheme();
          return { setTheme };
        },
        template: '<div></div>',
      })
    );

    wrapper1.vm.setTheme('dark');
    await wrapper1.vm.$nextTick();

    // Unmount
    wrapper1.unmount();

    // Second mount - should load dark theme from localStorage
    const wrapper2 = mount(
      defineComponent({
        setup() {
          const { theme } = useTheme();
          return { theme };
        },
        template: '<div></div>',
      })
    );

    expect(wrapper2.vm.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('handles theme switching in multiple component instances', async () => {
    const Component = defineComponent({
      setup() {
        const { theme, setTheme } = useTheme();
        return { theme, setTheme };
      },
      template: '<div></div>',
    });

    const wrapper1 = mount(Component);
    const wrapper2 = mount(Component);

    // Change theme in first component
    wrapper1.vm.setTheme('dark');
    await wrapper1.vm.$nextTick();

    // Both should reflect the change
    expect(wrapper1.vm.theme).toBe('dark');
    expect(wrapper2.vm.theme).toBe('dark');
  });

  it('applies correct styles for light and dark themes', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { setTheme } = useTheme();
        return { setTheme };
      },
      template: `
        <div class="bg-[--color-surface] text-[--color-text-primary]">
          Test content
        </div>
      `,
    });

    const wrapper = mount(TestComponent);

    // Light theme
    wrapper.vm.setTheme('light');
    await wrapper.vm.$nextTick();
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Dark theme
    wrapper.vm.setTheme('dark');
    await wrapper.vm.$nextTick();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

## Testing Requirements

- [ ] All unit tests pass for useTheme
- [ ] All integration tests pass
- [ ] Test coverage: 100% for useTheme.ts
- [ ] Tests run successfully in CI/CD
- [ ] No flaky tests
- [ ] Tests execute in < 2 seconds
- [ ] Visual verification of theme switching in Storybook

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T032-theme-switching-tests`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
