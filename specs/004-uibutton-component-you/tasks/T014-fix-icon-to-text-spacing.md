# Task T014: Fix Icon-to-Text Spacing

**Status**: Pending
**Priority**: P0-critical
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T013 (fix medium button padding)

## Description

Fix critical Material Design 3 compliance issue: Icon-to-text spacing is currently 16px but must be 8px per Material Design 3 specifications.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #2 (Critical)

**Current State:**
```css
.btn-icon-left {
  display: inline-flex;
  margin-right: var(--spacing-2);  /* 16px ❌ */
}

.btn-icon-right {
  display: inline-flex;
  margin-left: var(--spacing-2);  /* 16px ❌ */
}
```

**Expected State:**
```css
.btn-icon-left {
  display: inline-flex;
  margin-right: var(--spacing-1);  /* 8px ✅ */
}

.btn-icon-right {
  display: inline-flex;
  margin-left: var(--spacing-1);  /* 8px ✅ */
}
```

**Discrepancy**: +8px (200% of M3 standard - creates excessive space)

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Lines 217-225

## Implementation Steps

1. Open `UiButton.vue`
2. Locate `.btn-icon-left` CSS class (line 219)
3. Change `margin-right: var(--spacing-2)` to `var(--spacing-1)`
4. Locate `.btn-icon-right` CSS class (line 224)
5. Change `margin-left: var(--spacing-2)` to `var(--spacing-1)`
6. Test buttons with icons in Storybook
7. Verify icon-only buttons are not affected (they have margin: 0)
8. Run unit tests

## Testing Requirements

### Automated Tests

```bash
# Run component tests (specifically icon slot tests)
npm test -- src/components/atoms/Button/UiButton.spec.ts

# Run interaction tests
npm run storybook:test
```

### Manual Visual Checks

1. **Storybook: Icon Button Story**
   - Verify icon-to-text spacing looks tighter (8px not 16px)
   - Check icon-left buttons
   - Check icon-right buttons
   - Check buttons with both icons

2. **Storybook: Loading State Story**
   - Verify loading spinner spacing is correct
   - Loading spinner uses icon-left slot

3. **Storybook: Icon-Only Buttons**
   - Verify icon-only buttons are not affected (should have margin: 0)
   - Padding should still be square via `:has()` selector

4. **All Sizes**
   - Verify spacing is consistent across xs, small, medium, large, xl
   - Icon spacing should be 8px regardless of button size

## Acceptance Criteria

- [ ] Icon-left margin-right changed from 16px to 8px
- [ ] Icon-right margin-left changed from 16px to 8px
- [ ] Visual appearance: icons closer to text (more compact)
- [ ] Icon-only buttons unaffected (margin: 0 still applies)
- [ ] All button sizes tested
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25)
- [ ] Interaction tests passing (7/7)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- Icon-to-text gap: 16px ❌
- Buttons with icons appear too spaced out

**After Fix:**
- Icon-to-text gap: 8px ✅
- Buttons with icons appear more compact and aligned with M3
- Icon-only buttons unchanged (margin: 0)

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 6 (Icon Specifications)
- Material Design 3 icon spacing standard: 8dp

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T014] Fix icon-to-text spacing for M3 compliance"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T014-fix-icon-to-text-spacing`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Fixes critical Material Design 3 compliance issue: icon-to-text spacing.

## Problem

Icon-to-text spacing was 16px, double the Material Design 3 standard of 8dp.
This created excessive visual gap between icons and text labels.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #2

## Changes

- Changed `.btn-icon-left` margin-right from `var(--spacing-2)` (16px) to `var(--spacing-1)` (8px)
- Changed `.btn-icon-right` margin-left from `var(--spacing-2)` (16px) to `var(--spacing-1)` (8px)
- Icon-only buttons unaffected (still use margin: 0)
- Aligns with Material Design 3 specifications

## Testing

- ✅ Unit tests: 25/25 passing (icon slot tests verified)
- ✅ Interaction tests: 7/7 passing
- ✅ Visual regression: Storybook checks passed
- ✅ All button sizes tested (xs, small, medium, large, xl)
- ✅ All 10 palette variations tested
- ✅ Icon-only buttons verified (margin: 0 intact)

## Material Design 3 Compliance

Before: 38% compliant (1 of 13 issues fixed)
After: 46% compliant (2 of 13 issues fixed)

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

- **Critical priority**: Standard M3 icon spacing is 8dp
- **Two line changes**: Both icon-left and icon-right
- **Affects loading state**: Loading spinner also uses icon-left
- **Icon-only safe**: `:has()` selector handles icon-only buttons separately
- **Part of series**: Second of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 5 minutes
- **Testing**: 15 minutes
- **Documentation**: 5 minutes
- **Total**: 25 minutes

## Next Task

After completion: T015 (Implement M3 state layer overlays)