# Task T009: Create Reference Tokens - Z-Index Scale

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens for z-index scale with 8 semantic levels (HIDE to TOOLTIP) ensuring consistent layering and stacking context throughout the application.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Add z-index section to existing file

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T029 (ZIndex stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] 8 z-index levels defined with semantic names
- [ ] Scale includes: HIDE, BASE, DROPDOWN, STICKY, FIXED, MODAL_BACKDROP, MODAL, POPOVER, TOOLTIP
- [ ] Values use numeric constants (not strings)
- [ ] Clear separation between layers (increments of 10-20)
- [ ] Negative value for HIDE (-1) to hide elements below flow
- [ ] Token structure uses `as const` for literal types
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Z-index tokens integrate with existing REFERENCE constant

## Implementation Notes

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  // ... existing sections ...

  Z_INDEX: {
    HIDE: -1,
    BASE: 0,
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
} as const;
```

**Layer Hierarchy Explanation**:

- **HIDE (-1)**: Elements intentionally hidden below normal flow
- **BASE (0)**: Default stacking context
- **DROPDOWN (1000)**: Dropdown menus, select options
- **STICKY (1020)**: Sticky headers/navigation
- **FIXED (1030)**: Fixed position elements
- **MODAL_BACKDROP (1040)**: Modal overlay/backdrop
- **MODAL (1050)**: Modal dialogs
- **POPOVER (1060)**: Popovers, context menus
- **TOOLTIP (1070)**: Tooltips (highest priority)

**Design Principles**:

- **Large gaps (1000+)**: Prevents conflicts, allows custom values between layers
- **Semantic naming**: Clear intent over arbitrary numbers
- **Consistent increments**: 10-20 unit steps between related layers
- **Top layer strategy**: Critical UI (tooltips) always visible

**Usage Examples**:

```typescript
// Modal component
zIndex: REFERENCE.Z_INDEX.MODAL; // 1050

// Tooltip component
zIndex: REFERENCE.Z_INDEX.TOOLTIP; // 1070

// Dropdown menu
zIndex: REFERENCE.Z_INDEX.DROPDOWN; // 1000
```

**Common Pitfalls to Avoid**:

- Don't use random high values (z-index: 9999)
- Don't create new stacking contexts unnecessarily
- Always reference token values, never hardcode z-index

## Testing Requirements

- [ ] Verify all 8 z-index levels are defined
- [ ] Test stacking order with overlapping elements in Storybook
- [ ] Verify negative value works for HIDE
- [ ] Check TypeScript autocomplete for z-index keys
- [ ] Ensure values are numbers, not strings

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T009-reference-z-index`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
