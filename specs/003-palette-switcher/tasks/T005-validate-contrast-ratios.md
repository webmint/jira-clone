# Task T005: Implement validateContrastRatios Function

**Status**: Pending
**Priority**: P1
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T003

## Description

Implement the `validateContrastRatios()` function that verifies all text/background and UI element color pairs meet WCAG AA contrast requirements across all 10 palette variations. This function will be used by the tests created in T002.

## Files to Create/Modify

- `front/src/designSystem/tokens/validation.ts` - Add validateContrastRatios function (same file as T004)

## Dependencies

**Blocks**: None (used by tests T002, but tests already written)
**Blocked By**: T003 (uses getCSSVariable and getContrastRatio helpers)

## Acceptance Criteria

- [ ] `validateContrastRatios()` function implemented with correct signature
- [ ] Function accepts array of contrast checks with variation, tokens, and minimum ratio
- [ ] Function queries CSS variable values using getCSSVariable
- [ ] Function calculates contrast ratios using getContrastRatio
- [ ] Function compares ratios against minimum requirements
- [ ] Function returns ContrastValidationResult with failure details
- [ ] Tests from T002 now PASS
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

**Contract** (from `specs/003-palette-switcher/contracts/token-validation.md`):

```typescript
interface ContrastCheck {
  variation: string; // e.g., "natural-harmony.light"
  foregroundToken: string; // e.g., "--color-text-primary"
  backgroundToken: string; // e.g., "--color-background-default"
  minimumRatio: number; // 4.5 for normal text, 3.0 for large text/UI
}

interface ContrastValidationResult {
  valid: boolean;
  failures?: Array<{
    variation: string;
    foreground: string;
    foregroundValue: string; // Hex color
    background: string;
    backgroundValue: string; // Hex color
    ratio: number; // Actual contrast ratio
    required: number; // Required contrast ratio
  }>;
}

function validateContrastRatios(checks: ContrastCheck[]): ContrastValidationResult {
  const failures: ContrastValidationResult['failures'] = [];

  checks.forEach((check) => {
    // Parse variation (e.g., "creative-energy.dark" → palette="creative-energy", mode="dark")
    const [palette, mode] = check.variation.split('.');

    // Get color values
    const fgValue = getCSSVariable({
      tokenName: check.foregroundToken,
      palette,
      mode,
    });
    const bgValue = getCSSVariable({
      tokenName: check.backgroundToken,
      palette,
      mode,
    });

    // Calculate contrast ratio
    const ratio = getContrastRatio({
      foreground: fgValue,
      background: bgValue,
    });

    // Check against minimum
    if (ratio < check.minimumRatio) {
      failures.push({
        variation: check.variation,
        foreground: check.foregroundToken,
        foregroundValue: fgValue,
        background: check.backgroundToken,
        backgroundValue: bgValue,
        ratio,
        required: check.minimumRatio,
      });
    }
  });

  return {
    valid: failures.length === 0,
    failures: failures.length > 0 ? failures : undefined,
  };
}
```

**Usage Example**:

```typescript
const checks = [
  {
    variation: 'corporate-trust.light',
    foregroundToken: '--color-text-primary',
    backgroundToken: '--color-background-default',
    minimumRatio: 4.5,
  },
  {
    variation: 'corporate-trust.dark',
    foregroundToken: '--color-text-primary',
    backgroundToken: '--color-background-default',
    minimumRatio: 4.5,
  },
  // ... repeat for all 10 variations
];

const result = validateContrastRatios(checks);

if (!result.valid) {
  result.failures?.forEach((failure) => {
    console.error(
      `${failure.variation}: ${failure.foreground} on ${failure.background} = ${failure.ratio.toFixed(2)} (required: ${failure.required})`
    );
  });
}
```

**WCAG AA Requirements**:

- Normal text (< 24px): ≥ 4.5:1
- Large text (≥ 24px or ≥ 19px bold): ≥ 3:1
- UI components and graphics: ≥ 3:1

## Testing Requirements

- [ ] Run tests: `npm run test:unit -- tokens/contrast.spec.ts`
- [ ] Tests from T002 must PASS
- [ ] All 50 test cases passing (10 variations × 5 token pairs)
- [ ] Test coverage: ≥ 80%

## GitHub Issue

**Issue**: #93
**Link**: https://github.com/webmint/jira-clone/issues/93

## Sub-branch

**Branch**: `spec/003-palette-switcher/T005-validate-contrast-ratios`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
