# Data Model: Palette Switcher

**Feature**: Palette Switcher | **Date**: 2025-10-07

## Overview

This document defines the data model for the 2-dimensional palette system: 5 color palettes × 2 modes = 10 total variations. Each variation must define a complete set of design tokens to ensure consistent rendering across all components.

## Token Structure

### Dimensions

1. **Palette Dimension** (5 options):
   - `corporate-trust` - Blue, professional, reliable
   - `creative-energy` - Purple/violet, innovative, creative
   - `natural-harmony` - Green, calm, eco-friendly
   - `warm-welcome` - Orange/amber, friendly, approachable
   - `minimalist` - Gray/neutral, clean, modern

2. **Mode Dimension** (2 options):
   - `light` - Light backgrounds, dark text
   - `dark` - Dark backgrounds, light text

### CSS Class Selectors

Each of the 10 variations is selected by combining palette and mode classes:

```css
.corporate-trust.light {
  /* blue + light */
}
.corporate-trust.dark {
  /* blue + dark */
}
.creative-energy.light {
  /* purple + light */
}
.creative-energy.dark {
  /* purple + dark */
}
.natural-harmony.light {
  /* green + light */
}
.natural-harmony.dark {
  /* green + dark */
}
.warm-welcome.light {
  /* orange + light */
}
.warm-welcome.dark {
  /* orange + dark */
}
.minimalist.light {
  /* gray + light */
}
.minimalist.dark {
  /* gray + dark */
}
```

---

## Required Tokens Per Variation

Each of the 10 variations MUST define the following tokens (listed in order of existing `tokens.css`):

### Primary Color Scale (10 shades)

- `--color-primary-50` - Lightest tint
- `--color-primary-100`
- `--color-primary-200`
- `--color-primary-300`
- `--color-primary-400`
- `--color-primary-500` - Base color
- `--color-primary-600`
- `--color-primary-700`
- `--color-primary-800`
- `--color-primary-900` - Darkest shade
- `--color-primary-1000` (optional)

### Neutral Color Scale (11 shades)

- `--color-neutral-0` - Pure white (light mode) / Pure black (dark mode)
- `--color-neutral-50`
- `--color-neutral-100`
- `--color-neutral-200`
- `--color-neutral-300`
- `--color-neutral-400`
- `--color-neutral-500` - Mid-point
- `--color-neutral-600`
- `--color-neutral-700`
- `--color-neutral-800`
- `--color-neutral-900` - Pure black (light mode) / Pure white (dark mode)
- `--color-neutral-1000`

### Semantic State Colors (3 shades each)

- `--color-success-100`, `--color-success-500`, `--color-success-700`
- `--color-warning-100`, `--color-warning-500`, `--color-warning-700`
- `--color-error-100`, `--color-error-500`, `--color-error-700`
- `--color-info-100`, `--color-info-500`, `--color-info-700`

### System Semantic Tokens (derived from above)

**Background tokens:**

- `--color-background-default` → `var(--color-neutral-0)` or similar
- `--color-background-subtle` → `var(--color-neutral-50)` or similar
- `--color-background-muted` → `var(--color-neutral-100)` or similar

**Surface tokens:**

- `--color-surface-default` → `var(--color-neutral-0)` or similar
- `--color-surface-raised` → `var(--color-neutral-50)` or similar
- `--color-surface-overlay` → `var(--color-neutral-100)` or similar

**Text tokens:**

- `--color-text-primary` → `var(--color-neutral-900)` or similar
- `--color-text-secondary` → `var(--color-neutral-700)` or similar
- `--color-text-tertiary` → `var(--color-neutral-600)` or similar
- `--color-text-disabled` → `var(--color-neutral-400)` or similar
- `--color-text-inverse` → `var(--color-neutral-0)` or similar

**Border tokens:**

- `--color-border-default` → `var(--color-neutral-200)` or similar
- `--color-border-subtle` → `var(--color-neutral-100)` or similar
- `--color-border-strong` → `var(--color-neutral-300)` or similar
- `--color-border-focus` → `var(--color-primary-500)` or similar

---

## Palette Color Definitions

### 1. Corporate Trust (Blue) - EXISTING

