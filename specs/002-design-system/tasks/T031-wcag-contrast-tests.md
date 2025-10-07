# Task T031: Write WCAG Contrast Ratio Tests for All Color Palettes

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T030

## Description

Write comprehensive automated tests to validate WCAG 2.1 AAA contrast ratios (7:1 for normal text, 4.5:1 for large text) for all 5 color palettes in both light and dark themes.

## Files to Create/Modify

- `tests/unit/tokens/contrast.spec.ts` - WCAG contrast validation tests
- Install `color-contrast-checker` npm package for automated validation

## Dependencies

**Blocks**: T032 (theme switching tests can run after)
**Blocked By**: T030 (validation tests should pass first)

## Acceptance Criteria

- [ ] Tests validate 7:1 contrast for normal text (WCAG AAA)
- [ ] Tests validate 4.5:1 contrast for large text (WCAG AA large)
- [ ] All 5 color palettes tested: Corporate Trust, Modern Tech, Sophisticated Luxury, Clean Minimal, Vibrant Professional
- [ ] Both light and dark themes validated
- [ ] Tests verify text-on-background combinations
- [ ] Tests verify semantic color contrasts (success, error, warning, info)
- [ ] Automated contrast calculations using color-contrast-checker library
- [ ] Test coverage: 100% for all palette colors
- [ ] All tests pass
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Install Dependency**:

```bash
npm install --save-dev color-contrast-checker
```

