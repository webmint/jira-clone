# Task T010: Create Button Component Stories

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:design
**Parallel**: No
**Depends On**: T009

## Description

Create comprehensive stories for the Button component using CSF3 format, demonstrating all variants, sizes, and states.

## Files to Create/Modify

- `front/src/components/atoms/Button/Button.stories.ts` - Create new stories file

## Dependencies

**Blocks**: T011 (interaction tests)
**Blocked By**: T009 (needs component)

## Acceptance Criteria

- [ ] Stories file created with CSF3 format
- [ ] All variants have stories (primary, secondary, danger, ghost)
- [ ] All sizes have stories (sm, md, lg)
- [ ] State stories included (disabled, loading)
- [ ] Auto-docs tag included
- [ ] ArgTypes configured for controls
- [ ] Stories render correctly in Storybook

## Implementation Notes

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Primary: Story = {
  args: { label: 'Primary Button', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Secondary Button', variant: 'secondary' },
};

export const Danger: Story = {
  args: { label: 'Delete', variant: 'danger' },
};

export const Ghost: Story = {
  args: { label: 'Ghost Button', variant: 'ghost' },
};

// Sizes
export const Small: Story = {
  args: { label: 'Small Button', variant: 'primary', size: 'sm' },
};

export const Large: Story = {
  args: { label: 'Large Button', variant: 'primary', size: 'lg' },
};

// States
export const Disabled: Story = {
  args: { label: 'Disabled', variant: 'primary', disabled: true },
};

export const Loading: Story = {
  args: { label: 'Loading', variant: 'primary', loading: true },
};
```

## Testing Requirements

- [ ] All stories appear in Storybook sidebar
- [ ] Stories grouped under "Atoms/Button"
- [ ] Controls panel shows variant and size selectors
- [ ] Auto-docs generated correctly

## GitHub Issue

**Issue**: #TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T010-create-button-stories`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
