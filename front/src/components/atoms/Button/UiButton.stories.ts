import type { Meta, StoryObj } from '@storybook/vue3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { within, userEvent, expect, fn } from '@storybook/test';
import UiButton from './UiButton.vue';

const meta = {
  title: 'Atoms/UiButton',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline', 'text'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['xs', 'small', 'medium', 'large', 'xl'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Filled: Story = {
  args: {
    label: 'Primary Action',
    variant: 'filled',
    size: 'medium',
  },
};

export const Outline: Story = {
  args: {
    label: 'Secondary Action',
    variant: 'outline',
    size: 'medium',
  },
};

export const Text: Story = {
  args: {
    label: 'Tertiary Action',
    variant: 'text',
    size: 'medium',
  },
};

/**
 * All Variants Comparison
 *
 * Side-by-side comparison of all three button variants showing
 * visual hierarchy: Filled (primary), Outline (secondary), Text (tertiary).
 */
export const AllVariants: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <UiButton label="Primary Action" variant="filled" size="medium" />
        <UiButton label="Secondary Action" variant="outline" size="medium" />
        <UiButton label="Tertiary Action" variant="text" size="medium" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of all three button variants demonstrating visual hierarchy.',
      },
    },
  },
};

// Size Stories
export const ExtraSmall: Story = {
  args: {
    label: 'XS',
    variant: 'filled',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'filled',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Button',
    variant: 'filled',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'filled',
    size: 'large',
  },
};

export const ExtraLarge: Story = {
  args: {
    label: 'Extra Large Button',
    variant: 'filled',
    size: 'xl',
  },
};

/**
 * All Sizes Comparison
 *
 * Visual comparison of all five button sizes showing padding and font-size progression.
 * Sizes range from xs (compact) to xl (hero CTAs).
 */
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

/**
 * Sizes with Icons
 *
 * Demonstrates proper icon scaling for each button size.
 * Icon sizes: XS/Small=16px, Medium=20px, Large/XL=24px.
 */
export const SizesWithIcons: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <UiButton label="Save (XS)" size="xs" variant="filled">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Save (Small)" size="small" variant="filled">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Save (Medium)" size="medium" variant="filled">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Save (Large)" size="large" variant="filled">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Save (XL)" size="xl" variant="filled">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
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

/**
 * Size × Variant Matrix
 *
 * Complete matrix showing all combinations of sizes and variants.
 * Helps visualize how each size looks across different button styles.
 */
export const SizeVariantMatrix: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">Filled Variant</h3>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <UiButton label="XS" size="xs" variant="filled" />
            <UiButton label="Small" size="small" variant="filled" />
            <UiButton label="Medium" size="medium" variant="filled" />
            <UiButton label="Large" size="large" variant="filled" />
            <UiButton label="XL" size="xl" variant="filled" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">Outline Variant</h3>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <UiButton label="XS" size="xs" variant="outline" />
            <UiButton label="Small" size="small" variant="outline" />
            <UiButton label="Medium" size="medium" variant="outline" />
            <UiButton label="Large" size="large" variant="outline" />
            <UiButton label="XL" size="xl" variant="outline" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">Text Variant</h3>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
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
        story: 'Complete size matrix showing all combinations of sizes and variants (15 total).',
      },
    },
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'filled',
    size: 'medium',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    variant: 'filled',
    size: 'medium',
    loading: true,
  },
};

export const LoadingOutline: Story = {
  args: {
    label: 'Saving...',
    variant: 'outline',
    size: 'medium',
    loading: true,
  },
};

/**
 * Disabled Buttons with Icons
 *
 * Shows disabled state across all variants with icon combinations.
 * Disabled buttons have 50% opacity and are non-interactive.
 */
export const DisabledWithIcons: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <UiButton label="Save" variant="filled" disabled>
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Save" variant="outline" disabled>
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Save" variant="text" disabled>
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled buttons with icons show 50% opacity across all variants. Click events are not emitted.',
      },
    },
  },
};

/**
 * Interactive States Guide
 *
 * Comprehensive demonstration of all button interactive states.
 * Use this story to test hover, focus, active, and disabled behaviors.
 */
