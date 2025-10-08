# Task T004: Implement validateTokenCompleteness Function

**Status**: Pending
**Priority**: P1
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T003

## Description

Implement the `validateTokenCompleteness()` function that verifies all 10 palette variations define the exact same set of token names. This function will be used by the tests created in T001 to ensure token parity across all variations.

## Files to Create/Modify

- `front/src/designSystem/tokens/validation.ts` - Create validation functions file
- `front/src/designSystem/tokens/types.ts` - Add TypeScript interfaces if not already created in T003

## Dependencies

**Blocks**: None (used by tests T001, but tests already written)
**Blocked By**: T003 (uses getCSSVariable helper)

## Acceptance Criteria

- [ ] `validateTokenCompleteness()` function implemented with correct signature
- [ ] Function extracts all unique token names from all 10 variations
- [ ] Function checks each variation for missing tokens
- [ ] Function checks each variation for extra tokens
- [ ] Function returns ValidationResult with details
- [ ] Uses getCSSVariable from T003 to query token values
- [ ] Tests from T001 now PASS
- [ ] TypeScript types exported
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

**Contract** (from `specs/003-palette-switcher/contracts/token-validation.md`):

```typescript
interface PaletteVariation {
  palette:
    | 'corporate-trust'
    | 'creative-energy'
    | 'natural-harmony'
    | 'warm-welcome'
    | 'minimalist';
  mode: 'light' | 'dark';
  tokens: Record<string, string>; // Map of token name → value
}

interface ValidationResult {
  valid: boolean;
  missingTokens?: Array<{
    variation: string; // e.g., "creative-energy.dark"
    missing: string[]; // Array of missing token names
  }>;
  extraTokens?: Array<{
    variation: string;
    extra: string[]; // Array of unexpected token names
  }>;
}

function validateTokenCompleteness(variations: PaletteVariation[]): ValidationResult {
  // 1. Extract all unique token names from all variations
  const allTokenNames = new Set<string>();
  variations.forEach((v) => {
    Object.keys(v.tokens).forEach((name) => allTokenNames.add(name));
  });

  // 2. Check each variation for completeness
  const missingTokens: ValidationResult['missingTokens'] = [];
  const extraTokens: ValidationResult['extraTokens'] = [];

  variations.forEach((variation) => {
    const variationName = `${variation.palette}.${variation.mode}`;
    const tokenNames = Object.keys(variation.tokens);

    // Find missing tokens
    const missing = Array.from(allTokenNames).filter((name) => !tokenNames.includes(name));
    if (missing.length > 0) {
      missingTokens.push({ variation: variationName, missing });
    }

    // Find extra tokens (tokens in this variation but not in others)
    // This is less critical but good to detect
  });

  // 3. Return result
  return {
    valid: missingTokens.length === 0 && extraTokens.length === 0,
    missingTokens: missingTokens.length > 0 ? missingTokens : undefined,
    extraTokens: extraTokens.length > 0 ? extraTokens : undefined,
  };
}
```

**Usage Example**:

```typescript
const result = validateTokenCompleteness(allVariations);

if (!result.valid) {
  result.missingTokens?.forEach(({ variation, missing }) => {
    console.error(`${variation} missing: ${missing.join(', ')}`);
  });
}
```

**Integration with getCSSVariable**:

The function should query actual CSS custom properties from the DOM to build the token maps for each variation:

```typescript
function buildPaletteVariations(): PaletteVariation[] {
  const palettes = [
    'corporate-trust',
    'creative-energy',
    'natural-harmony',
    'warm-welcome',
    'minimalist',
  ];
  const modes = ['light', 'dark'];
  const tokenNames = [
    '--color-primary-500',
    '--color-neutral-0',
    '--color-text-primary',
    // ... all required tokens
  ];

  return palettes.flatMap((palette) =>
    modes.map((mode) => ({
      palette,
      mode,
      tokens: Object.fromEntries(
        tokenNames.map((name) => [name, getCSSVariable({ tokenName: name, palette, mode })])
      ),
    }))
  );
}
```

## Testing Requirements

- [ ] Run tests: `npm run test:unit -- tokens/validation.spec.ts`
- [ ] Tests from T001 must PASS
- [ ] All test cases passing (complete tokens, missing tokens, extra tokens)

## GitHub Issue

**Issue**: #92
**Link**: https://github.com/webmint/jira-clone/issues/92

## Sub-branch

**Branch**: `spec/003-palette-switcher/T004-validate-token-completeness`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
