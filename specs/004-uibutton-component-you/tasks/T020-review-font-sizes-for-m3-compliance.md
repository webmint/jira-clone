# Task T020: Review and Adjust Font Sizes for M3 Compliance

**Status**: Pending
**Priority**: P1-major
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T019 (disabled state fix)

## Description

Review and adjust button font sizes to align with Material Design 3 typography specifications. Currently medium and large buttons use larger font sizes than M3 standard.

**Issue Identified**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #8 (Major)

**Current Font Sizes:**
- xs: 12px (`--font-size-xs`) - Custom
- small: 14px (`--font-size-sm`) - ✅ Matches M3
- medium: 16px (`--font-size-base`) - ⚠️ Larger than M3 (14sp)
- large: 20px (`--font-size-lg`) - ❌ Much larger than M3 (14sp)
- xl: 24px (`--font-size-xl`) - Custom

**Material Design 3 Standard:**
- Label Large: 14sp, 500 weight, 20sp line-height
- Used for all standard button sizes

## Files to Modify

- `front/src/components/atoms/Button/UiButton.vue` - Font size definitions for button sizes

## Decision Required

Should we:
1. **Full M3 Compliance**: Use 14px for all standard sizes (small, medium, large)
2. **Partial Compliance**: Keep 16px for medium, use 14px for small, adjust large
3. **Custom System**: Keep current progressive sizing as intentional deviation

**Recommendation**: Option 2 (Partial Compliance) - document intentional sizing decisions while aligning where reasonable.

## Implementation Steps

### Option 1: Full M3 Compliance

```css
.btn-small {
  padding: var(--spacing-1_5) var(--spacing-3);
  font-size: 14px;  /* M3 Label Large ✅ */
  border-radius: 20px;
}

.btn-medium {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: 14px;  /* M3 Label Large ✅ */
  border-radius: 20px;
}

.btn-large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: 14px;  /* M3 Label Large ✅ */
  border-radius: 24px;
}
```

### Option 2: Partial Compliance (Recommended)

```css
.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: 12px;  /* Custom - compact */
  border-radius: 16px;
}

.btn-small {
  padding: var(--spacing-1_5) var(--spacing-3);
  font-size: 14px;  /* M3 Label Large ✅ */
  border-radius: 20px;
}

.btn-medium {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: 16px;  /* Slightly larger for readability */
  border-radius: 20px;
  line-height: 1.25;  /* Add explicit line-height */
}

.btn-large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: 18px;  /* Reduced from 20px */
  border-radius: 24px;
  line-height: 1.25;
}

.btn-xl {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: 20px;  /* Reduced from 24px */
  border-radius: 28px;
  line-height: 1.25;
}
```

### Add Explicit Typography Properties

For any size that deviates from M3, add explicit typography:

```css
.btn {
  font-weight: var(--font-weight-medium);  /* 500 - Already correct ✅ */
  line-height: 1.25;  /* ~20px at 16px base - ADD THIS */
  letter-spacing: 0.00625em;  /* 0.1px - ADD THIS */
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

1. **Storybook: Size Comparison Story**
   - View all 5 button sizes side by side
   - Verify font sizes look appropriate for button size
   - Ensure text is readable at all sizes
   - Check text doesn't look too large or too small

2. **Storybook: All Variants**
   - Filled buttons: Font size appropriate for button size
   - Outline buttons: Font size matches
   - Text buttons: Font size matches

3. **Real-World Context**
   - Test buttons in realistic UI layouts
   - Verify medium buttons work well as primary actions
   - Verify small buttons work for secondary actions

4. **Accessibility**
   - Ensure minimum font size meets accessibility standards
   - Small text should be at least 14px for readability

## Acceptance Criteria

- [ ] Font sizes reviewed and adjusted per chosen option
- [ ] Small buttons use 14px (M3 Label Large) ✅
- [ ] Medium buttons use decided size (14px, 16px, or other)
- [ ] Large buttons use adjusted size (not 20px)
- [ ] XL buttons use adjusted size (not 24px)
- [ ] Explicit line-height and letter-spacing added
- [ ] Visual appearance: text readable and proportional
- [ ] Decision documented in PR description
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
- Medium: 16px (11% larger than M3)
- Large: 20px (43% larger than M3)
- XL: 24px (71% larger than M3)
- Progressive sizing but deviates from M3

**After Fix (Option 2 Recommended):**
- Small: 14px ✅ M3 compliant
- Medium: 16px (documented deviation for readability)
- Large: 18px (closer to M3, reduced from 20px)
- XL: 20px (reduced from 24px)
- More balanced progression, closer to M3

## Documentation Updates

Update PR description to reference:
- MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Section 3 (Typography)
- Material Design 3 Label Large: 14sp, 500 weight, 20sp line-height
- Document chosen option and rationale
- If deviating from M3, explain reasoning (e.g., "16px for medium improves readability for primary actions")

## GitHub Issue

**Issue**: #[issue-number]
**Title**: "[T020] Review and adjust font sizes for M3 compliance"
**Link**: https://github.com/webmint/jira-clone/issues/[issue-number]

## Sub-branch

**Branch**: `spec/004-uibutton-component-you/T020-review-font-sizes-for-m3-compliance`
**Base**: `004-uibutton-component-you`

## PR Template

```markdown
## Summary

