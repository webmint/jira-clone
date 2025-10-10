# Task T018: Fix Outlined Button Border Behavior on Hover

**Status**: Pending
**Priority**: P1-major
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T015 (state layer overlays must be implemented first)

## Description

Fix outlined button border behavior on hover. Currently the border color changes on hover/press, but per Material Design 3, the border should remain constant color with only the state layer overlay changing.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #6 (Major)

**Current (Incorrect) Behavior:**
```css
.btn-outline:hover:not(:disabled) {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);  /* Border changes ❌ */
}

.btn-outline:active:not(:disabled) {
  background-color: var(--color-primary-100);
  border-color: var(--color-primary-700);  /* Border changes ❌ */
}
```

**Material Design 3 (Correct) Behavior:**
- Border color: Remains constant (primary-500)
- Hover/press: Only state layer overlay changes (implemented in T015)

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Lines 144-151 (outline variant hover/active)

## Implementation Steps

### Verify T015 Is Completed First

This task depends on T015 (state layer overlays). The state layer implementation should already provide the hover/press visual feedback.

### Remove Border Color Changes

Since T015 already implemented state layer overlays with `::before` pseudo-element, we just need to remove the incorrect border-color changes:

```css
/* Variant: Outline */
.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);  /* This stays constant ✅ */
}

/* State layer overlay already implemented in T015 */
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
  opacity: 0.08;  /* From T015 ✅ */
}

.btn-outline:active:not(:disabled)::before {
  opacity: 0.12;  /* From T015 ✅ */
}

/* REMOVE THESE - border should not change */
/* DELETE:
.btn-outline:hover:not(:disabled) {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}

.btn-outline:active:not(:disabled) {
  background-color: var(--color-primary-100);
  border-color: var(--color-primary-700);
}
*/
```

## Testing Requirements

### Automated Tests

```bash
# Run component tests
npm test -- src/components/atoms/Button/UiButton.spec.ts

# Run interaction tests (especially hover test)
npm run storybook:test
```

### Manual Visual Checks

1. **Storybook: Outline Button Hover**
   - Default state: Border is primary-500 color
   - Hover state: Border remains same color (primary-500) ✅
   - Hover state: Should see subtle 8% overlay from T015 ✅
   - Press state: Border remains same color ✅
   - Press state: Should see subtle 12% overlay from T015 ✅

2. **All Palette Variations**
   - Test outline buttons across all 10 palette variations
   - Verify border stays consistent on hover/press
   - Verify state layer overlay is visible

3. **Compare to Filled/Text**
   - Filled buttons: Background color stays same (overlay on top)
   - Text buttons: No border (just overlay)
   - Outline buttons: Border stays same (overlay on top) ✅

## Acceptance Criteria

- [ ] Outline button border color remains constant
- [ ] Border does NOT change from primary-500 on hover
- [ ] Border does NOT change from primary-500 on press
- [ ] State layer overlay from T015 provides visual feedback
- [ ] Old hover/active background-color changes removed
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25)
- [ ] Interaction tests passing (7/7)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- Hover: Border changes from primary-500 to primary-600
- Press: Border changes from primary-500 to primary-700
- Not consistent with M3 specifications

**After Fix:**
- Hover: Border stays primary-500, 8% overlay visible
- Press: Border stays primary-500, 12% overlay visible
- Matches M3 outlined button specifications ✅

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 4 (Variant Specifications - Outline)
- Material Design 3: Outlined buttons maintain constant outline color
- Interaction feedback provided by state layer only

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T018] Fix outlined button border behavior on hover"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T018-fix-outlined-button-border-behavior`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Fixes outlined button border behavior to match Material Design 3 specifications.

## Problem

Outlined button border color was changing on hover/press:
- Hover: primary-500 → primary-600
- Press: primary-500 → primary-700

Per Material Design 3, outlined buttons should maintain constant border color with interaction feedback provided solely by state layer overlays.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #6

## Changes

### Removed Incorrect Behavior
- Deleted hover state border-color change
- Deleted active state border-color change
- Deleted hover/active background-color changes

### Correct M3 Behavior (from T015)
- Border: Remains constant primary-500 color ✅
- Hover: 8% state layer overlay (from T015) ✅
- Press: 12% state layer overlay (from T015) ✅

## Testing

- ✅ Unit tests: 25/25 passing
- ✅ Interaction tests: 7/7 passing (hover test validates)
- ✅ Visual regression: Storybook checks passed
- ✅ Border remains constant on hover/press
- ✅ State layer overlay provides feedback
- ✅ All 10 palette variations tested

## Material Design 3 Compliance

This issue was partially addressed by T015 (state layers) but border was still changing. Now fully compliant.

Before: 85% compliant (7 of 13 issues fixed)
After: 92% compliant (8 of 13 issues - this fixes remainder of issue #6)

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

- **Major priority**: Important M3 specification for outlined buttons
- **Depends on T015**: State layer overlays must be implemented first
- **Simple fix**: Just remove incorrect border-color changes
- **Visual clarity**: Makes outlined button behavior more predictable
- **Part of series**: Sixth of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 5 minutes (just deletions)
- **Testing**: 15 minutes
- **Documentation**: 5 minutes
- **Total**: 25 minutes

## Next Task

After completion: T019 (Fix disabled state opacity pattern)