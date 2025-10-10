# Task T015: Implement Material Design 3 State Layer Overlays

**Status**: Pending
**Priority**: P0-critical
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T014 (fix icon spacing)

## Description

Implement Material Design 3 state layer overlay pattern for all button variants. Currently using direct color changes for hover/active states, but M3 specifies 8%/12% opacity overlays.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #3 (Critical)

**Material Design 3 Pattern:**
- Hover state: 8% opacity overlay of primary color
- Pressed state: 12% opacity overlay of primary color
- Focus state: 12% opacity overlay of primary color

**Current (Incorrect) Pattern:**
```css
.btn-filled:hover:not(:disabled) {
  background-color: var(--color-primary-600);  /* Direct color change ❌ */
}
```

**Material Design 3 (Correct) Pattern:**
```css
.btn-filled:hover:not(:disabled)::before {
  opacity: 0.08;  /* 8% overlay ✅ */
}
```

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Lines 118-176 (all variants)

## Implementation Steps

### 1. Add Position Relative to Base Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-duration-base) var(--transition-timing-ease-in-out);
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;  /* ADD THIS */
}
```

### 2. Update Filled Button Variant

```css
/* Variant: Filled */
.btn-filled {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
}

/* Add state layer overlay */
.btn-filled::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: currentColor;
  opacity: 0;
  transition: opacity var(--transition-duration-base);
  border-radius: inherit;
  pointer-events: none;
}

.btn-filled:hover:not(:disabled)::before {
  opacity: 0.08;  /* 8% state layer */
}

.btn-filled:active:not(:disabled)::before {
  opacity: 0.12;  /* 12% state layer */
}

/* Remove old hover/active background changes */
/* DELETE:
.btn-filled:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.btn-filled:active:not(:disabled) {
  background-color: var(--color-primary-700);
}
*/
```

### 3. Update Outline Button Variant

```css
/* Variant: Outline */
.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
}

/* Add state layer overlay */
.btn-outline::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-primary-500);
  opacity: 0;
  transition: opacity var(--transition-duration-base);
  border-radius: inherit;
  pointer-events: none;
}

.btn-outline:hover:not(:disabled)::before {
  opacity: 0.08;  /* 8% state layer */
}

.btn-outline:active:not(:disabled)::before {
  opacity: 0.12;  /* 12% state layer */
}

/* Remove old hover/active changes */
/* DELETE:
.btn-outline:hover:not(:disabled) {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);  /* KEEP BORDER SAME */
}

.btn-outline:active:not(:disabled) {
  background-color: var(--color-primary-100);
  border-color: var(--color-primary-700);  /* KEEP BORDER SAME */
}
*/
```

### 4. Update Text Button Variant

```css
/* Variant: Text */
.btn-text {
  background-color: transparent;
  color: var(--color-primary-500);
}

/* Add state layer overlay */
.btn-text::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-primary-500);
  opacity: 0;
  transition: opacity var(--transition-duration-base);
  border-radius: inherit;
  pointer-events: none;
}

.btn-text:hover:not(:disabled)::before {
  opacity: 0.08;  /* 8% state layer */
}

.btn-text:active:not(:disabled)::before {
  opacity: 0.12;  /* 12% state layer */
}

/* Remove old hover/active changes */
/* DELETE:
.btn-text:hover:not(:disabled) {
  background-color: var(--color-primary-50);
}

.btn-text:active:not(:disabled) {
  background-color: var(--color-primary-100);
}
*/
```

## Testing Requirements

### Automated Tests

```bash
# Run component tests
npm test -- src/components/atoms/Button/UiButton.spec.ts

# Run interaction tests (especially hover tests)
npm run storybook:test
```

### Manual Visual Checks

1. **Storybook: Filled Button Hover**
   - Hover over filled button
   - Should see subtle darkening (8% overlay)
   - Click button (pressed state)
   - Should see slightly more darkening (12% overlay)

2. **Storybook: Outline Button Hover**
   - Hover over outline button
   - Should see subtle tint overlay (8%)
   - Border color should NOT change
   - Click button - slightly more tint (12%)

3. **Storybook: Text Button Hover**
   - Hover over text button
   - Should see subtle background tint (8%)
   - Click button - slightly more tint (12%)

4. **All Palette Variations**
   - Test all 3 variants across 10 palette variations
   - Verify overlay effect is visible but subtle
   - Verify colors adapt to palette correctly

## Acceptance Criteria

- [ ] Base `.btn` has `position: relative`
- [ ] All 3 variants have `::before` pseudo-element for state layer
- [ ] Hover state uses 8% opacity overlay
- [ ] Active/pressed state uses 12% opacity overlay
- [ ] Old direct color changes removed
- [ ] Outline button border no longer changes color on hover
- [ ] Visual appearance matches M3 subtle overlay pattern
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25)
- [ ] Interaction tests passing (7/7 - hover test validates)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- Hover: Direct color change (e.g., primary-500 → primary-600)
- Active: Direct color change (e.g., primary-500 → primary-700)
- Outline border changes color on hover

**After Fix:**
- Hover: 8% opacity overlay (subtle, M3 compliant)
- Active: 12% opacity overlay (slightly more visible)
- Outline border stays constant color
- More predictable and consistent across palettes

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 4 (Variant Specifications)
- Material Design 3 state layer pattern documentation
- Opacity values: 8% hover, 12% pressed/focus

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T015] Implement Material Design 3 state layer overlays"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T015-implement-m3-state-layer-overlays`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Implements Material Design 3 state layer overlay pattern for all button variants.

## Problem

Buttons used direct color changes for hover/active states instead of Material Design 3's 8%/12% opacity overlay pattern. This caused:
- Inconsistent appearance across palettes
- Outline buttons changing border color on hover (incorrect per M3)
- Non-standard interaction feedback

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #3

## Changes

### All Variants (Filled, Outline, Text)
- Added `::before` pseudo-element for state layer overlay
- Hover: 8% opacity overlay ✅
- Pressed: 12% opacity overlay ✅
- Removed direct background-color changes

### Specific Fixes
- **Filled buttons**: Overlay on primary background
- **Outline buttons**: Border no longer changes color on hover ✅
- **Text buttons**: Consistent overlay pattern

### Technical Implementation
- Added `position: relative` to base `.btn`
- Used `::before` with `inset: 0` for overlay layer
- `pointer-events: none` prevents interaction issues
- `border-radius: inherit` matches button shape

## Testing

- ✅ Unit tests: 25/25 passing
- ✅ Interaction tests: 7/7 passing (hover test validates overlay)
- ✅ Visual regression: Storybook checks passed
- ✅ All 3 variants tested
- ✅ All 10 palette variations tested
- ✅ Hover/pressed states validated

## Material Design 3 Compliance

Before: 46% compliant (2 of 13 issues fixed)
After: 69% compliant (5 of 13 issues fixed - this task addresses issues #3, #6)

Refs #[issue-number]

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR reviewed
- [ ] All tests passing
- [ ] PR merged

## Notes

- **Critical priority**: Fundamental M3 interaction pattern
- **Affects all variants**: Filled, outline, and text buttons
- **Fixes multiple issues**: State layers (#3) + outline border behavior (#6)
- **Visual impact**: Subtle but important for M3 compliance
- **Part of series**: Third of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 30 minutes
- **Testing**: 30 minutes
- **Documentation**: 10 minutes
- **Total**: 70 minutes

## Next Task

After completion: T016 (Add elevation/shadows to filled buttons)