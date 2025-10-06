# Task T026: Create Colors.stories.mdx Showcasing All Color Palettes

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T020, T021, T022

## Description

Create comprehensive Storybook documentation for all 5 color palettes with interactive palette selection, WCAG compliance information, and visual color scale representations.

## Files to Create/Modify

- `src/design-system/Colors.stories.mdx` - Color palette documentation
- `src/design-system/components/ColorPaletteViewer.vue` - Helper component for palette visualization (optional)

## Dependencies

**Blocks**: None (documentation task)
**Blocked By**: T020-T022 (CSS theme definitions must exist)

## Acceptance Criteria

- [ ] All 5 color palettes displayed with full 11-step scales
- [ ] Interactive palette switcher showing each palette
- [ ] WCAG AAA compliance badges for each palette
- [ ] Color value display (OKLCH and HEX)
- [ ] Semantic color mappings documented
- [ ] Usage examples for each color category
- [ ] Light and dark theme previews
- [ ] Accessibility information clearly presented
- [ ] ESLint: 0 errors
- [ ] Storybook renders without errors

## Implementation Notes

**Colors Story** (`src/design-system/Colors.stories.mdx`):

````mdx
import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';
import { ref } from 'vue';

<Meta title="Design System/Colors" />

# Color System

Our design system provides 5 professional color palettes, all meeting WCAG 2.1 AAA accessibility standards (7:1 contrast for normal text, 4.5:1 for large text).

## Color Palettes

### 1. Corporate Trust (Default)

**Target**: Finance, Legal, Enterprise
**Aesthetic**: Blue-Gray, Professional, Trustworthy

<ColorPalette>
  <ColorItem
    title="Primary (Blue-Gray)"
    subtitle="Corporate Trust primary color"
    colors={{
      50: 'oklch(0.98 0.01 240)',
      100: 'oklch(0.95 0.02 240)',
      200: 'oklch(0.88 0.04 240)',
      300: 'oklch(0.78 0.06 240)',
      400: 'oklch(0.65 0.07 240)',
      500: 'oklch(0.55 0.08 240)',
      600: 'oklch(0.45 0.07 240)',
      700: 'oklch(0.38 0.06 240)',
      800: 'oklch(0.30 0.05 240)',
      900: 'oklch(0.25 0.04 240)',
      950: 'oklch(0.18 0.03 240)',
    }}
  />
</ColorPalette>

**WCAG AAA Compliance**: ✅ Validated

- Normal text: 7.1:1 contrast ratio
- Large text: 4.5:1 contrast ratio

### 2. Modern Tech

**Target**: SaaS, Tech Startups, Developer Tools
**Aesthetic**: Teal-Slate, Innovative, Contemporary

<ColorPalette>
  <ColorItem
    title="Primary (Teal)"
    subtitle="Modern Tech primary color"
    colors={{
      50: 'oklch(0.97 0.02 200)',
      500: 'oklch(0.60 0.12 200)',
      900: 'oklch(0.30 0.06 200)',
    }}
  />
</ColorPalette>

**WCAG AAA Compliance**: ✅ Validated

### 3. Sophisticated Luxury

**Target**: Premium Services, Luxury Branding
**Aesthetic**: Charcoal-Gold, Premium, Refined

<ColorPalette>
  <ColorItem
    title="Primary (Charcoal)"
    subtitle="Sophisticated Luxury primary color"
    colors={{
      50: 'oklch(0.98 0.01 60)',
      500: 'oklch(0.25 0.02 60)',
      900: 'oklch(0.15 0.01 60)',
    }}
  />
  <ColorItem
    title="Accent (Gold)"
    subtitle="Use darker shades for text"
    colors={{
      500: 'oklch(0.75 0.12 80)',
      700: 'oklch(0.55 0.10 80)', // Text-safe
    }}
  />
</ColorPalette>

**WCAG AAA Compliance**: ✅ Validated (Gold accent requires 700+ for text)

### 4. Clean Minimal

**Target**: Design Agencies, Minimalist Products
**Aesthetic**: Pure Neutrals, Timeless, Content-focused

<ColorPalette>
  <ColorItem
    title="Primary (Pure Neutral)"
    subtitle="Clean Minimal primary color"
    colors={{
      50: 'oklch(1.0 0 0)',
      500: 'oklch(0.5 0 0)',
      900: 'oklch(0.15 0 0)',
      950: 'oklch(0.0 0 0)',
    }}
  />
</ColorPalette>

**WCAG AAA Compliance**: ✅ Maximum contrast (21:1)

### 5. Vibrant Professional

**Target**: Creative Agencies, Innovative B2B
**Aesthetic**: Purple-Green, Energetic, Creative

<ColorPalette>
  <ColorItem
    title="Primary (Purple)"
    subtitle="Vibrant Professional primary color"
    colors={{
      50: 'oklch(0.97 0.03 290)',
      500: 'oklch(0.60 0.20 290)',
      700: 'oklch(0.45 0.18 290)', // Text-safe
      900: 'oklch(0.30 0.12 290)',
    }}
  />
  <ColorItem
    title="Accent (Green)"
    subtitle="Complementary accent"
    colors={{
      500: 'oklch(0.60 0.18 150)',
    }}
  />
</ColorPalette>

**WCAG AAA Compliance**: ✅ Validated (Purple requires 700+ for text)

## Semantic Colors

### Light Theme

<ColorPalette>
  <ColorItem title="Background" colors={['var(--color-background)']} />
  <ColorItem title="Surface" colors={['var(--color-surface)']} />
  <ColorItem title="Border" colors={['var(--color-border)']} />
  <ColorItem title="Text Primary" colors={['var(--color-text-primary)']} />
  <ColorItem title="Text Secondary" colors={['var(--color-text-secondary)']} />
</ColorPalette>

### Feedback Colors

<ColorPalette>
  <ColorItem title="Success" colors={['var(--color-success)']} />
  <ColorItem title="Warning" colors={['var(--color-warning)']} />
  <ColorItem title="Error" colors={['var(--color-error)']} />
  <ColorItem title="Info" colors={['var(--color-info)']} />
</ColorPalette>

## Usage

### In Templates (Tailwind Utilities)

```vue
<template>
  <button class="bg-primary-500 text-white hover:bg-primary-600">Primary Button</button>
</template>
```
````

### In Templates (CSS Variables)

```vue
<template>
  <div :style="{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }">
    Content
  </div>
</template>
```

### With useTokens Composable

```vue
<script setup>
import { useTokens } from '@/composables/useTokens';
const { color } = useTokens();
</script>

<template>
  <div :style="{ backgroundColor: color('SURFACE') }">Content</div>
</template>
```

## Accessibility Notes

- All color combinations meet WCAG 2.1 AAA standards
- Minimum 7:1 contrast for normal text (16px)
- Minimum 4.5:1 contrast for large text (18px+)
- Never use color alone to convey information
- Test with color blindness simulators

```

## Testing Requirements

- [ ] Verify all 5 palettes render correctly in Storybook
- [ ] Test color swatches display OKLCH values
- [ ] Check WCAG compliance badges are visible
- [ ] Verify usage examples are accurate
- [ ] Test in both light and dark Storybook themes
- [ ] Ensure responsive layout for color swatches
- [ ] Visual regression testing (manual)

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T026-colors-story`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
