# Task T033: Fix WCAG Contrast Ratio Failures Across All Palettes

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T031 (contrast tests written)

## Description

Fix 51 failing WCAG contrast ratio tests identified during UiButton component implementation. The design system tokens currently don't meet WCAG AA standards (4.5:1 for text, 3:1 for UI components) across all 10 palette variations (5 palettes × 2 modes).

**Critical**: This is a **design system-level issue**, not specific to any component. All components using design tokens are affected.

## Problem Summary

### Test Failures Breakdown

- **Total failing**: 51 tests
- **Total passing**: 20 tests
- **Success rate**: 28% (unacceptable for production)

### Failing Token Combinations

All failures occur when testing these tokens against `--color-background-default`:

1. `--color-text-primary` (must meet 4.5:1 ratio)
2. `--color-text-secondary` (must meet 4.5:1 ratio)
3. `--color-text-tertiary` (must meet 4.5:1 ratio)
4. `--color-primary-500` (must meet 4.5:1 for text, 3:1 for borders)
5. `--color-border-default` (must meet 3:1 ratio for UI components)

### Affected Palettes

All 10 variations failing:

**Light Mode**:
- corporate-trust.light
- creative-energy.light
- natural-harmony.light
- warm-welcome.light
- minimalist.light

**Dark Mode**:
- corporate-trust.dark
- creative-energy.dark
- natural-harmony.dark
- warm-welcome.dark
- minimalist.dark

## Files to Modify

- `front/src/designSystem/styles/tokens.css` - Color token definitions
- Potentially: Palette source files if tokens are generated

## Dependencies

**Blocked By**: T031 (tests exist to validate fixes)
**Blocks**: Production deployment of any component using design tokens

## Root Cause Analysis

The design system tokens were created with visual aesthetics prioritized over WCAG compliance. Common issues:

1. **Text colors too light**: Insufficient contrast against backgrounds
2. **Border colors too subtle**: Don't meet 3:1 UI component requirement
3. **Primary colors**: Not tested against all background variations
4. **Mode-specific issues**: Light/dark mode colors may need different adjustments

## Fix Strategy

### Phase 1: Audit Current Values (30 min)

1. Run contrast tests and capture all failing color pairs
2. Document current contrast ratios for each failing pair
3. Calculate required adjustments (how much darker/lighter needed)
4. Identify patterns (e.g., all text-secondary values need +20% darkness)

### Phase 2: Calculate Compliant Colors (1 hour)

For each failing token:

1. Extract current color value
2. Use contrast calculation to determine target lightness
3. Adjust lightness while preserving hue and chroma
4. Verify new value meets minimum ratio
5. Ensure color still looks visually appropriate

### Phase 3: Update Token Values (1 hour)

1. Update `tokens.css` with new compliant values
2. Maintain semantic naming consistency
3. Document changes in comments
4. Ensure all 10 palette variations updated

### Phase 4: Validation (30 min)

1. Run full contrast test suite
2. Verify 100% tests passing
3. Visual regression check in Storybook
4. Component spot-checks (UiButton, text, borders)

## WCAG Standards Reference

### Text Contrast Requirements (WCAG AA)

- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text**: 3:1 minimum contrast ratio (18pt+ or 14pt+ bold)

### UI Component Requirements (WCAG AA)

- **Borders**: 3:1 minimum contrast ratio
- **Icons**: 3:1 minimum contrast ratio
- **Interactive controls**: 3:1 minimum contrast ratio

### Calculation Formula

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
```

Where:
- L1 = relative luminance of lighter color
- L2 = relative luminance of darker color
- Ratio ranges from 1:1 (same color) to 21:1 (black on white)

## Implementation Example

### Before (Failing)

```css
.corporate-trust.light {
  --color-text-primary: oklch(45% 0.08 220); /* Only achieves 3.2:1 - FAILS */
  --color-text-secondary: oklch(60% 0.05 220); /* Only achieves 2.1:1 - FAILS */
  --color-border-default: oklch(85% 0.02 220); /* Only achieves 1.8:1 - FAILS */
}
```

### After (Compliant)

```css
.corporate-trust.light {
  --color-text-primary: oklch(30% 0.08 220); /* Achieves 7.5:1 ✅ AAA */
  --color-text-secondary: oklch(45% 0.05 220); /* Achieves 4.8:1 ✅ AA */
  --color-border-default: oklch(70% 0.02 220); /* Achieves 3.2:1 ✅ AA */
}
```

**Note**: Actual values must be calculated, not guessed. Use contrast calculation tools.

## Tools & Utilities

### Available Tools

1. **Existing validation function**: `validateContrastRatios()` in `validation.ts`
2. **Existing contrast calculation**: `getContrastRatio()` in `validation.ts`
3. **Color extraction**: `getCSSVariableForPalette()` in `validation.ts`

### Manual Testing Tools

- Chrome DevTools: Inspect element → Styles → Color picker shows contrast ratio
- Online: https://webaim.org/resources/contrastchecker/
- Online: https://contrast-ratio.com/

### Automated Script (Optional)

Create a helper script to calculate required adjustments:

```typescript
// scripts/fix-contrast.ts
import { validateContrastRatios } from '../src/designSystem/tokens/validation';