Reviews and adjusts button font sizes for closer alignment with Material Design 3 typography.

## Problem

Button font sizes progressively increased with button size, resulting in:
- Medium: 16px (vs M3 standard 14sp)
- Large: 20px (vs M3 standard 14sp)
- XL: 24px (no M3 equivalent)

This created excessive font sizes for larger buttons.

**Reference**: MATERIAL_DESIGN_3_COMPARISON_REPORT.md - Issue #8

## Changes

### Font Size Adjustments
- **XS**: 12px (unchanged - custom compact size)
- **Small**: 14px ✅ (unchanged - matches M3 Label Large)
- **Medium**: 16px (kept for readability, documented deviation)
- **Large**: 18px (reduced from 20px)
- **XL**: 20px (reduced from 24px)

### Typography Additions
- Added explicit `line-height: 1.25` to all button sizes
- Added explicit `letter-spacing: 0.00625em` to base button
- Ensures consistent typography across sizes

### Rationale
- Small buttons fully M3 compliant (14px)
- Medium buttons use 16px for better readability as primary actions
- Large/XL reduced but remain larger for visual hierarchy
- Documents intentional deviation from M3 where beneficial

## Testing

- ✅ Unit tests: 25/25 passing
- ✅ Interaction tests: 7/7 passing
- ✅ Visual regression: Storybook checks passed
- ✅ All 5 sizes tested
- ✅ All 3 variants tested
- ✅ All 10 palette variations tested
- ✅ Text readable and proportional
- ✅ Real-world context validated

## Material Design 3 Compliance

Before: 100% of P0/P1 issues fixed (9 of 13 total)
After: 100% of P0/P1 issues fixed (10 of 13 total, P1 font sizing addressed)

**Overall M3 Compliance**: ~95% (with documented, intentional deviations)

Remaining: Minor issues only (icon size adjustment, custom size extensions documentation)

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

- **Major priority**: Typography is key to M3 aesthetics
- **User input valuable**: Visual preference for font sizes
- **Documented deviations**: Any non-M3 sizes should be documented
- **Accessibility**: Ensure minimum 14px for readability
- **Part of series**: Eighth and final M3 compliance fix (T013-T020)

## Estimated Effort

- **Research/decision**: 15 minutes
- **Implementation**: 15 minutes
- **Testing**: 25 minutes
- **Documentation**: 15 minutes
- **Total**: 70 minutes

## Next Task

After completion: All M3 compliance tasks complete. Return to T010-T012 (original spec tasks) after user verification.

## Final M3 Compliance Status

After completing T013-T020:
- **P0 Critical**: 5/5 fixed (100%)
- **P1 Major**: 5/5 fixed (100%)
- **P2 Minor**: 0/3 fixed (documented, not blocking)
- **Overall**: 10/13 issues fixed (77%) + documented deviations
- **Effective Compliance**: ~95% with intentional design decisions