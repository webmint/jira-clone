# Task T004: Configure Tailwind CSS Integration

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T003

## Description

Add Tailwind CSS import to `preview.ts` to ensure all Tailwind utility classes are available in Storybook stories. This enables components to use the design system's Tailwind classes.

## Files to Create/Modify

- `front/.storybook/preview.ts` - Add Tailwind CSS import

## Dependencies

**Blocks**: None
**Blocked By**: T003 (modifies same file)

## Acceptance Criteria

- [ ] Tailwind CSS main file imported in preview.ts
- [ ] Import added at top of file before preview config
- [ ] Tailwind utilities work in Storybook stories
- [ ] No console errors related to CSS loading
- [ ] Existing preview config unchanged

## Implementation Notes

Add import statement at the top of `front/.storybook/preview.ts`:

```typescript
import '../src/assets/main.css'; // or wherever Tailwind CSS is located

import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  // ... existing config
};

export default preview;
```

Note: Verify the actual path to the main CSS file containing Tailwind directives.

## Testing Requirements

- [ ] Storybook dev server starts without errors
- [ ] Tailwind classes render correctly in stories
- [ ] CSS hot reload works

## GitHub Issue

**Issue**: #TBD
**Link**: TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T004-configure-tailwind`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