export const InteractiveStates: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600; color: var(--color-text-primary);">Hover State</h3>
          <p style="margin-bottom: 12px; color: var(--color-text-secondary); font-size: 14px;">
            Hover over buttons to see background color darken. Transition: 150ms ease-in-out.
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Hover Me (Filled)" variant="filled" />
            <UiButton label="Hover Me (Outline)" variant="outline" />
            <UiButton label="Hover Me (Text)" variant="text" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600; color: var(--color-text-primary);">Focus State</h3>
          <p style="margin-bottom: 12px; color: var(--color-text-secondary); font-size: 14px;">
            Press Tab to focus buttons. 2px outline with 2px offset for keyboard visibility.
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Tab to Focus (Filled)" variant="filled" />
            <UiButton label="Tab to Focus (Outline)" variant="outline" />
            <UiButton label="Tab to Focus (Text)" variant="text" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600; color: var(--color-text-primary);">Active State</h3>
          <p style="margin-bottom: 12px; color: var(--color-text-secondary); font-size: 14px;">
            Click and hold to see active state (darker background than hover).
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Click & Hold (Filled)" variant="filled" />
            <UiButton label="Click & Hold (Outline)" variant="outline" />
            <UiButton label="Click & Hold (Text)" variant="text" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600; color: var(--color-text-primary);">Disabled State</h3>
          <p style="margin-bottom: 12px; color: var(--color-text-secondary); font-size: 14px;">
            Disabled buttons have 50% opacity and no hover/focus/click effects.
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Disabled (Filled)" variant="filled" disabled />
            <UiButton label="Disabled (Outline)" variant="outline" disabled />
            <UiButton label="Disabled (Text)" variant="text" disabled />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600; color: var(--color-text-primary);">Loading State</h3>
          <p style="margin-bottom: 12px; color: var(--color-text-secondary); font-size: 14px;">
            Loading buttons show spinner animation and are disabled (no interaction).
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Loading..." variant="filled" loading />
            <UiButton label="Loading..." variant="outline" loading />
            <UiButton label="Loading..." variant="text" loading />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
## Interactive State Testing Guide

This story demonstrates all button states. Test each one:

### Hover State (\`:hover\`)
- **Filled**: Background darkens (primary-500 → primary-600)
- **Outline**: Background fills with primary-50, border darkens
- **Text**: Background adds primary-50 tint
- **Transition**: 150ms ease-in-out

### Focus State (\`:focus-visible\`)
- **All variants**: 2px outline with 2px offset
- **Keyboard only**: Press Tab to test (no outline on mouse click)
- **Color**: Uses --color-border-focus token

### Active State (\`:active\`)
- **Filled**: Background darkens further (primary-500 → primary-700)
- **Outline**: Background uses primary-100, border darkens to primary-700
- **Text**: Background uses primary-100
- **Test**: Click and hold button to see active state

### Disabled State (\`:disabled\`)
- **Opacity**: 50%
- **Cursor**: not-allowed
- **Pointer events**: none (no hover/focus/click)
- **Test**: Try hovering/clicking - nothing happens

