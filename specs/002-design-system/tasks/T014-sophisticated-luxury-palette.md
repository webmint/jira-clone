# Task T014: Generate Sophisticated Luxury Color Palette with WCAG AAA Validation

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create the Sophisticated Luxury color palette (Charcoal-Gold, premium aesthetic) with full WCAG 2.1 AAA contrast validation. This palette targets premium services, luxury branding, and high-end professional applications.

## Files to Create/Modify

- `src/palettes/sophisticated-luxury.palette.ts` - Color palette definition with metadata
- `tests/unit/palettes/sophisticated-luxury.spec.ts` - WCAG contrast validation tests

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
- [ ] Gold accent requires darker variant for AAA compliance (documented)
- [ ] Palette metadata includes: id, name, description, targetAudience
- [ ] WCAG compliance object documents validation results
- [ ] TypeScript types are correctly defined
- [ ] Zod schema validation passes
- [ ] Test coverage: 100% for contrast validation
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Palette Characteristics**:

- **Primary Color**: Charcoal (sophisticated, premium, timeless)
- **Accent Color**: Gold (luxury, prestige) - **Note**: Gold requires darker shades for text AAA compliance
- **Semantic Colors**:
  - Success: Forest green (stable, reliable, wealth)
  - Warning: Muted gold (refined caution)
  - Error: Dark red (serious, controlled)
  - Info: Navy blue (professional, trustworthy)
- **Gray Scale**: Warm neutrals (very subtle warm undertone)

**Color Scale Guidelines**:

- 50: Very light charcoal tint (backgrounds)
- 500: Base charcoal (primary brand color)
- 900: Very dark charcoal (text on light backgrounds)
- 950: Darkest charcoal (maximum contrast)

**Special Consideration - Gold Accent**:

- Standard gold (#D4AF37) does NOT meet AAA for text
- Use darker gold variant (#8A6D1F) for text to achieve 7:1 contrast
- Brighter gold reserved for decorative elements only

**OKLCH Format Example**:

```typescript
primary: {
  50: 'oklch(0.98 0.01 60)',   // Very light charcoal
  500: 'oklch(0.25 0.02 60)',  // Base charcoal
  900: 'oklch(0.15 0.01 60)',  // Dark charcoal
}

accent: {
  50: 'oklch(0.97 0.05 80)',   // Very light gold
  500: 'oklch(0.75 0.12 80)',  // Base gold (decorative only)
  700: 'oklch(0.55 0.10 80)',  // Dark gold (text-safe)
  900: 'oklch(0.35 0.06 80)',  // Darkest gold
}
```

**Palette Structure** (`src/palettes/sophisticated-luxury.palette.ts`):

```typescript
import type { ColorPalette } from '../tokens/types';

export const sophisticatedLuxuryPalette: ColorPalette = {
  id: 'sophisticated-luxury',
  name: 'Sophisticated Luxury',
  description: 'Charcoal-Gold palette for premium services and luxury branding',
  targetAudience: [
    'Luxury Services',
    'Premium Brands',
    'High-end Professional',
    'Wealth Management',
  ],

  colors: {
    primary: {
      50: 'oklch(0.98 0.01 60)',
      100: 'oklch(0.95 0.01 60)',
      200: 'oklch(0.85 0.02 60)',
      300: 'oklch(0.70 0.02 60)',
      400: 'oklch(0.50 0.02 60)',
      500: 'oklch(0.25 0.02 60)', // Base charcoal
      600: 'oklch(0.22 0.02 60)',
      700: 'oklch(0.19 0.01 60)',
      800: 'oklch(0.17 0.01 60)',
      900: 'oklch(0.15 0.01 60)',
      950: 'oklch(0.10 0.01 60)',
    },
    accent: {
      // Gold - IMPORTANT: Use 700+ for text to meet AAA
      50: 'oklch(0.97 0.05 80)',
      // ... include note about text-safe values
    },
    success: {
      // Forest green
      500: 'oklch(0.45 0.10 150)',
    },
    // ... warning, error, info, gray
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

- Luxury goods and services
- Wealth management platforms
- Premium professional services (law firms, consultancies)
- High-end hospitality
- Exclusive memberships

## Testing Requirements

- [ ] Unit tests validate all contrast ratios meet WCAG AAA
- [ ] Tests specifically verify gold accent text variants meet 7:1
- [ ] Tests verify 11 steps exist for each color
- [ ] Tests check OKLCH format validity
- [ ] Tests ensure palette metadata is complete
- [ ] Visual inspection in Storybook (after T026)
- [ ] Zod schema validation tests pass
- [ ] Document which gold shades are text-safe vs decorative-only

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T014-sophisticated-luxury-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
