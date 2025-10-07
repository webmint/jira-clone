# Quickstart: Manual Testing Guide

**Feature**: Palette Switcher | **Date**: 2025-10-07

## Overview

This guide provides step-by-step instructions for manually testing the 2-dimensional palette system across all 10 variations (5 palettes × 2 modes).

---

## Prerequisites

1. **Design system implemented**: All 10 palette variations defined in `front/src/designSystem/styles/tokens.css`
2. **Storybook running**: `npm run storybook` from `front/` directory
3. **Browser DevTools**: Chrome/Firefox with DevTools open (for inspecting CSS variables)

---

## Test Scenarios

### Scenario 1: Verify Palette Classes Apply Correctly

**Objective**: Ensure CSS classes correctly apply palette and mode tokens

**Steps**:

1. Open browser to `http://localhost:6006` (Storybook)
2. Open DevTools → Console
3. Run the following commands to test each variation:

```javascript
// Test Corporate Trust Light (default)
document.documentElement.className = 'corporate-trust light';
console.log(
  'Corporate Trust Light:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Corporate Trust Dark
document.documentElement.className = 'corporate-trust dark';
console.log(
  'Corporate Trust Dark:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Creative Energy Light
document.documentElement.className = 'creative-energy light';
console.log(
  'Creative Energy Light:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Creative Energy Dark
document.documentElement.className = 'creative-energy dark';
console.log(
  'Creative Energy Dark:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Natural Harmony Light
document.documentElement.className = 'natural-harmony light';
console.log(
  'Natural Harmony Light:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Natural Harmony Dark
document.documentElement.className = 'natural-harmony dark';
console.log(
  'Natural Harmony Dark:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Warm Welcome Light
document.documentElement.className = 'warm-welcome light';
console.log(
  'Warm Welcome Light:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Warm Welcome Dark
document.documentElement.className = 'warm-welcome dark';
console.log(
  'Warm Welcome Dark:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Minimalist Light
document.documentElement.className = 'minimalist light';
console.log(
  'Minimalist Light:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);

// Test Minimalist Dark
document.documentElement.className = 'minimalist dark';
console.log(
  'Minimalist Dark:',
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary-500')
);
```

**Expected Result**:

- Each palette shows different primary color values
- Light modes show light backgrounds, dark text
- Dark modes show dark backgrounds, light text
- Console logs show expected hex colors for each variation

**Pass Criteria**:

- ✅ All 10 variations apply different colors
- ✅ No console errors
- ✅ Visual differences are immediately visible

---

### Scenario 2: Test Storybook Theme Switcher

**Objective**: Verify Storybook toolbar controls switch palettes correctly

**Steps**:

1. Open Storybook to any component story (e.g., Button)
2. Locate toolbar controls at top of Storybook interface
3. Find "Palette" dropdown (should show paintbrush icon)
4. Find "Mode" toggle (should show sun/moon icon)
5. Test all combinations:
   - Select "Corporate Trust" → Toggle "Light" → Toggle "Dark"
   - Select "Creative Energy" → Toggle "Light" → Toggle "Dark"
   - Select "Natural Harmony" → Toggle "Light" → Toggle "Dark"
   - Select "Warm Welcome" → Toggle "Light" → Toggle "Dark"
   - Select "Minimalist" → Toggle "Light" → Toggle "Dark"

**Expected Result**:

- Component preview updates immediately when palette or mode changes
- Colors change visibly (primary buttons show different colors per palette)
- Background switches between light/dark when mode toggles
- Text remains legible in all 10 variations

**Pass Criteria**:

- ✅ Palette dropdown has 5 options
- ✅ Mode toggle has 2 options (Light/Dark)
- ✅ Component updates instantly (<16ms, no flicker)
- ✅ All 10 combinations render correctly

---

### Scenario 3: Verify Token Completeness

**Objective**: Ensure all 10 variations define the same token names

**Steps**:

1. Open DevTools → Console
2. Run the following script to check token completeness:

```javascript
const palettes = [
  'corporate-trust',
  'creative-energy',
  'natural-harmony',
  'warm-welcome',
  'minimalist',
];
const modes = ['light', 'dark'];

const requiredTokens = [
  '--color-primary-500',
  '--color-neutral-0',
  '--color-neutral-900',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-background-default',
  '--color-border-default',
  '--color-success-500',
  '--color-warning-500',
  '--color-error-500',
  '--color-info-500',
];

const results = {};

palettes.forEach((palette) => {
  modes.forEach((mode) => {
    document.documentElement.className = `${palette} ${mode}`;
    const variation = `${palette}.${mode}`;
    results[variation] = {};

    requiredTokens.forEach((token) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      results[variation][token] = value || 'MISSING';
    });
  });
});

console.table(results);
```

**Expected Result**:

- Table shows all 10 variations (rows) × all required tokens (columns)
- No "MISSING" values in table
- Each token has a valid hex color or value