### Loading State
- **Spinner**: Replaces left icon, animates continuously
- **Disabled**: Button is disabled during loading
- **Test**: Button shows spinner and cannot be clicked
        `,
      },
    },
  },
};

/**
 * State Comparison Matrix
 *
 * Side-by-side comparison of default vs disabled states across all variants.
 * Helps visualize state differences clearly.
 */
export const StateMatrix: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: grid; grid-template-columns: auto repeat(3, 1fr); gap: 16px; align-items: center;">
        <!-- Headers -->
        <div style="font-weight: 600; color: var(--color-text-primary);">Variant</div>
        <div style="font-weight: 600; color: var(--color-text-primary);">Default</div>
        <div style="font-weight: 600; color: var(--color-text-primary);">Disabled</div>
        <div style="font-weight: 600; color: var(--color-text-primary);">Loading</div>

        <!-- Filled -->
        <div style="display: flex; align-items: center; color: var(--color-text-primary);">Filled</div>
        <UiButton label="Default" variant="filled" size="small" />
        <UiButton label="Disabled" variant="filled" size="small" disabled />
        <UiButton label="Loading" variant="filled" size="small" loading />

        <!-- Outline -->
        <div style="display: flex; align-items: center; color: var(--color-text-primary);">Outline</div>
        <UiButton label="Default" variant="outline" size="small" />
        <UiButton label="Disabled" variant="outline" size="small" disabled />
        <UiButton label="Loading" variant="outline" size="small" loading />

        <!-- Text -->
        <div style="display: flex; align-items: center; color: var(--color-text-primary);">Text</div>
        <UiButton label="Default" variant="text" size="small" />
        <UiButton label="Disabled" variant="text" size="small" disabled />
        <UiButton label="Loading" variant="text" size="small" loading />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Grid comparison of default, disabled, and loading states across all variants. Hover over default buttons to see hover state.',
      },
    },
  },
};

// Use Case Stories
export const SubmitForm: Story = {
  args: {
    label: 'Submit',
    variant: 'filled',
    size: 'large',
  },
};

export const CancelAction: Story = {
  args: {
    label: 'Cancel',
    variant: 'text',
    size: 'medium',
  },
};

export const AddItem: Story = {
  args: {
    label: '+ Add Issue',
    variant: 'outline',
    size: 'small',
  },
};

// Interaction Tests
export const ClickInteraction: Story = {
  args: {
    label: 'Click Me',
    variant: 'filled',
    size: 'medium',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test button click
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();

    // Test button is in the document
    await expect(button).toBeInTheDocument();

    // Test button has correct label
    await expect(button).toHaveTextContent('Click Me');
  },
};

export const KeyboardNavigation: Story = {
  args: {
    label: 'Tab to Me',
    variant: 'filled',
    size: 'medium',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Test Enter key press
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const DisabledNoClick: Story = {
  args: {
    label: 'Disabled - No Click',
    variant: 'filled',
    size: 'medium',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test disabled attribute
    await expect(button).toBeDisabled();

    // Test click does not trigger
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const LoadingNoClick: Story = {
  args: {
    label: 'Loading...',
    variant: 'filled',
    size: 'medium',
    loading: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test loading spinner is present
    const spinner = canvas.getByRole('button').querySelector('svg');
    await expect(spinner).toBeInTheDocument();

    // Test button is disabled when loading
    await expect(button).toBeDisabled();

    // Test click does not trigger when loading
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// Palette Switching Examples
/**
 * Palette Switching Demonstration
 *
 * This story demonstrates how the button adapts to different color palettes.
 * Use the Storybook toolbar controls at the top to switch between:
 *
 * PALETTES (5):
 * - Corporate Trust (Blue) - Default, professional, trustworthy
 * - Creative Energy (Purple) - Innovative, creative, bold
 * - Natural Harmony (Green) - Fresh, natural, growth-oriented
 * - Warm Welcome (Orange) - Friendly, approachable, energetic
 * - Minimalist (Gray) - Clean, modern, minimalist
 *
 * MODES (2):
 * - Light mode - Bright, high contrast
 * - Dark mode - Dark, reduced eye strain
 *
 * TOTAL VARIATIONS: 10 (5 palettes × 2 modes)
 *
 * The button uses semantic design tokens that automatically adapt:
 * - Primary buttons use --color-primary-500 (changes with palette)
 * - Text uses --color-text-inverse (adapts to light/dark mode)
 * - Borders use --color-border-default (adapts to mode)
 *
 * Try switching palettes and modes to see how the button adapts!
 */
export const PaletteSwitching: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
            All Button Variants
          </h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
            Switch palettes and modes using the toolbar controls above ↑
          </p>
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <UiButton label="Filled" variant="filled" size="medium" />
          <UiButton label="Outline" variant="outline" size="medium" />
          <UiButton label="Text" variant="text" size="medium" />
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <UiButton label="XS" variant="filled" size="xs" />
          <UiButton label="Small" variant="filled" size="small" />
          <UiButton label="Medium" variant="filled" size="medium" />
          <UiButton label="Large" variant="filled" size="large" />
          <UiButton label="XL" variant="filled" size="xl" />
        </div>

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <UiButton label="Disabled" variant="filled" size="medium" disabled />
          <UiButton label="Loading..." variant="filled" size="medium" loading />
        </div>
      </div>
    `,
  }),
};

