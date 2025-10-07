# Task T007: Create Reference Tokens - Shadow Definitions

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens for shadow definitions with 5 elevation levels (SM, BASE, MD, LG, XL) providing consistent depth and layering effects throughout the application.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Add shadows section to existing file

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T029 (Shadow stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] 5 shadow levels defined: SM, BASE, MD, LG, XL
- [ ] Shadow values use consistent elevation progression
- [ ] Values compatible with reduced motion preferences
- [ ] Shadow definitions use rgb() with alpha for compatibility
- [ ] Token structure uses `as const` for literal types
- [ ] Shadows provide subtle depth without overwhelming design
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Shadow tokens integrate with existing REFERENCE constant

## Implementation Notes

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  // ... existing TYPOGRAPHY and SPACING sections ...

  SHADOWS: {
    SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    BASE: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
} as const;
```

**Shadow Design Principles**:

- **Consistent opacity**: All shadows use 0.05 or 0.1 alpha for subtlety
- **Layered approach**: Combine offset shadows for realistic depth
- **Negative spread**: Use negative spread values for tighter shadows
- **RGB with alpha**: Modern syntax, better browser support than rgba()

**Elevation Mapping**:

- **SM**: Subtle hover states, slight elevation (cards, buttons)
- **BASE**: Default card elevation, dropdowns
- **MD**: Floating elements, modals
- **LG**: Overlays, important dialogs
- **XL**: Maximum depth, critical UI elements

**Accessibility Consideration**:

```css
/* Consider adding this in global styles for motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    box-shadow: none !important;
  }
}
```

## Testing Requirements

- [ ] Verify all 5 shadow levels are defined
- [ ] Test shadow rendering in Storybook (after T029)
- [ ] Check shadow visibility on both light and dark backgrounds
- [ ] Verify TypeScript autocomplete for shadow keys
- [ ] Ensure shadow values are valid CSS box-shadow strings

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T007-reference-shadows`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
