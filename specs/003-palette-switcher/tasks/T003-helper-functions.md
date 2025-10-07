# Task T003: Implement Helper Functions

**Status**: Pending
**Priority**: P1
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: None (but T001-T002 tests should fail first)

## Description

Implement utility helper functions for CSS variable access and WCAG contrast ratio calculation. These functions will be used by the validation functions in T004 and T005.

Implements:

1. `getCSSVariable()` - Get computed CSS custom property value for a specific palette variation
2. `getContrastRatio()` - Calculate WCAG contrast ratio between two colors

## Files to Create/Modify

- `front/src/designSystem/tokens/utils.ts` - Create utility functions file
- `front/src/designSystem/tokens/types.ts` - Add TypeScript types if needed

## Dependencies

**Blocks**: T004, T005 (validation functions depend on these helpers)
**Blocked By**: None

## Acceptance Criteria

- [ ] `getCSSVariable()` function implemented with correct signature
- [ ] Function creates temporary element with palette/mode classes
- [ ] Function queries computed style for CSS custom property
- [ ] Function returns resolved hex color value
- [ ] Function cleans up temporary element
- [ ] `getContrastRatio()` function implemented with WCAG formula
- [ ] Function parses hex colors to RGB
- [ ] Function calculates relative luminance correctly
- [ ] Function returns contrast ratio (1.0 to 21.0 range)
- [ ] TypeScript types exported
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

**getCSSVariable Contract** (from `specs/003-palette-switcher/contracts/token-validation.md`):

```typescript
interface GetCSSVariableParams {
  tokenName: string; // e.g., "--color-text-primary"
  palette: string; // e.g., "corporate-trust"
  mode: string; // e.g., "light"
}

function getCSSVariable(params: GetCSSVariableParams): string {
  // 1. Create temp element with classes
  const el = document.createElement('div');
  el.className = `${params.palette} ${params.mode}`;
  el.style.display = 'none';
  document.body.appendChild(el);

  // 2. Get computed style
  const value = getComputedStyle(el).getPropertyValue(params.tokenName).trim();

  // 3. Clean up
  document.body.removeChild(el);

  return value;
}
```

**getContrastRatio Contract**:

```typescript
interface GetContrastRatioParams {
  foreground: string; // Hex color, e.g., "#0F172A"
  background: string; // Hex color, e.g., "#FFFFFF"
}

function getContrastRatio(params: GetContrastRatioParams): number {
  // 1. Parse hex to RGB
  const fgRgb = hexToRgb(params.foreground);
  const bgRgb = hexToRgb(params.background);

  // 2. Calculate relative luminance
  const fgLum = getLuminance(fgRgb);
  const bgLum = getLuminance(bgRgb);

  // 3. Calculate contrast ratio
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}

// Helper: RGB to luminance
function getLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Helper: Hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error(`Invalid hex color: ${hex}`);
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
```

**WCAG Formula**:

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
where R, G, B are gamma-corrected values

Contrast Ratio = (L_lighter + 0.05) / (L_darker + 0.05)
```

## Testing Requirements

- [ ] Unit tests for getCSSVariable (optional, covered by integration tests)
- [ ] Unit tests for getContrastRatio with known color pairs
- [ ] Test edge cases (white/white = 1.0, black/white = 21.0)
- [ ] Test coverage: ≥ 80%

## GitHub Issue

**Issue**: #91
**Link**: https://github.com/webmint/jira-clone/issues/91

## Sub-branch

**Branch**: `spec/003-palette-switcher/T003-helper-functions`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
