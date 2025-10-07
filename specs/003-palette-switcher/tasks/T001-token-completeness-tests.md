# Task T001: Write Token Completeness Validation Tests

**Status**: Pending
**Priority**: P1
**Agent**: agent:testing
**Parallel**: Yes (with T002)
**Depends On**: None

## Description

Write comprehensive Vitest tests to validate that all 10 palette variations (5 palettes × 2 modes) define the exact same set of design token names. These tests MUST fail initially since validation functions don't exist yet (TDD approach).

This task ensures token parity across all variations - if `.corporate-trust.light` defines `--color-text-primary`, then ALL 9 other variations must also define it.

## Files to Create/Modify

- `front/tests/unit/designSystem/tokens/validation.spec.ts` - Create test file with token completeness validation tests

## Dependencies

**Blocks**: None (tests written first in TDD)
**Blocked By**: None (TDD: tests written before implementation)

## Acceptance Criteria

- [ ] Test file created at correct path
- [ ] Tests for validateTokenCompleteness function written
- [ ] Test validates all 10 variations (corporate-trust, creative-energy, natural-harmony, warm-welcome, minimalist × light/dark)
- [ ] Test checks that all variations have identical token names
- [ ] Test detects missing tokens in any variation
- [ ] Test detects extra tokens in any variation
- [ ] Tests initially FAIL (validation function doesn't exist yet)
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

Follow the test structure from `specs/003-palette-switcher/contracts/token-validation.md`:

```typescript
describe('Token Validation', () => {
  describe('validateTokenCompleteness', () => {
    it('passes when all 10 variations have identical token sets', () => {
      const result = validateTokenCompleteness(mockVariations);
      expect(result.valid).toBe(true);
    });

    it('fails when a variation is missing tokens', () => {
      // Test with incomplete variation
      const result = validateTokenCompleteness(incompleteVariations);
      expect(result.valid).toBe(false);
      expect(result.missingTokens).toHaveLength(1);
    });

    it('fails when a variation has extra tokens', () => {
      // Test with extra tokens
      const result = validateTokenCompleteness(variationsWithExtra);
      expect(result.valid).toBe(false);
      expect(result.extraTokens).toHaveLength(1);
    });
  });
});
```

**Key Test Cases**:

1. All 10 variations complete → PASS
2. One variation missing token → FAIL with details
3. One variation has extra token → FAIL with details
4. Multiple variations missing different tokens → FAIL with all details

## Testing Requirements

- [ ] Run tests: `npm run test:unit -- tokens/validation.spec.ts`
- [ ] Tests MUST fail initially (expected in TDD)
- [ ] Tests should have clear error messages
- [ ] Use AAA pattern (Arrange, Act, Assert)

## GitHub Issue

**Issue**: #89
**Link**: https://github.com/webmint/jira-clone/issues/89

## Sub-branch

**Branch**: `spec/003-palette-switcher/T001-token-completeness-tests`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
