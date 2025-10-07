# Task T008: Create Reference Tokens - Border Radius Values

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens for border radius values ranging from NONE (sharp corners) to FULL (pill-shaped), providing consistent corner rounding throughout the application.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Add border radius section to existing file

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T029 (BorderRadius stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] 7 border radius values defined: NONE, SM, BASE, MD, LG, XL, FULL
- [ ] Values use rem units for scalability (except NONE and FULL)
- [ ] FULL value uses 9999px for pill-shaped elements
- [ ] NONE value is 0px for sharp corners
- [ ] Progressive scale from subtle to pronounced rounding
- [ ] Token structure uses `as const` for literal types
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Border radius tokens integrate with existing REFERENCE constant

## Implementation Notes

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  // ... existing TYPOGRAPHY, SPACING, and SHADOWS sections ...

  BORDER_RADIUS: {
    NONE: '0px',
    SM: '0.125rem', // 2px
    BASE: '0.25rem', // 4px
    MD: '0.375rem', // 6px
    LG: '0.5rem', // 8px
    XL: '0.75rem', // 12px
    FULL: '9999px', // Pill shape
  },
} as const;
```

**Design Rationale**:

- **NONE (0px)**: Sharp corners for modern, geometric designs
- **SM (2px)**: Very subtle rounding, barely visible
- **BASE (4px)**: Default rounding for most UI elements
- **MD (6px)**: Moderate rounding for cards, containers
- **LG (8px)**: Pronounced rounding for emphasis
- **XL (12px)**: Maximum rounding for special elements
- **FULL (9999px)**: Pill-shaped elements (badges, tags, circular buttons)

**Usage Examples**:

```typescript
// Buttons
borderRadius: REFERENCE.BORDER_RADIUS.BASE; // 4px, standard

// Cards
borderRadius: REFERENCE.BORDER_RADIUS.MD; // 6px, friendly

// Badges/Pills
borderRadius: REFERENCE.BORDER_RADIUS.FULL; // pill shape

// Images with slight rounding
borderRadius: REFERENCE.BORDER_RADIUS.SM; // 2px, subtle
```

**Component Mapping**:

- Buttons: BASE (4px)
- Input fields: BASE (4px)
- Cards: MD (6px)
- Modals: LG (8px)
- Avatars: FULL (pill)
- Badges: FULL (pill)

## Testing Requirements

- [ ] Verify all 7 border radius values are defined
- [ ] Test visual appearance of each value in Storybook (after T029)
- [ ] Check that FULL creates perfect circles/pills
- [ ] Verify TypeScript autocomplete for radius keys
- [ ] Ensure all values are valid CSS border-radius strings

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T008-reference-border-radius`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
