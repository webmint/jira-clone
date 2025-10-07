# Research: Palette Switcher

**Feature**: Palette Switcher | **Date**: 2025-10-07

## Overview

This document consolidates research findings for implementing a 2-dimensional palette switching system in the design system: 5 color palettes (Corporate Trust/blue, Creative Energy/purple, Natural Harmony/green, Warm Welcome/orange, Minimalist/gray) each with light and dark modes, totaling 10 variations. All technical context items were clarified during specification phase, so this research focuses on best practices and implementation patterns for multi-palette systems.

## Research Areas

### 1. Palette Switching Mechanisms in Modern Design Systems

**Decision**: 2-Dimensional CSS Class System (Palette + Mode)
**Rationale**:

- **Chosen**: Dual CSS class approach - palette class + mode class on `<html>` element
  - **Palette dimension**: `.corporate-trust`, `.creative-energy`, `.natural-harmony`, `.warm-welcome`, `.minimalist`
  - **Mode dimension**: `.light`, `.dark`
  - **Usage**: `<html class="creative-energy dark">` applies purple palette in dark mode
  - Allows independent control of color scheme and brightness
  - Performant (no JavaScript required for style application)
  - Works seamlessly with CSS custom properties (CSS variables)
  - Easy to integrate with Storybook (dropdown for palette + toggle for mode)
  - Allows scoped theme switching (apply classes to any container)
  - No hydration issues in SSR/SSG scenarios

**Alternatives Considered**:

- **Single combined class** (`.creative-energy-dark`): 10 classes instead of 7, harder to toggle mode independently
- **Data attributes** (`[data-palette="creative-energy"][data-mode="dark"]`): More verbose selectors, less performant
- **CSS media queries** (`prefers-color-scheme`): Only detects system preference, can't override user choice
- **JavaScript CSS variable manipulation**: Poor performance, loses cascade benefits, harder to debug
- **Separate CSS files per palette**: Requires loading/unloading 10 stylesheets, causes FOUC

**Implementation Pattern**:

```css
/* Corporate Trust (blue) */
.corporate-trust.light {
  --color-primary-500: #3b82f6; /* blue */
  --color-text-primary: #0f172a; /* dark text */
  --color-background-default: #ffffff; /* white bg */
}

.corporate-trust.dark {
  --color-primary-500: #60a5fa; /* lighter blue for contrast */
  --color-text-primary: #ffffff; /* light text */
  --color-background-default: #0f172a; /* dark bg */
}

/* Creative Energy (purple) */
.creative-energy.light {
  --color-primary-500: #9333ea; /* purple */
  --color-text-primary: #1f2937; /* dark text */
  --color-background-default: #ffffff; /* white bg */
}

.creative-energy.dark {
  --color-primary-500: #c084fc; /* lighter purple */
  --color-text-primary: #f9fafb; /* light text */
  --color-background-default: #111827; /* dark bg */
}

/* Repeat for Natural Harmony (green), Warm Welcome (orange), Minimalist (gray) */
```

**References**:

- Tailwind CSS dark mode: https://tailwindcss.com/docs/dark-mode
- Material Design theming (multiple palettes): https://m3.material.io/styles/color/the-color-system/color-roles
- Radix Themes architecture: https://www.radix-ui.com/themes/docs/theme/overview
- Shopify Polaris multi-theme system: https://polaris.shopify.com/tokens/color

---

### 2. Semantic Token Architecture for Multi-Palette Systems

**Decision**: Independent Palettes with Semantic Token Layer
**Rationale**:

- **Semantic tokens** (e.g., `--color-text-primary`) abstract palette-specific values
- Each palette defines complete token set (no inheritance/composition needed)
- Components reference semantic tokens, never raw color values
- Token naming convention: `--{category}-{element}-{variant}` (e.g., `--color-background-subtle`)

**Architecture Layers**:

