import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

/**
 * # Shadow System
 *
 * Elevation system using box shadows to create depth and hierarchy.
 * Shadows help establish visual layers and component importance.
 *
 * ## Shadow Levels
 *
 * - **NONE**: No shadow (flush with surface)
 * - **SM**: Subtle elevation for hover states
 * - **BASE**: Standard component elevation
 * - **MD**: Modal dialogs, dropdowns
 * - **LG**: Major UI elements
 * - **XL**: Maximum elevation for critical elements
 * - **INNER**: Inset shadow for input fields
 */
const meta = {
  title: 'Design System/Shadows',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive shadow system for creating depth and visual hierarchy.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Shadow Scale
 *
 * All available shadow levels from none to extra-large.
 */
export const ShadowScale: Story = {
  render: () => ({
    setup() {
      const shadows = [
        { name: 'NONE', value: 'none', token: 'SHADOW.NONE', use: 'Flush elements' },
        { name: 'SM', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', token: 'SHADOW.SM', use: 'Subtle hover' },
        {
          name: 'BASE',
          value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          token: 'SHADOW.BASE',
          use: 'Cards, buttons',
        },
        {
          name: 'MD',
          value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          token: 'SHADOW.MD',
          use: 'Dropdowns',
        },
        {
          name: 'LG',
          value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
          token: 'SHADOW.LG',
          use: 'Modals, popovers',
        },
        {
          name: 'XL',
          value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          token: 'SHADOW.XL',
          use: 'Maximum elevation',
        },
        { name: 'INNER', value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)', token: 'SHADOW.INNER', use: 'Input fields' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Shadow Scale'),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              },
            },
            shadows.map((shadow) =>
              h(
                'div',
                {
                  key: shadow.name,
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                  },
                },
                [
                  h(
                    'div',
                    { style: { marginBottom: '1rem' } },
                    [
                      h('div', { style: { fontSize: '1rem', fontWeight: '600', color: '#111827' } }, shadow.name),
                      h('div', { style: { fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' } }, shadow.use),
                    ],
                  ),
                  h('div', {
                    style: {
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#ffffff',
                      borderRadius: '0.5rem',
                      boxShadow: shadow.value,
                      marginBottom: '1rem',
                    },
                  }),
                  h(
                    'code',
                    {
                      style: {
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                        display: 'block',
                        padding: '0.5rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '0.25rem',
                      },
                    },
                    shadow.token,
                  ),
                ],
              ),
            ),
          ),
        ]);
    },
  }),
};

/**
 * ## Interactive Elevation
 *
 * Shadows used for interactive states (hover, active).
 */
export const InteractiveElevation: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Interactive Elevation'),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
              },
            },
            [
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 200ms ease',
                    cursor: 'pointer',
                  },
                  onMouseenter: (e: MouseEvent) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
                  },
                  onMouseleave: (e: MouseEvent) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)';
                  },
                },
                [
                  h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' } }, 'Hover Me'),
                  h('p', { style: { fontSize: '0.875rem', color: '#6b7280' } }, 'BASE → MD on hover'),
                ],
              ),
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 200ms ease',
                    cursor: 'pointer',
                  },
                  onMouseenter: (e: MouseEvent) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
                  },
                  onMouseleave: (e: MouseEvent) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)';
                  },
                },
                [
                  h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' } }, 'Hover Me'),
                  h('p', { style: { fontSize: '0.875rem', color: '#6b7280' } }, 'MD → LG on hover'),
                ],
              ),
            ],
          ),
        ]);
    },
  }),
};

/**
 * ## Component Examples
 *
 * Real-world usage of shadows in common components.
 */
export const ComponentExamples: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1200px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Component Examples'),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
              },
            },
            [
              // Card with BASE shadow
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
                  },
                },
                [
                  h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Card'),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' } },
                    'Standard card with BASE shadow for subtle elevation.',
                  ),
                  h(
                    'div',
                    { style: { fontSize: '0.75rem', color: '#9ca3af', fontFamily: "'Roboto Mono', monospace" } },
                    'SHADOW.BASE',
                  ),
                ],
              ),
              // Dropdown with MD shadow
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                  },
                },
                [
                  h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Dropdown'),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' } },
                    'Dropdown menu with MD shadow for clear separation.',
                  ),
                  h(
                    'div',
                    { style: { fontSize: '0.75rem', color: '#9ca3af', fontFamily: "'Roboto Mono', monospace" } },
                    'SHADOW.MD',
                  ),
                ],
              ),
              // Modal with LG shadow
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                  },
                },
                [
                  h('h3', { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Modal'),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' } },
                    'Modal dialog with LG shadow for maximum prominence.',
                  ),
                  h(
                    'div',
                    { style: { fontSize: '0.75rem', color: '#9ca3af', fontFamily: "'Roboto Mono', monospace" } },
                    'SHADOW.LG',
                  ),
                ],
              ),
            ],
          ),
        ]);
    },
  }),
};

/**
 * ## Inner Shadow
 *
 * Inset shadow for input fields and recessed elements.
 */
export const InnerShadow: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '600px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Inner Shadow'),
          h(
            'div',
            {
              style: {
                padding: '2rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
              },
            },
            [
              h('label', { style: { display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' } }, 'Input Field'),
              h('input', {
                type: 'text',
                placeholder: 'Type something...',
                style: {
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
                  outline: 'none',
                  fontFamily: "'Roboto', sans-serif",
                },
              }),
              h(
                'div',
                {
                  style: {
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontFamily: "'Roboto Mono', monospace",
                  },
                },
                'boxShadow: SHADOW.INNER',
              ),
            ],
          ),
        ]);
    },
  }),
};
