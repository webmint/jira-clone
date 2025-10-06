# Task T011: Create Reference Tokens - Transition Definitions

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create reference tokens for CSS transition definitions including duration values (FAST, BASE, SLOW) and timing functions (LINEAR, EASE_IN, EASE_OUT, EASE_IN_OUT, EASE_FLUID) for consistent animation behavior.

## Files to Create/Modify

- `src/tokens/reference.tokens.ts` - Add transitions section to existing file

## Dependencies

**Blocks**: T019 (system tokens need reference tokens), T029 (Transition stories need these tokens)
**Blocked By**: T004 (Storybook configuration must be complete)

## Acceptance Criteria

- [ ] 3 duration values defined: FAST, BASE, SLOW
- [ ] 5 timing functions defined: LINEAR, EASE_IN, EASE_OUT, EASE_IN_OUT, EASE_FLUID
- [ ] Duration values use milliseconds (ms) string format
- [ ] Timing functions use cubic-bezier or keyword values
- [ ] Token structure uses `as const` for literal types
- [ ] Values respect reduced motion preferences (to be applied in global CSS)
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Transition tokens integrate with existing REFERENCE constant

## Implementation Notes

**Token Structure** (`src/tokens/reference.tokens.ts`):

```typescript
export const REFERENCE = {
  // ... existing sections ...

  TRANSITIONS: {
    DURATION: {
      FAST: '150ms',
      BASE: '200ms',
      SLOW: '300ms',
    },
    TIMING: {
      LINEAR: 'linear',
      EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
      EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
      EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      EASE_FLUID: 'cubic-bezier(0.3, 0, 0, 1)',
    },
  },
} as const;
```

**Duration Use Cases**:

- **FAST (150ms)**: Quick feedback (hover states, button press)
- **BASE (200ms)**: Standard transitions (dropdowns, tooltips)
- **SLOW (300ms)**: Emphasized transitions (modals, page transitions)

**Timing Function Characteristics**:

- **LINEAR**: Constant speed, mechanical feel
- **EASE_IN**: Starts slow, accelerates (entrances)
- **EASE_OUT**: Starts fast, decelerates (exits, most common)
- **EASE_IN_OUT**: Smooth start and end (movements within view)
- **EASE_FLUID**: Material Design-inspired, natural movement

**Usage Examples**:

```typescript
// Button hover
transition: `background-color ${REFERENCE.TRANSITIONS.DURATION.FAST} ${REFERENCE.TRANSITIONS.TIMING.EASE_OUT}`;

// Modal entrance
transition: `opacity ${REFERENCE.TRANSITIONS.DURATION.BASE} ${REFERENCE.TRANSITIONS.TIMING.EASE_IN_OUT}`;

// Smooth scroll
transition: `transform ${REFERENCE.TRANSITIONS.DURATION.SLOW} ${REFERENCE.TRANSITIONS.TIMING.EASE_FLUID}`;
```

**Accessibility - Reduced Motion** (apply in global CSS):

```css
/* This will be added in T020 (tokens.css) */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Cubic Bezier Visualization**:

- `cubic-bezier(x1, y1, x2, y2)` - control points for acceleration curve
- Use https://cubic-bezier.com/ for visualization
- Material Design easing: `cubic-bezier(0.4, 0, 0.2, 1)`

## Testing Requirements

- [ ] Verify all duration and timing values are defined
- [ ] Test transitions in Storybook (after T029)
- [ ] Check that cubic-bezier values produce smooth animations
- [ ] Verify TypeScript autocomplete for transition keys
- [ ] Ensure all values are valid CSS transition strings

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T011-reference-transitions`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
