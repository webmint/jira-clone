# Task T013: Fix Medium Button Horizontal Padding

**Status**: Pending
**Priority**: P0-critical
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T009 (completed)

## Description

Fix critical Material Design 3 compliance issue: Medium button horizontal padding is currently 32px but must be 24px per Material Design 3 specifications.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #1 (Critical)

**Current State:**
```css
.btn-medium {
  padding: var(--spacing-2) var(--spacing-4);  /* 16px 32px ❌ */
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-lg);
}
```

**Expected State:**
```css
.btn-medium {
  padding: var(--spacing-2) var(--spacing-3);  /* 16px 24px ✅ */
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-lg);
}
```

**Discrepancy**: +8px (33% larger than M3 standard)

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Line 192

## Implementation Steps

1. Open `UiButton.vue`
2. Locate `.btn-medium` CSS class (line 192)
3. Change `var(--spacing-4)` to `var(--spacing-3)` for horizontal padding
4. Verify height remains ~56px
5. Test in Storybook across all 10 palette variations
6. Run unit tests
7. Visual regression check

## Testing Requirements

### Automated Tests

```bash
# Run component tests
npm test -- src/components/atoms/Button/UiButton.spec.ts

# Run interaction tests
npm run storybook:test
```

### Manual Visual Checks

1. **Storybook: Size Comparison Story**
   - Verify medium button horizontal padding looks correct
   - Compare with small button (should have same 24px padding)
   - Ensure button doesn't look too narrow

2. **Storybook: All Palette Variations**
   - Test medium button in all 10 palette variations
   - Verify visual appearance is consistent

3. **Measurement Verification**
   - Use browser DevTools to measure padding
   - Confirm left/right padding is 24px
   - Confirm height is still ~56px

## Acceptance Criteria

- [ ] Medium button horizontal padding changed from 32px to 24px
- [ ] Medium button height remains ~56px
- [ ] Visual appearance looks good in Storybook
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25)
- [ ] Interaction tests passing (7/7)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- Medium button padding: 16px 32px
- Horizontal padding: 32px ❌

**After Fix:**
- Medium button padding: 16px 24px
- Horizontal padding: 24px ✅
- Height: ~56px ✅ (unchanged)
- Matches Material Design 3 specification

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md
- Material Design 3 button specifications
- User-confirmed measurements (56dp height, 24dp padding)

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T013] Fix medium button horizontal padding for M3 compliance"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T013-fix-medium-button-horizontal-padding`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Fixes critical Material Design 3 compliance issue: medium button horizontal padding.

## Problem

Medium button horizontal padding was 32px, exceeding Material Design 3 standard of 24dp.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #1

## Changes

- Changed `.btn-medium` horizontal padding from `var(--spacing-4)` (32px) to `var(--spacing-3)` (24px)
- Height remains unchanged at ~56px ✅
- Aligns with Material Design 3 specifications

## Testing

- ✅ Unit tests: 25/25 passing
- ✅ Interaction tests: 7/7 passing
- ✅ Visual regression: Storybook checks passed
- ✅ All 10 palette variations tested
- ✅ Measurements verified: 24px horizontal padding, ~56px height

## Material Design 3 Compliance

Before: 30% compliant
After: 38% compliant (1 of 13 issues fixed)

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

- **Critical priority**: Confirmed by user as measurement discrepancy
- **Single file change**: Only UiButton.vue affected
- **Minimal risk**: Simple padding adjustment
- **User verified**: Measurements confirmed from M3 specs image
- **Part of series**: First of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 5 minutes
- **Testing**: 15 minutes
- **Documentation**: 5 minutes
- **Total**: 25 minutes

## Next Task

After completion: T014 (Fix icon-to-text spacing)