# T006: Create Storybook size stories

**Feature**: 004-uibutton-component-you
**Task ID**: T006
**Type**: Documentation
**Parallel**: Yes [P] (with T005)
**Agent**: Design Agent
**Priority**: P2 (Medium)
**Estimated Effort**: 1 hour

## Description

Create Storybook stories demonstrating all five button sizes (xs, small, medium, large, xl) with visual size progression. Show how sizes work with different variants and icon combinations.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.stories.ts` (add to existing file from T005)

## Dependencies

- T004 (Icon slots implemented)
- Can run in parallel with T005

## Stories to Add

### Individual Size Stories

```typescript
export const SizeXS: Story = {
  args: {
    label: 'Extra Small',
    size: 'xs',
    variant: 'filled',
  },
};

export const SizeSmall: Story = {
  args: {
    label: 'Small Button',
    size: 'small',
    variant: 'filled',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium Button',
    size: 'medium',
    variant: 'filled',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Large Button',
    size: 'large',
    variant: 'filled',
  },
};

export const SizeXL: Story = {
  args: {
    label: 'Extra Large Button',
    size: 'xl',
    variant: 'filled',
  },
};
```

### Size Comparison Story

```typescript
export const AllSizes: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <UiButton label="XS" size="xs" variant="filled" />
        <UiButton label="Small" size="small" variant="filled" />
        <UiButton label="Medium" size="medium" variant="filled" />
        <UiButton label="Large" size="large" variant="filled" />
        <UiButton label="XL" size="xl" variant="filled" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Visual comparison of all five button sizes showing padding and font-size progression.',
      },
    },
  },
};
```

### Size with Icons Story

```typescript
export const SizesWithIcons: Story = {
  render: () => ({
    components: { UiButton, SaveIcon },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <UiButton label="Save (XS)" size="xs" variant="filled">
          <template #icon-left><SaveIcon :size="16" /></template>
        </UiButton>
        <UiButton label="Save (Small)" size="small" variant="filled">
          <template #icon-left><SaveIcon :size="16" /></template>
        </UiButton>
        <UiButton label="Save (Medium)" size="medium" variant="filled">
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Save (Large)" size="large" variant="filled">
          <template #icon-left><SaveIcon :size="24" /></template>
        </UiButton>
        <UiButton label="Save (XL)" size="xl" variant="filled">
          <template #icon-left><SaveIcon :size="24" /></template>
        </UiButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Button sizes with appropriately scaled icons. Icon sizes: XS/Small=16px, Medium=20px, Large/XL=24px.',
      },
    },
  },
};
```

### Size Matrix Story (Sizes × Variants)

```typescript
export const SizeVariantMatrix: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">Filled Variant</h3>
          <div style="display: flex; gap: 12px; align-items: center;">
            <UiButton label="XS" size="xs" variant="filled" />
            <UiButton label="Small" size="small" variant="filled" />
            <UiButton label="Medium" size="medium" variant="filled" />
            <UiButton label="Large" size="large" variant="filled" />
            <UiButton label="XL" size="xl" variant="filled" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">Outline Variant</h3>
          <div style="display: flex; gap: 12px; align-items: center;">
            <UiButton label="XS" size="xs" variant="outline" />
            <UiButton label="Small" size="small" variant="outline" />
            <UiButton label="Medium" size="medium" variant="outline" />
            <UiButton label="Large" size="large" variant="outline" />
            <UiButton label="XL" size="xl" variant="outline" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">Text Variant</h3>
          <div style="display: flex; gap: 12px; align-items: center;">
            <UiButton label="XS" size="xs" variant="text" />
            <UiButton label="Small" size="small" variant="text" />
            <UiButton label="Medium" size="medium" variant="text" />
            <UiButton label="Large" size="large" variant="text" />
            <UiButton label="XL" size="xl" variant="text" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete size matrix showing all combinations of sizes and variants.',
      },
    },
  },
};
```

## Visual Design Notes

### Size Progression

| Size   | Padding   | Font Size | Use Case                   |
| ------ | --------- | --------- | -------------------------- |
| xs     | 4px 8px   | 12px      | Compact UIs, table actions |
| small  | 6px 12px  | 14px      | Dense layouts, toolbars    |
| medium | 8px 16px  | 16px      | Default, most common       |
| large  | 12px 24px | 18px      | Prominent actions          |
| xl     | 16px 32px | 20px      | Hero CTAs, landing pages   |

### Icon Sizing Guidelines

- **xs/small**: 16px icons
- **medium**: 20px icons
- **large/xl**: 24px icons

## Acceptance Criteria

- [ ] Five individual size stories created
- [ ] AllSizes comparison story with horizontal layout
- [ ] SizesWithIcons story with correctly scaled icons
- [ ] SizeVariantMatrix story showing all combinations
- [ ] Visual size progression clear and logical
- [ ] Icon sizes appropriate for button sizes
- [ ] Documentation strings explain size use cases
- [ ] Stories render correctly in Storybook
- [ ] TypeScript/ESLint passes

## Manual Testing

Test in Storybook:

1. View AllSizes story → clear size progression
2. Measure padding visually → proportional increase
3. Check font sizes → readable at all sizes
4. View SizesWithIcons → icons not too big/small
5. View SizeVariantMatrix → all 15 combinations render
6. Use Controls panel → change size → button resizes
7. Switch palettes → sizes maintain proportions

## Test Status After Completion

Expected results:

- ✅ All size stories render correctly
- ✅ Visual proportions correct
- ✅ Icon scaling appropriate
- ✅ Size matrix shows all combinations

## Next Task

After completion: T007 (Create Storybook state stories)

## Notes

- Use `align-items: center` in flex containers for proper alignment
- Keep labels short to show size differences clearly
- SizeVariantMatrix provides comprehensive visual reference
- Focus on VISUAL demonstration, not documentation verbosity
- Icon sizes are recommendations, not enforced by component
