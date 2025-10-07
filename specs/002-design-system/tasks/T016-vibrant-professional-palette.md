# Task T016: Generate Vibrant Professional Color Palette with WCAG AAA Validation

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create the Vibrant Professional color palette (Purple-Green, energetic aesthetic) with full WCAG 2.1 AAA contrast validation. This palette targets creative agencies, innovative B2B platforms, and applications that need energy while maintaining professionalism.

## Files to Create/Modify

- `src/palettes/vibrant-professional.palette.ts` - Color palette definition with metadata
- `tests/unit/palettes/vibrant-professional.spec.ts` - WCAG contrast validation tests

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
- [ ] Purple requires darkening for AAA text compliance (documented)
- [ ] Palette metadata includes: id, name, description, targetAudience
- [ ] WCAG compliance object documents validation results
- [ ] TypeScript types are correctly defined
- [ ] Zod schema validation passes
- [ ] Test coverage: 100% for contrast validation
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Palette Characteristics**:

- **Primary Color**: Purple (creative, innovative, energetic)
- **Accent Color**: Green (growth, action, balance to purple)
- **Semantic Colors**:
  - Success: Green (natural choice, matches accent)
  - Warning: Amber (attention, complements palette)
  - Error: Red (clear error signal)
  - Info: Blue (informative, neutral)
- **Gray Scale**: Cool neutrals (slight blue undertone)

**Color Scale Guidelines**:

- 50: Very light purple tint (backgrounds)
- 500: Base purple (vibrant but not overwhelming)
- 700: Darker purple (text-safe for AAA compliance)
- 900: Very dark purple (high contrast text)
- 950: Darkest purple (maximum contrast)

**Special Consideration - Purple Primary**:

- Standard purple (#7C3AED) does NOT meet AAA for text
- Use darker purple variant (#6D28D9 or 700 level) for text to achieve 7:1
- Brighter purple (500) for decorative elements, buttons with white text

**OKLCH Format Example**:

```typescript
primary: {
  50: 'oklch(0.97 0.03 290)',   // Very light purple
  500: 'oklch(0.60 0.20 290)',  // Base purple (decorative)
  700: 'oklch(0.45 0.18 290)',  // Dark purple (text-safe)
  900: 'oklch(0.30 0.12 290)',  // Darkest purple
}

accent: {
  50: 'oklch(0.97 0.03 150)',   // Very light green
  500: 'oklch(0.60 0.18 150)',  // Base green
  900: 'oklch(0.30 0.10 150)',  // Dark green
}
```

**Palette Structure** (`src/palettes/vibrant-professional.palette.ts`):

```typescript
import type { ColorPalette } from '../tokens/types';

export const vibrantProfessionalPalette: ColorPalette = {
  id: 'vibrant-professional',
  name: 'Vibrant Professional',
  description: 'Purple-Green palette for creative and innovative B2B platforms',
  targetAudience: ['Creative Agencies', 'Innovative B2B', 'EdTech', 'Marketing Platforms'],

  colors: {
    primary: {
      50: 'oklch(0.97 0.03 290)',
      100: 'oklch(0.94 0.05 290)',
      200: 'oklch(0.88 0.10 290)',
      300: 'oklch(0.78 0.15 290)',
      400: 'oklch(0.68 0.18 290)',
      500: 'oklch(0.60 0.20 290)', // Base purple (decorative)
      600: 'oklch(0.52 0.19 290)',
      700: 'oklch(0.45 0.18 290)', // Text-safe purple
      800: 'oklch(0.38 0.15 290)',
      900: 'oklch(0.30 0.12 290)',
      950: 'oklch(0.22 0.08 290)',
    },
    accent: {
      // Green - complements purple
      50: 'oklch(0.97 0.03 150)',
      500: 'oklch(0.60 0.18 150)',
      700: 'oklch(0.45 0.15 150)', // Text-safe
      900: 'oklch(0.30 0.10 150)',
    },
    success: {
      // Same as accent (green)
      500: 'oklch(0.60 0.18 150)',
    },
    warning: {
      // Amber
      500: 'oklch(0.75 0.15 70)',
    },
    error: {
      // Red
      500: 'oklch(0.55 0.22 25)',
    },
    info: {
      // Blue
      500: 'oklch(0.50 0.18 240)',
    },
    gray: {
      // Cool neutrals (slight blue undertone)
      50: 'oklch(0.98 0.005 240)',
      500: 'oklch(0.50 0.01 240)',
      900: 'oklch(0.20 0.01 240)',
    },
  },

  wcagCompliance: {
    level: 'AAA',
    textContrast: 7.0,
    largeTextContrast: 4.5,
    validated: true,
  },
};
```

**Target Audience**:

- Creative agencies (design, branding, marketing)
- Innovative B2B platforms
- EdTech platforms
- Marketing and growth tools
- Community platforms

**Color Psychology**:

- **Purple**: Creativity, imagination, innovation, uniqueness
- **Green**: Growth, action, balance, freshness
- **Combination**: Creative energy balanced with growth mindset

## Testing Requirements

- [ ] Unit tests validate all contrast ratios meet WCAG AAA
- [ ] Tests specifically verify purple text variants meet 7:1
- [ ] Tests verify 11 steps exist for each color
- [ ] Tests check OKLCH format validity
- [ ] Tests ensure palette metadata is complete
- [ ] Visual inspection in Storybook (after T026)
- [ ] Zod schema validation tests pass
- [ ] Document which purple shades are text-safe vs decorative-only

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T016-vibrant-professional-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
