# Quickstart Guide: Design System Manual Testing

**Feature**: 002-design-system
**Date**: 2025-10-06
**Purpose**: Manual testing guide for design system styles

---

## Prerequisites

- Node.js installed (latest LTS)
- Repository cloned
- Dependencies installed: `npm install`
- Storybook running: `npm run storybook`

---

## Test Scenario 1: Color Palette Selection & Validation

**Objective**: Verify all 5 color palettes load correctly and pass WCAG AAA contrast checks.

### Steps:

1. **Start Storybook**

   ```bash
   npm run storybook
   ```

2. **Navigate to Color Palettes**
   - Open Storybook in browser (typically `http://localhost:6006`)
   - Go to `Design System > Colors`

3. **Verify Each Palette**
   For each of the 5 palettes (Corporate Trust, Modern Tech, Sophisticated Luxury, Clean Minimal, Vibrant Professional):
   - [ ] Palette name and description display correctly
   - [ ] All color swatches render (50, 100, 200...950 for each color)
   - [ ] Hex/OKLCH values are shown
   - [ ] Target audience is listed

4. **Test Contrast Ratios**
   - [ ] Text on background passes 7:1 contrast (WCAG AAA)
   - [ ] Primary color on surface passes 7:1
   - [ ] All semantic colors (success, warning, error, info) pass 7:1

5. **Accessibility Check**
   - Open the "Accessibility" addon tab in Storybook
   - [ ] No contrast violations reported
   - [ ] All color combinations pass WCAG AAA

**Expected Result**: All 5 palettes display correctly with no accessibility violations.

---

## Test Scenario 2: Light/Dark Theme Switching

**Objective**: Verify theme switching works correctly and all colors adapt properly.

### Steps:

1. **Enable Theme Switcher**
   - In Storybook toolbar, find the theme switcher icon (sun/moon)
   - Switch between Light, Dark, and System modes

2. **Verify in Light Mode**
   - [ ] Background is light (near white)
   - [ ] Text is dark (near black)
   - [ ] Surface colors are lighter than background
   - [ ] All elements are clearly visible

3. **Verify in Dark Mode**
   - [ ] Background is dark (near black)
   - [ ] Text is light (near white)
   - [ ] Surface colors are darker than background
   - [ ] All elements remain clearly visible

4. **Check Semantic Colors**
   - [ ] Success (green) remains distinguishable in both themes
   - [ ] Warning (yellow/amber) remains distinguishable in both themes
   - [ ] Error (red) remains distinguishable in both themes
   - [ ] Info (blue) remains distinguishable in both themes

5. **Verify Contrast in Dark Mode**
   - Open Accessibility addon
   - [ ] All text passes 7:1 contrast ratio in dark mode
   - [ ] No new violations introduced

**Expected Result**: Theme switching works smoothly, all colors adapt correctly, accessibility maintained in both modes.

---

## Test Scenario 3: Typography Scale (Roboto Font)

**Objective**: Verify Roboto font loads correctly with all weights and sizes.

### Steps:

1. **Navigate to Typography**
   - In Storybook, go to `Design System > Typography`

2. **Verify Font Loading**
   - [ ] Roboto font is visible (not fallback system font)
   - [ ] Font renders smoothly (no FOUT - Flash of Unstyled Text)
   - To confirm: Compare with known Roboto specimen

3. **Test Font Weights**
   Verify each weight renders correctly:
   - [ ] Thin (100)
   - [ ] Light (300)
   - [ ] Normal (400)
   - [ ] Medium (500)
   - [ ] Bold (700)
   - [ ] Black (900)

4. **Test Font Sizes**
   Verify all sizes in the scale:
   - [ ] XS (0.75rem / 12px)
   - [ ] SM (0.875rem / 14px)
   - [ ] BASE (1rem / 16px)
   - [ ] LG (1.125rem / 18px)
   - [ ] XL (1.25rem / 20px)
   - [ ] 2XL through 5XL

5. **Test Line Heights**
   - [ ] Tight (1.25) - visually compact
   - [ ] Normal (1.5) - comfortable reading
   - [ ] Relaxed (1.75) - spacious

6. **Test Fallback Fonts**
   - Temporarily block Google Fonts in DevTools (Network tab)
   - [ ] Text remains readable with system fallbacks
   - [ ] Layout doesn't break