**Pass Criteria**:

- ✅ No "MISSING" tokens
- ✅ All tokens have valid values
- ✅ Values differ between palettes (primary colors)
- ✅ Values differ between modes (backgrounds/text)

---

### Scenario 4: Verify Accessibility (WCAG Contrast)

**Objective**: Ensure text/background pairs meet WCAG AA contrast requirements

**Steps**:

1. Open DevTools → Console
2. Install contrast checker (or use online tool: https://webaim.org/resources/contrastchecker/)
3. Test text-on-background contrast for all 10 variations:

```javascript
// Helper function to calculate luminance
function getLuminance(rgb) {
  const [r, g, b] = rgb.map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Helper function to calculate contrast ratio
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Helper function to parse hex color to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

// Test all variations
const palettes = [
  'corporate-trust',
  'creative-energy',
  'natural-harmony',
  'warm-welcome',
  'minimalist',
];
const modes = ['light', 'dark'];

const contrastResults = {};

palettes.forEach((palette) => {
  modes.forEach((mode) => {
    document.documentElement.className = `${palette} ${mode}`;
    const variation = `${palette}.${mode}`;

    const textColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text-primary')
      .trim();
    const bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-background-default')
      .trim();

    const textRgb = hexToRgb(textColor);
    const bgRgb = hexToRgb(bgColor);

    if (textRgb && bgRgb) {
      const ratio = getContrastRatio(textRgb, bgRgb);
      const passes = ratio >= 4.5;
      contrastResults[variation] = {
        ratio: ratio.toFixed(2),
        passes: passes ? '✅ PASS' : '❌ FAIL',
        textColor,
        bgColor,
      };
    }
  });
});

console.table(contrastResults);
```

**Expected Result**:

- Table shows contrast ratios for all 10 variations
- All ratios ≥ 4.5:1 (WCAG AA for normal text)
- All entries show "✅ PASS"

**Pass Criteria**:

- ✅ All 10 variations pass WCAG AA (≥ 4.5:1)
- ✅ No "❌ FAIL" entries
- ✅ Light modes: dark text on light backgrounds (high contrast)
- ✅ Dark modes: light text on dark backgrounds (high contrast)

---

### Scenario 5: Test Component Rendering Across Palettes

**Objective**: Verify that components render correctly in all 10 variations without code changes

**Steps**:

1. Open Storybook and navigate to a component with multiple states (e.g., Button with Primary, Secondary, Disabled variants)
2. Use Storybook toolbar to cycle through all 10 palette variations
3. For each variation, verify:
   - Component renders without errors
   - Colors update to match palette
   - Text remains legible
   - Hover/focus states work
   - Disabled states are visible

**Expected Result**:

- Component looks correct in all 10 variations
- No layout shifts or broken styles
- Semantic tokens resolve correctly

**Pass Criteria**:

- ✅ Component renders in all 10 variations
- ✅ No visual errors or broken layouts
- ✅ Interactive states (hover, focus) work correctly
- ✅ Text is legible in all variations

---

### Scenario 6: Test Default Fallback

**Objective**: Verify that Corporate Trust light mode applies as default when no classes are present

**Steps**:

1. Open DevTools → Console
2. Remove all classes from root element:
   ```javascript
   document.documentElement.className = '';
   ```
3. Check computed CSS variables:
   ```javascript
   const primary = getComputedStyle(document.documentElement)
     .getPropertyValue('--color-primary-500')
     .trim();
   console.log('Default primary color:', primary);
   // Should match Corporate Trust light (#3B82F6)
   ```

**Expected Result**:

- Root element with no classes shows Corporate Trust light tokens
- Application renders correctly with default palette

**Pass Criteria**:

- ✅ Default primary color is #3B82F6 (blue)
- ✅ Background is white/light
- ✅ Text is dark
- ✅ Matches Corporate Trust light mode

---

## Automated Test Checklist

After manual testing, verify that automated tests pass:

```bash
# Run token validation tests
cd front
npm run test:unit -- tokens/validation.spec.ts

# Run contrast tests
npm run test:unit -- tokens/contrast.spec.ts

# Run full test suite
npm run test
```

**Pass Criteria**:

- ✅ All token validation tests pass
- ✅ All contrast tests pass (all 10 variations)
- ✅ No test failures

---

## Troubleshooting

### Issue: Palette doesn't change when class is applied

**Solution**: Check that `tokens.css` is imported in `style.css` or main application entry point

### Issue: Colors are wrong or missing

**Solution**: Verify that palette class selector matches exactly (e.g., `.corporate-trust.light`, not `.corporateTrust.light`)

### Issue: Contrast test fails

**Solution**: Adjust color values in `tokens.css` to increase contrast ratio

### Issue: Storybook toolbar missing

**Solution**: Verify `.storybook/preview.ts` has `globalTypes` and `decorators` configured correctly

---

_Manual testing guide complete: 2025-10-07_
