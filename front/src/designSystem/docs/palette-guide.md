# Palette Usage Guide

A practical guide for building components that work seamlessly with all 10 palette variations.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Component Patterns](#component-patterns)
3. [Token Reference](#token-reference)
4. [Testing Checklist](#testing-checklist)
5. [Migration Guide](#migration-guide)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Quick Start

### Building Your First Palette-Aware Component

Follow these steps to create a component that works with all 10 palette variations:

#### Step 1: Use Semantic Tokens

```vue
<template>
  <button class="custom-button">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<style scoped>
.custom-button {
  /* ✅ DO: Use semantic tokens */
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-border-default);

  /* Spacing and sizing */
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);

  /* Interaction states */
  transition: background-color 0.2s ease;
}

.custom-button:hover {
  background-color: var(--color-primary-600);
}

.custom-button:active {
  background-color: var(--color-primary-700);
}

.custom-button:disabled {
  background-color: var(--color-neutral-200);
  color: var(--color-text-muted);
  cursor: not-allowed;
}
</style>
```

#### Step 2: Create a Story

```typescript
// CustomButton.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import CustomButton from './CustomButton.vue';

const meta: Meta<typeof CustomButton> = {
  component: CustomButton,
  title: 'Components/CustomButton',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};
```

#### Step 3: Test in All Palettes

1. Run Storybook: `npm run storybook`
2. Navigate to your component story
3. Use toolbar controls to switch between:
   - **5 palettes**: Corporate Trust, Creative Energy, Natural Harmony, Warm Welcome, Minimalist
   - **2 modes**: Light, Dark
4. Verify component looks correct in all 10 variations

#### Step 4: Verify Accessibility

```typescript
import { validateContrastRatios } from '@/designSystem/tokens/validation';

const results = validateContrastRatios([
  {
    variation: 'corporate-trust.light',
    foregroundToken: '--color-text-inverse',
    backgroundToken: '--color-primary-500',
    minimumRatio: 4.5,
  },
  {
    variation: 'corporate-trust.dark',
    foregroundToken: '--color-text-inverse',
    backgroundToken: '--color-primary-500',
    minimumRatio: 4.5,
  },
  // Repeat for all 10 variations
]);

if (!results.valid) {
  console.error('Contrast failures:', results.failures);
}
```

## Component Patterns

### Buttons

#### Primary Button

```vue
<style scoped>
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary-600);
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
}

.btn-primary:active {
  background-color: var(--color-primary-700);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
</style>
```

#### Secondary Button

```vue
<style scoped>
.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.btn-secondary:hover {
  background-color: var(--color-surface-hover);
}

.btn-secondary:active {
  background-color: var(--color-surface-active);
}
</style>
```

#### Ghost Button

```vue
<style scoped>
.btn-ghost {
  background-color: transparent;
  color: var(--color-primary-500);
  border: none;
}

.btn-ghost:hover {
  background-color: var(--color-primary-50);
}

.btn-ghost:active {
  background-color: var(--color-primary-100);
}
</style>
```

### Cards

#### Basic Card

```vue
<style scoped>
.card {
  background-color: var(--color-surface-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-sm);
}

.card-header {
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
}

.card-body {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}
</style>
```

#### Elevated Card

```vue
<style scoped>
.card-elevated {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s ease;
}

.card-elevated:hover {
  box-shadow: var(--shadow-lg);
}
</style>
```

### Form Inputs

#### Text Input

```vue
<style scoped>
.input {
  background-color: var(--color-background-default);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-base);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input:disabled {
  background-color: var(--color-neutral-100);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.input.error {
  border-color: var(--color-error-500);
}

.input.error:focus {
  box-shadow: 0 0 0 3px var(--color-error-100);
}
</style>
```

#### Select Dropdown

```vue
<style scoped>
.select {
  background-color: var(--color-background-default);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-base);
}

.select:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* Dropdown menu */
.select-menu {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
}

.select-option {
  color: var(--color-text-primary);
  padding: var(--spacing-2) var(--spacing-3);
}

.select-option:hover {
  background-color: var(--color-surface-hover);
}

.select-option.selected {
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
}
</style>
```

### Status Indicators

#### Alert/Banner

```vue
<style scoped>
/* Success */
.alert-success {
  background-color: var(--color-success-50);
  color: var(--color-success-700);
  border: 1px solid var(--color-success-200);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-3) var(--spacing-4);
}

/* Warning */
.alert-warning {
  background-color: var(--color-warning-50);
  color: var(--color-warning-700);
  border: 1px solid var(--color-warning-200);
}

/* Error */
.alert-error {
  background-color: var(--color-error-50);
  color: var(--color-error-700);
  border: 1px solid var(--color-error-200);
}

/* Info */
.alert-info {
  background-color: var(--color-info-50);
  color: var(--color-info-700);
  border: 1px solid var(--color-info-200);
}
</style>
```

#### Badge

```vue
<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.badge-primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.badge-success {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}

.badge-warning {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.badge-error {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}
</style>
```

## Token Reference

### Commonly Used Tokens

#### Background Tokens

| Token                        | Usage                   | Example                         |
| ---------------------------- | ----------------------- | ------------------------------- |
| `--color-background-default` | Main page background    | Body, main container            |
| `--color-surface-default`    | Card/panel surface      | Cards, modals, dropdowns        |
| `--color-surface-elevated`   | Elevated surfaces       | Popovers, tooltips, floating UI |
| `--color-surface-hover`      | Hover state background  | Button hover, list item hover   |
| `--color-surface-active`     | Active state background | Button active, selected items   |

#### Text Tokens

| Token                    | Usage                       | Example                       |
| ------------------------ | --------------------------- | ----------------------------- |
| `--color-text-primary`   | Main text content           | Headings, body text, labels   |
| `--color-text-secondary` | Secondary text              | Descriptions, captions        |
| `--color-text-tertiary`  | De-emphasized text          | Timestamps, metadata          |
| `--color-text-muted`     | Disabled/placeholder text   | Disabled inputs, placeholders |
| `--color-text-inverse`   | Text on primary backgrounds | White text on colored buttons |

#### Border Tokens

| Token                    | Usage              | Example                       |
| ------------------------ | ------------------ | ----------------------------- |
| `--color-border-default` | Standard borders   | Input borders, card borders   |
| `--color-border-subtle`  | Light borders      | Dividers, separators          |
| `--color-border-strong`  | Emphasized borders | Focus outlines, active states |

#### Primary Color Tokens

| Token                 | Usage            | Example                         |
| --------------------- | ---------------- | ------------------------------- |
| `--color-primary-50`  | Lightest tint    | Ghost button hover (light mode) |
| `--color-primary-100` | Very light       | Focus rings, subtle backgrounds |
| `--color-primary-500` | Main brand color | Primary buttons, links, icons   |
| `--color-primary-600` | Hover state      | Primary button hover            |
| `--color-primary-700` | Active state     | Primary button active           |
| `--color-primary-900` | Darkest shade    | Text on light backgrounds       |

#### Semantic State Tokens

| Token                 | Usage              | Example                  |
| --------------------- | ------------------ | ------------------------ |
| `--color-success-50`  | Success background | Success alert background |
| `--color-success-500` | Success primary    | Success icons, borders   |
| `--color-success-700` | Success text       | Success message text     |
| `--color-error-50`    | Error background   | Error alert background   |
| `--color-error-500`   | Error primary      | Error icons, borders     |
| `--color-error-700`   | Error text         | Error message text       |
| `--color-warning-50`  | Warning background | Warning alert background |
| `--color-warning-500` | Warning primary    | Warning icons, borders   |
| `--color-warning-700` | Warning text       | Warning message text     |

### Token Selection Decision Tree

```
┌─ Need a background color?
│  ├─ Main page background → --color-background-default
│  ├─ Card/panel surface → --color-surface-default
│  ├─ Elevated element (modal, tooltip) → --color-surface-elevated
│  └─ Interactive state
│     ├─ Hover → --color-surface-hover
│     └─ Active → --color-surface-active
│
┌─ Need a text color?
│  ├─ Main content → --color-text-primary
│  ├─ Supporting text → --color-text-secondary
│  ├─ De-emphasized → --color-text-tertiary
│  ├─ Disabled/placeholder → --color-text-muted
│  └─ Text on colored background → --color-text-inverse
│
┌─ Need a border color?
│  ├─ Standard border → --color-border-default
│  ├─ Subtle separator → --color-border-subtle
│  └─ Strong emphasis → --color-border-strong
│
┌─ Need brand color?
│  ├─ Primary action → --color-primary-500
│  ├─ Primary hover → --color-primary-600
│  ├─ Primary active → --color-primary-700
│  └─ Subtle background → --color-primary-50/100
│
└─ Need status color?
   ├─ Success → --color-success-{50,500,700}
   ├─ Error → --color-error-{50,500,700}
   ├─ Warning → --color-warning-{50,500,700}
   └─ Info → --color-info-{50,500,700}
```

## Testing Checklist

### Visual Testing in Storybook

Use this checklist when testing components in all 10 palette variations:

#### Palette Variations (5)

- [ ] **Corporate Trust (Blue)** - Default palette
  - [ ] Light mode
  - [ ] Dark mode
- [ ] **Creative Energy (Purple)** - Creative/innovative
  - [ ] Light mode
  - [ ] Dark mode
- [ ] **Natural Harmony (Green)** - Fresh/natural
  - [ ] Light mode
  - [ ] Dark mode
- [ ] **Warm Welcome (Orange)** - Friendly/energetic
  - [ ] Light mode
  - [ ] Dark mode
- [ ] **Minimalist (Gray)** - Clean/modern
  - [ ] Light mode
  - [ ] Dark mode

#### Visual Checks for Each Variation

- [ ] Colors render correctly (no hardcoded colors showing)
- [ ] Text is readable (sufficient contrast)
- [ ] Borders are visible but not overpowering
- [ ] Interactive states work (hover, active, focus, disabled)
- [ ] Component maintains visual hierarchy
- [ ] No color bleeding or overflow issues

#### Accessibility Checks

- [ ] Text contrast ≥ 4.5:1 (normal text)
- [ ] Text contrast ≥ 3:1 (large text 18pt+)
- [ ] UI components contrast ≥ 3:1
- [ ] Focus indicators are clearly visible
- [ ] Color is not the only means of conveying information

### Automated Contrast Testing

```typescript
import { validateContrastRatios } from '@/designSystem/tokens/validation';

describe('MyComponent Accessibility', () => {
  const palettes = [
    'corporate-trust',
    'creative-energy',
    'natural-harmony',
    'warm-welcome',
    'minimalist',
  ];

  const modes = ['light', 'dark'];

  palettes.forEach((palette) => {
    modes.forEach((mode) => {
      it(`should meet WCAG AA in ${palette}.${mode}`, () => {
        const result = validateContrastRatios([
          {
            variation: `${palette}.${mode}`,
            foregroundToken: '--color-text-primary',
            backgroundToken: '--color-background-default',
            minimumRatio: 4.5,
          },
          {
            variation: `${palette}.${mode}`,
            foregroundToken: '--color-text-inverse',
            backgroundToken: '--color-primary-500',
            minimumRatio: 4.5,
          },
        ]);

        expect(result.valid).toBe(true);
        if (!result.valid) {
          console.error(`Failures in ${palette}.${mode}:`, result.failures);
        }
      });
    });
  });
});
```

### Token Completeness Testing

```typescript
import { validateTokenCompleteness } from '@/designSystem/tokens/validation';

it('should define all required tokens', () => {
  const variations = [
    'corporate-trust.light',
    'corporate-trust.dark',
    'creative-energy.light',
    'creative-energy.dark',
    'natural-harmony.light',
    'natural-harmony.dark',
    'warm-welcome.light',
    'warm-welcome.dark',
    'minimalist.light',
    'minimalist.dark',
  ];

  const result = validateTokenCompleteness(variations);

  expect(result.valid).toBe(true);
  if (!result.valid) {
    console.error('Missing tokens:', result.missingTokens);
    console.error('Extra tokens:', result.extraTokens);
  }
});
```

## Migration Guide

### Migrating Existing Components

#### Step 1: Identify Hardcoded Colors

Search for hardcoded colors in your component:

```bash
# Find hex colors
grep -r "#[0-9A-Fa-f]\{6\}" src/components/

# Find RGB/RGBA
grep -r "rgb(" src/components/

# Find color names
grep -r "color: \(red\|blue\|green\|white\|black\)" src/components/
```

#### Step 2: Replace with Semantic Tokens

**Before:**

```vue
<style scoped>
.button {
  background-color: #3b82f6; /* ❌ Hardcoded blue */
  color: white; /* ❌ Hardcoded white */
  border: 1px solid #2563eb; /* ❌ Hardcoded dark blue */
}

.button:hover {
  background-color: #2563eb; /* ❌ Hardcoded */
}
</style>
```

**After:**

```vue
<style scoped>
.button {
  background-color: var(--color-primary-500); /* ✅ Semantic token */
  color: var(--color-text-inverse); /* ✅ Semantic token */
  border: 1px solid var(--color-primary-600); /* ✅ Semantic token */
}

.button:hover {
  background-color: var(--color-primary-600); /* ✅ Semantic token */
}
</style>
```

#### Step 3: Update Color Mappings

| Old Hardcoded Color   | New Semantic Token        | Notes                       |
| --------------------- | ------------------------- | --------------------------- |
| `#3b82f6` (blue-500)  | `--color-primary-500`     | Main brand color            |
| `#ffffff` (white)     | `--color-text-inverse`    | Text on colored backgrounds |
| `#000000` (black)     | `--color-text-primary`    | Main text (adapts to mode)  |
| `#f3f4f6` (gray-100)  | `--color-surface-default` | Card backgrounds            |
| `#e5e7eb` (gray-200)  | `--color-border-default`  | Standard borders            |
| `#10b981` (green-500) | `--color-success-500`     | Success states              |
| `#ef4444` (red-500)   | `--color-error-500`       | Error states                |
| `#f59e0b` (amber-500) | `--color-warning-500`     | Warning states              |

#### Step 4: Test All Variations

After migration, test your component:

1. Open component in Storybook
2. Switch through all 5 palettes
3. Toggle between light and dark modes
4. Verify visual appearance in all 10 combinations
5. Run automated contrast tests

#### Step 5: Update Tests

Add palette variation tests:

```typescript
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent Palette Support', () => {
  it('should use semantic tokens', () => {
    const wrapper = mount(MyComponent);
    const element = wrapper.find('.my-element');
    const styles = window.getComputedStyle(element.element);

    // Should NOT contain hardcoded colors
    expect(styles.backgroundColor).not.toBe('rgb(59, 130, 246)'); // #3b82f6

    // Should use CSS variables
    const cssVarValue = styles.backgroundColor;
    expect(cssVarValue).toContain('var(--color-');
  });
});
```

### Common Migration Issues

#### Issue 1: Transparent Backgrounds

**Problem:** `background-color: transparent` doesn't adapt to dark mode

**Solution:** Use background token

```vue
<!-- Before -->
<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* ❌ Always black */
}
</style>

<!-- After -->
<style scoped>
.overlay {
  background-color: var(--color-neutral-900); /* ✅ Adapts to mode */
  opacity: 0.5;
}
</style>
```

#### Issue 2: Shadow Colors

**Problem:** Box shadows with hardcoded colors

**Solution:** Use neutral tokens or shadow utilities

```vue
<!-- Before -->
<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* ❌ Always black */
}
</style>

<!-- After -->
<style scoped>
.card {
  box-shadow: var(--shadow-md); /* ✅ Pre-defined shadow */
  /* OR */
  box-shadow: 0 4px 6px var(--color-neutral-900); /* ✅ Adapts */
  opacity: 0.1;
}
</style>
```

#### Issue 3: Gradients

**Problem:** Gradients with hardcoded colors

**Solution:** Use primary color tokens

```vue
<!-- Before -->
<style scoped>
.gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6); /* ❌ */
}
</style>

<!-- After -->
<style scoped>
.gradient {
  background: linear-gradient(
    to right,
    var(--color-primary-500),
    var(--color-primary-600)
  ); /* ✅ Adapts to palette */
}
</style>
```

## Troubleshooting

### Issue: Colors Don't Change When Switching Palettes

**Symptoms:**

- Component colors stay the same across all palettes
- Switching in Storybook has no effect

**Causes:**

1. Hardcoded colors instead of CSS variables
2. CSS specificity issues
3. Inline styles overriding CSS

**Solutions:**

```vue
<!-- ❌ DON'T: Hardcoded -->
<button style="background-color: #3b82f6">Click</button>

<!-- ✅ DO: CSS variable -->
<button class="btn-primary">Click</button>

<style scoped>
.btn-primary {
  background-color: var(--color-primary-500);
}
</style>
```

### Issue: Poor Contrast in Specific Palette/Mode

**Symptoms:**

- Text is hard to read in certain combinations
- Automated tests fail for specific variations

**Causes:**

1. Using wrong token combination
2. Token not designed for that use case
3. Missing mode-specific adjustments

**Solutions:**

```vue
<!-- ❌ DON'T: Wrong token combination -->
<style scoped>
.text {
  color: var(--color-primary-300); /* Too light in light mode */
  background-color: var(--color-primary-100);
}
</style>

<!-- ✅ DO: Use semantic text tokens -->
<style scoped>
.text {
  color: var(--color-text-primary); /* Always readable */
  background-color: var(--color-surface-default);
}
</style>

<!-- ✅ DO: Use appropriate contrast ratios -->
<style scoped>
.text-on-primary {
  color: var(--color-text-inverse); /* White/black depending on mode */
  background-color: var(--color-primary-500);
}
</style>
```

### Issue: Borders Not Visible in Dark Mode

**Symptoms:**

- Borders disappear or are barely visible in dark mode
- Components lose definition

**Causes:**

1. Using light border color that doesn't adapt
2. Border color same as background

**Solutions:**

```vue
<!-- ❌ DON'T: Light border only -->
<style scoped>
.card {
  border: 1px solid #e5e7eb; /* ❌ Invisible in dark mode */
}
</style>

<!-- ✅ DO: Use adaptive border token -->
<style scoped>
.card {
  border: 1px solid var(--color-border-default); /* ✅ Adapts */
}
</style>
```

### Issue: Component Looks Different in Storybook vs App

**Symptoms:**

- Palette switching works in Storybook but not in app
- Tokens resolve to wrong values in production

**Causes:**

1. Missing palette/mode classes on root element
2. CSS not imported in app
3. Stale build cache

**Solutions:**

```javascript
// ❌ DON'T: Forget to apply classes
document.documentElement.className = ''; // Missing palette/mode

// ✅ DO: Apply both classes
document.documentElement.className = 'corporate-trust light';

// ✅ DO: Import tokens CSS
import '@/designSystem/styles/tokens.css';
```

### Issue: TypeScript Errors with Token Names

**Symptoms:**

- IDE shows errors for CSS variable names
- Autocomplete doesn't work for tokens

**Causes:**

1. Missing CSS custom property type definitions
2. Incorrect token name

**Solutions:**

```typescript
// Add to src/types/css.d.ts
declare module 'csstype' {
  interface Properties {
    '--color-primary-500'?: string;
    '--color-text-primary'?: string;
    // ... other tokens
  }
}
```

## Best Practices

### DO ✅

1. **Always use semantic tokens** for colors

   ```vue
   background-color: var(--color-primary-500);
   ```

2. **Test in all 10 variations** before merging
   - 5 palettes × 2 modes = 10 combinations

3. **Use system tokens** for common patterns

   ```vue
   color: var(--color-text-primary); background-color: var(--color-background-default);
   ```

4. **Leverage semantic state colors** for feedback

   ```vue
   color: var(--color-success-700); background-color: var(--color-success-50);
   ```

5. **Add Storybook stories** for visual testing

   ```typescript
   export const AllStates: Story = {
     render: () => ({
       template: `
         <div>
           <MyComponent state="default" />
           <MyComponent state="hover" />
           <MyComponent state="active" />
           <MyComponent state="disabled" />
         </div>
       `,
     }),
   };
   ```

6. **Use validation functions** for accessibility

   ```typescript
   validateContrastRatios([...]);
   ```

7. **Document token usage** in component files
   ```vue
   <!--
   Token Usage:
   - Background: --color-surface-default
   - Text: --color-text-primary
   - Border: --color-border-default
   -->
   ```

### DON'T ❌

1. **Don't hardcode colors**

   ```vue
   background-color: #3b82f6; /* ❌ Breaks palette switching */
   ```

2. **Don't use palette-specific logic in JavaScript**

   ```javascript
   // ❌ DON'T
   if (palette === 'corporate-trust') {
     return '#3b82f6';
   }

   // ✅ DO: Use CSS classes
   <div :class="`btn-${variant}`">
   ```

3. **Don't skip accessibility testing**
   - Every component must meet WCAG AA in all variations

4. **Don't use raw neutral tokens for text**

   ```vue
   color: var(--color-neutral-900); /* ❌ Doesn't invert in dark mode */ color:
   var(--color-text-primary); /* ✅ Adapts correctly */
   ```

5. **Don't modify token values in components**

   ```vue
   /* ❌ DON'T override tokens */ --color-primary-500: #custom-color; /* ✅ DO use provided tokens
   */ background-color: var(--color-primary-500);
   ```

6. **Don't create palette-specific components**

   ```vue
   <!-- ❌ DON'T -->
   <BlueButton />
   <PurpleButton />

   <!-- ✅ DO: One universal component -->
   <Button variant="primary" />
   ```

7. **Don't assume light mode defaults**

   ```vue
   /* ❌ DON'T assume white background */ color: #000000; /* ✅ DO use semantic tokens */ color:
   var(--color-text-primary);
   ```

### Performance Tips

1. **CSS variables are fast** - no performance concerns
2. **Avoid inline styles** with variables - prefer CSS classes
3. **Use CSS custom properties** - better than JavaScript theme switching
4. **Minimize palette class changes** - batch updates when possible

### Maintenance Checklist

- [ ] All colors use semantic tokens
- [ ] Component tested in all 10 variations
- [ ] Accessibility validated (WCAG AA)
- [ ] Storybook story created
- [ ] Documentation updated
- [ ] Tests include palette coverage
- [ ] No hardcoded colors remain
- [ ] Focus indicators visible in all modes

### Resources

- [Main Design System README](../README.md)
- [Token Definitions](../styles/tokens.css)
- [Validation Functions](../tokens/validation.ts)
- [Storybook Preview Configuration](../../../.storybook/preview.ts)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Questions or Issues?**

1. Check [Troubleshooting](#troubleshooting) section
2. Review component examples in Storybook
3. Run validation functions to identify issues
4. Open an issue if you discover a bug
