# Task T015: Generate Clean Minimal Color Palette with WCAG AAA Validation

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create the Clean Minimal color palette (Pure Neutrals, timeless aesthetic) with full WCAG 2.1 AAA contrast validation. This palette targets design agencies, minimalist products, and applications prioritizing simplicity and clarity.

## Files to Create/Modify

- `src/palettes/clean-minimal.palette.ts` - Color palette definition with metadata
- `tests/unit/palettes/clean-minimal.spec.ts` - WCAG contrast validation tests

## Dependencies

**Blocks**: T020 (CSS generation needs all palettes)
**Blocked By**: T004 (Storybook configuration must be complete to test palette)

## Acceptance Criteria

- [ ] Palette defines all required colors: primary, accent, success, warning, error, info, gray
- [ ] Each color has 11-step scale (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
- [ ] Colors use OKLCH format for perceptual uniformity
- [ ] Palette passes WCAG 2.1 AAA contrast validation:
  - Normal text (16px): 7:1 contrast ratio minimum
  - Large text (18px+): 4.5:1 contrast ratio minimum
- [ ] Maximum contrast ratios achieved (21:1 for pure black on white)
- [ ] Palette metadata includes: id, name, description, targetAudience
- [ ] WCAG compliance object documents validation results
- [ ] TypeScript types are correctly defined
- [ ] Zod schema validation passes
- [ ] Test coverage: 100% for contrast validation
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Palette Characteristics**:

- **Primary Color**: Neutral-900 (near black, no color cast)
- **Accent Color**: Pure blue (minimal saturation, maximum clarity)
- **Semantic Colors**:
  - Success: Pure green (straightforward positive feedback)
  - Warning: Pure yellow (clear caution signal)
  - Error: Pure red (unambiguous error state)
  - Info: Pure blue (neutral information)
- **Gray Scale**: True neutrals (zero color cast, perfect for any context)

**Color Scale Guidelines**:

- 50: Pure white or near-white (#FFFFFF or #FAFAFA)
- 500: Mid-gray (balanced contrast)
- 900: Near black (#0A0A0A)
- 950: Pure black (#000000)

**OKLCH Format Example** (Pure neutrals have zero chroma):

```typescript
primary: {
  50: 'oklch(1.0 0 0)',      // Pure white
  500: 'oklch(0.5 0 0)',     // Mid-gray
  900: 'oklch(0.15 0 0)',    // Near black
  950: 'oklch(0.0 0 0)',     // Pure black
}

accent: {
  // Pure blue - minimal saturation
  500: 'oklch(0.45 0.15 240)',
}
```

**Palette Structure** (`src/palettes/clean-minimal.palette.ts`):

```typescript
import type { ColorPalette } from '../tokens/types';

export const cleanMinimalPalette: ColorPalette = {
  id: 'clean-minimal',
  name: 'Clean Minimal',
  description: 'Pure neutral palette for minimalist, timeless design',
  targetAudience: [
    'Design Agencies',
    'Minimalist Products',
    'Content-focused Apps',
    'Portfolio Sites',
  ],

  colors: {
    primary: {
      50: 'oklch(1.0 0 0)', // #FFFFFF
      100: 'oklch(0.98 0 0)', // #FAFAFA
      200: 'oklch(0.95 0 0)', // #F4F4F4
      300: 'oklch(0.90 0 0)', // #E5E5E5
      400: 'oklch(0.70 0 0)', // #A3A3A3
      500: 'oklch(0.50 0 0)', // #737373
      600: 'oklch(0.40 0 0)', // #525252
      700: 'oklch(0.30 0 0)', // #404040
      800: 'oklch(0.20 0 0)', // #262626
      900: 'oklch(0.15 0 0)', // #171717
      950: 'oklch(0.0 0 0)', // #000000
    },
    accent: {
      // Pure blue
      50: 'oklch(0.97 0.02 240)',
      500: 'oklch(0.45 0.15 240)',
      900: 'oklch(0.25 0.08 240)',
    },
    success: {
      // Pure green
      500: 'oklch(0.55 0.18 145)',
    },
    warning: {
      // Pure yellow
      500: 'oklch(0.75 0.15 90)',
    },
    error: {
      // Pure red
      500: 'oklch(0.55 0.22 25)',
    },
    info: {
      // Pure blue
      500: 'oklch(0.50 0.18 240)',
    },
    gray: {
      // Same as primary (pure neutrals)
      // ... mirror primary scale
    },
  },

  wcagCompliance: {
    level: 'AAA',
    textContrast: 21.0, // Maximum possible (black on white)
    largeTextContrast: 21.0,
    validated: true,
  },
};
```

**Target Audience**:

- Design agencies (showcasing work without distraction)
- Minimalist products (focus on content, not decoration)
- Content management systems
- Portfolio websites
- Reading-focused applications

**Design Philosophy**:

- Remove visual noise
- Maximum readability
- Timeless aesthetic (won't date)
- Universal applicability
- Content is the color

## Testing Requirements

- [ ] Unit tests validate all contrast ratios meet WCAG AAA
- [ ] Tests verify maximum contrast (21:1) for black on white
- [ ] Tests verify 11 steps exist for each color
- [ ] Tests check OKLCH format validity (zero chroma for grays)
- [ ] Tests ensure palette metadata is complete
- [ ] Visual inspection in Storybook (after T026)
- [ ] Zod schema validation tests pass
- [ ] Verify true neutrals have zero color cast

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T015-clean-minimal-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
