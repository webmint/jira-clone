# Task T012: Generate Corporate Trust Color Palette with WCAG AAA Validation

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T004

## Description

Create the Corporate Trust color palette (Blue-Gray neutral, professional aesthetic) with full WCAG 2.1 AAA contrast validation. This palette targets finance, legal, and enterprise audiences with a trustworthy, conservative appearance.

## Files to Create/Modify

- `src/palettes/corporate-trust.palette.ts` - Color palette definition with metadata
- `tests/unit/palettes/corporate-trust.spec.ts` - WCAG contrast validation tests

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

- **Primary Color**: Blue-gray (professional, trustworthy)
- **Accent Color**: Subtle complementary (low saturation)
- **Semantic Colors**:
  - Success: Forest green (stable, reliable)
  - Warning: Amber (conservative, not alarming)
  - Error: Deep red (serious, not aggressive)
  - Info: Steel blue (professional, informative)
- **Gray Scale**: Neutral grays (no color cast)

**Color Scale Requirements**:

- 50: Very light (backgrounds, hover states)
- 500: Base color (primary usage)
- 900: Very dark (text on light backgrounds)
- 950: Darkest (high contrast text)

**OKLCH Format Example**:

```typescript
primary: {
  50: 'oklch(0.98 0.01 240)', // Very light blue-gray
  500: 'oklch(0.55 0.08 240)', // Base blue-gray
  900: 'oklch(0.25 0.04 240)', // Dark blue-gray
}
```

**Validation Strategy**:

- Test each color against white background (light theme)
- Test each color against black background (dark theme)
- Calculate contrast ratios using WCAG formula
- Document which color steps are suitable for text vs backgrounds

## Testing Requirements

- [ ] Unit tests validate all contrast ratios meet WCAG AAA
- [ ] Tests verify 11 steps exist for each color
- [ ] Tests check OKLCH format validity
- [ ] Tests ensure palette metadata is complete
- [ ] Visual inspection in Storybook (after T026)
- [ ] Zod schema validation tests pass

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T012-corporate-trust-palette`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
