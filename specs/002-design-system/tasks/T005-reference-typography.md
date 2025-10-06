# Task T005: Create Reference Tokens - Typography Primitives

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens file with typography primitives including font family (Roboto with fallbacks), font sizes (rem-based scale), font weights (100-900), and line heights. This establishes the foundational text styling values.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Create file with typography section
- `index.html` - Add Google Fonts link for Roboto

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T027 (Typography stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] Roboto font loaded via Google Fonts CDN (weights: 100, 300, 400, 500, 700, 900)
- [ ] Font family tokens defined with system fallbacks
- [ ] Font size scale defined (XS to 5XL) using rem units
- [ ] Font weight values defined (THIN to BLACK)
- [ ] Line height values defined (TIGHT, NORMAL, RELAXED)
- [ ] All typography tokens exported as TypeScript constants
- [ ] Token structure uses `as const` for literal types
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Build succeeds with new tokens

## Implementation Notes

**Google Fonts Integration** (`index.html`):

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
</head>
```

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  TYPOGRAPHY: {
    FONT_FAMILY: {
      SANS: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      MONO: '"Roboto Mono", "JetBrains Mono", ui-monospace, monospace',
    },
    FONT_SIZE: {
      XS: '0.75rem', // 12px
      SM: '0.875rem', // 14px
      BASE: '1rem', // 16px
      LG: '1.125rem', // 18px
      XL: '1.25rem', // 20px
      XL2: '1.5rem', // 24px
      XL3: '1.875rem', // 30px
      XL4: '2.25rem', // 36px
      XL5: '3rem', // 48px
    },
    FONT_WEIGHT: {
      THIN: 100,
      LIGHT: 300,
      NORMAL: 400,
      MEDIUM: 500,
      BOLD: 700,
      BLACK: 900,
    },
    LINE_HEIGHT: {
      TIGHT: '1.25',
      NORMAL: '1.5',
      RELAXED: '1.75',
    },
  },
} as const;
```

**Key Design Decisions**:

- Use rem units for font sizes (accessible, scales with user preferences)
- Include system font fallbacks for reliability
- Base font size: 1rem (16px default)
- Modular scale for harmonious sizing
- Line heights as unitless values (multiply with font size)

## Testing Requirements

- [ ] Verify Roboto font loads in browser DevTools (Network tab)
- [ ] Test fallback fonts by blocking Google Fonts
- [ ] Import tokens file and verify autocomplete works
- [ ] Check that token values match design specifications
- [ ] Verify `as const` enables literal type inference

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T005-reference-typography`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
