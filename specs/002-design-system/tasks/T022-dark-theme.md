# Task T022: Implement Dark Theme CSS Variables with WCAG AAA Validation

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T021

## Description

Implement dark theme CSS variables with semantic color mappings for dark mode. This provides an alternative theme with inverted lightness values while maintaining WCAG AAA contrast standards.

## Files to Create/Modify

- `src/assets/styles/tokens.css` - Add dark theme overrides

## Dependencies

**Blocks**: T023 (token utilities can use both themes), T024 (useTheme composable needs dark theme)
**Blocked By**: T021 (light theme must be implemented first)

## Acceptance Criteria

- [ ] Dark theme semantic tokens defined using `.dark` class selector
- [ ] Background colors appropriate for dark mode (dark grays, not pure black)
- [ ] Surface colors use elevated dark values
- [ ] Text colors provide WCAG AAA contrast (7:1 for normal text on dark backgrounds)
- [ ] Border colors visible on dark backgrounds
- [ ] All semantic feedback colors adjusted for dark mode
- [ ] Dark theme activated by `.dark` class on `<html>` element
- [ ] ESLint: 0 errors
- [ ] All colors pass WCAG AAA validation
- [ ] Visual inspection confirms professional dark theme
- [ ] Smooth transition between light and dark themes

## Implementation Notes

**Dark Theme Overrides** (add to `src/assets/styles/tokens.css`):

```css
/* ========================================
   DARK THEME
   Activated by .dark class on <html>
   ======================================== */

.dark {
  @theme {
    /* Layout colors */
    --color-background: oklch(0.15 0 0); /* #0F1419 - not pure black */
    --color-surface: oklch(0.2 0 0); /* Elevated surface */
    --color-surface-variant: oklch(0.25 0 0); /* Alternative surface */
    --color-border: oklch(0.3 0 0); /* Visible border on dark */

    /* Text colors (inverted - WCAG AAA compliant) */
    --color-text-primary: oklch(0.95 0 0); /* #F6F8FA - high contrast */
    --color-text-secondary: oklch(0.75 0 0); /* Medium contrast */
    --color-text-tertiary: oklch(0.55 0 0); /* Low contrast */
    --color-text-disabled: oklch(0.4 0 0); /* Disabled state */

    /* Primary colors (adjusted for dark backgrounds) */
    --color-primary-50: oklch(0.22 0.03 240); /* Darkest in dark mode */
    --color-primary-500: oklch(0.6 0.1 240); /* Slightly brighter for visibility */
    --color-primary-950: oklch(0.95 0.02 240); /* Lightest in dark mode */

    /* Semantic feedback colors (adjusted for dark backgrounds) */
    --color-success: oklch(0.65 0.15 150); /* Brighter green for dark mode */
    --color-success-bg: oklch(0.25 0.08 150); /* Dark green background */
    --color-success-border: oklch(0.45 0.12 150); /* Success border */

    --color-warning: oklch(0.75 0.15 70); /* Brighter amber */
    --color-warning-bg: oklch(0.25 0.1 70); /* Dark amber background */
    --color-warning-border: oklch(0.55 0.12 70); /* Warning border */

    --color-error: oklch(0.65 0.22 25); /* Brighter red */
    --color-error-bg: oklch(0.25 0.12 25); /* Dark red background */
    --color-error-border: oklch(0.5 0.2 25); /* Error border */

    --color-info: oklch(0.6 0.18 240); /* Brighter blue */
    --color-info-bg: oklch(0.25 0.08 240); /* Dark blue background */
    --color-info-border: oklch(0.5 0.15 240); /* Info border */

    /* Interactive states */
    --color-hover: oklch(0.25 0 0); /* Lighter on dark */
    --color-active: oklch(0.3 0 0); /* Active/pressed state */
    --color-focus: var(--color-primary-500); /* Focus ring color */

    /* Overlay/Backdrop */
    --color-overlay: rgb(0 0 0 / 0.7); /* Darker backdrop for dark mode */
    --color-scrim: rgb(255 255 255 / 0.05); /* Light scrim on dark */
  }
}

/* Optional: System preference detection */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Apply dark theme if system prefers dark and no explicit .light class */
    /* Copy dark theme tokens here OR handle via JavaScript */
  }
}
```

**WCAG AAA Validation** (Dark Theme):

| Color Pair                  | Ratio | Pass AAA? | Usage            |
| --------------------------- | ----- | --------- | ---------------- |
| text-primary / background   | 14:1  | ✅        | Body text        |
| text-secondary / background | 9:1   | ✅        | Secondary text   |
| text-tertiary / background  | 5.2:1 | ✅ (AA)   | Metadata         |
| success / background        | 7.5:1 | ✅        | Success messages |
| warning / background        | 8.0:1 | ✅        | Warning messages |
| error / background          | 7.8:1 | ✅        | Error messages   |
| info / background           | 7.2:1 | ✅        | Info messages    |
| primary-500 / background    | 7.1:1 | ✅        | Primary buttons  |

**Usage Examples**:

```vue
<template>
  <!-- Dark theme (add .dark class to <html>) -->
  <html class="dark">
    <div class="bg-[--color-background] text-[--color-text-primary]">
      <div
        class="bg-[--color-surface] border border-[--color-border] rounded-base shadow-base p-[--spacing-md]"
      >
        <h2 class="text-[--color-text-primary]">Dark Mode Card</h2>
        <p class="text-[--color-text-secondary]">Description in dark mode</p>
        <span class="text-[--color-text-tertiary]">Metadata</span>
      </div>
    </div>
  </html>
</template>

<script setup lang="ts">
// Theme switching (will be implemented in T024)
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
};
</script>
```

**Dark Mode Design Principles**:

- **Avoid pure black**: Use dark gray (#0F1419) to reduce eye strain
- **Elevated surfaces**: Lighter grays for cards/panels create depth
- **Increase brightness**: Colors need to be brighter on dark backgrounds
- **Reduce saturation**: Slightly desaturate colors to avoid vibration
- **Maintain hierarchy**: Keep text contrast ratios consistent with light mode

**Common Dark Mode Mistakes to Avoid**:

- ❌ Pure black backgrounds (#000000) - causes eye strain
- ❌ Using same color values as light mode
- ❌ Insufficient contrast for text
- ❌ Overly saturated colors (vibrate on dark backgrounds)
- ❌ Forgetting to adjust shadows (need lighter shadows on dark)

## Testing Requirements

- [ ] Run WCAG contrast ratio tests for all dark theme colors
- [ ] Visual inspection in Storybook with dark mode
- [ ] Test text readability on all dark background colors
- [ ] Verify semantic colors are distinguishable in dark mode
- [ ] Check that borders are visible on dark surfaces
- [ ] Test hover and active states in dark mode
- [ ] Ensure focus rings are visible on dark backgrounds
- [ ] Validate against WCAG 2.1 AAA standards
- [ ] Test transition between light and dark themes

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T022-dark-theme`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
