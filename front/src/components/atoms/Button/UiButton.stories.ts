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
    label: 'Filled Button',
    variant: 'filled',
    size: 'medium',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
    size: 'medium',
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
    size: 'medium',
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