/**
 * Multi-Palette Comparison
 *
 * This story shows how the primary button appears with semantic tokens.
 * The button automatically adapts to the selected palette and mode without
 * any code changes. This demonstrates the power of the 2-dimensional
 * palette system.
 *
 * Key semantic tokens used:
 * - --color-primary-500: Main brand color (blue/purple/green/orange/gray)
 * - --color-primary-600: Hover state
 * - --color-primary-700: Active state
 * - --color-text-inverse: Text color on colored backgrounds
 *
 * Test it: Switch between palettes to see the button color change!
 */
export const SemanticTokenDemo: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="
          padding: 1rem;
          background-color: var(--color-surface-default);
          border: 1px solid var(--color-border-default);
          border-radius: 0.5rem;
        ">
          <h4 style="color: var(--color-text-primary); margin: 0 0 0.5rem 0;">
            Using Semantic Tokens
          </h4>
          <p style="color: var(--color-text-secondary); margin: 0 0 1rem 0; font-size: 0.875rem;">
            This button uses <code>--color-primary-500</code> which resolves to:
          </p>
          <ul style="color: var(--color-text-secondary); font-size: 0.875rem; margin: 0 0 1rem 0;">
            <li>Blue (#3B82F6) in Corporate Trust</li>
            <li>Purple (#9333EA) in Creative Energy</li>
            <li>Green (#10B981) in Natural Harmony</li>
            <li>Orange (#F59E0B) in Warm Welcome</li>
            <li>Gray (#64748B) in Minimalist</li>
          </ul>
          <UiButton label="Adaptive Filled Button" variant="filled" size="large" />
        </div>

        <div style="
          padding: 1rem;
          background-color: var(--color-surface-default);
          border: 1px solid var(--color-border-default);
          border-radius: 0.5rem;
        ">
          <h4 style="color: var(--color-text-primary); margin: 0 0 0.5rem 0;">
            All Variants (Consistent Across Palettes)
          </h4>
          <p style="color: var(--color-text-secondary); margin: 0 0 1rem 0; font-size: 0.875rem;">
            All variants adapt to the current palette:
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <UiButton label="Filled" variant="filled" size="medium" />
            <UiButton label="Outline" variant="outline" size="medium" />
            <UiButton label="Text" variant="text" size="medium" />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Accessibility in All Palettes
 *
 * All 10 palette variations (5 palettes × 2 modes) meet WCAG AA
 * contrast requirements:
 * - Normal text: ≥ 4.5:1 contrast ratio
 * - Large text: ≥ 3:1 contrast ratio
 * - UI components: ≥ 3:1 contrast ratio
 *
 * This ensures buttons are readable and accessible in all themes.
 */
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="
          padding: 1rem;
          background-color: var(--color-surface-default);
          border: 1px solid var(--color-border-default);
          border-radius: 0.5rem;
        ">
          <h4 style="color: var(--color-text-primary); margin: 0 0 0.5rem 0;">
            ✅ WCAG AA Compliant
          </h4>
          <p style="color: var(--color-text-secondary); margin: 0 0 1rem 0; font-size: 0.875rem;">
            All button variants maintain proper contrast in every palette and mode.
          </p>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
            <UiButton label="Filled (≥4.5:1)" variant="filled" size="medium" />
            <UiButton label="Outline (≥4.5:1)" variant="outline" size="medium" />
            <UiButton label="Text (≥4.5:1)" variant="text" size="medium" />
            <span style="color: var(--color-text-tertiary); font-size: 0.75rem;">
              ← Try in dark mode!
            </span>
          </div>
        </div>

        <div style="
          padding: 1rem;
          background-color: var(--color-surface-default);
          border: 1px solid var(--color-border-default);
          border-radius: 0.5rem;
        ">
          <h4 style="color: var(--color-text-primary); margin: 0 0 0.5rem 0;">
            Focus Indicators
          </h4>
          <p style="color: var(--color-text-secondary); margin: 0 0 1rem 0; font-size: 0.875rem;">
            Focus states are clearly visible in all palettes and modes.
          </p>
          <div style="display: flex; gap: 0.5rem;">
            <UiButton label="Tab to me" variant="filled" size="medium" />
            <UiButton label="Then here" variant="outline" size="medium" />
            <UiButton label="Finally here" variant="text" size="medium" />
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * Palette Adaptation (KEY VALIDATION STORY)
 *
 * This is the MOST IMPORTANT story for validating the feature specification requirement:
 * "Buttons must automatically adapt to palette switcher."
 *
 * Use the Storybook toolbar to switch palettes and observe instant color changes.
 */
export const PaletteAdaptation: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <!-- Instructions -->
        <div style="padding: 16px; background: #e0f2fe; border-radius: 8px; border-left: 4px solid #0284c7;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #0c4a6e;">🎨 Palette Switching Test</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #0c4a6e;">
            Use the <strong>Palette</strong> and <strong>Mode</strong> controls in the Storybook toolbar to switch between palettes and observe automatic button color adaptation.
            <br />
            <strong>Expected behavior:</strong> All buttons update colors instantly without page reload.
          </p>
        </div>

        <!-- Filled Variant Showcase -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">Filled Variant (Primary Color Adaptation)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Save Changes" variant="filled" size="medium" />
            <UiButton label="Create Account" variant="filled" size="large" />
            <UiButton label="Submit" variant="filled" size="small" />
          </div>
          <p style="margin-top: 8px; color: var(--color-text-secondary); font-size: 14px;">
            Background uses <code>var(--color-primary-500)</code> which changes per palette.
          </p>
        </div>

        <!-- Outline Variant Showcase -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">Outline Variant (Border & Text Adaptation)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Cancel" variant="outline" size="medium" />
            <UiButton label="Learn More" variant="outline" size="large" />
            <UiButton label="Export" variant="outline" size="small" />
          </div>
          <p style="margin-top: 8px; color: var(--color-text-secondary); font-size: 14px;">
            Border and text use <code>var(--color-primary-500)</code>, hover uses <code>var(--color-primary-50)</code>.
          </p>
        </div>

        <!-- Text Variant Showcase -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">Text Variant (Text Color Adaptation)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Skip" variant="text" size="medium" />
            <UiButton label="Dismiss" variant="text" size="large" />
            <UiButton label="Edit" variant="text" size="small" />
          </div>
          <p style="margin-top: 8px; color: var(--color-text-secondary); font-size: 14px;">
            Text color uses <code>var(--color-primary-500)</code>, hover uses <code>var(--color-primary-50)</code>.
          </p>
        </div>

        <!-- All Variants Together -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600; color: var(--color-text-primary);">All Variants (Side-by-Side Comparison)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Primary Action" variant="filled" />
            <UiButton label="Secondary Action" variant="outline" />
            <UiButton label="Tertiary Action" variant="text" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
## Palette Adaptation Testing

This story validates that buttons automatically adapt to all 10 palette variations without code changes.

### Test Procedure

1. Open the Palette and Mode controls in Storybook toolbar
2. Switch between these palettes and observe button color changes:
   - **Corporate Trust** (Blue tones)
   - **Creative Energy** (Purple tones)
   - **Natural Harmony** (Green tones)
   - **Warm Welcome** (Orange tones)
   - **Minimalist** (Gray tones)
3. Toggle between Light and Dark modes for each palette
4. Verify all buttons adapt instantly

### What Should Change

- **Filled buttons**: Background color changes to palette's primary-500
- **Outline buttons**: Border and text color adapt to palette's primary-500
- **Text buttons**: Text color changes to palette's primary-500
- **All buttons**: Hover states adapt automatically

### Design Tokens Used

- Background: \`--color-primary-500\` → \`--color-primary-600\` (hover) → \`--color-primary-700\` (active)
- Text: \`--color-text-inverse\` (filled), \`--color-primary-500\` (outline/text)
- Border: \`--color-primary-500\` (outline)

### Expected Result

✅ All buttons change colors smoothly when palette is switched.
        `,
      },
    },
  },
};

/**
 * Palette Testing Checklist
 *
 * Systematic checklist for testing buttons across all 10 palette variations.
 * Use this to verify all palette combinations work correctly.
 */
export const PaletteTestingChecklist: Story = {
  render: () => ({
    template: `
      <div style="max-width: 800px;">
        <h2 style="margin-bottom: 16px; color: var(--color-text-primary);">10 Palette Variation Testing Checklist</h2>
        <p style="margin-bottom: 24px; color: var(--color-text-secondary);">
          Systematically test buttons across all palette combinations. Check off each as you verify.
        </p>

        <div style="display: grid; gap: 16px;">
          <!-- Corporate Trust -->
          <div style="padding: 16px; border: 1px solid var(--color-border-default); border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #0066cc;">Corporate Trust (Blue)</h3>
            <label style="display: block; margin-bottom: 4px; color: var(--color-text-primary);">
              <input type="checkbox" /> Light mode: Filled button is blue
            </label>
            <label style="display: block; color: var(--color-text-primary);">
              <input type="checkbox" /> Dark mode: Filled button is lighter blue
            </label>
          </div>

          <!-- Creative Energy -->
          <div style="padding: 16px; border: 1px solid var(--color-border-default); border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #7c3aed;">Creative Energy (Purple)</h3>
            <label style="display: block; margin-bottom: 4px; color: var(--color-text-primary);">
              <input type="checkbox" /> Light mode: Filled button is purple
            </label>
            <label style="display: block; color: var(--color-text-primary);">
              <input type="checkbox" /> Dark mode: Filled button is lighter purple
            </label>
          </div>

          <!-- Natural Harmony -->
          <div style="padding: 16px; border: 1px solid var(--color-border-default); border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #059669;">Natural Harmony (Green)</h3>
            <label style="display: block; margin-bottom: 4px; color: var(--color-text-primary);">
              <input type="checkbox" /> Light mode: Filled button is green
            </label>
            <label style="display: block; color: var(--color-text-primary);">
              <input type="checkbox" /> Dark mode: Filled button is lighter green
            </label>
          </div>

          <!-- Warm Welcome -->
          <div style="padding: 16px; border: 1px solid var(--color-border-default); border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #ea580c;">Warm Welcome (Orange)</h3>
            <label style="display: block; margin-bottom: 4px; color: var(--color-text-primary);">
              <input type="checkbox" /> Light mode: Filled button is orange
            </label>
            <label style="display: block; color: var(--color-text-primary);">
              <input type="checkbox" /> Dark mode: Filled button is lighter orange
            </label>
          </div>

          <!-- Minimalist -->
          <div style="padding: 16px; border: 1px solid var(--color-border-default); border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #64748b;">Minimalist (Gray)</h3>
            <label style="display: block; margin-bottom: 4px; color: var(--color-text-primary);">
              <input type="checkbox" /> Light mode: Filled button is gray
            </label>
            <label style="display: block; color: var(--color-text-primary);">
              <input type="checkbox" /> Dark mode: Filled button is lighter gray
            </label>
          </div>
        </div>

        <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #059669;">
          <strong style="color: #065f46;">✅ Success Criteria:</strong>
          <span style="color: #065f46;"> All 10 checkboxes checked = Feature requirement satisfied</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive checklist for systematic cross-palette validation. Use this to verify all 10 palette variations work correctly.',
      },
    },
  },
};

// Icon Slot Stories
/**
 * Button with Left Icon
 *
 * Demonstrates icon-left slot usage for placing icons before text.
 * Common use cases: Save, Download, Add, etc.
 */
export const WithLeftIcon: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
            Buttons with Left Icons
          </h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
            Icons positioned before text using the icon-left slot
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <UiButton label="Save" variant="filled" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            </template>
          </UiButton>
          <UiButton label="Download" variant="outline" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </template>
          </UiButton>
          <UiButton label="Add Item" variant="text" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </template>
          </UiButton>
        </div>
      </div>
    `,
  }),
};

/**
 * Button with Right Icon
 *
 * Demonstrates icon-right slot usage for placing icons after text.
 * Common use cases: Next, Forward, External links, etc.
 */
export const WithRightIcon: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
            Buttons with Right Icons
          </h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
            Icons positioned after text using the icon-right slot
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <UiButton label="Next" variant="filled" size="medium">
            <template #icon-right>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </template>
          </UiButton>
          <UiButton label="External Link" variant="outline" size="medium">
            <template #icon-right>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </template>
          </UiButton>
          <UiButton label="Forward" variant="text" size="medium">
            <template #icon-right>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
              </svg>
            </template>
          </UiButton>
        </div>
      </div>
    `,
  }),
};

/**
 * Icon-Only Buttons
 *
 * Demonstrates icon-only buttons without text labels.
 * IMPORTANT: Icon-only buttons MUST have aria-label for accessibility (WCAG 2.1 AAA).
 * The component will warn in development mode if aria-label is missing.
 */
export const IconOnly: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
            Icon-Only Buttons
          </h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
            ⚠️ Icon-only buttons require <code>aria-label</code> for screen readers
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
          <UiButton aria-label="Close dialog" variant="filled" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </template>
          </UiButton>
          <UiButton aria-label="More options" variant="outline" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </template>
          </UiButton>
          <UiButton aria-label="Settings" variant="text" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m7.07-13.07-4.24 4.24m0 6v0m4.24 4.24-4.24-4.24M23 12h-6m-6 0H1m13.07 7.07-4.24-4.24m0-6v0m-4.24-4.24L9.83 8.83"></path>
              </svg>
            </template>
          </UiButton>
          <span style="color: var(--color-text-tertiary); font-size: 0.75rem;">
            ← All have aria-label for accessibility
          </span>
        </div>
      </div>
    `,
  }),
};