**Expected Result**: Roboto loads correctly, all weights and sizes render properly, fallbacks work.

---

## Test Scenario 4: Spacing Scale Consistency

**Objective**: Verify spacing tokens are consistent and use rem units.

### Steps:

1. **Navigate to Spacing**
   - In Storybook, go to `Design System > Spacing`

2. **Verify Visual Scale**
   - [ ] Spacing increases consistently (4px, 8px, 12px, 16px...)
   - [ ] Base-8 pattern is visible (multiples of 8px after initial 4px)
   - [ ] All values are in rem units

3. **Test in Different Font Sizes**
   - Change browser default font size (Settings > Appearance > Font Size)
   - Increase to 20px or 24px
   - [ ] Spacing scales proportionally
   - [ ] Layout remains intact

4. **Verify Token Names**
   - [ ] XS, SM, MD, LG, XL are semantically correct
   - [ ] XS is smallest, XL is largest
   - [ ] Names are intuitive

**Expected Result**: Spacing scale is consistent, uses rem units, scales with user font preferences.

---

## Test Scenario 5: Shadows, Border Radius, and Additional Styles

**Objective**: Verify all style categories render correctly.

### Steps:

1. **Navigate to Each Category**
   - `Design System > Shadows`
   - `Design System > Border Radius`
   - `Design System > Z-Index`
   - `Design System > Opacity`
   - `Design System > Transitions`

2. **Test Shadows**
   - [ ] SM (subtle) - barely visible
   - [ ] BASE (standard) - noticeable
   - [ ] MD (medium) - clear elevation
   - [ ] LG (large) - significant elevation
   - [ ] XL (extra large) - dramatic elevation

3. **Test Border Radius**
   - [ ] NONE (0px) - sharp corners
   - [ ] SM (2px) - slightly rounded
   - [ ] BASE (4px) - standard rounding
   - [ ] MD (6px) - medium rounding
   - [ ] LG (8px) - large rounding
   - [ ] XL (12px) - very rounded
   - [ ] FULL (9999px) - pill shape

4. **Test Z-Index**
   - [ ] Dropdown (1000) appears above content
   - [ ] Modal (1050) appears above dropdown
   - [ ] Tooltip (1070) appears above modal
   - [ ] Layering is correct (no overlapping issues)

5. **Test Opacity**
   - [ ] 0 (fully transparent) - invisible
   - [ ] 5-80 (semi-transparent) - varies as expected
   - [ ] 100 (fully opaque) - solid

6. **Test Transitions**
   - [ ] FAST (150ms) - quick
   - [ ] BASE (200ms) - standard
   - [ ] SLOW (300ms) - deliberate
   - [ ] Easing functions feel natural (not jarring)

**Expected Result**: All style categories work as documented, values are visually correct.

---

## Test Scenario 6: TypeScript Autocomplete & Validation

**Objective**: Verify type safety works for design tokens.

### Steps:

1. **Open Component File**
   - Open any Vue component in your IDE (VS Code recommended)

2. **Test Token Autocomplete**
   - Import `useTokens` composable
   - Type `const { color } = useTokens();`
   - Start typing `color('pri...`
   - [ ] Autocomplete suggests valid token paths (e.g., `primary.500`)
   - [ ] Invalid tokens show TypeScript error

3. **Test Type Safety**
   - Try typing `color('invalid')`
   - [ ] TypeScript error appears
   - [ ] Error message is helpful

4. **Test Token Helper Functions**
   - Import `getToken` from `tokens/utils`
   - [ ] Autocomplete works for all token categories
   - [ ] Type errors prevent invalid token usage

**Expected Result**: Full TypeScript support, autocomplete works, invalid tokens caught at compile-time.

---

## Test Scenario 7: Tailwind Utility Class Generation

**Objective**: Verify @theme directive generates expected Tailwind utilities.

### Steps:

1. **Create Test Component**

   ```vue
   <template>
     <div class="bg-primary-500 text-white p-spacing-md rounded-base shadow-md">Test Component</div>
   </template>
   ```

2. **Verify Classes Work**
   - [ ] `bg-primary-500` applies correct background color
   - [ ] `text-white` applies white text
   - [ ] `p-spacing-md` applies correct padding
   - [ ] `rounded-base` applies correct border radius
   - [ ] `shadow-md` applies correct shadow