**Test Suite** (`tests/unit/tokens/contrast.spec.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import ColorContrastChecker from 'color-contrast-checker';
import { corporateTrustPalette } from '@/palettes/corporate-trust.palette';
import { modernTechPalette } from '@/palettes/modern-tech.palette';
import { sophisticatedLuxuryPalette } from '@/palettes/sophisticated-luxury.palette';
import { cleanMinimalPalette } from '@/palettes/clean-minimal.palette';
import { vibrantProfessionalPalette } from '@/palettes/vibrant-professional.palette';

const checker = new ColorContrastChecker();

// WCAG AAA requires 7:1 for normal text, 4.5:1 for large text
const WCAG_AAA_NORMAL = 7.0;
const WCAG_AA_LARGE = 4.5;

/**
 * Convert OKLCH to RGB hex for contrast checking
 * Note: This is a simplified conversion. In production, use a library like chroma-js
 */
function oklchToHex(oklch: string): string {
  // For testing, we'll use a mapping or library
  // This is a placeholder - actual implementation in T012-T016
  // For now, assume we have a helper function
  return convertOKLCHToHex(oklch);
}

describe('WCAG Contrast Validation', () => {
  describe('Corporate Trust Palette', () => {
    const palette = corporateTrustPalette;

    describe('Light Theme', () => {
      const background = '#FAFBFC'; // Light background

      it('primary-900 text on light background meets AAA', () => {
        const textColor = palette.colors.primary[900];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });

      it('primary-800 text on light background meets AAA', () => {
        const textColor = palette.colors.primary[800];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });

      it('success color on light background meets AAA', () => {
        const textColor = palette.colors.success[600];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });

      it('error color on light background meets AAA', () => {
        const textColor = palette.colors.error[600];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });

      it('warning color on light background meets AAA', () => {
        const textColor = palette.colors.warning[600];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });

      it('info color on light background meets AAA', () => {
        const textColor = palette.colors.info[600];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });
    });

    describe('Dark Theme', () => {
      const background = '#0F1419'; // Dark background

      it('primary-50 text on dark background meets AAA', () => {
        const textColor = palette.colors.primary[50];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });

      it('success color on dark background meets AAA', () => {
        const textColor = palette.colors.success[400];
        const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      });
    });

    it('palette metadata reports AAA compliance', () => {
      expect(palette.wcagCompliance.level).toBe('AAA');
      expect(palette.wcagCompliance.textContrast).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
      expect(palette.wcagCompliance.largeTextContrast).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
      expect(palette.wcagCompliance.validated).toBe(true);
    });
  });

  describe('Modern Tech Palette', () => {
    const palette = modernTechPalette;

    it('meets AAA standards for light theme', () => {
      const background = '#FFFFFF';
      const textColor = palette.colors.primary[900];
      const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
    });

    it('palette metadata reports AAA compliance', () => {
      expect(palette.wcagCompliance.level).toBe('AAA');
      expect(palette.wcagCompliance.validated).toBe(true);
    });
  });

  describe('Sophisticated Luxury Palette', () => {
    const palette = sophisticatedLuxuryPalette;

    it('charcoal primary meets AAA standards', () => {
      const background = '#FDFBF7';
      const textColor = palette.colors.primary[900];
      const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
    });

    it('gold accent text-safe variant meets AAA', () => {
      // Gold 700 is designated as text-safe
      const background = '#FDFBF7';
      const textColor = palette.colors.accent[700];
      const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
    });

    it('palette metadata reports AAA compliance', () => {
      expect(palette.wcagCompliance.level).toBe('AAA');
      expect(palette.wcagCompliance.validated).toBe(true);
    });
  });

  describe('Clean Minimal Palette', () => {
    const palette = cleanMinimalPalette;

    it('achieves maximum contrast (21:1)', () => {
      const background = '#FFFFFF'; // Pure white
      const textColor = palette.colors.primary[950]; // Pure black
      const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
      expect(ratio).toBeGreaterThanOrEqual(20.9); // Maximum contrast ~21:1
    });

    it('palette metadata reports AAA compliance', () => {
      expect(palette.wcagCompliance.level).toBe('AAA');
      expect(palette.wcagCompliance.textContrast).toBeGreaterThanOrEqual(20);
      expect(palette.wcagCompliance.validated).toBe(true);
    });
  });

  describe('Vibrant Professional Palette', () => {
    const palette = vibrantProfessionalPalette;

    it('purple text-safe variant meets AAA', () => {
      // Purple 700 is designated as text-safe
      const background = '#FFFFFF';
      const textColor = palette.colors.primary[700];
      const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
    });

    it('green accent meets AAA standards', () => {
      const background = '#FFFFFF';
      const textColor = palette.colors.accent[600];
      const ratio = checker.getContrastRatio(oklchToHex(textColor), background);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
    });

    it('palette metadata reports AAA compliance', () => {
      expect(palette.wcagCompliance.level).toBe('AAA');
      expect(palette.wcagCompliance.validated).toBe(true);
    });
  });

  describe('Cross-Palette Validation', () => {
    const palettes = [
      corporateTrustPalette,
      modernTechPalette,
      sophisticatedLuxuryPalette,
      cleanMinimalPalette,
      vibrantProfessionalPalette,
    ];

    it('all palettes report AAA compliance', () => {
      palettes.forEach((palette) => {
        expect(palette.wcagCompliance.level).toBe('AAA');
        expect(palette.wcagCompliance.textContrast).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
        expect(palette.wcagCompliance.largeTextContrast).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
        expect(palette.wcagCompliance.validated).toBe(true);
      });
    });

    it('all palettes have complete 11-step scales', () => {
      palettes.forEach((palette) => {
        const colorCategories = [
          'primary',
          'accent',
          'success',
          'warning',
          'error',
          'info',
          'gray',
        ];
        colorCategories.forEach((category) => {
          const scale = palette.colors[category];
          expect(Object.keys(scale)).toHaveLength(11);
          expect(scale).toHaveProperty('50');
          expect(scale).toHaveProperty('950');
        });
      });
    });
  });
});

// Helper function to convert OKLCH to Hex
// Note: This should use a proper color conversion library (chroma-js, culori, etc.)
function convertOKLCHToHex(oklch: string): string {
  // Implementation depends on chosen color library
  // For testing, this should be imported from palette files
  // which already have the conversion logic
  throw new Error('Implement OKLCH to Hex conversion');
}
```

**Additional Test: Automated Palette Validation**:

```typescript
describe('Automated Palette Contrast Validation', () => {
  /**
   * Programmatically test all color combinations
   */
  function validatePaletteContrast(
    paletteName: string,
    palette: any,
    lightBg: string,
    darkBg: string
  ) {
    describe(`${paletteName} - Automated Validation`, () => {
      // Test all colors against light background
      Object.entries(palette.colors).forEach(([category, scale]) => {
        describe(`${category} on light background`, () => {
          // Test darker shades (should have good contrast on light)
          [700, 800, 900, 950].forEach((shade) => {
            if (scale[shade]) {
              it(`${category}-${shade} meets AAA on light background`, () => {
                const ratio = checker.getContrastRatio(oklchToHex(scale[shade]), lightBg);
                expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
              });
            }
          });
        });
      });

      // Test all colors against dark background
      Object.entries(palette.colors).forEach(([category, scale]) => {
        describe(`${category} on dark background`, () => {
          // Test lighter shades (should have good contrast on dark)
          [50, 100, 200, 300, 400].forEach((shade) => {
            if (scale[shade]) {
              it(`${category}-${shade} meets AAA on dark background`, () => {
                const ratio = checker.getContrastRatio(oklchToHex(scale[shade]), darkBg);
                expect(ratio).toBeGreaterThanOrEqual(WCAG_AAA_NORMAL);
              });
            }
          });
        });
      });
    });
  }

  // Run automated validation for all palettes
  validatePaletteContrast('Corporate Trust', corporateTrustPalette, '#FAFBFC', '#0F1419');
  validatePaletteContrast('Modern Tech', modernTechPalette, '#FFFFFF', '#0A0F1A');
  validatePaletteContrast('Sophisticated Luxury', sophisticatedLuxuryPalette, '#FDFBF7', '#0D0D0D');
  validatePaletteContrast('Clean Minimal', cleanMinimalPalette, '#FFFFFF', '#000000');
  validatePaletteContrast('Vibrant Professional', vibrantProfessionalPalette, '#FFFFFF', '#0C0C14');
});
```

## Testing Requirements

- [ ] All contrast tests pass for all 5 palettes
- [ ] Light theme contrasts validated
- [ ] Dark theme contrasts validated
- [ ] Automated tests catch any non-compliant colors
- [ ] Test execution time < 5 seconds
- [ ] No flaky tests
- [ ] CI/CD integration

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T031-wcag-contrast-tests`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
