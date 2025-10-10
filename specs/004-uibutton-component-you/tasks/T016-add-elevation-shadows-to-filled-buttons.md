# Task T016: Add Elevation/Shadows to Filled Buttons

**Status**: Pending
**Priority**: P0-critical
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T015 (implement state layer overlays)

## Description

Add Material Design 3 elevation (shadows) to filled buttons. Currently filled buttons appear flat, but M3 specifies elevation with subtle shadows for filled buttons.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #4 (Critical)

**Material Design 3 Elevation Levels:**
- Default: Elevation 1 (subtle shadow)
- Hover: Elevation 2 (slightly more prominent)
- Pressed: Elevation 1 (same as default)

## Files to Modify

- `front/src/designSystem/styles/tokens.css` - Add elevation tokens
- `front/src/components/atoms/Button/UiButton.vue` - Apply elevation to filled buttons

## Implementation Steps

### 1. Add Elevation Tokens to Design System

Add to `tokens.css` after shadows section (around line 79):

```css
/* ==========================================================================
   ELEVATION (Material Design 3)
   ========================================================================== */

/* Elevation Level 0 - No shadow */
--elevation-0: none;

/* Elevation Level 1 - Default filled button */
--elevation-1: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
               0px 1px 3px 1px rgba(0, 0, 0, 0.15);

/* Elevation Level 2 - Hover state */
--elevation-2: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
               0px 2px 6px 2px rgba(0, 0, 0, 0.15);

/* Elevation Level 3 - Raised elements */
--elevation-3: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
               0px 4px 8px 3px rgba(0, 0, 0, 0.15);

/* Elevation Level 4 - Floating elements */
--elevation-4: 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
               0px 6px 10px 4px rgba(0, 0, 0, 0.15);

/* Elevation Level 5 - Modal/dialog */
--elevation-5: 0px 4px 4px 0px rgba(0, 0, 0, 0.3),
               0px 8px 12px 6px rgba(0, 0, 0, 0.15);
```

### 2. Apply Elevation to Filled Buttons

Update `.btn-filled` in `UiButton.vue`:

```css
/* Variant: Filled */
.btn-filled {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  box-shadow: var(--elevation-1);  /* ADD THIS */
}

.btn-filled:hover:not(:disabled) {
  box-shadow: var(--elevation-2);  /* ADD THIS */
}

.btn-filled:active:not(:disabled) {
  box-shadow: var(--elevation-1);  /* ADD THIS */
}

/* Keep existing ::before state layer from T015 */
```

### 3. Ensure Outline and Text Buttons Stay Flat

Verify outline and text buttons do NOT have elevation:

```css
/* Variant: Outline - should be flat */
.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
  /* No box-shadow ✅ */
}

/* Variant: Text - should be flat */
.btn-text {
  background-color: transparent;
  color: var(--color-primary-500);
  /* No box-shadow ✅ */
}
```

## Testing Requirements

### Automated Tests

```bash
# Run component tests
npm test -- src/components/atoms/Button/UiButton.spec.ts

# Run interaction tests
npm run storybook:test
```

### Manual Visual Checks

1. **Storybook: Filled Button**
   - Default state: Should have subtle shadow (elevation 1)
   - Hover state: Shadow should become slightly more prominent (elevation 2)
   - Pressed state: Shadow should return to default (elevation 1)
   - Shadow should be subtle, not harsh

2. **Storybook: Outline Button**
   - Should remain flat (no shadow)
   - Only state layer overlay on hover/press

3. **Storybook: Text Button**
   - Should remain flat (no shadow)
   - Only state layer overlay on hover/press

4. **All Sizes**
   - Verify elevation works consistently across all button sizes
   - Shadow should scale appropriately

5. **All Palettes**
   - Test filled buttons across 10 palette variations
   - Shadow should be visible on both light and dark backgrounds

## Acceptance Criteria

- [ ] Elevation tokens added to design system (`tokens.css`)
- [ ] Filled buttons have `box-shadow: var(--elevation-1)` default
- [ ] Filled buttons have `box-shadow: var(--elevation-2)` on hover
- [ ] Filled buttons have `box-shadow: var(--elevation-1)` on press
- [ ] Outline buttons remain flat (no shadow)
- [ ] Text buttons remain flat (no shadow)
- [ ] Visual appearance: filled buttons have subtle depth
- [ ] Shadow visible on light and dark backgrounds
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25)
- [ ] Interaction tests passing (7/7)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- Filled buttons appear completely flat
- No visual depth or elevation

**After Fix:**
- Filled buttons have subtle shadow (elevation 1)
- Shadow increases slightly on hover (elevation 2)
- Creates sense of depth and tangibility
- Matches Material Design 3 elevation system

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 7 (Elevation & Shadows)
- Material Design 3 elevation system documentation
- Elevation levels used: 1 (default), 2 (hover)

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T016] Add elevation/shadows to filled buttons"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T016-add-elevation-shadows-to-filled-buttons`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Adds Material Design 3 elevation (shadows) to filled buttons for proper depth and visual hierarchy.

## Problem

Filled buttons appeared completely flat without shadows, which is incorrect per Material Design 3 specifications. M3 specifies elevation levels for filled buttons to convey interactivity and hierarchy.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #4

## Changes

### Design System Tokens (`tokens.css`)
- Added elevation token system (elevation-0 through elevation-5)
- Based on Material Design 3 elevation specifications
- Uses subtle shadows with multiple layers for depth

### Filled Buttons (`UiButton.vue`)
- Default: `elevation-1` (subtle shadow)
- Hover: `elevation-2` (slightly raised)
- Pressed: `elevation-1` (returns to default)

### Other Variants
- Outline buttons: Remain flat (no elevation) ✅
- Text buttons: Remain flat (no elevation) ✅

## Testing

- ✅ Unit tests: 25/25 passing
- ✅ Interaction tests: 7/7 passing
- ✅ Visual regression: Storybook checks passed
- ✅ Filled buttons have visible but subtle shadows
- ✅ Outline/text buttons remain flat
- ✅ All 10 palette variations tested
- ✅ Shadow visible on light and dark backgrounds

## Material Design 3 Compliance

Before: 69% compliant (5 of 13 issues fixed)
After: 77% compliant (6 of 13 issues fixed)

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

- **Critical priority**: Essential M3 visual characteristic
- **Affects 2 files**: Design system tokens + button component
- **Visual impact**: Adds depth to filled buttons
- **Subtle effect**: Shadows should be noticeable but not harsh
- **Part of series**: Fourth of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 20 minutes
- **Testing**: 20 minutes
- **Documentation**: 10 minutes
- **Total**: 50 minutes

## Next Task

After completion: T017 (Update border radius values for M3 compliance)