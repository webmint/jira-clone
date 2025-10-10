# T011: Verify WCAG 2.1 AAA accessibility compliance

**Feature**: 004-uibutton-component-you
**Task ID**: T011
**Type**: Test (Accessibility)
**Parallel**: No (sequential)
**Agent**: Testing Agent
**Priority**: P1 (High)
**Estimated Effort**: 1.5-2 hours

## Description

Perform comprehensive accessibility audit to verify UiButton component meets WCAG 2.1 Level AAA standards. Use automated tools (axe, pa11y) and manual keyboard/screen reader testing.

## Files to Test

- `front/src/components/atoms/Button/UiButton.vue` (component)
- `front/src/components/atoms/Button/UiButton.stories.ts` (Storybook stories)

## Dependencies

- T010 (Documentation complete)

## WCAG 2.1 AAA Requirements

### 1. Color Contrast (Success Criterion 1.4.6)

**Requirement**:

- Normal text (< 18pt): **7:1 contrast ratio**
- Large text (≥ 18pt or ≥ 14pt bold): **4.5:1 contrast ratio**

**Test Procedure**:

1. Use browser DevTools or WebAIM Contrast Checker
2. Test all 3 variants in all 10 palette variations (30 combinations)
3. Test disabled state (50% opacity should still be visible)

**Test Cases**:

```
Filled Variant (all palettes):
- [ ] Corporate Trust Light: primary-500 background vs text-inverse ≥ 7:1
- [ ] Corporate Trust Dark: primary-500 background vs text-inverse ≥ 7:1
- [ ] Creative Energy Light: primary-500 vs text-inverse ≥ 7:1
- [ ] Creative Energy Dark: primary-500 vs text-inverse ≥ 7:1
- [ ] Natural Harmony Light: primary-500 vs text-inverse ≥ 7:1
- [ ] Natural Harmony Dark: primary-500 vs text-inverse ≥ 7:1
- [ ] Warm Welcome Light: primary-500 vs text-inverse ≥ 7:1
- [ ] Warm Welcome Dark: primary-500 vs text-inverse ≥ 7:1
- [ ] Minimalist Light: primary-500 vs text-inverse ≥ 7:1
- [ ] Minimalist Dark: primary-500 vs text-inverse ≥ 7:1

Outline Variant (all palettes):
- [ ] All 10 palettes: text-primary vs surface background ≥ 7:1
- [ ] Border visibility: border-default vs surface background ≥ 3:1

Text Variant (all palettes):
- [ ] All 10 palettes: primary-500 text vs surface background ≥ 7:1
```

**Tools**:

- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Browser DevTools: Inspect element → Color picker → Contrast ratio
- axe DevTools extension (automated)

### 2. Keyboard Navigation (Success Criterion 2.1.1)

**Requirement**: All functionality available via keyboard

**Test Procedure**:

1. Open Storybook button stories
2. Use only keyboard (no mouse)
3. Navigate and interact with all buttons

**Test Cases**:

```
- [ ] Tab key focuses button (visual focus indicator visible)
- [ ] Shift+Tab moves focus backward
- [ ] Enter key activates focused button
- [ ] Space key activates focused button
- [ ] Disabled button not focusable via Tab
- [ ] Focus order is logical (left to right, top to bottom)
- [ ] Focus visible on all variants (filled, outline, text)
- [ ] Focus visible in all palettes
```

### 3. Focus Indicator (Success Criterion 2.4.7)

**Requirement**: Visible focus indicator with sufficient contrast

**Test Procedure**:

1. Tab to button
2. Verify focus outline visible
3. Measure contrast of focus outline against background

**Test Cases**:

```
- [ ] Focus outline visible (2px solid)
- [ ] Focus outline offset (2px from button edge)
- [ ] Focus outline color (var(--color-border-focus))
- [ ] Focus outline contrast ≥ 3:1 against background
- [ ] Focus outline contrast ≥ 3:1 against button
- [ ] :focus-visible used (not :focus) - no focus on mouse click
- [ ] Focus indicator works in all 10 palettes
```

**Tools**:

- Manual keyboard navigation (Tab key)
- Browser DevTools: Inspect element → Computed styles → outline

### 4. ARIA Attributes (Success Criterion 4.1.2)

**Requirement**: Proper name, role, and value for all UI components

**Test Procedures**:

```
- [ ] <button> element used (implicit role="button")
- [ ] aria-label set when ariaLabel prop provided
- [ ] aria-label present on icon-only buttons
- [ ] aria-disabled="true" when disabled prop is true
- [ ] type attribute set correctly (button, submit, reset)
- [ ] No redundant ARIA (button already has role)
```

**Tools**:

- axe DevTools: Scan for ARIA issues
- Browser DevTools: Inspect element → Accessibility tree
- Screen reader: Verify announcement

### 5. Screen Reader Testing (Success Criterion 4.1.2)

**Requirement**: Component usable with screen readers

**Test Procedure**:

1. Enable screen reader (VoiceOver, NVDA, JAWS)
2. Navigate to button stories
3. Verify correct announcements