3. **Test Arbitrary Values**

   ```vue
   <div class="p-[--spacing-lg] bg-[--color-surface]">
     Arbitrary values
   </div>
   ```

   - [ ] Arbitrary value syntax works
   - [ ] CSS variables are correctly applied

4. **Test in Browser DevTools**
   - Inspect element
   - [ ] CSS custom properties are defined (:root)
   - [ ] Utility classes reference CSS variables
   - [ ] Computed values are correct

**Expected Result**: All Tailwind utilities work, @theme integration successful.

---

## Test Scenario 8: Storybook Visual Regression (Optional - Post-MVP)

**Objective**: If Chromatic is set up, verify visual regression testing works.

### Steps:

1. **Run Chromatic Build**

   ```bash
   npx chromatic --project-token=<YOUR_TOKEN>
   ```

2. **Verify Baselines**
   - [ ] All design token stories captured
   - [ ] Snapshots include light and dark modes
   - [ ] No unexpected changes detected

3. **Make Intentional Change**
   - Change a color value
   - Re-run Chromatic
   - [ ] Change is detected
   - [ ] Visual diff is shown

**Expected Result**: Visual regression testing catches UI changes.

---

## Validation Checklist

After completing all scenarios, verify:

### Accessibility

- [ ] All color combinations pass WCAG 2.1 AAA (7:1 normal text, 4.5:1 large text)
- [ ] No accessibility violations in Storybook a11y addon
- [ ] Both light and dark themes maintain accessibility

### Typography

- [ ] Roboto font loads correctly
- [ ] All font weights (100-900) work
- [ ] All font sizes (XS-5XL) render
- [ ] Fallback fonts work when Google Fonts blocked

### Colors

- [ ] 5 professional palettes display
- [ ] Light/dark theme switching works
- [ ] Semantic colors (success, warning, error, info) are distinguishable

### Spacing

- [ ] Spacing scale uses rem units
- [ ] Scales proportionally with browser font size
- [ ] Base-8 pattern is consistent

### Additional Styles

- [ ] Shadows (5 levels) render correctly
- [ ] Border radius (7 values) work as expected
- [ ] Z-index layering is correct
- [ ] Opacity values are accurate
- [ ] Transitions feel natural

### Developer Experience

- [ ] TypeScript autocomplete works
- [ ] Invalid tokens cause compile errors
- [ ] Tailwind utilities generated from @theme
- [ ] CSS variables accessible in DevTools

### Performance

- [ ] Storybook loads in <5 seconds
- [ ] Theme switching is instant (<100ms)
- [ ] No layout shift when fonts load
- [ ] No FOUT (Flash of Unstyled Text)

---

## Troubleshooting

### Roboto Font Not Loading

- Check network tab for Google Fonts request
- Verify `<link>` tag in `index.html`
- Clear browser cache
- Check for ad blockers blocking Google Fonts

### Theme Not Switching

- Check `useTheme` composable is imported correctly
- Verify `.dark` class is toggled on `<html>` element
- Check localStorage for persisted theme
- Inspect CSS variables in DevTools

### Tailwind Classes Not Working

- Verify `tokens.css` is imported in `main.ts`
- Check Vite build output for CSS
- Ensure Tailwind config includes `@import "tailwindcss"`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Accessibility Violations

- Use WebAIM Contrast Checker to verify specific color pairs
- Check if correct color palette variant is being used
- Ensure semantic colors are not swapped incorrectly

### TypeScript Errors

- Run `npm run type-check`
- Ensure token types are generated correctly
- Check import paths are correct
- Restart TypeScript server in IDE

---

## Success Criteria

All tests pass when:

- ✅ All 5 color palettes display and pass WCAG AAA
- ✅ Light/dark theme switching works flawlessly
- ✅ Roboto font loads with all weights and sizes
- ✅ Spacing scale is consistent and uses rem units
- ✅ All additional style categories work correctly
- ✅ TypeScript autocomplete and validation functional
- ✅ Tailwind utilities generated and working
- ✅ No accessibility violations in any theme
- ✅ Performance targets met (<5s Storybook load, <100ms theme switch)

---

**Ready for**: Production implementation
**Documented Issues**: Track any issues found during testing in GitHub issues
**Next Steps**: Proceed with component library implementation (future phase)
