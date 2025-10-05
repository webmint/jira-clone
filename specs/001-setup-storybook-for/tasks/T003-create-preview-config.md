# Task T003: Create Storybook Preview Configuration

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:devops
**Parallel**: Yes
**Depends On**: None

## Description

Create the preview configuration file (`front/.storybook/preview.ts`) that defines global parameters, decorators, and settings applied to all stories. This file will be extended in subsequent tasks (T004, T006) to add Tailwind CSS imports and viewport configurations.

## Files to Create/Modify

- `front/.storybook/preview.ts` - Create new file with base preview configuration

## Dependencies

**Blocks**: T004 (Tailwind import), T006 (viewport config) - both will modify this file
**Blocked By**: None

## Acceptance Criteria

- [ ] File `front/.storybook/preview.ts` created
- [ ] Parameters object defined with actions and controls configuration
- [ ] TypeScript types imported correctly
- [ ] No TypeScript compilation errors
- [ ] Configuration structure allows for future extensions (T004, T006)

## Implementation Notes

### Base Configuration Template

```typescript
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

### Configuration Explanation

- **actions.argTypesRegex**: Auto-detect event handlers (e.g., `onClick`, `onUpdate`)
- **controls.matchers**: Configure control types for color and date props

### Future Extensions (Other Tasks)

- **T004**: Will add Tailwind CSS import at the top
- **T006**: Will add viewport parameters to the parameters object

This base configuration provides the foundation that other tasks will build upon.

## Testing Requirements

- [ ] TypeScript compiles without errors
- [ ] Configuration exports correctly as default
- [ ] Preview type from @storybook/vue3 resolves
- [ ] File structure allows adding imports and parameters

## GitHub Issue

**Issue**: #TBD
**Link**: TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T003-create-preview-config`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
