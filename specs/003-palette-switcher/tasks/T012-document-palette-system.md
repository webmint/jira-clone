# Task T012: Document 2-Dimensional Palette System

**Status**: Pending
**Priority**: P3
**Agent**: agent:frontend
**Parallel**: Yes (with T013)
**Depends On**: T001-T011 (all implementation complete)

## Description

Create comprehensive documentation for the 2-dimensional palette system in the design system README. This documentation explains the architecture, available palettes, how to use them, and best practices for creating palette-aware components.

## Files to Create/Modify

- `front/src/designSystem/README.md` - Update or create design system documentation
- `front/src/designSystem/docs/` - Create docs folder if it doesn't exist

## Dependencies

**Blocks**: None
**Blocked By**: T001-T011 (document completed implementation)

## Acceptance Criteria

- [ ] Design system README updated with palette system overview
- [ ] All 5 palettes documented with use cases
- [ ] CSS class system explained (2-dimensional: palette + mode)
- [ ] Examples showing how to apply palette classes
- [ ] Semantic token architecture explained
- [ ] Best practices for component development documented
- [ ] WCAG AA compliance requirements noted
- [ ] Link to palette guide (T013) included
- [ ] Markdown formatting correct
- [ ] ESLint: 0 errors (for any code examples)

## Implementation Notes

**Documentation Structure**:

````markdown
# Design System Documentation

## Overview

This design system supports 5 switchable color palettes, each with light and dark modes, totaling 10 variations. Components are built to work universally with all variations using semantic design tokens.

## Available Palettes

### 1. Corporate Trust (Blue) - Default

- **Primary Color**: Blue (#3B82F6)
- **Use Cases**: Corporate sites, business applications, financial services
- **CSS Classes**: `.corporate-trust.light`, `.corporate-trust.dark`

### 2. Creative Energy (Purple)

- **Primary Color**: Purple (#9333EA)
- **Use Cases**: Creative agencies, design tools, entertainment platforms
- **CSS Classes**: `.creative-energy.light`, `.creative-energy.dark`

### 3. Natural Harmony (Green)

- **Primary Color**: Green (#10B981)
- **Use Cases**: Environmental organizations, health apps, wellness platforms
- **CSS Classes**: `.natural-harmony.light`, `.natural-harmony.dark`

### 4. Warm Welcome (Orange)

- **Primary Color**: Orange (#F59E0B)
- **Use Cases**: Social platforms, community sites, hospitality
- **CSS Classes**: `.warm-welcome.light`, `.warm-welcome.dark`

### 5. Minimalist (Gray)

- **Primary Color**: Slate Gray (#64748B)
- **Use Cases**: Portfolios, blogs, content-focused sites
- **CSS Classes**: `.minimalist.light`, `.minimalist.dark`

## Architecture

### 2-Dimensional Class System

Palettes are activated by applying two CSS classes to a container element (typically `<html>` or a section):

```html
<!-- Corporate Trust in light mode (default) -->
<html class="corporate-trust light">
  <!-- Creative Energy in dark mode -->
  <html class="creative-energy dark">
    <!-- Natural Harmony in light mode -->
    <div class="natural-harmony light">
      <!-- Scoped theme switching -->
    </div>
  </html>
</html>
```
````

### Semantic Design Tokens

Components use semantic tokens that automatically resolve to the active palette:

```css
/* Component CSS */
.button {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-border-default);
}
```

These tokens resolve differently based on the active palette:

- Corporate Trust: `--color-primary-500` = #3B82F6 (blue)
- Creative Energy: `--color-primary-500` = #9333EA (purple)
- Natural Harmony: `--color-primary-500` = #10B981 (green)

### Token Categories

1. **Primary Colors**: `--color-primary-{50-900}` - Palette-specific brand colors
2. **Neutral Colors**: `--color-neutral-{0-1000}` - Grays (inverted in dark mode)
3. **Semantic States**: `--color-success/warning/error/info-{100,500,700}`
4. **System Tokens**: `--color-background/surface/text/border-{variant}`

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
}
</style>
```

### ❌ DON'T: Hardcode Colors

```vue
<style scoped>
.btn-primary {
  background-color: #3b82f6; /* ❌ Only works with Corporate Trust */
  color: white;
}
</style>
```

## Accessibility

All 10 palette variations meet WCAG AA contrast requirements:

- Normal text: ≥ 4.5:1 contrast ratio
- Large text/UI elements: ≥ 3:1 contrast ratio

Automated tests validate compliance for all variations.

## Storybook Integration

All component stories support palette switching via Storybook toolbar:

1. Open Storybook
2. Select palette from dropdown (Corporate Trust, Creative Energy, etc.)
3. Toggle between Light and Dark modes
4. Component updates instantly

## Further Reading

- [Palette Usage Guide](./docs/palette-guide.md) - Detailed guide for creating palette-aware components
- [Token Reference](./styles/tokens.css) - Complete token definitions
- [WCAG Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

```

**Placement**:
- Update main README if it exists, or create new one
- Keep documentation concise but comprehensive
- Include visual examples if possible

## Testing Requirements

- [ ] Documentation renders correctly in Markdown viewer
- [ ] All links work (internal and external)
- [ ] Code examples are syntactically correct
- [ ] Examples follow actual implementation

## GitHub Issue

**Issue**: #100
**Link**: https://github.com/webmint/jira-clone/issues/100

## Sub-branch

**Branch**: `spec/003-palette-switcher/T012-document-palette-system`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
