# Task T013: Create Palette Usage Guide

**Status**: Pending
**Priority**: P3
**Agent**: agent:frontend
**Parallel**: Yes (with T012)
**Depends On**: T001-T011 (all implementation complete)

## Description

Create a detailed usage guide for developers building palette-aware components. This guide provides step-by-step instructions, common patterns, best practices, and troubleshooting tips for working with the multi-palette design system.

## Files to Create/Modify

- `front/src/designSystem/docs/palette-guide.md` - Create comprehensive usage guide

## Dependencies

**Blocks**: None
**Blocked By**: T001-T011 (guide documents completed implementation)

## Acceptance Criteria

- [ ] Guide created at correct path
- [ ] Step-by-step component creation walkthrough included
- [ ] Common patterns documented (buttons, cards, forms, etc.)
- [ ] Token usage examples provided
- [ ] Troubleshooting section included
- [ ] Testing checklist for new components
- [ ] Migration guide for existing components
- [ ] Code examples are complete and working
- [ ] Markdown formatting correct
- [ ] ESLint: 0 errors (for code examples)

## Implementation Notes

**Guide Structure**:

````markdown
# Palette-Aware Component Development Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Quick Start](#quick-start)
3. [Component Patterns](#component-patterns)
4. [Token Reference](#token-reference)
5. [Testing Your Components](#testing-your-components)
6. [Migration Guide](#migration-guide)
7. [Troubleshooting](#troubleshooting)

## Introduction

This guide helps developers create components that work seamlessly with all 10 palette variations (5 palettes × 2 modes) in the design system. By following these patterns, your components will automatically adapt to any active palette without code changes.

## Quick Start

### Step 1: Use Semantic Tokens

Always reference semantic tokens instead of hardcoded colors:

```vue
<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-body">{{ body }}</p>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  padding: 1rem;
}

.card-title {
  color: var(--color-text-primary);
  font-weight: 600;
}

.card-body {
  color: var(--color-text-secondary);
  margin-top: 0.5rem;
}
</style>
```
````

### Step 2: Test in All Variations

Open Storybook and test your component with:

- All 5 palettes (Corporate Trust, Creative Energy, Natural Harmony, Warm Welcome, Minimalist)
- Both modes (light and dark)

### Step 3: Verify Accessibility

Ensure text remains legible and interactive elements are visible in all 10 variations.

## Component Patterns

### Buttons

**Primary Button**:

```vue
<style scoped>
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
}

.btn-primary:disabled {
  background-color: var(--color-neutral-300);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}
</style>
```

**Secondary Button**:

```vue
<style scoped>
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-border-default);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: var(--color-background-subtle);
  border-color: var(--color-primary-500);
}
</style>
```

### Cards & Surfaces

```vue
<style scoped>
/* Elevated card */
.card-elevated {
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border-subtle);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Overlay (modal, dropdown) */
.overlay {
  background-color: var(--color-surface-overlay);
  border: 1px solid var(--color-border-default);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
```

### Form Inputs

```vue
<style scoped>
.input {
  background-color: var(--color-background-default);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  padding: 0.5rem;
  border-radius: 4px;
}

.input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-500-rgb), 0.1);
}

.input::placeholder {
  color: var(--color-text-disabled);
}
</style>
```

### Status Indicators

```vue
<style scoped>
.status-success {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
  border: 1px solid var(--color-success-500);
}

.status-warning {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
  border: 1px solid var(--color-warning-500);
}

.status-error {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
  border: 1px solid var(--color-error-500);
}
</style>
```

## Token Reference

### Commonly Used Tokens

**Backgrounds**:

- `--color-background-default` - Main page background
- `--color-background-subtle` - Slightly elevated sections
- `--color-background-muted` - Disabled or inactive states

**Text**:

- `--color-text-primary` - Headings, important text
- `--color-text-secondary` - Body text, descriptions
- `--color-text-tertiary` - Subtle text, captions
- `--color-text-disabled` - Disabled state text
- `--color-text-inverse` - Text on colored backgrounds

**Borders**:

- `--color-border-default` - Standard borders
- `--color-border-subtle` - Dividers, light borders
- `--color-border-strong` - Emphasized borders
- `--color-border-focus` - Focus rings (usually primary color)

**Primary Colors**:

- `--color-primary-500` - Brand color (buttons, links, accents)
- `--color-primary-600` - Hover state
- `--color-primary-700` - Active/pressed state

## Testing Your Components

### Checklist

- [ ] Component renders correctly in all 5 palettes
- [ ] Component renders correctly in both light and dark modes
- [ ] Text is legible in all 10 variations
- [ ] Interactive states (hover, focus, active) work in all variations
- [ ] Disabled states are visible in all variations
- [ ] No hardcoded colors in component CSS
- [ ] Storybook story created with palette controls
- [ ] Accessibility tests pass (WCAG AA compliance)

### Manual Testing in Storybook

1. Open your component's story
2. Use palette dropdown to test all 5 palettes
3. Toggle between light and dark modes for each palette
4. Verify visual appearance and functionality in all 10 combinations

## Migration Guide

### Updating Existing Components

**Before (hardcoded colors)**:

```vue
<style scoped>
.button {
  background-color: #3b82f6; /* ❌ */
  color: white; /* ❌ */
  border: 1px solid #2563eb; /* ❌ */
}
</style>
```

**After (semantic tokens)**:

```vue
<style scoped>
.button {
  background-color: var(--color-primary-500); /* ✅ */
  color: var(--color-text-inverse); /* ✅ */
  border: 1px solid var(--color-primary-600); /* ✅ */
}
</style>
```

### Common Replacements

| Hardcoded          | Semantic Token                                                |
| ------------------ | ------------------------------------------------------------- |
| `#FFFFFF`, `white` | `var(--color-neutral-0)` or `var(--color-background-default)` |
| `#000000`, `black` | `var(--color-neutral-900)` or `var(--color-text-primary)`     |
| Brand color (blue) | `var(--color-primary-500)`                                    |
| Gray text          | `var(--color-text-secondary)`                                 |
| Gray border        | `var(--color-border-default)`                                 |

## Troubleshooting

### Issue: Colors don't change when switching palettes

**Solution**: Check that you're using CSS custom properties (`var(--color-...)`) instead of hardcoded hex values.

### Issue: Text is unreadable in dark mode

**Solution**: Ensure you're using semantic text tokens (`--color-text-primary`) that automatically invert in dark mode, not neutral color tokens directly.

### Issue: Component looks good in Corporate Trust but broken in other palettes

**Solution**: Test in all palettes. Likely using hardcoded colors or assuming blue primary color.

### Issue: Focus rings not visible in all palettes

**Solution**: Use `--color-border-focus` which adapts to the primary color of each palette.

## Best Practices

1. **Always use semantic tokens** - Never hardcode colors
2. **Test in all variations** - Use Storybook palette controls
3. **Avoid palette-specific logic** - Components should be universal
4. **Use system tokens for structure** - background, surface, text, border
5. **Use primary colors for branding** - buttons, links, accents
6. **Maintain contrast** - Text must be legible in all variations

## Resources

- [Design System README](../README.md)
- [Token Definitions](../styles/tokens.css)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

```

**Placement**: Create in `front/src/designSystem/docs/palette-guide.md`

## Testing Requirements

- [ ] All code examples are syntactically correct
- [ ] Examples follow actual token naming conventions
- [ ] Guide is comprehensive but not overwhelming
- [ ] Links work correctly

## GitHub Issue

**Issue**: #101
**Link**: https://github.com/webmint/jira-clone/issues/101

## Sub-branch

**Branch**: `spec/003-palette-switcher/T013-create-usage-guide`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
