# Design System Documentation

## Overview

This design system supports **5 switchable color palettes**, each with light and dark modes, totaling **10 variations**. Components are built to work universally with all variations using semantic design tokens, ensuring consistent theming without modifying component code.

## Available Palettes

### 1. Corporate Trust (Blue) - Default

- **Primary Color**: Blue (#3B82F6)
- **Theme**: Professional, reliable, trustworthy
- **Use Cases**: Corporate websites, business applications, financial services, enterprise tools
- **CSS Classes**: `.corporate-trust.light`, `.corporate-trust.dark`

### 2. Creative Energy (Purple)

- **Primary Color**: Purple (#9333EA)
- **Theme**: Innovative, creative, bold
- **Use Cases**: Creative agencies, design tools, entertainment platforms, arts & media
- **CSS Classes**: `.creative-energy.light`, `.creative-energy.dark`

### 3. Natural Harmony (Green)

- **Primary Color**: Emerald Green (#10B981)
- **Theme**: Fresh, natural, growth-oriented
- **Use Cases**: Environmental organizations, health apps, wellness platforms, sustainability
- **CSS Classes**: `.natural-harmony.light`, `.natural-harmony.dark`

### 4. Warm Welcome (Orange)

- **Primary Color**: Amber/Orange (#F59E0B)
- **Theme**: Friendly, approachable, energetic
- **Use Cases**: Social platforms, community sites, hospitality, food & beverage
- **CSS Classes**: `.warm-welcome.light`, `.warm-welcome.dark`

### 5. Minimalist (Gray)

- **Primary Color**: Slate Gray (#64748B)
- **Theme**: Clean, modern, minimalist
- **Use Cases**: Portfolios, blogs, content-focused sites, typography-heavy designs
- **CSS Classes**: `.minimalist.light`, `.minimalist.dark`
- **Special Feature**: Monochromatic design with gray-based primary colors

## Architecture

### 2-Dimensional Class System

Palettes are activated by applying **two CSS classes** to a container element (typically `<html>` or a section):

1. **Palette class**: `corporate-trust`, `creative-energy`, `natural-harmony`, `warm-welcome`, or `minimalist`
2. **Mode class**: `light` or `dark`

```html
<!-- Corporate Trust in light mode (default) -->
<html class="corporate-trust light">
  <!-- Your app -->
</html>

<!-- Creative Energy in dark mode -->
<html class="creative-energy dark">
  <!-- Your app -->
</html>

<!-- Scoped palette switching within a section -->
<div class="natural-harmony light">
  <!-- This section uses Natural Harmony light mode -->
  <button>Green button</button>
</div>
```

### Semantic Design Tokens

Components use **semantic tokens** that automatically resolve to the active palette. This enables universal components that work with all 10 variations without modification.

```css
/* Component CSS */
.button {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-border-default);
}
```

These tokens resolve differently based on the active palette:

- **Corporate Trust**: `--color-primary-500` = #3B82F6 (blue)
- **Creative Energy**: `--color-primary-500` = #9333EA (purple)
- **Natural Harmony**: `--color-primary-500` = #10B981 (green)
- **Warm Welcome**: `--color-primary-500` = #F59E0B (orange)
- **Minimalist**: `--color-primary-500` = #64748B (gray)

### Token Categories

1. **Primary Colors**: `--color-primary-{50-900}` (10 shades)
   - Palette-specific brand colors
   - Lightest (50) to darkest (900)
   - Used for primary actions, highlights, branding

2. **Neutral Colors**: `--color-neutral-{0-900}` (11 shades)
   - Grayscale palette
   - Inverted in dark mode (0 = white in light, black in dark)
   - Used for text, backgrounds, borders

3. **Semantic States**: `--color-{state}-{50,100,500,700}`
   - States: `success`, `warning`, `error`, `info`
   - Consistent across all palettes
   - Used for feedback, alerts, status indicators

4. **System Tokens**: `--color-{category}-{variant}`
   - Categories: `background`, `surface`, `text`, `border`
   - Variants: `default`, `subtle`, `muted`, `primary`, `secondary`, `tertiary`, `inverse`
   - Abstract semantic layer for component development

## Using Palettes in Components

### ✅ DO: Use Semantic Tokens

```vue
<template>
  <button class="btn-primary">Click me</button>
</template>

<style scoped>
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-2) var(--spacing-4);
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
}
</style>
```

**Why this works**: Semantic tokens automatically adapt to the active palette. This button will be blue in Corporate Trust, purple in Creative Energy, green in Natural Harmony, etc.

### ❌ DON'T: Hardcode Colors

```vue
<style scoped>
.btn-primary {
  background-color: #3b82f6; /* ❌ Only works with Corporate Trust */
  color: white;              /* ❌ Doesn't adapt to dark mode */
}
</style>
```

**Why this fails**: Hardcoded colors break when users switch palettes. Components become unusable or visually inconsistent.

### Best Practices

1. **Always use CSS custom properties** for colors
2. **Prefer system tokens** (`--color-background-default`) over raw tokens (`--color-neutral-0`)
3. **Test components in all 10 variations** using Storybook
4. **Avoid palette-specific logic** in JavaScript (use CSS classes instead)
5. **Use semantic state colors** for feedback (`--color-success-500`, `--color-error-700`)

## Switching Palettes at Runtime

### JavaScript API

```javascript
// Change to Creative Energy dark mode
document.documentElement.className = 'creative-energy dark';

// Change to Natural Harmony light mode
document.documentElement.className = 'natural-harmony light';

// Toggle between light and dark (keep same palette)
const currentClasses = document.documentElement.classList;
if (currentClasses.contains('light')) {
  currentClasses.replace('light', 'dark');
} else {
  currentClasses.replace('dark', 'light');
}
```

### Vue Composable

```typescript
import { useTheme } from '@/designSystem/composables/useTheme';

const { setTheme, theme, resolvedTheme } = useTheme();

// Change mode (light/dark)
setTheme('dark');

// Get current theme
console.log(theme.value); // 'light' | 'dark' | 'system'
console.log(resolvedTheme.value); // 'light' | 'dark'
```

**Note**: The `useTheme` composable handles light/dark mode but does not change palettes. Palette switching is typically done at the application level.

## Accessibility

All 10 palette variations meet **WCAG AA contrast requirements**:

- **Normal text**: ≥ 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt+ bold)**: ≥ 3:1 contrast ratio
- **UI components**: ≥ 3:1 contrast ratio

### Automated Validation

The design system includes automated contrast tests:

```typescript
import { validateContrastRatios } from '@/designSystem/tokens/validation';

// Validate specific token pairs
const result = validateContrastRatios([
  {
    variation: 'creative-energy.dark',
    foregroundToken: '--color-text-primary',
    backgroundToken: '--color-background-default',
    minimumRatio: 4.5,
  },
]);

if (!result.valid) {
  console.error('Contrast failure:', result.failures);
}
```

### Manual Testing

1. Use browser DevTools Color Picker to check contrast ratios
2. Test with screen readers (NVDA, JAWS, VoiceOver)
3. Verify focus indicators are visible in all modes
4. Test with reduced motion preferences enabled

## Storybook Integration

All component stories support **instant palette switching** via Storybook toolbar controls:

### Using Storybook

1. Start Storybook: `npm run storybook`
2. Open any component story
3. Use toolbar controls at the top:
   - **Palette dropdown** (🎨): Select Corporate Trust, Creative Energy, Natural Harmony, Warm Welcome, or Minimalist
   - **Mode toggle** (☀️/🌙): Switch between Light and Dark
4. Component updates instantly

### How It Works

Storybook uses a custom decorator that applies palette and mode classes:

```typescript
// .storybook/preview.ts
const withTheme: Decorator = (story, context) => {
  const palette = context.globals.palette || 'corporate-trust';
  const mode = context.globals.mode || 'light';

  return h('div', { class: `${palette} ${mode}` }, [h(story())]);
};
```

All stories inherit this decorator automatically—no per-story configuration needed.

## Token Completeness

All 10 variations define the **exact same set of tokens**. This ensures components work identically across all palettes:

```typescript
import { validateTokenCompleteness } from '@/designSystem/tokens/validation';

// Validate that all 10 variations have matching tokens
const result = validateTokenCompleteness(allPaletteVariations);

if (!result.valid) {
  console.error('Missing tokens:', result.missingTokens);
  console.error('Extra tokens:', result.extraTokens);
}
```

## File Structure

```
src/designSystem/
├── README.md                          # This file
├── styles/
│   └── tokens.css                     # All 10 palette definitions
├── tokens/
│   ├── utils.ts                       # Helper functions
│   └── validation.ts                  # Token validation
├── composables/
│   └── useTheme.ts                    # Vue composable for theme management
├── components/                        # Universal components
└── docs/
    └── palette-guide.md               # Detailed usage guide
```

## Migration from Single-Palette Systems

If migrating from a single-palette system:

1. **Replace hardcoded colors** with semantic tokens
2. **Test components** in all 10 variations using Storybook
3. **Fix contrast issues** identified by automated tests
4. **Update state management** to handle palette selection
5. **Add palette switcher UI** to your application

## Further Reading

- [Palette Usage Guide](./docs/palette-guide.md) - Detailed guide for creating palette-aware components
- [Token Reference](./styles/tokens.css) - Complete token definitions for all palettes
- [Validation Functions](./tokens/validation.ts) - Token completeness and contrast validation
- [WCAG Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) - Accessibility guidelines

## Support

For questions or issues with the palette system:

1. Check the [Palette Usage Guide](./docs/palette-guide.md)
2. Review component examples in Storybook
3. Run automated validation tests
4. Open an issue if you discover a palette-specific bug
