# Task T019: Fix Disabled State Opacity Pattern

**Status**: Pending
**Priority**: P1-major
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T018 (outlined button fix)

## Description

Fix disabled button state to use Material Design 3 opacity pattern. Currently using 50% opacity on entire button, but M3 specifies different opacity values for container (12%) and label (38%) separately.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #7 (Major)

**Current (Incorrect) Pattern:**
```css
.btn:disabled {
  opacity: 0.5;  /* 50% on entire button ❌ */
  cursor: not-allowed;
  pointer-events: none;
}
```

**Material Design 3 (Correct) Pattern:**
- Container: 12% opacity (0.12)
- Label/content: 38% opacity (0.38)
- Applied separately for proper visual hierarchy

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Lines 209-214 (disabled state)

## Implementation Steps

### Update Filled Button Disabled State

```css
/* Disabled state - Filled buttons */
.btn-filled:disabled {
  background-color: var(--color-on-surface);
  opacity: 0.12;  /* Container 12% ✅ */
  color: var(--color-on-surface);
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;  /* Remove elevation when disabled */
}

.btn-filled:disabled .btn-content,
.btn-filled:disabled .btn-icon-left,
.btn-filled:disabled .btn-icon-right {
  opacity: 0.38;  /* Label 38% ✅ */
}
```

### Update Outline Button Disabled State

```css
/* Disabled state - Outline buttons */
.btn-outline:disabled {
  border-color: var(--color-on-surface);
  opacity: 0.12;  /* Container 12% ✅ */
  color: var(--color-on-surface);
  cursor: not-allowed;
  pointer-events: none;
}

.btn-outline:disabled .btn-content,
.btn-outline:disabled .btn-icon-left,
.btn-outline:disabled .btn-icon-right {
  opacity: 0.38;  /* Label 38% ✅ */
}
```

### Update Text Button Disabled State

```css
/* Disabled state - Text buttons */
.btn-text:disabled {
  color: var(--color-on-surface);
  opacity: 0.38;  /* Text only, use label opacity ✅ */
  cursor: not-allowed;
  pointer-events: none;
}
```

### Remove Old Generic Disabled Rule

```css
/* REMOVE THIS */
/* DELETE:
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
*/
```

## Testing Requirements

### Automated Tests

```bash
# Run component tests (disabled state tests)
npm test -- src/components/atoms/Button/UiButton.spec.ts

# Run interaction tests (DisabledNoClick story)
npm run storybook:test
```

### Manual Visual Checks

1. **Storybook: Disabled State Story**
   - Filled disabled: Very subtle background (12%), more visible label (38%)
   - Outline disabled: Very subtle border (12%), more visible label (38%)
   - Text disabled: Label at 38% opacity
   - All should be clearly disabled but label should be more readable than container

2. **Verify No Shadows on Disabled Filled Buttons**
   - Disabled filled buttons should have no elevation/shadow
   - Should appear flat when disabled

3. **All Sizes**
   - Test disabled state across all 5 button sizes
   - Opacity pattern should be consistent

4. **All Palettes**
   - Test disabled buttons across all 10 palette variations
   - Should use `on-surface` color for neutral disabled appearance

## Acceptance Criteria

- [ ] Filled disabled: Container 12% opacity, label 38% opacity
- [ ] Outline disabled: Border/container 12% opacity, label 38% opacity
- [ ] Text disabled: 38% opacity (label only)
- [ ] Disabled filled buttons have no shadow (box-shadow: none)
- [ ] Disabled buttons use `--color-on-surface` for neutral color
- [ ] Old generic `.btn:disabled` rule removed
- [ ] Disabled state clearly visible but label more readable than container
- [ ] All 3 variants tested
- [ ] All 5 sizes tested
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25 - disabled state tests)
- [ ] Interaction tests passing (7/7 - DisabledNoClick validates)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- All disabled buttons: 50% opacity on entire button
- Less readable labels
- Not following M3 opacity hierarchy

**After Fix:**
- Filled disabled: 12% container + 38% label
- Outline disabled: 12% border + 38% label
- Text disabled: 38% label
- Follows M3 opacity pattern for better hierarchy
- More readable while still clearly disabled

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 5 (State Specifications - Disabled)
- Material Design 3 disabled state opacity: Container 12%, Label 38%
- Rationale: Different opacities create proper visual hierarchy

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T019] Fix disabled state opacity pattern"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T019-fix-disabled-state-opacity-pattern`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Fixes disabled button state to use Material Design 3 opacity pattern.

## Problem

Disabled buttons used single 50% opacity on entire button, which doesn't match Material Design 3 specifications. M3 uses different opacity values for container (12%) and label (38%) to create proper visual hierarchy.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #7

## Changes

### Filled Buttons
- Container: 12% opacity (very subtle)
- Label: 38% opacity (more visible for readability)
- Shadow removed when disabled
- Uses `on-surface` color for neutral appearance

### Outlined Buttons
- Border/container: 12% opacity (very subtle)
- Label: 38% opacity (more visible for readability)
- Uses `on-surface` color for neutral appearance

### Text Buttons
- Label: 38% opacity (no container)
- Uses `on-surface` color for neutral appearance

### Removed
- Generic `.btn:disabled` rule with 50% opacity

## Testing

- ✅ Unit tests: 25/25 passing (disabled state tests verified)
- ✅ Interaction tests: 7/7 passing (DisabledNoClick validates behavior)
- ✅ Visual regression: Storybook checks passed
- ✅ All 3 variants tested
- ✅ All 5 sizes tested
- ✅ All 10 palette variations tested
- ✅ Disabled states clearly visible but more readable

## Material Design 3 Compliance

Before: 92% compliant (8 of 13 issues fixed)
After: 100% compliant for major issues (9 of 13 total, all P0/P1 complete)

Remaining: Minor issues only (icon size, line-height, font size review, custom extensions)

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

- **Major priority**: Proper M3 disabled state implementation
- **Affects all variants**: Different implementation per variant
- **Visual improvement**: Better label readability when disabled
- **Color tokens**: Need `--color-on-surface` token (should exist)
- **Part of series**: Seventh of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 20 minutes
- **Testing**: 20 minutes
- **Documentation**: 10 minutes
- **Total**: 50 minutes

## Next Task

After completion: T020 (Review and adjust font sizes for M3 compliance)