const failingTokens = [
  { foreground: '--color-text-primary', background: '--color-background-default', required: 4.5 },
  { foreground: '--color-text-secondary', background: '--color-background-default', required: 4.5 },
  // ... etc
];

failingTokens.forEach(check => {
  // Calculate current ratio
  // Suggest adjusted value
  // Output recommendations
});
```

## Acceptance Criteria

- [ ] All 71 contrast tests passing (100% success rate)
- [ ] Text-primary meets 4.5:1 on all 10 variations
- [ ] Text-secondary meets 4.5:1 on all 10 variations
- [ ] Text-tertiary meets 4.5:1 on all 10 variations
- [ ] Primary-500 meets 4.5:1 on all 10 variations
- [ ] Border-default meets 3:1 on all 10 variations
- [ ] Visual regression check: buttons look good in Storybook
- [ ] No component regressions (spot-check UiButton, text, forms)
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 errors
- [ ] Git commit follows standards
- [ ] PR created with detailed changes

## Testing Requirements

### Automated Tests

```bash
# Run contrast validation tests
npm test -- tests/unit/designSystem/tokens/contrast.spec.ts

# Expected output:
# ✓ Tests passed: 71/71
# ✓ Success rate: 100%
```

### Manual Visual Checks

1. **Storybook: Colors Story**
   - View all palettes in light mode
   - View all palettes in dark mode
   - Verify text is readable, not too dark/light
   - Check borders are visible but not harsh

2. **Storybook: UiButton Story**
   - Switch through all 10 palette variations
   - Verify buttons look visually appealing
   - Check hover states maintain good contrast
   - Test disabled states

3. **Storybook: Typography Story**
   - Check text-primary, text-secondary, text-tertiary
   - Verify hierarchy still clear
   - Ensure colors look professional, not washed out

## Expected Results

**Before Fix**:
```
Test Suites: 1 failed, 1 total
Tests:       51 failed, 20 passed, 71 total
```

**After Fix**:
```
Test Suites: 1 passed, 1 total
Tests:       71 passed, 71 total
```

## Documentation Updates

Update the following documentation after fixes:

1. **Design System README**: Note that all colors are WCAG AA compliant
2. **Token documentation**: Document minimum contrast ratios
3. **Component guidelines**: Reference accessibility standards
4. **CLAUDE.md**: Update with accessibility achievement

## GitHub Issue

**Issue**: #131
**Title**: "Fix WCAG contrast failures across all palette variations"
**Link**: https://github.com/webmint/jira-clone/issues/131

## Sub-branch

**Branch**: `spec/002-design-system/T033-fix-wcag-contrast-failures`
**Base**: `main`

## PR Template

```markdown
## Summary

Fixes 51 WCAG contrast ratio test failures by adjusting color token values across all 10 palette variations.

## Problem

Design system color tokens didn't meet WCAG AA standards:
- Text colors: Required 4.5:1, achieved 2-3:1
- Border colors: Required 3:1, achieved 1.5-2:1

Affected all 5 palettes in both light and dark modes (10 variations total).

## Changes

### Adjusted Tokens

- `--color-text-primary`: Increased darkness/lightness for 4.5:1+ contrast
- `--color-text-secondary`: Increased darkness/lightness for 4.5:1+ contrast
- `--color-text-tertiary`: Increased darkness/lightness for 4.5:1+ contrast
- `--color-primary-500`: Adjusted for 4.5:1+ contrast when used as text
- `--color-border-default`: Increased contrast for 3:1+ ratio

### Palettes Updated

- ✅ corporate-trust (light + dark)
- ✅ creative-energy (light + dark)
- ✅ natural-harmony (light + dark)
- ✅ warm-welcome (light + dark)
- ✅ minimalist (light + dark)

## Testing

- ✅ Contrast tests: 71/71 passing (100%)
- ✅ Visual regression: Storybook checks passed
- ✅ Component checks: UiButton, typography, forms look good
- ✅ All 10 palette variations tested

## Accessibility

- ✅ WCAG 2.1 Level AA compliant
- ✅ Text contrast: 4.5:1 minimum achieved
- ✅ UI components: 3:1 minimum achieved

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

- **High priority**: Blocks production deployment
- **Pre-existing issue**: Not introduced by recent work
- **Systematic fix**: All palettes need updates, not just one
- **Visual impact**: Colors will look slightly darker/lighter but more accessible
- **User benefit**: Significantly improved readability and accessibility
- **Standards compliance**: Required for WCAG 2.1 Level AA certification

## Estimated Effort

- **Planning & audit**: 30 minutes
- **Color calculations**: 1 hour
- **Token updates**: 1 hour
- **Testing & validation**: 30 minutes
- **Documentation**: 30 minutes
- **Total**: 3-4 hours

## Next Task

After completion: Return to spec 004 (UiButton) task sequence, or proceed with other component implementations knowing design system is now compliant.