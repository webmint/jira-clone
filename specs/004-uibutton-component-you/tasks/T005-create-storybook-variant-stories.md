# T005: Create Storybook variant stories

**Feature**: 004-uibutton-component-you
**Task ID**: T005
**Type**: Documentation
**Parallel**: Yes [P] (with T006)
**Agent**: Design Agent
**Priority**: P2 (Medium)
**Estimated Effort**: 1-1.5 hours

## Description

Create Storybook stories demonstrating all three button variants (filled, outline, text) with various content configurations. Stories should use CSF3 format and include controls for interactive testing.

## Files to Create/Edit

- `front/src/components/atoms/Button/UiButton.stories.ts` (create or update)

## Dependencies

- T004 (Icon slots implemented)

## Story Structure

### Meta Configuration

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import UiButton from './UiButton.vue';
import { SearchIcon, SaveIcon, ChevronRightIcon } from 'lucide-vue-next';

const meta = {
  title: 'Atoms/Button',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'text'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large', 'xl'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Button text label',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Flexible button component with design system integration. Automatically adapts to all 10 palette variations.',
      },
    },
  },
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Variant Stories

#### 1. Filled Variant (Default)

```typescript
export const Filled: Story = {
  args: {
    label: 'Primary Action',
    variant: 'filled',
    size: 'medium',
  },
};
```

#### 2. Outline Variant

```typescript
export const Outline: Story = {
  args: {
    label: 'Secondary Action',
    variant: 'outline',
    size: 'medium',
  },
};
```

#### 3. Text Variant

```typescript
export const Text: Story = {
  args: {
    label: 'Tertiary Action',
    variant: 'text',
    size: 'medium',
  },
};
```

### Variant Comparison Story

```typescript
export const AllVariants: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <UiButton label="Filled Button" variant="filled" />
        <UiButton label="Outline Button" variant="outline" />
        <UiButton label="Text Button" variant="text" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three button variants.',
      },
    },
  },
};
```

### Variant with Icons

```typescript
export const FilledWithIcons: Story = {
  render: () => ({
    components: { UiButton, SaveIcon, SearchIcon, ChevronRightIcon },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <UiButton label="Save" variant="filled">
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Search" variant="filled">
          <template #icon-right><SearchIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Next" variant="filled">
          <template #icon-left><SaveIcon :size="20" /></template>
          <template #icon-right><ChevronRightIcon :size="20" /></template>
        </UiButton>
      </div>
    `,
  }),
};

export const OutlineWithIcons: Story = {
  render: () => ({
    components: { UiButton, SaveIcon, SearchIcon, ChevronRightIcon },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <UiButton label="Save" variant="outline">
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Search" variant="outline">
          <template #icon-right><SearchIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Next" variant="outline">
          <template #icon-left><SaveIcon :size="20" /></template>
          <template #icon-right><ChevronRightIcon :size="20" /></template>
        </UiButton>
      </div>
    `,
  }),
};

export const TextWithIcons: Story = {
  render: () => ({
    components: { UiButton, SaveIcon, SearchIcon, ChevronRightIcon },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <UiButton label="Save" variant="text">
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Search" variant="text">
          <template #icon-right><SearchIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Next" variant="text">
          <template #icon-left><SaveIcon :size="20" /></template>
          <template #icon-right><ChevronRightIcon :size="20" /></template>
        </UiButton>
      </div>
    `,
  }),
};
```

## Story Content Guidelines

### Label Text Examples

Use realistic, action-oriented labels:

- Filled: "Save Changes", "Create Account", "Submit", "Continue"
- Outline: "Cancel", "Learn More", "View Details", "Export"
- Text: "Skip", "Dismiss", "Edit", "Delete"

### Documentation Strings

Each story should include:

- Clear description in `parameters.docs.description.story`
- Usage guidance (when to use this variant)
- Accessibility notes (if relevant)

## Acceptance Criteria

- [ ] Storybook stories file created/updated
- [ ] Meta configuration with argTypes controls
- [ ] Three primary variant stories (Filled, Outline, Text)
- [ ] AllVariants comparison story
- [ ] Icon combination stories for each variant
- [ ] Realistic action-oriented labels used
- [ ] CSF3 format used throughout
- [ ] Stories render correctly in Storybook
- [ ] Controls panel works (interactive testing)
- [ ] Autodocs generated from stories
- [ ] TypeScript/ESLint passes

## Manual Testing

Test in Storybook:

1. Navigate to Atoms/Button
2. View Filled story → solid background, inverse text
3. View Outline story → border, transparent background
4. View Text story → no border, transparent background
5. Use Controls panel → change variant → styles update
6. View AllVariants story → see all three side-by-side
7. View icon stories → icons positioned correctly
8. Switch palettes → all variants adapt colors

## Test Status After Completion

Expected results:

- ✅ Component visible in Storybook
- ✅ All variant stories render correctly
- ✅ Interactive controls functional
- ✅ Autodocs generated

## Next Task

After completion: T006 (Create Storybook size stories) - can run in parallel

## Notes

- Use CSF3 format (not CSF2 - no `Template.bind({})`)
- Import real icon components (e.g., lucide-vue-next)
- Use `render: () => ({})` for complex templates
- Keep story code simple and readable
- Focus on VISUAL demonstration, not exhaustive combinations
- Palette switching tested in T008 (dedicated story)
