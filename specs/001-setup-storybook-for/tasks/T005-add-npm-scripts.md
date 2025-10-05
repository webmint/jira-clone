# Task T005: Add Storybook npm Scripts

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:devops
**Parallel**: No
**Depends On**: T001

## Description

Add npm scripts to `front/package.json` for running Storybook dev server, building for production, and running tests.

## Files to Create/Modify

- `front/package.json` - Add scripts section entries

## Dependencies

**Blocks**: None
**Blocked By**: T001 (modifies same file)

## Acceptance Criteria

- [ ] `"storybook": "storybook dev -p 6006"` added
- [ ] `"build-storybook": "storybook build"` added
- [ ] `"test-storybook": "test-storybook"` added
- [ ] Scripts run without errors
- [ ] Port 6006 used for dev server

## Implementation Notes

Add to scripts section in `front/package.json`:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook"
  }
}
```

## Testing Requirements

- [ ] `npm run storybook` starts dev server
- [ ] `npm run build-storybook` creates static build
- [ ] Scripts listed in `npm run`

## GitHub Issue

**Issue**: #TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T005-add-npm-scripts`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
