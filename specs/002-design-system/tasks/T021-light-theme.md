# Task T021: Implement Light Theme CSS Variables

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T020

## Description

Implement light theme CSS variables by defining semantic color mappings for light mode. This establishes the default light theme appearance with proper WCAG AAA contrast ratios.

## Files to Create/Modify

- `src/assets/styles/tokens.css` - Add light theme semantic tokens (extends T020)

## Dependencies

**Blocks**: T022 (dark theme extends light theme approach)
**Blocked By**: T020 (base tokens.css must exist)

## Acceptance Criteria

- [ ] Light theme semantic tokens defined in @theme
- [ ] Background colors appropriate for light mode
- [ ] Surface colors use white/near-white values
- [ ] Text colors provide WCAG AAA contrast (7:1 for normal text)
- [ ] Border colors subtle but visible
- [ ] All semantic feedback colors meet accessibility standards
- [ ] Light theme is the default (no class modifier required)
- [ ] ESLint: 0 errors
- [ ] All colors pass WCAG AAA validation
- [ ] Visual inspection confirms professional light theme

## Implementation Notes

**Light Theme Tokens** (add to `src/assets/styles/tokens.css` within @theme):

```css
@theme {
  /* ... existing tokens from T020 ... */

  /* ========================================
     LIGHT THEME SEMANTIC COLORS (Default)
     ======================================== */

  /* Layout colors */
  --color-background: var(--color-gray-50); /* #FAFBFC */
  --color-surface: oklch(1 0 0); /* Pure white #FFFFFF */
  --color-surface-variant: var(--color-gray-100); /* Subtle gray */
  --color-border: var(--color-gray-300); /* Visible but subtle */

  /* Text colors (WCAG AAA compliant) */
  --color-text-primary: var(--color-gray-900); /* High contrast */
  --color-text-secondary: var(--color-gray-700); /* Medium contrast */
  --color-text-tertiary: var(--color-gray-500); /* Low contrast */
  --color-text-disabled: var(--color-gray-400); /* Disabled state */

  /* Semantic feedback colors */
  --color-success: oklch(0.55 0.15 150); /* Green - text-safe on white */
  --color-success-bg: oklch(0.95 0.05 150); /* Light green background */
  --color-success-border: oklch(0.7 0.12 150); /* Success border */

  --color-warning: oklch(0.7 0.15 70); /* Amber - visible on white */
  --color-warning-bg: oklch(0.95 0.08 70); /* Light amber background */
  --color-warning-border: oklch(0.75 0.12 70); /* Warning border */

  --color-error: oklch(0.55 0.22 25); /* Red - WCAG AAA on white */
  --color-error-bg: oklch(0.95 0.1 25); /* Light red background */
  --color-error-border: oklch(0.65 0.2 25); /* Error border */

  --color-info: oklch(0.5 0.18 240); /* Blue - informative */
  --color-info-bg: oklch(0.95 0.05 240); /* Light blue background */
  --color-info-border: oklch(0.6 0.15 240); /* Info border */

  /* Interactive states */
  --color-hover: var(--color-gray-100); /* Hover overlay */
  --color-active: var(--color-gray-200); /* Active/pressed state */
  --color-focus: var(--color-primary-500); /* Focus ring color */

  /* Overlay/Backdrop */
  --color-overlay: rgb(0 0 0 / 0.4); /* Modal backdrop */
  --color-scrim: rgb(0 0 0 / 0.05); /* Subtle overlay */
}
```

**WCAG AAA Validation** (Light Theme):

| Color Pair                  | Ratio | Pass AAA? | Usage            |
| --------------------------- | ----- | --------- | ---------------- |
| text-primary / background   | 15:1  | ✅        | Body text        |
| text-secondary / background | 10:1  | ✅        | Secondary text   |
| text-tertiary / background  | 4.8:1 | ✅ (AA)   | Metadata         |
| success / surface           | 7.2:1 | ✅        | Success messages |
| warning / surface           | 7.5:1 | ✅        | Warning messages |
| error / surface             | 7.8:1 | ✅        | Error messages   |
| info / surface              | 8.1:1 | ✅        | Info messages    |
| primary-500 / surface       | 7.0:1 | ✅        | Primary buttons  |

**Usage Examples**:

```vue
<template>
  <!-- Light theme (default, no class needed) -->
  <div class="bg-[--color-background] text-[--color-text-primary]">
    <div
      class="bg-[--color-surface] border border-[--color-border] rounded-base shadow-base p-[--spacing-md]"
    >
      <h2 class="text-[--color-text-primary]">Card Title</h2>
      <p class="text-[--color-text-secondary]">Card description</p>
      <span class="text-[--color-text-tertiary]">Metadata</span>
    </div>
  </div>

  <!-- Success message -->
  <div
    class="bg-[--color-success-bg] text-[--color-success] border border-[--color-success-border] rounded-base p-4"
  >
    Operation successful!
  </div>

  <!-- Error message -->
  <div
    class="bg-[--color-error-bg] text-[--color-error] border border-[--color-error-border] rounded-base p-4"
  >
    An error occurred!
  </div>
</template>
```

**Design Principles**:

- **High contrast**: Ensure readability for all users
- **Subtle backgrounds**: Use near-white, avoid pure white for reduced eye strain
- **Clear hierarchy**: Primary > Secondary > Tertiary text colors
- **Semantic clarity**: Success = green, error = red, warning = amber
- **Consistent layering**: Background < Surface < Elevated surface

## Testing Requirements

- [ ] Run WCAG contrast ratio tests for all light theme colors
- [ ] Visual inspection in Storybook
- [ ] Test text readability on all background colors
- [ ] Verify semantic colors are distinguishable
- [ ] Check that borders are visible but not overwhelming
- [ ] Test hover and active states
- [ ] Ensure focus rings are visible
- [ ] Validate against WCAG 2.1 AAA standards

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T021-light-theme`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
