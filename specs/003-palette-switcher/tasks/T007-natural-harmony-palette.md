# Task T007: Define Natural Harmony Palette

**Status**: Pending
**Priority**: P2
**Agent**: agent:frontend
**Parallel**: Yes (with T006, T008, T009)
**Depends On**: None

## Description

Define the Natural Harmony (green) palette with complete token sets for both light and dark modes in `tokens.css`. This palette is characterized by calm, eco-friendly, health-focused colors suitable for environmental organizations, health apps, and wellness platforms.

**Primary Color**: Green (#10B981 base for light, #34D399 base for dark)

## Files to Create/Modify

- `front/src/designSystem/styles/tokens.css` - Add `.natural-harmony.light` and `.natural-harmony.dark` selectors

## Dependencies

**Blocks**: None
**Blocked By**: None (can be done in parallel with other palette definitions)

## Acceptance Criteria

- [ ] `.natural-harmony.light` selector added with all required tokens
- [ ] `.natural-harmony.dark` selector added with all required tokens
- [ ] Primary color scale (50-900) defined for green/emerald
- [ ] Neutral color scale (0-1000) defined
- [ ] Semantic state colors defined (success, warning, error, info)
- [ ] System semantic tokens defined (background, surface, text, border)
- [ ] Light mode: light backgrounds, dark text
- [ ] Dark mode: dark backgrounds, light text
- [ ] WCAG AA contrast requirements met (will be validated by T002 tests)
- [ ] Token names match existing Corporate Trust palette exactly
- [ ] ESLint: 0 errors

## Implementation Notes

**Color Values** (based on Tailwind emerald/green scale):

`.natural-harmony.light`:

```css
.natural-harmony.light {
  /* Primary - Green/Emerald scale */
  --color-primary-50: #ecfdf5;
  --color-primary-100: #d1fae5;
  --color-primary-200: #a7f3d0;
  --color-primary-300: #6ee7b7;
  --color-primary-400: #34d399;
  --color-primary-500: #10b981; /* Base */
  --color-primary-600: #059669;
  --color-primary-700: #047857;
  --color-primary-800: #065f46;
  --color-primary-900: #064e3b;

  /* Neutrals - Same as Corporate Trust light */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  --color-neutral-1000: #000000;

  /* Semantic states - shared across all palettes */
  --color-success-100: #d1fae5;
  --color-success-500: #10b981;
  --color-success-700: #047857;

  --color-warning-100: #fef3c7;
  --color-warning-500: #f59e0b;
  --color-warning-700: #b45309;

  --color-error-100: #fee2e2;
  --color-error-500: #ef4444;
  --color-error-700: #b91c1c;

  --color-info-100: #dbeafe;
  --color-info-500: #3b82f6;
  --color-info-700: #1d4ed8;

  /* System semantic tokens */
  --color-background-default: var(--color-neutral-0);
  --color-background-subtle: var(--color-neutral-50);
  --color-background-muted: var(--color-neutral-100);

  --color-surface-default: var(--color-neutral-0);
  --color-surface-raised: var(--color-neutral-50);
  --color-surface-overlay: var(--color-neutral-100);

  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-700);
  --color-text-tertiary: var(--color-neutral-600);
  --color-text-disabled: var(--color-neutral-400);
  --color-text-inverse: var(--color-neutral-0);

  --color-border-default: var(--color-neutral-200);
  --color-border-subtle: var(--color-neutral-100);
  --color-border-strong: var(--color-neutral-300);
  --color-border-focus: var(--color-primary-500);
}
```

`.natural-harmony.dark`:

```css
.natural-harmony.dark {
  /* Primary - Lighter green for contrast */
  --color-primary-50: #ecfdf5;
  --color-primary-100: #d1fae5;
  --color-primary-200: #a7f3d0;
  --color-primary-300: #6ee7b7;
  --color-primary-400: #34d399;
  --color-primary-500: #34d399; /* Lighter base for dark mode */
  --color-primary-600: #10b981;
  --color-primary-700: #059669;
  --color-primary-800: #047857;
  --color-primary-900: #065f46;

  /* Neutrals - Inverted (same as other dark modes) */
  --color-neutral-0: #111827;
  --color-neutral-50: #1f2937;
  --color-neutral-100: #374151;
  --color-neutral-200: #4b5563;
  --color-neutral-300: #6b7280;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #d1d5db;
  --color-neutral-600: #e5e7eb;
  --color-neutral-700: #f3f4f6;
  --color-neutral-800: #f9fafb;
  --color-neutral-900: #ffffff;
  --color-neutral-1000: #ffffff;

  /* Semantic states and system tokens - same structure as light mode */
  /* ... (copy structure from light mode) */
}
```

**Placement**: Add after `.creative-energy.dark` selector

## Testing Requirements

- [ ] Manual test: Apply `.natural-harmony.light` class and verify green colors
- [ ] Manual test: Apply `.natural-harmony.dark` class and verify dark mode
- [ ] Automated test: T001 token completeness tests pass
- [ ] Automated test: T002 contrast tests pass for Natural Harmony variations

## GitHub Issue

**Issue**: #95
**Link**: https://github.com/webmint/jira-clone/issues/95

## Sub-branch

**Branch**: `spec/003-palette-switcher/T007-natural-harmony-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
