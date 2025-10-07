# Task T002: Write WCAG Contrast Validation Tests

**Status**: Pending
**Priority**: P1
**Agent**: agent:testing
**Parallel**: Yes (with T001)
**Depends On**: None

## Description

Write comprehensive Vitest tests to validate that all 10 palette variations meet WCAG AA contrast requirements for text/background and UI element color pairs. These tests MUST fail initially since validation functions don't exist yet (TDD approach).

Tests validate contrast ratios:

- Normal text: ≥ 4.5:1
- Large text/UI: ≥ 3:1

## Files to Create/Modify

- `front/tests/unit/designSystem/tokens/contrast.spec.ts` - Create test file with WCAG contrast validation tests

## Dependencies

**Blocks**: None (tests written first in TDD)
**Blocked By**: None (TDD: tests written before implementation)

## Acceptance Criteria

- [ ] Test file created at correct path
- [ ] Tests for validateContrastRatios function written
- [ ] Tests cover all 10 variations (5 palettes × 2 modes)
- [ ] Tests validate text-primary on background-default (≥ 4.5:1)
- [ ] Tests validate text-secondary on background-default (≥ 4.5:1)
- [ ] Tests validate primary-500 on background-default (≥ 3:1)
- [ ] Total: 50 test cases (10 variations × 5 token pairs)
- [ ] Tests initially FAIL (validation function doesn't exist yet)
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

Follow the test structure from `specs/003-palette-switcher/contracts/token-validation.md`:

```typescript
describe('WCAG Contrast Compliance', () => {
  const palettes = [
    'corporate-trust',
    'creative-energy',
    'natural-harmony',
    'warm-welcome',
    'minimalist',
  ];
  const modes = ['light', 'dark'];

  palettes.forEach((palette) => {
    modes.forEach((mode) => {
      describe(`${palette}.${mode}`, () => {
        it('text-primary on background-default meets AA (4.5:1)', () => {
          const result = validateContrastRatios([
            {
              variation: `${palette}.${mode}`,
              foregroundToken: '--color-text-primary',
              backgroundToken: '--color-background-default',
              minimumRatio: 4.5,
            },
          ]);
          expect(result.valid).toBe(true);
        });

        it('text-secondary on background-default meets AA (4.5:1)', () => {
          // Similar structure
        });

        it('primary-500 on background-default meets AA for large text (3:1)', () => {
          // Similar structure
        });
      });
    });
  });
});
```

**Token Pairs to Test** (for each of 10 variations):

1. `--color-text-primary` / `--color-background-default` (4.5:1)
2. `--color-text-secondary` / `--color-background-default` (4.5:1)
3. `--color-text-tertiary` / `--color-background-default` (4.5:1)
4. `--color-primary-500` / `--color-background-default` (3:1)
5. `--color-border-default` / `--color-background-default` (3:1)

## Testing Requirements

- [ ] Run tests: `npm run test:unit -- tokens/contrast.spec.ts`
- [ ] Tests MUST fail initially (expected in TDD)
- [ ] Clear error messages showing actual vs required ratios
- [ ] Use AAA pattern (Arrange, Act, Assert)

## GitHub Issue

**Issue**: #90
**Link**: https://github.com/webmint/jira-clone/issues/90

## Sub-branch

**Branch**: `spec/003-palette-switcher/T002-wcag-contrast-tests`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
