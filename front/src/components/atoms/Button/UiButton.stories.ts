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
