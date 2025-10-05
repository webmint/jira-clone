# Task T008: Create Storybook Usage Guide

**Status**: Pending
**Priority**: P2-medium
**Agent**: agent:design
**Parallel**: Yes
**Depends On**: None

## Description

Create comprehensive usage guide in `front/README.md` for developers using Storybook, including how to run it, create stories, and follow best practices.

## Files to Create/Modify

- `front/README.md` - Add Storybook section or create if not exists

## Dependencies

**Blocks**: None
**Blocked By**: None

## Acceptance Criteria

- [ ] Running Storybook section added
- [ ] Creating stories guide included
- [ ] Story naming conventions documented
- [ ] Best practices listed
- [ ] Troubleshooting section added
- [ ] Links to relevant docs

## Implementation Notes

Add section to README.md:

```markdown
## Storybook

### Running Storybook

\`\`\`bash
npm run storybook
\`\`\`

Opens Storybook dev server at http://localhost:6006

### Creating Stories

1. Create component in appropriate folder (atoms/molecules/organisms)
2. Create co-located `.stories.ts` file
3. Use CSF3 format with TypeScript

Example:
\`\`\`typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import MyComponent from './MyComponent.vue';

const meta = {
title: 'Atoms/MyComponent',
component: MyComponent,
tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
args: { /_ props _/ },
};
\`\`\`

### Naming Conventions

- File: `ComponentName.stories.ts`
- Title: `Atoms/ComponentName`, `Molecules/ComponentName`, `Organisms/ComponentName`
- Stories: PascalCase (e.g., Primary, Disabled, Loading)

### Best Practices

- Always add 'autodocs' tag
- Include all component variants
- Test all interactive states
- Use Tailwind CSS only
- Check accessibility tab

### Troubleshooting

- Port 6006 in use: Stop other Storybook instances
- Stories not appearing: Check file naming and glob pattern
- Styles not working: Verify Tailwind import in preview.ts
  \`\`\`

## GitHub Issue

**Issue**: #TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T008-create-usage-guide`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