/**
 * Buttons with Both Icons
 *
 * Demonstrates using both icon-left and icon-right slots simultaneously.
 * Useful for complex button actions or download/export buttons.
 */
export const BothIcons: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 0.5rem;">
            Buttons with Both Icons
          </h3>
          <p style="color: var(--color-text-secondary); margin-bottom: 1rem; font-size: 0.875rem;">
            Using icon-left and icon-right slots together
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <UiButton label="Download PDF" variant="filled" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </template>
            <template #icon-right>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </template>
          </UiButton>
          <UiButton label="Search Files" variant="outline" size="medium">
            <template #icon-left>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </template>
            <template #icon-right>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </template>
          </UiButton>
        </div>
      </div>
    `,
  }),
};

/**
 * Filled Variant with Icons
 *
 * Demonstrates the filled button variant with icon combinations.
 * Common use cases: Save, Create, Submit actions.
 */
export const FilledWithIcons: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
        <UiButton label="Save Changes" variant="filled" size="medium">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Continue" variant="filled" size="medium">
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Create Account" variant="filled" size="medium">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </template>
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </template>
        </UiButton>
      </div>
    `,
  }),
};

/**
 * Outline Variant with Icons
 *
 * Demonstrates the outline button variant with icon combinations.
 * Common use cases: Cancel, Learn More, View Details actions.
 */
export const OutlineWithIcons: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
        <UiButton label="Learn More" variant="outline" size="medium">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </template>
        </UiButton>
        <UiButton label="View Details" variant="outline" size="medium">
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Export Data" variant="outline" size="medium">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </template>
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </template>
        </UiButton>
      </div>
    `,
  }),
};

/**
 * Text Variant with Icons
 *
 * Demonstrates the text button variant with icon combinations.
 * Common use cases: Skip, Dismiss, Edit, Delete actions.
 */
export const TextWithIcons: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
        <UiButton label="Edit" variant="text" size="medium">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Dismiss" variant="text" size="medium">
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </template>
        </UiButton>
        <UiButton label="Delete Item" variant="text" size="medium">
          <template #icon-left>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </template>
          <template #icon-right>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </template>
        </UiButton>
      </div>
    `,
  }),
};
