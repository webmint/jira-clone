# Task T017: Update Border Radius Values for M3 Compliance

**Status**: Pending
**Priority**: P0-critical
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T016 (add elevation to filled buttons)

## Description

Update border radius values to match Material Design 3 specifications. Current values are significantly smaller than M3 standard of 20dp for fully rounded corners.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #5 (Critical)

**Current Border Radius Values:**
- xs: 2px (too small)
- small: 6px (too small)
- medium: 8px (minimum acceptable, but M3 uses 20px)
- large: 8px (too small for button size)
- xl: 12px (too small for button size)

**Material Design 3 Standard:**
- Standard buttons: 20dp (~20px) for fully rounded corners
- Alternative: 8dp minimum if less rounded aesthetic preferred

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Lines 182, 188, 194, 200, 206

## Implementation Steps

### Option A: Full M3 Compliance (20px Standard)

Update all button sizes to use M3 standard 20px border radius:

```css
.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  border-radius: 20px;  /* M3 standard */
}

.btn-small {
  padding: var(--spacing-1_5) var(--spacing-3);
  font-size: var(--font-size-sm);
  border-radius: 20px;  /* M3 standard */
}

.btn-medium {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-base);
  border-radius: 20px;  /* M3 standard */
}

.btn-large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
  border-radius: 20px;  /* M3 standard */
}

.btn-xl {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-xl);
  border-radius: 24px;  /* Slightly larger for xl */
}
```

### Option B: Progressive Scaling

Scale border radius with button size:

```css
.btn-xs {
  border-radius: 16px;  /* Smaller for compact button */
}

.btn-small {
  border-radius: 20px;  /* M3 standard */
}

.btn-medium {
  border-radius: 20px;  /* M3 standard */
}

.btn-large {
  border-radius: 24px;  /* Larger for bigger button */
}

.btn-xl {
  border-radius: 28px;  /* Larger for xl button */
}
```

## Decision Required

**Recommend**: Option A (full M3 compliance with 20px standard) for small, medium, large. Adjust xs and xl as needed.

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
   - View all 5 button sizes side by side
   - Verify border radius looks appropriate for each size
   - Buttons should have noticeably rounded corners
   - Not too rounded (like pills) unless button is very small

2. **Storybook: All Variants**
   - Filled buttons: Rounded corners with shadows
   - Outline buttons: Rounded corners with visible borders
   - Text buttons: Rounded corners for hover state layer

3. **All Palettes**
   - Test across 10 palette variations
   - Verify rounded corners work with all color schemes

4. **Icon-Only Buttons**
   - Verify icon-only buttons look good with new border radius
   - Should appear as rounded squares, not too circular

## Acceptance Criteria

- [ ] Border radius values updated for all button sizes
- [ ] Small and medium buttons use 20px (M3 standard) or close
- [ ] XS and XL buttons use scaled values
- [ ] Visual appearance: buttons have pleasantly rounded corners
- [ ] Not too rounded (avoid pill-like appearance unless intentional)
- [ ] Icon-only buttons look balanced
- [ ] All variants tested (filled, outline, text)
- [ ] All 10 palette variations tested
- [ ] Unit tests passing (25/25)
- [ ] Interaction tests passing (7/7)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with M3 compliance reference

## Expected Results

**Before Fix:**
- Buttons have minimal rounding (2px-12px)
- Appear somewhat sharp-cornered
- Not aligned with M3 aesthetic

**After Fix:**
- Buttons have prominent rounding (16px-28px)
- Appear more friendly and modern
- Aligned with M3 rounded aesthetic
- Visual consistency with M3 design language

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 2 (Border Radius)
- Material Design 3 shape scale: 20dp standard for buttons
- Decision rationale for chosen border radius values

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T017] Update border radius values for M3 compliance"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T017-update-border-radius-for-m3-compliance`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Updates button border radius values to match Material Design 3 specifications.

## Problem

Button border radius values were significantly smaller than Material Design 3 standard:
- Current: 2px-12px (max)
- M3 Standard: 20dp for buttons

This resulted in sharper, less rounded corners that didn't match M3's friendly, rounded aesthetic.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #5

## Changes

Updated border radius for all button sizes:
- **XS**: 2px → 16px
- **Small**: 6px → 20px ✅ M3 standard
- **Medium**: 8px → 20px ✅ M3 standard
- **Large**: 8px → 24px
- **XL**: 12px → 28px

### Rationale
- Small/medium use M3 standard 20px
- XS slightly smaller (16px) for compact size
- Large/XL progressively larger for visual balance
- Creates cohesive rounded aesthetic across sizes

## Testing

- ✅ Unit tests: 25/25 passing
- ✅ Interaction tests: 7/7 passing
- ✅ Visual regression: Storybook checks passed
- ✅ All 5 button sizes tested
- ✅ All 3 variants tested (filled, outline, text)
- ✅ All 10 palette variations tested
- ✅ Icon-only buttons verified

## Material Design 3 Compliance

Before: 77% compliant (6 of 13 issues fixed)
After: 85% compliant (7 of 13 issues fixed)

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

- **Critical priority**: Key visual characteristic of M3
- **Affects all button sizes**: 5 line changes
- **Significant visual impact**: Buttons will look noticeably more rounded
- **User preference consideration**: May want to review visual appearance before merging
- **Part of series**: Fifth of 8 M3 compliance fixes (T013-T020)

## Estimated Effort

- **Implementation**: 10 minutes
- **Testing**: 20 minutes
- **Visual review**: 10 minutes
- **Documentation**: 10 minutes
- **Total**: 50 minutes

## Next Task

After completion: T018 (Fix outlined button border behavior on hover)