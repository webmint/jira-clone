# Task T013: Generate Modern Tech Color Palette with WCAG AAA Validation

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create the Modern Tech color palette (Teal-Slate, innovative aesthetic) with full WCAG 2.1 AAA contrast validation. This palette targets SaaS platforms, tech startups, and developer tools with a contemporary, innovative appearance.

## Files to Create/Modify

- `src/palettes/modern-tech.palette.ts` - Color palette definition with metadata
- `tests/unit/palettes/modern-tech.spec.ts` - WCAG contrast validation tests

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
- [ ] Palette metadata includes: id, name, description, targetAudience
- [ ] WCAG compliance object documents validation results
- [ ] TypeScript types are correctly defined
- [ ] Zod schema validation passes
- [ ] Test coverage: 100% for contrast validation
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Palette Characteristics**:

- **Primary Color**: Teal (innovative, modern, tech-forward)
- **Accent Color**: Sky blue (interactive, energetic)
- **Semantic Colors**:
  - Success: Emerald green (growth, positive)
  - Warning: Amber (caution, attention)
  - Error: Red (alerts, errors)
  - Info: Blue (informative, helpful)
- **Gray Scale**: Slate grays (cool undertone)

**Color Scale Guidelines**:

- 50: Very light teal tint (backgrounds, hover states)
- 500: Base teal color (primary usage, buttons, links)
- 900: Very dark teal (text on light backgrounds)
- 950: Darkest teal (high contrast text)

**OKLCH Format Example**:

```typescript
primary: {
  50: 'oklch(0.97 0.02 200)',  // Very light teal
  500: 'oklch(0.60 0.12 200)', // Base teal
  900: 'oklch(0.30 0.06 200)', // Dark teal
}
```

**Palette Structure** (`src/palettes/modern-tech.palette.ts`):

```typescript
import type { ColorPalette } from '../tokens/types';

export const modernTechPalette: ColorPalette = {
  id: 'modern-tech',
  name: 'Modern Tech',
  description: 'Teal-Slate palette for innovative SaaS and developer tools',
  targetAudience: ['SaaS', 'Tech Startups', 'Developer Tools', 'Innovation-focused'],

  colors: {
    primary: {
      50: 'oklch(0.97 0.02 200)',
      100: 'oklch(0.94 0.04 200)',
      200: 'oklch(0.88 0.07 200)',
      300: 'oklch(0.78 0.10 200)',
      400: 'oklch(0.68 0.11 200)',
      500: 'oklch(0.60 0.12 200)',
      600: 'oklch(0.50 0.11 200)',
      700: 'oklch(0.42 0.09 200)',
      800: 'oklch(0.35 0.07 200)',
      900: 'oklch(0.30 0.06 200)',
      950: 'oklch(0.22 0.04 200)',
    },
    accent: {
      // Sky blue - use similar structure
      50: 'oklch(0.97 0.02 220)',
      // ... 100-950
    },
    // ... success, warning, error, info, gray
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

- SaaS platforms (Stripe, Notion, Linear)
- Developer tools (VS Code, GitHub, GitLab)
- Tech startups (modern, innovative)
- API documentation sites

## Testing Requirements

- [ ] Unit tests validate all contrast ratios meet WCAG AAA
- [ ] Tests verify 11 steps exist for each color
- [ ] Tests check OKLCH format validity
- [ ] Tests ensure palette metadata is complete
- [ ] Visual inspection in Storybook (after T026)
- [ ] Zod schema validation tests pass
- [ ] Compare contrast with Corporate Trust to ensure similar accessibility

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T013-modern-tech-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