**Test Cases**:

```
VoiceOver (macOS):
- [ ] Button role announced ("button")
- [ ] Label/text content announced
- [ ] aria-label announced (icon-only buttons)
- [ ] Disabled state announced ("dimmed" or "disabled")
- [ ] Type announced if submit/reset

NVDA (Windows) - if available:
- [ ] Similar to VoiceOver checks

General:
- [ ] No repeated announcements
- [ ] No unclear or confusing announcements
- [ ] Icon-only buttons have clear purpose from aria-label
```

**How to Test**:

- **macOS**: Cmd+F5 to enable VoiceOver, VO+→ to navigate
- **Windows**: Download NVDA (free), Insert+↓ to read
- **Screen reader cheat sheet**: https://dequeuniversity.com/screenreaders/

## Automated Testing Tools

### Install axe-core for Storybook

```bash
npm install --save-dev @storybook/addon-a11y
```

Add to `.storybook/main.ts`:

```typescript
export default {
  addons: ['@storybook/addon-a11y'],
};
```

### Run axe Tests

In Storybook:

1. Navigate to button story
2. Open "Accessibility" panel
3. Review violations (should be 0)
4. Check passes (keyboard, ARIA, color contrast)

### Command-line Testing

```bash
# Install pa11y
npm install --save-dev pa11y

# Run accessibility audit
npx pa11y-ci http://localhost:6006/iframe.html?id=atoms-button--filled
```

## Manual Testing Checklist

### Visual Testing

- [ ] Focus indicator visible on all variants
- [ ] Disabled buttons have 50% opacity
- [ ] Text readable in all variants and palettes
- [ ] Border visible on outline variant

### Keyboard Testing

- [ ] Tab navigation works
- [ ] Enter/Space activate button
- [ ] Disabled buttons not focusable
- [ ] Focus order logical

### Screen Reader Testing

- [ ] Buttons announced correctly
- [ ] aria-label working for icon-only
- [ ] Disabled state announced

### Automated Testing

- [ ] axe DevTools: 0 violations
- [ ] Storybook a11y addon: 0 violations
- [ ] pa11y audit: 0 errors

## Contrast Ratio Testing Script

Create a test file to document contrast ratios:

```typescript
// tests/accessibility/button-contrast-ratios.md

# UiButton Contrast Ratio Audit

Tested: [DATE]
Tool: WebAIM Contrast Checker + Chrome DevTools

## Filled Variant

| Palette | Mode | Background | Text | Ratio | Pass AAA? |
|---------|------|------------|------|-------|-----------|
| Corporate Trust | Light | #0066cc | #ffffff | 7.2:1 | ✅ |
| Corporate Trust | Dark | #3b82f6 | #000000 | 8.1:1 | ✅ |
| ... | ... | ... | ... | ... | ... |

## Outline Variant

| Palette | Mode | Text | Background | Ratio | Pass AAA? |
|---------|------|------|------------|-------|-----------|
| Corporate Trust | Light | #1e293b | #ffffff | 15.4:1 | ✅ |
| ... | ... | ... | ... | ... | ... |

## Text Variant

(Similar table)
```

## Acceptance Criteria

- [ ] All color contrast ratios ≥ 7:1 (normal text)
- [ ] Keyboard navigation fully functional
- [ ] Focus indicator visible and meets 3:1 contrast
- [ ] ARIA attributes correct (role, aria-label, aria-disabled)
- [ ] Screen reader testing passed (VoiceOver)
- [ ] Icon-only buttons have aria-label
- [ ] Disabled state announced by screen readers
- [ ] axe DevTools: 0 violations
- [ ] Storybook a11y addon: 0 violations
- [ ] Contrast audit documented
- [ ] All 10 palette variations tested
- [ ] WCAG 2.1 AAA compliance verified

## Remediation Plan

If violations found:

**Low Contrast**:

- Adjust design token values in tokens.css
- Darken/lighten colors to meet 7:1 ratio
- Test again after adjustment

**Missing ARIA**:

- Add aria-label validation in tests
- Update component template
- Document requirement in JSDoc

**Focus Not Visible**:

- Increase outline width (2px → 3px)
- Change outline color for better contrast
- Test in all palettes

**Keyboard Issues**:

- Verify `<button>` element used (not `<div>`)
- Check disabled state prevents focus
- Verify Enter/Space handlers

## Test Status After Completion

Expected results:

- ✅ All WCAG 2.1 AAA criteria met
- ✅ 0 violations in automated tools
- ✅ Manual testing passed
- ✅ Contrast ratios documented

## Next Task

After completion: T012 (Run full test suite and verify coverage)

## Notes

- WCAG AAA is stricter than AA (7:1 vs 4.5:1)
- Use `:focus-visible` not `:focus` (better UX)
- Icon-only buttons MUST have aria-label
- Test with real assistive technology when possible
- Automated tools catch ~40% of issues - manual testing essential
- Document all contrast ratios for design system reference
- If any palette fails contrast, adjust tokens.css
- Accessibility is non-negotiable - all tests must pass
