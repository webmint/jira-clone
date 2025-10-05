# Task T011: Add Interaction Tests to Button Stories

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:design
**Parallel**: No
**Depends On**: T010

## Description

Add interaction tests using @storybook/test to validate Button component behavior, including click interactions and accessibility.

## Files to Create/Modify

- `front/src/components/atoms/Button/Button.stories.ts` - Add interaction tests to existing stories

## Dependencies

**Blocks**: None
**Blocked By**: T010 (modifies same file)

## Acceptance Criteria

- [ ] Click interaction test added
- [ ] Disabled state test validates no click
- [ ] Accessibility checks pass
- [ ] Tests visible in Interactions panel
- [ ] All tests pass

## Implementation Notes

Add to existing `Button.stories.ts`:

```typescript
import { within, userEvent, expect } from '@storybook/test';

// Add to exports:
export const Clicked: Story = {
  args: {
    label: 'Click Me',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Test button is clickable
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
  },
};

export const DisabledNoClick: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Verify button is disabled
    await expect(button).toBeDisabled();
  },
};
```

## Testing Requirements

- [ ] Interactions panel shows tests
- [ ] Click test passes
- [ ] Disabled test passes
- [ ] No test errors in console

## GitHub Issue

**Issue**: #TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T011-add-interaction-tests`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
