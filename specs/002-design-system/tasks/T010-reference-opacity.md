# Task T010: Create Reference Tokens - Opacity Values

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens for opacity values with 8 levels (0 to 100) providing consistent transparency effects for overlays, disabled states, and visual hierarchy.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Add opacity section to existing file

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T029 (Opacity stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] 8 opacity levels defined: 0, 5, 10, 20, 40, 60, 80, 100
- [ ] Values use string format for CSS compatibility ('0' to '1')
- [ ] Scale provides sufficient granularity for common UI needs
- [ ] Token structure uses `as const` for literal types
- [ ] Values work with both opacity and background-color alpha
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Opacity tokens integrate with existing REFERENCE constant

## Implementation Notes

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  // ... existing sections ...

  OPACITY: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    40: '0.4',
    60: '0.6',
    80: '0.8',
    100: '1',
  },
} as const;
```

**Use Case Mapping**:

- **0**: Completely hidden (display: none alternative)
- **5**: Very subtle overlay (hover states)
- **10**: Subtle disabled state
- **20**: Light overlay, inactive elements
- **40**: Modal backdrop, semi-transparent overlays
- **60**: Prominent overlay, loading states
- **80**: Mostly opaque, very slight transparency
- **100**: Fully opaque (default)

**Usage Examples**:

```typescript
// Disabled button
opacity: REFERENCE.OPACITY[40]; // 0.4

// Modal backdrop
backgroundColor: `rgb(0 0 0 / ${REFERENCE.OPACITY[40]})`; // black with 40% opacity

// Hover overlay
opacity: REFERENCE.OPACITY[5]; // 0.05, very subtle
```

**Design Rationale**:

- **Non-linear scale**: More granularity at lower values (where differences are more noticeable)
- **String values**: Compatible with CSS opacity property and alpha channel
- **Percentage-based naming**: Keys represent percentages (40 = 40% opacity)

**Accessibility Considerations**:

- Avoid opacity < 0.6 for text (readability)
- Use semantic color tokens for disabled states
- Ensure sufficient contrast even with opacity applied

## Testing Requirements

- [ ] Verify all 8 opacity values are defined
- [ ] Test opacity rendering in Storybook (after T029)
- [ ] Check that values work in both opacity and rgb/alpha contexts
- [ ] Verify TypeScript autocomplete for opacity keys
- [ ] Ensure all values are valid CSS opacity strings

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T010-reference-opacity`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
