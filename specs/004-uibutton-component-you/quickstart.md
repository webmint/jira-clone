# Quick Start: UiButton Component Testing

**Feature**: 004-uibutton-component-you
**Component**: `UiButton.vue`
**Test Environment**: Storybook + Browser DevTools

## Prerequisites

1. ✅ Repository cloned
2. ✅ Dependencies installed (`npm install`)
3. ✅ Storybook configured (`.storybook/` directory exists)

## Starting Storybook

```bash
cd front
npm run storybook
```

**Expected**: Storybook opens at `http://localhost:6006`

---

## Manual Testing Checklist

### Test 1: Visual Variants

**Location**: Storybook → Atoms → UiButton → Variants

**Steps**:

1. Navigate to "Primary" story
2. Observe filled button with blue background
3. Navigate to "Secondary" story
4. Observe outline button with border
5. Navigate to "Ghost" story
6. Observe text-only button

**Expected Results**:

- [ ] Filled variant has solid primary color background
- [ ] Outline variant has transparent background + border
- [ ] Text variant has no background or border

---

### Test 2: Size Variations

**Location**: Storybook → Atoms → UiButton → Sizes

**Steps**:

1. View "Extra Small" story
2. View "Small" story
3. View "Medium" story
4. View "Large" story
5. View "Extra Large" story

**Expected Results**:

- [ ] xs button is smallest (compact)
- [ ] small button is larger than xs
- [ ] medium button is default size
- [ ] large button is larger than medium
- [ ] xl button is largest

**Visual Check**: Each size has proportional padding and font size

---

### Test 3: Palette Switching

**Location**: Storybook → Atoms → UiButton → Palette Demonstration

**Steps**:

1. Open "Palette Switching" story
2. Use toolbar dropdown to select "Corporate Trust (Blue)"
3. Observe button colors (blue)
4. Select "Creative Energy (Purple)"
5. Observe button colors change to purple
6. Select "Natural Harmony (Green)"
7. Observe button colors change to green
8. Select "Warm Welcome (Orange)"
9. Observe button colors change to orange
10. Select "Minimalist (Gray)"
11. Observe button colors change to gray

**Expected Results**:

- [ ] All 3 button variants adapt to selected palette
- [ ] Colors change instantly (no page reload)
- [ ] Transitions are smooth (150ms)
- [ ] Text remains readable in all palettes

---

### Test 4: Light/Dark Mode

**Location**: Storybook → Atoms → UiButton → Any story

**Steps**:

1. Select "Corporate Trust" palette
2. Select "Light" mode in toolbar
3. Observe colors (light background, dark text)
4. Select "Dark" mode in toolbar
5. Observe colors (dark background, light text)

**Expected Results**:

- [ ] Light mode: light backgrounds, dark text
- [ ] Dark mode: dark backgrounds, light text
- [ ] Contrast maintained in both modes
- [ ] No color flickering during switch

---

### Test 5: Interactive States

**Location**: Browser → Any button story

**Steps**:

1. Open any button story in Storybook
2. **Hover**: Move mouse over button
3. **Active**: Click and hold button
4. **Focus**: Tab to button using keyboard
5. **Disabled**: View "Disabled" story

**Expected Results**:

- [ ] Hover: Background color darkens
- [ ] Active: Background color darkens further
- [ ] Focus: 2px outline appears around button
- [ ] Disabled: 50% opacity, no hover effects

---

### Test 6: Keyboard Navigation

**Location**: Storybook → Atoms → UiButton → Keyboard Navigation story

**Steps**:

1. Click outside the button (unfocus)
2. Press `Tab` key
3. Observe focus moves to button (outline visible)
4. Press `Enter` key
5. Observe click event logged in Actions panel
6. Press `Space` key
7. Observe click event logged in Actions panel

**Expected Results**:

- [ ] Tab focuses the button
- [ ] Focus outline is visible (2px solid)
- [ ] Enter activates button
- [ ] Space activates button
- [ ] Disabled buttons cannot be focused

---

### Test 7: Accessibility (WCAG AAA)

**Location**: Storybook → Accessibility panel (bottom)

**Steps**:

1. Open any button story
2. Open "Accessibility" tab in Storybook
3. Review violations (should be 0)
4. Check "Color Contrast"
5. Verify contrast ratio ≥ 7:1 for normal text
6. Verify contrast ratio ≥ 4.5:1 for large text (18px+)

**Expected Results**:

- [ ] 0 accessibility violations
- [ ] Contrast ratio ≥ 7:1 (WCAG AAA)
- [ ] Button has accessible name (text or aria-label)
- [ ] Role="button" detected

**Tool**: Use browser DevTools → Accessibility Inspector to verify

---

### Test 8: Icon Support

**Location**: Storybook → Atoms → UiButton → Icon stories

**Steps**:

1. View "Icon Only" story
2. Observe button with only icon (no text)
3. View "Icon + Text (Left)" story
4. Observe icon positioned before text
5. View "Icon + Text (Right)" story
6. Observe icon positioned after text

**Expected Results**:

- [ ] Icon-only button has aria-label
- [ ] Icon + text has proper spacing
- [ ] Icons align vertically with text
- [ ] Both icon positions work

---

### Test 9: Content Flexibility

**Location**: Browser console + Storybook

**Steps**:

1. Open "Custom Content" story
2. Inspect button with long text
3. Observe button expands to fit content (no truncation)
4. Inspect button with short text
5. Observe button doesn't have excessive padding

**Expected Results**:

- [ ] Long text: button expands (no ellipsis)
- [ ] Short text: button fits content
- [ ] No word wrapping (single line)
- [ ] No horizontal scrolling

---

### Test 10: Cross-Palette Validation

**Location**: Storybook → All palettes

**Steps**:
For EACH of the 5 palettes (Corporate Trust, Creative Energy, Natural Harmony, Warm Welcome, Minimalist):

1. Select palette in toolbar
2. Test in Light mode:
   - [ ] Filled variant readable (text vs background)
   - [ ] Outline variant readable (text vs page background)
   - [ ] Text variant readable (text vs page background)
3. Switch to Dark mode:
   - [ ] Filled variant readable
   - [ ] Outline variant readable
   - [ ] Text variant readable

**Expected Results**:

- [ ] All 10 variations (5 palettes × 2 modes) pass readability test
- [ ] No palette/mode combination causes invisible text
- [ ] Hover states visible in all combinations

---

## Performance Testing

### Bundle Size Check

```bash
cd front
npm run build
```

**Expected**: UiButton component adds <5KB to bundle

### Render Performance

**Location**: Browser DevTools → Performance tab

**Steps**:

1. Open "Palette Switching" story
2. Open DevTools → Performance
3. Start recording
4. Switch palette 5 times rapidly
5. Stop recording
6. Analyze timeline

**Expected Results**:

- [ ] Each palette switch <16ms (60fps)
- [ ] No layout thrashing
- [ ] No unnecessary re-renders

---

## Automated Test Validation

### Run Component Tests

```bash
cd front
npm run test
```

**Expected**:

- [ ] All UiButton.spec.ts tests pass
- [ ] Coverage ≥80% for UiButton.vue

### Run Storybook Tests

```bash
cd front
npm run test-storybook
```

**Expected**:

- [ ] All interaction tests pass
- [ ] Accessibility tests pass

---

## Common Issues & Troubleshooting

### Issue: Button doesn't adapt to palette changes

**Symptom**: Button stays blue when switching palettes

**Cause**: Using hardcoded Tailwind classes instead of CSS custom properties

**Fix**: Replace `bg-blue-600` with `var(--color-primary-500)`

---

### Issue: Focus outline not visible

**Symptom**: No outline when tabbing to button

**Cause**: Using `:focus` instead of `:focus-visible`

**Fix**: Use `:focus-visible` pseudo-class

---

### Issue: Disabled button still clickable

**Symptom**: Click events fire when button is disabled

**Cause**: Missing `disabled` attribute on `<button>` element

**Fix**: Add `:disabled="disabled"` to button element

---

### Issue: WCAG AAA contrast violation

**Symptom**: Accessibility panel shows contrast error

**Cause**: Using wrong token or custom color

**Fix**: Use semantic tokens from design system

---

### Issue: Icon misaligned with text

**Symptom**: Icon not vertically centered

**Cause**: Flex alignment issue

**Fix**: Use `align-items: center` on button element

---

## Sign-Off Checklist

Before marking this feature complete, verify:

**Visual Testing**:

- [ ] All 3 variants tested
- [ ] All 5 sizes tested
- [ ] All 10 palette variations tested (5 × 2 modes)
- [ ] All states tested (default, hover, active, focus, disabled)

**Functional Testing**:

- [ ] Click events work
- [ ] Keyboard navigation works
- [ ] Icon slots work
- [ ] Disabled state prevents interaction

**Accessibility Testing**:

- [ ] 0 violations in Storybook a11y addon
- [ ] WCAG AAA contrast ratios verified
- [ ] Keyboard navigation verified
- [ ] Screen reader tested (optional but recommended)

**Performance Testing**:

- [ ] Bundle size <5KB
- [ ] Palette switching <16ms
- [ ] 80%+ test coverage

**Documentation**:

- [ ] All stories created
- [ ] Props documented
- [ ] Usage examples provided

---

## Next Steps After Testing

1. ✅ All manual tests pass
2. ✅ All automated tests pass
3. ✅ Accessibility verified
4. → Request code review
5. → Merge to feature branch
6. → Deploy to staging
7. → Final QA validation

---

**Testing Guide Complete**
**Ready for Implementation**
