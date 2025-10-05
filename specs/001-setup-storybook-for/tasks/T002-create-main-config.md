# Task T002: Create Storybook Main Configuration

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:devops
**Parallel**: Yes
**Depends On**: None

## Description

Create the main Storybook configuration file (`front/.storybook/main.ts`) that defines the framework integration, story file patterns, addons, and build settings. This is the core configuration file that tells Storybook how to find and process stories.

## Files to Create/Modify

- `front/.storybook/main.ts` - Create new file with Storybook configuration

## Dependencies

**Blocks**: T004, T006 (both modify preview.ts which needs main.ts to exist first conceptually, but can run in parallel)
**Blocked By**: None

## Acceptance Criteria

- [ ] File `front/.storybook/main.ts` created
- [ ] Framework configured as `@storybook/vue3-vite`
- [ ] Stories glob pattern: `../src/**/*.stories.@(js|jsx|ts|tsx)`
- [ ] All required addons listed correctly
- [ ] TypeScript configuration enabled
- [ ] Static directories configured (if needed)
- [ ] No TypeScript compilation errors
- [ ] Configuration follows Storybook 8 best practices

## Implementation Notes

### Configuration Template

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  typescript: {
    check: true,
    reactDocgen: false, // Vue doesn't use React docgen
  },
};

export default config;
```

### Configuration Explanation

- **stories**: Glob pattern finds all `.stories.ts` files under `src/`
- **addons**: All required addons from research.md
- **framework**: Vue 3 with Vite builder for fast HMR
- **docs.autodocs**: Auto-generate docs for stories tagged with 'autodocs'
- **typescript.check**: Enable TypeScript checking for stories

### Addon Purposes

1. **addon-essentials**: Controls, docs, actions, viewport, backgrounds, toolbars
2. **addon-links**: Link between stories
3. **addon-interactions**: Test user interactions
4. **addon-a11y**: Accessibility testing (constitutional requirement)
5. **addon-themes**: Theme switching support

## Testing Requirements

- [ ] TypeScript compiles without errors
- [ ] Configuration exports correctly
- [ ] All addon imports resolve
- [ ] Story pattern matches expected file locations

## GitHub Issue

**Issue**: #TBD
**Link**: TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T002-create-main-config`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