1. **Reference tokens** (reference.tokens.ts): Primitive values (colors, sizes, etc.)
2. **System tokens** (system.tokens.ts): Semantic mappings (e.g., PRIMARY, TEXT, BACKGROUND)
3. **CSS Custom Properties** (tokens.css): Runtime values for both palettes
4. **Components**: Reference semantic tokens via CSS custom properties

**Token Completeness Requirements**:

- Both palettes MUST define identical token names
- Missing tokens in one palette = build/validation failure
- Automated tests verify token parity between palettes

**References**:

- Design Tokens W3C Community Group: https://design-tokens.github.io/community-group/format/
- Theo (Salesforce Design Tokens): https://github.com/salesforce-ux/theo
- Style Dictionary: https://amzn.github.io/style-dictionary/

---

### 3. Storybook Theme Switching Integration

**Decision**: Dual Global Toolbar Controls (Palette Dropdown + Mode Toggle)
**Rationale**:

- Storybook 8.x provides `globalTypes` and `decorators` API for multi-dimensional theme switching
- Add two toolbar controls: palette dropdown (5 options) + mode toggle (light/dark)
- Decorator applies both palette and mode classes to story preview container
- All stories automatically inherit all 10 variations (no per-story configuration)
- Allows independent testing of palette changes and mode changes

**Implementation Approach** (`.storybook/preview.ts`):

```typescript
export const globalTypes = {
  palette: {
    name: 'Palette',
    description: 'Color palette',
    defaultValue: 'corporate-trust',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'corporate-trust', title: 'Corporate Trust (Blue)' },
        { value: 'creative-energy', title: 'Creative Energy (Purple)' },
        { value: 'natural-harmony', title: 'Natural Harmony (Green)' },
        { value: 'warm-welcome', title: 'Warm Welcome (Orange)' },
        { value: 'minimalist', title: 'Minimalist (Gray)' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  mode: {
    name: 'Mode',
    description: 'Light or dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const withTheme = (Story, context) => {
  const palette = context.globals.palette || 'corporate-trust';
  const mode = context.globals.mode || 'light';

  return {
    template: `<div class="${palette} ${mode}"><story /></div>`,
    components: { Story },
  };
};

export const decorators = [withTheme];
```

**Testing in Storybook**:

- Each component story can be viewed in all 10 variations (5 palettes × 2 modes)
- Visual regression testing can capture all 10 variations
- Accessibility tests run against all 10 variations (WCAG AA compliance check)

**References**:

- Storybook Theming Guide: https://storybook.js.org/docs/configure/theming
- Storybook Global Types: https://storybook.js.org/docs/essentials/toolbars-and-globals
- Vue 3 + Storybook 8 Setup: https://storybook.js.org/docs/get-started/frameworks/vue3-vite

---

### 4. Accessibility Validation for Multiple Palettes

**Decision**: Automated Contrast Testing with axe-core + Manual WCAG Verification
**Rationale**:

- WCAG AA requires minimum contrast ratios:
  - Normal text (< 24px): 4.5:1
  - Large text (≥ 24px or ≥ 19px bold): 3:1
  - UI components and graphics: 3:1
- Automated tests catch most violations but manual review needed for edge cases

**Validation Approach**:

1. **Build-time validation**: Test that runs on `npm run build` to verify all token pairs
2. **Runtime validation**: Vitest tests checking contrast ratios for each palette
3. **Storybook integration**: axe-core addon runs accessibility checks in both palettes
4. **CI/CD gate**: Accessibility tests must pass for both palettes before merge

**Test Implementation Pattern**:

```typescript
// tests/unit/designSystem/tokens/contrast.spec.ts
describe('WCAG Contrast Compliance', () => {
  const palettes = [
    'corporate-trust',
    'creative-energy',
    'natural-harmony',
    'warm-welcome',
    'minimalist',
  ];

  const modes = ['light', 'dark'];

  palettes.forEach((palette) => {
    modes.forEach((mode) => {
      describe(`${palette}.${mode}`, () => {
        it('text-primary on background-default meets AA (4.5:1)', () => {
          const textColor = getCSSVariable('--color-text-primary', palette, mode);
          const bgColor = getCSSVariable('--color-background-default', palette, mode);
          const ratio = getContrastRatio(textColor, bgColor);
          expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it('text-secondary on background-default meets AA (4.5:1)', () => {
          const textColor = getCSSVariable('--color-text-secondary', palette, mode);
          const bgColor = getCSSVariable('--color-background-default', palette, mode);
          const ratio = getContrastRatio(textColor, bgColor);
          expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it('primary color on background meets AA for large text (3:1)', () => {
          const primaryColor = getCSSVariable('--color-primary-500', palette, mode);
          const bgColor = getCSSVariable('--color-background-default', palette, mode);
          const ratio = getContrastRatio(primaryColor, bgColor);
          expect(ratio).toBeGreaterThanOrEqual(3.0);
        });
      });
    });
  });
});
```

**Tools**:

- **axe-core**: Automated accessibility testing (https://github.com/dequelabs/axe-core)
- **color-contrast-checker**: Contrast ratio calculation (https://www.npmjs.com/package/color-contrast-checker)
- **polished**: Color manipulation utilities (https://polished.js.org/)

**References**:

- WCAG 2.1 Contrast Requirements: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Storybook a11y Addon: https://storybook.js.org/addons/@storybook/addon-a11y

---

### 5. Token Validation and Type Safety

**Decision**: TypeScript Types + Runtime Validation with Vitest
**Rationale**:

- TypeScript types ensure compile-time token usage correctness
- Runtime validation verifies token completeness across palettes
- Prevents missing tokens from reaching production

**Validation Checks**:

1. **Token parity**: Light and dark palettes define identical token names
2. **Token completeness**: All semantic tokens have values in both palettes
3. **Type safety**: TypeScript types prevent invalid token references
4. **Naming conventions**: Token names follow `--{category}-{element}-{variant}` pattern

**Implementation**:

- `tokens/validation.ts`: Exports validation functions
- `tests/unit/designSystem/tokens/validation.spec.ts`: Vitest tests
- CI/CD: Run validation tests on every commit

**References**:

- Design Token Validation: https://www.npmjs.com/package/@tokens-studio/sd-transforms
- Type-safe CSS Custom Properties: https://github.com/csstools/postcss-custom-properties

---

## Summary of Decisions

| Area                         | Decision                                                                                                            | Rationale                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Switching Mechanism**      | 2-dimensional CSS classes (palette + mode)                                                                          | 5 palette classes + 2 mode classes = 10 variations, independent control, performant |
| **Palette Names**            | Corporate Trust (blue), Creative Energy (purple), Natural Harmony (green), Warm Welcome (orange), Minimalist (gray) | Descriptive names aligned with use cases, clear color associations                  |
| **Token Architecture**       | Independent variations with semantic layer                                                                          | Complete token sets for all 10 variations, no dependencies, universal components    |
| **Storybook Integration**    | Dual toolbar controls (palette dropdown + mode toggle)                                                              | Test all 10 variations independently, zero per-story configuration                  |
| **Accessibility Validation** | Automated (axe-core) + Manual verification for all 10 variations                                                    | WCAG AA compliance, CI/CD gate for all palettes and modes                           |
| **Token Validation**         | TypeScript types + Runtime tests across 10 variations                                                               | Compile-time and runtime safety, prevents missing tokens in any variation           |

---

## Open Questions

None. All clarifications resolved during specification phase.

---

## Next Steps (Phase 1)

1. Audit existing `tokens.css` and identify current Corporate Trust light/dark tokens as baseline
2. Create data model documenting all required design tokens for 10 variations (5 palettes × 2 modes)
3. Define color values for 4 new palettes (Creative Energy, Natural Harmony, Warm Welcome, Minimalist) in both light and dark modes
4. Define contracts for token validation functions (verify all 10 variations have complete token sets)
5. Create quickstart guide for manual testing of palette switching across all 10 variations
6. Update agent context file with 2-dimensional palette system patterns

---

_Research complete: 2025-10-07_
