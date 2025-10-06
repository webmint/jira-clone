# Task T006: Create Reference Tokens - Spacing Scale

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens for spacing scale using rem-based values following a base-8 pattern. This establishes consistent spacing values for margin, padding, and gap properties throughout the application.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Add spacing section to existing file

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T028 (Spacing stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] Spacing scale defined from 0 to 24 (following base-8 pattern)
- [ ] All values use rem units for accessibility
- [ ] Scale includes: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
- [ ] Token structure uses `as const` for literal types
- [ ] Values align with Tailwind CSS default spacing scale
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Spacing tokens integrate with existing REFERENCE constant

## Implementation Notes

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  // ... existing TYPOGRAPHY section ...

  SPACING: {
    0: '0px',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },
} as const;
```

**Design Rationale**:

- **Base-8 system**: Mathematically harmonious, industry standard
- **Rem units**: Scale with user font-size preferences (accessibility)
- **Tailwind alignment**: Compatible with Tailwind's default scale
- **Incremental progression**: Smaller increments at lower values, larger at higher values

**Usage Examples**:

```typescript
// Direct access
const padding = REFERENCE.SPACING[4]; // '1rem'

// In CSS
padding: var(--spacing-4); // After CSS generation in T020

// In Tailwind
class="p-[--spacing-4]" // Using arbitrary values
```

## Testing Requirements

- [ ] Import REFERENCE and verify spacing values autocomplete
- [ ] Verify all spacing values are valid rem strings
- [ ] Check that spacing scale covers common UI spacing needs
- [ ] Test TypeScript inference for spacing keys (should be number literals)
- [ ] Verify integration with existing TYPOGRAPHY section

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T006-reference-spacing`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
