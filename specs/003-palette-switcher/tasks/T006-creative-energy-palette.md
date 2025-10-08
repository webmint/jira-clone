# Task T006: Define Creative Energy Palette

**Status**: Pending
**Priority**: P2
**Agent**: agent:frontend
**Parallel**: Yes (with T007, T008, T009)
**Depends On**: None (can start after T003 for validation)

## Description

Define the Creative Energy (purple/violet) palette with complete token sets for both light and dark modes in `tokens.css`. This palette is characterized by innovative, creative, artistic colors suitable for creative agencies, design tools, and entertainment platforms.

**Primary Color**: Purple/Violet (#9333EA base for light, #C084FC base for dark)

## Files to Create/Modify

- `front/src/designSystem/styles/tokens.css` - Add `.creative-energy.light` and `.creative-energy.dark` selectors with complete token definitions

## Dependencies

**Blocks**: None (documentation tasks can reference this)
**Blocked By**: None (can be done in parallel with other palette definitions)

## Acceptance Criteria

- [ ] `.creative-energy.light` selector added with all required tokens
- [ ] `.creative-energy.dark` selector added with all required tokens
- [ ] Primary color scale (50-900) defined for purple/violet
- [ ] Neutral color scale (0-1000) defined
- [ ] Semantic state colors defined (success, warning, error, info)
- [ ] System semantic tokens defined (background, surface, text, border)
- [ ] Light mode: light backgrounds, dark text
- [ ] Dark mode: dark backgrounds, light text
- [ ] WCAG AA contrast requirements met (will be validated by T002 tests)
- [ ] Token names match existing Corporate Trust palette exactly
- [ ] ESLint: 0 errors

## Implementation Notes

**Color Values from data-model.md**:

`.creative-energy.light`:

```css
.creative-energy.light {
  /* Primary - Purple scale */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #9333ea; /* Base */
  --color-primary-600: #9333ea;
  --color-primary-700: #7e22ce;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;

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

`.creative-energy.dark`:

```css
.creative-energy.dark {
  /* Primary - Lighter purple for contrast */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #c084fc; /* Lighter base for dark mode */
  --color-primary-600: #a855f7;
  --color-primary-700: #9333ea;
  --color-primary-800: #7e22ce;
  --color-primary-900: #6b21a8;

  /* Neutrals - Inverted */
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

  /* Semantic states - same as light mode */
  /* ... (copy from light mode) */

  /* System semantic tokens - same structure as light mode */
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

**Placement in tokens.css**:

- Add after existing `.corporate-trust.dark` selector
- Maintain consistent formatting and indentation
- Add comments to separate palette sections

## Testing Requirements

- [ ] Manual test: Apply `.creative-energy.light` class to `<html>` and verify purple colors
- [ ] Manual test: Apply `.creative-energy.dark` class and verify dark mode
- [ ] Automated test: T001 token completeness tests pass
- [ ] Automated test: T002 contrast tests pass for Creative Energy variations

## GitHub Issue

**Issue**: #94
**Link**: https://github.com/webmint/jira-clone/issues/94

## Sub-branch

**Branch**: `spec/003-palette-switcher/T006-creative-energy-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
