# Task T001: Install Storybook Dependencies

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:devops
**Parallel**: Yes
**Depends On**: None

## Description

Install Storybook 8.x and all required dependencies in the frontend workspace (`front/`). This task sets up the foundation for the entire Storybook integration by adding all necessary packages to support Vue 3, Vite, accessibility testing, interaction testing, and theme switching.

## Files to Create/Modify

- `front/package.json` - Add Storybook dependencies to devDependencies

## Dependencies

**Blocks**: T005 (npm scripts modification requires these deps)
**Blocked By**: None

## Acceptance Criteria

- [ ] @storybook/vue3 ^8.0.0 installed
- [ ] @storybook/vue3-vite ^8.0.0 installed
- [ ] @storybook/addon-essentials ^8.0.0 installed
- [ ] @storybook/addon-interactions ^8.0.0 installed
- [ ] @storybook/addon-links ^8.0.0 installed
- [ ] @storybook/addon-a11y ^8.0.0 installed
- [ ] @storybook/addon-themes ^8.0.0 installed
- [ ] @storybook/test ^8.0.0 installed
- [ ] @storybook/test-runner ^0.17.0 installed
- [ ] storybook ^8.0.0 installed
- [ ] All dependencies appear in front/package.json devDependencies
- [ ] npm install completes successfully with no errors
- [ ] No dependency conflicts reported

## Implementation Notes

### Installation Command

```bash
cd front
npm install --save-dev \
  @storybook/vue3@^8.0.0 \
  @storybook/vue3-vite@^8.0.0 \
  @storybook/addon-essentials@^8.0.0 \
  @storybook/addon-interactions@^8.0.0 \
  @storybook/addon-links@^8.0.0 \
  @storybook/addon-a11y@^8.0.0 \
  @storybook/addon-themes@^8.0.0 \
  @storybook/test@^8.0.0 \
  @storybook/test-runner@^0.17.0 \
  storybook@^8.0.0
```

### Package Purpose

- **@storybook/vue3**: Core Storybook support for Vue 3
- **@storybook/vue3-vite**: Vite builder integration for fast HMR
- **@storybook/addon-essentials**: Controls, docs, actions, viewport, backgrounds
- **@storybook/addon-interactions**: User interaction testing in stories
- **@storybook/addon-links**: Link stories together
- **@storybook/addon-a11y**: Accessibility testing (WCAG 2.1 AA)
- **@storybook/addon-themes**: Theme switching support
- **@storybook/test**: Testing utilities for interaction tests
- **@storybook/test-runner**: Run stories as tests in CI/CD
- **storybook**: CLI and core functionality

### Constitutional Compliance

- TypeScript strict mode: All packages have TypeScript support
- Accessibility: addon-a11y enforces WCAG 2.1 AA
- Testing: test-runner enables automated story testing
- Performance: Vite builder provides fast build times

## Testing Requirements

- [ ] `npm list` shows all packages installed at correct versions
- [ ] No vulnerability warnings (or acceptable low-severity only)
- [ ] package.json properly formatted after installation
- [ ] package-lock.json updated correctly

## GitHub Issue

**Issue**: #TBD
**Link**: TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T001-install-storybook`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