**Primary Color**: Blue (#3B82F6 base)
**Purpose**: Professional, reliable, trustworthy
**Use Cases**: Corporate sites, business applications, financial services

#### Light Mode

- Primary: Blue scale (lighter blues for hover/active states)
- Neutrals: White background, dark gray text
- Status: Follow example above

#### Dark Mode

- Primary: Lighter blue for contrast (#60A5FA base)
- Neutrals: Dark backgrounds, white/light text (inverted neutral scale)
- Status: Follow example above

---

### 2. Creative Energy (Purple) - NEW

**Primary Color**: Purple/Violet (#9333EA base for light, #C084FC base for dark)
**Purpose**: Innovative, creative, artistic
**Use Cases**: Creative agencies, design tools, entertainment platforms

#### Light Mode

```css
.creative-energy.light {
  /* Primary - Purple scale */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #9333ea; /* Base */
  --color-primary-600: #9333ea;
  --color-primary-700: #7e22ce;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;

  /* Neutrals - Similar to Corporate Trust light */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-300: #d1d5db;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #6b7280;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1f2937;
  --color-neutral-900: #111827;
  --color-neutral-1000: #000000;

  /* Semantic states - shared across all palettes */
  /* ... (same as Corporate Trust) */

  /* System semantic tokens */
  --color-background-default: var(--color-neutral-0);
  --color-background-subtle: var(--color-neutral-50);
  --color-background-muted: var(--color-neutral-100);
  /* ... (follow pattern) */
}
```

#### Dark Mode

```css
.creative-energy.dark {
  /* Primary - Lighter purple for contrast */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #c084fc; /* Lighter base for dark mode */
  --color-primary-600: #a855f7;
  --color-primary-700: #9333ea;
  --color-primary-800: #7e22ce;
  --color-primary-900: #6b21a8;

  /* Neutrals - Inverted */
  --color-neutral-0: #111827;
  --color-neutral-50: #1f2937;
  --color-neutral-100: #374151;
  --color-neutral-200: #4b5563;
  --color-neutral-300: #6b7280;
  --color-neutral-400: #9ca3af;
  --color-neutral-500: #d1d5db;
  --color-neutral-600: #e5e7eb;
  --color-neutral-700: #f3f4f6;
  --color-neutral-800: #f9fafb;
  --color-neutral-900: #ffffff;
  --color-neutral-1000: #ffffff;

  /* Semantic states - shared */
  /* ... */

  /* System semantic tokens */
  --color-background-default: var(--color-neutral-0);
  --color-background-subtle: var(--color-neutral-50);
  --color-background-muted: var(--color-neutral-100);
  /* ... */
}
```

---

### 3. Natural Harmony (Green) - NEW

**Primary Color**: Green (#10B981 base for light, #34D399 base for dark)
**Purpose**: Calm, eco-friendly, health-focused
**Use Cases**: Environmental organizations, health apps, wellness platforms

#### Light & Dark Modes

- Primary: Green scale (emerald/teal family)
- Neutrals: Similar to other palettes
- Follow pattern established above

---

### 4. Warm Welcome (Orange) - NEW

**Primary Color**: Orange/Amber (#F59E0B base for light, #FBBF24 base for dark)
**Purpose**: Friendly, approachable, energetic
**Use Cases**: Social platforms, community sites, hospitality

#### Light & Dark Modes

- Primary: Orange/amber scale
- Neutrals: Similar to other palettes
- Follow pattern established above

---

### 5. Minimalist (Gray) - NEW

**Primary Color**: Gray (#64748B base - mid-tone gray, adjust for light/dark)
**Purpose**: Clean, modern, minimalist
**Use Cases**: Portfolios, blogs, content-focused sites

#### Light & Dark Modes

- Primary: Gray scale (cool gray/slate family)
- Neutrals: Same as neutral scale (primary color is also gray-based)
- Follow pattern established above

---

## Token Validation Rules

### Completeness

**Rule**: All 10 variations MUST define the exact same token names

- If `.corporate-trust.light` defines `--color-text-primary`, then ALL 9 other variations must also define it
- No variation may have missing tokens
- Automated tests verify token parity

### Accessibility

**Rule**: All token pairs must meet WCAG AA contrast requirements

- `--color-text-primary` on `--color-background-default`: ≥ 4.5:1
- `--color-text-secondary` on `--color-background-default`: ≥ 4.5:1
- `--color-primary-500` on `--color-background-default`: ≥ 3:1 (for large text/UI elements)
- Automated contrast tests run for all 10 variations

### Naming Consistency

**Rule**: Token names follow `--{category}-{element}-{variant}` pattern

- Categories: `color`, `spacing`, `font`, etc.
- Elements: `text`, `background`, `border`, `surface`, `primary`, `neutral`, etc.
- Variants: `default`, `subtle`, `muted`, `primary`, `secondary`, etc.

---

## Default Palette

**Default**: `corporate-trust.light` (`.corporate-trust.light` applied to `:root` by default)

- Fallback when no classes applied: `:root` selector defines Corporate Trust light tokens
- Ensures graceful degradation if JavaScript fails to apply classes

---

## Migration from Current Structure

### Current State (2 variations):

- `:root` and `.light` → Corporate Trust light mode
- `.dark` → Corporate Trust dark mode

### Target State (10 variations):

- `:root` and `.corporate-trust.light` → Corporate Trust light (default)
- `.corporate-trust.dark` → Corporate Trust dark
- `.creative-energy.light`, `.creative-energy.dark`
- `.natural-harmony.light`, `.natural-harmony.dark`
- `.warm-welcome.light`, `.warm-welcome.dark`
- `.minimalist.light`, `.minimalist.dark`

### Migration Strategy:

1. Keep existing `.light` and `.dark` selectors as aliases for `.corporate-trust.light` and `.corporate-trust.dark` during transition
2. Update applications to use new 2-dimensional class system (`.corporate-trust.light`)
3. Deprecate old single-class system after migration complete

---

_Data model complete: 2025-10-07_
