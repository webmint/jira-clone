import type { Meta, StoryObj } from '@storybook/vue3';
import UiButton from './UiButton.vue';

const meta = {
  title: 'Atoms/UiButton',
  component: UiButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
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
    onClick: () => console.log('Button clicked'),
  },
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    label: 'Delete',
    variant: 'danger',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    variant: 'primary',
    size: 'md',
    loading: true,
  },
};

export const LoadingSecondary: Story = {
  args: {
    label: 'Saving...',
    variant: 'secondary',
    size: 'md',
    loading: true,
  },
};

// Use Case Stories
export const SubmitForm: Story = {
  args: {
    label: 'Submit',
    variant: 'primary',
    size: 'lg',
  },
};

export const CancelAction: Story = {
  args: {
    label: 'Cancel',
    variant: 'ghost',
    size: 'md',
  },
};

export const ConfirmDelete: Story = {
  args: {
    label: 'Confirm Delete',
    variant: 'danger',
    size: 'md',
  },
};

export const AddItem: Story = {
  args: {
    label: '+ Add Issue',
    variant: 'secondary',
    size: 'sm',
  },
};
