# Task T014: Add Palette Switching Examples to Storybook Stories

**Status**: Pending
**Priority**: P3
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T010, T011

## Description

Update an existing Storybook story (Button component recommended) to demonstrate palette switching capabilities. Add documentation explaining how to use the palette controls and verify the component works in all 10 variations.

This task serves as a reference example for other developers creating palette-aware components.

## Files to Create/Modify

- `front/src/designSystem/components/Button/Button.stories.ts` - Add palette switching documentation and examples
- OR any existing component story that demonstrates the palette system

## Dependencies

**Blocks**: None
**Blocked By**: T010, T011 (Storybook controls must be configured)

## Acceptance Criteria

- [ ] Story file updated with palette usage documentation
- [ ] Story demonstrates component in multiple states (primary, secondary, disabled)
- [ ] Documentation explains how to use palette dropdown and mode toggle
- [ ] Story showcases how semantic tokens enable automatic theming
- [ ] Visual examples show component in different palettes (optional: use play function)
- [ ] Story args/controls configured appropriately
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

**Story Enhancement Example**:

```typescript
// front/src/designSystem/components/Button/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Button Component

A versatile button component that adapts to all palette variations automatically using semantic design tokens.

## Palette Support

This component works with all 10 palette variations (5 palettes × 2 modes):
- **Corporate Trust** (Blue) - Professional, reliable
- **Creative Energy** (Purple) - Innovative, creative
- **Natural Harmony** (Green) - Calm, eco-friendly
- **Warm Welcome** (Orange) - Friendly, approachable
- **Minimalist** (Gray) - Clean, modern

Use the **Palette** dropdown and **Mode** toggle in the toolbar above to preview the button in different themes.

## How It Works

The button uses semantic design tokens that automatically resolve to the active palette:

\`\`\`css
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
}
\`\`\`

When you switch palettes:
- Corporate Trust: \`--color-primary-500\` = #3B82F6 (blue)
- Creative Energy: \`--color-primary-500\` = #9333EA (purple)
- Natural Harmony: \`--color-primary-500\` = #10B981 (green)
- And so on...

No component code changes required!
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Button visual style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
};

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
};

// All Variants Showcase
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story showcases all button variants side by side.
Try changing the palette and mode to see how all buttons adapt automatically.
        `,
      },
    },
  },
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
          <Button variant="ghost" disabled>Ghost Disabled</Button>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
        </div>
      </div>
    `,
  }),
};

// Palette Comparison (Optional - advanced example)
export const PaletteComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Advanced Example**: This story demonstrates the same button component rendered
in multiple palette contexts simultaneously using scoped theme classes.

Normally, the entire app uses one palette at a time, but this example shows how
you can apply different palettes to different sections if needed.
        `,
      },
    },
  },
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="corporate-trust light" style="padding: 1rem; background: var(--color-background-default);">
          <p style="color: var(--color-text-primary); margin-bottom: 0.5rem; font-weight: 600;">Corporate Trust</p>
          <Button variant="primary">Click Me</Button>
        </div>
        <div class="creative-energy light" style="padding: 1rem; background: var(--color-background-default);">
          <p style="color: var(--color-text-primary); margin-bottom: 0.5rem; font-weight: 600;">Creative Energy</p>
          <Button variant="primary">Click Me</Button>
        </div>
        <div class="natural-harmony light" style="padding: 1rem; background: var(--color-background-default);">
          <p style="color: var(--color-text-primary); margin-bottom: 0.5rem; font-weight: 600;">Natural Harmony</p>
          <Button variant="primary">Click Me</Button>
        </div>
        <div class="warm-welcome light" style="padding: 1rem; background: var(--color-background-default);">
          <p style="color: var(--color-text-primary); margin-bottom: 0.5rem; font-weight: 600;">Warm Welcome</p>
          <Button variant="primary">Click Me</Button>
        </div>
        <div class="minimalist light" style="padding: 1rem; background: var(--color-background-default);">
          <p style="color: var(--color-text-primary); margin-bottom: 0.5rem; font-weight: 600;">Minimalist</p>
          <Button variant="primary">Click Me</Button>
        </div>
      </div>
    `,
  }),
};
```

**Key Documentation Points**:

1. **Component Description**: Explain palette support at the top
2. **How to Test**: Instruct users to use toolbar controls
3. **How It Works**: Show the semantic token implementation
4. **Visual Examples**: Include stories that showcase multiple states
5. **Advanced Examples**: Optional comparison story showing all palettes

**Alternative: Add to Canvas/Default Story**:

If Button.stories.ts doesn't exist, update any existing component story:

- Avatar
- Card
- Input
- Badge

Just ensure the story demonstrates:

- Multiple component states
- Documentation about palette switching
- How semantic tokens enable theming

## Testing Requirements

- [ ] Run Storybook: `npm run storybook`
- [ ] Navigate to updated story
- [ ] Verify documentation renders correctly
- [ ] Use palette dropdown to switch between all 5 palettes
- [ ] Toggle between light and dark modes
- [ ] Verify component updates visually in all 10 variations
- [ ] Verify all story variants (Primary, Secondary, etc.) work

## GitHub Issue

**Issue**: #102
**Link**: https://github.com/webmint/jira-clone/issues/102

## Sub-branch

**Branch**: `spec/003-palette-switcher/T014-storybook-examples`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
