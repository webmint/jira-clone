# Task T020: Create tokens.css with @theme Directive and CSS Variables

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T012, T013, T014, T015, T016, T019

## Description

Create the main tokens.css file using Tailwind CSS 4.0's @theme directive to define CSS variables for all design tokens. This file serves as the bridge between TypeScript token definitions and runtime CSS.

## Files to Create/Modify

- `src/assets/styles/tokens.css` - Main token definitions with @theme directive
- `src/assets/styles/tailwind.css` - Import tokens.css
- `tailwind.config.ts` - Verify @theme integration

## Dependencies

**Blocks**: T021, T022 (theme variants build on base tokens), T026-T029 (Storybook stories need CSS)
**Blocked By**: T012-T016 (all palettes must exist), T019 (system tokens must be defined)

## Acceptance Criteria

- [ ] tokens.css file created with @theme directive
- [ ] All reference tokens defined as CSS variables
- [ ] Typography tokens (font-family, font-size, font-weight, line-height)
- [ ] Spacing tokens (rem-based scale)
- [ ] Shadow tokens (5 elevation levels)
- [ ] Border radius tokens (NONE to FULL)
- [ ] Z-index tokens (layering scale)
- [ ] Opacity tokens (0-100)
- [ ] Transition tokens (duration and timing)
- [ ] Color tokens from Corporate Trust palette (default)
- [ ] Tailwind utilities generated from @theme variables
- [ ] CSS variables accessible via var(--token-name)
- [ ] ESLint: 0 errors
- [ ] Build succeeds with tokens
- [ ] Storybook renders with tokens

## Implementation Notes

**File Structure** (`src/assets/styles/tokens.css`):

```css
/**
 * Design Tokens - Layer 1 & 2 (Reference + System)
 *
 * This file defines all design tokens using Tailwind CSS 4.0's @theme directive.
 * The @theme directive:
 * - Generates CSS variables (--token-name)
 * - Generates Tailwind utility classes (bg-primary-500, text-base, etc.)
 * - Provides the foundation for light/dark themes
 */

@import 'tailwindcss';

@theme {
  /* ========================================
     TYPOGRAPHY
     ======================================== */

  /* Font families */
  --font-display: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-body: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'Roboto Mono', 'JetBrains Mono', ui-monospace, monospace;

  /* Font sizes (rem-based) */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */

  /* Font weights */
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-bold: 700;
  --font-black: 900;

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* ========================================
     SPACING (Base-8 Scale)
     ======================================== */

  --spacing-0: 0px;
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-16: 4rem; /* 64px */
  --spacing-20: 5rem; /* 80px */
  --spacing-24: 6rem; /* 96px */

  /* Semantic spacing (Layer 2) */
  --spacing-xs: var(--spacing-2); /* 8px */
  --spacing-sm: var(--spacing-4); /* 16px */
  --spacing-md: var(--spacing-6); /* 24px */
  --spacing-lg: var(--spacing-8); /* 32px */
  --spacing-xl: var(--spacing-12); /* 48px */

  /* ========================================
     SHADOWS (5 Elevation Levels)
     ======================================== */

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* ========================================
     BORDER RADIUS
     ======================================== */

  --radius-none: 0px;
  --radius-sm: 0.125rem; /* 2px */
  --radius-base: 0.25rem; /* 4px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-full: 9999px;

  /* ========================================
     Z-INDEX (Layering Scale)
     ======================================== */

  --z-hide: -1;
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;

  /* ========================================
     OPACITY
     ======================================== */

  --opacity-0: 0;
  --opacity-5: 0.05;
  --opacity-10: 0.1;
  --opacity-20: 0.2;
  --opacity-40: 0.4;
  --opacity-60: 0.6;
  --opacity-80: 0.8;
  --opacity-100: 1;

  /* ========================================
     TRANSITIONS
     ======================================== */

  /* Duration */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;

  /* Timing functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);

  /* ========================================
     COLORS - Corporate Trust Palette (Default)
     OKLCH Format for perceptual uniformity
     ======================================== */

  /* Primary (Blue-Gray) */
  --color-primary-50: oklch(0.98 0.01 240);
  --color-primary-100: oklch(0.95 0.02 240);
  --color-primary-200: oklch(0.88 0.04 240);
  --color-primary-300: oklch(0.78 0.06 240);
  --color-primary-400: oklch(0.65 0.07 240);
  --color-primary-500: oklch(0.55 0.08 240);
  --color-primary-600: oklch(0.45 0.07 240);
  --color-primary-700: oklch(0.38 0.06 240);
  --color-primary-800: oklch(0.3 0.05 240);
  --color-primary-900: oklch(0.25 0.04 240);
  --color-primary-950: oklch(0.18 0.03 240);

  /* Gray scale */
  --color-gray-50: oklch(0.99 0 0);
  --color-gray-100: oklch(0.97 0 0);
  --color-gray-200: oklch(0.92 0 0);
  --color-gray-300: oklch(0.85 0 0);
  --color-gray-400: oklch(0.65 0 0);
  --color-gray-500: oklch(0.5 0 0);
  --color-gray-600: oklch(0.4 0 0);
  --color-gray-700: oklch(0.3 0 0);
  --color-gray-800: oklch(0.22 0 0);
  --color-gray-900: oklch(0.15 0 0);
  --color-gray-950: oklch(0.1 0 0);

  /* Semantic colors (Layer 2 - Theme-aware) */
  --color-background: var(--color-gray-50);
  --color-surface: oklch(1 0 0); /* Pure white */
  --color-surface-variant: var(--color-gray-100);
  --color-border: var(--color-gray-300);

  /* Text colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-700);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-disabled: var(--color-gray-400);

  /* Semantic feedback (will be defined from palette) */
  --color-success: oklch(0.55 0.15 150); /* Green */
  --color-warning: oklch(0.7 0.15 70); /* Amber */
  --color-error: oklch(0.55 0.22 25); /* Red */
  --color-info: oklch(0.5 0.18 240); /* Blue */
}

/* ========================================
   ACCESSIBILITY - Reduced Motion
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Update tailwind.css** (`src/assets/styles/tailwind.css`):

```css
@import './tokens.css';
```

**Usage in Components**:

```vue
<template>
  <!-- Using Tailwind utilities (generated from @theme) -->
  <button class="bg-primary-500 text-white rounded-base shadow-base">Click me</button>

  <!-- Using arbitrary values with CSS variables -->
  <div class="p-[--spacing-md] bg-[--color-surface]">Content</div>
</template>
```

## Testing Requirements

- [ ] Verify tokens.css is imported in main application
- [ ] Test that CSS variables are defined in browser DevTools
- [ ] Check that Tailwind utilities are generated (bg-primary-500, etc.)
- [ ] Verify typography tokens work in components
- [ ] Test spacing tokens with arbitrary values
- [ ] Ensure shadows render correctly
- [ ] Check reduced motion media query is applied
- [ ] Run build and verify no CSS errors

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T020-tokens-css`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
