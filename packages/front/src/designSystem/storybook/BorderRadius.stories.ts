import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

/**
 * # Border Radius System
 *
 * Consistent border radius scale for creating rounded corners.
 * From sharp edges to fully rounded shapes.
 *
 * ## Radius Levels
 *
 * - **NONE**: Sharp corners (0)
 * - **SM**: Subtle rounding (0.125rem / 2px)
 * - **BASE**: Standard rounding (0.25rem / 4px)
 * - **MD**: Medium rounding (0.375rem / 6px)
 * - **LG**: Large rounding (0.5rem / 8px)
 * - **XL**: Extra large (0.75rem / 12px)
 * - **2XL**: Double extra large (1rem / 16px)
 * - **FULL**: Fully rounded (9999px)
 */
const meta = {
  title: 'Design System/Border Radius',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive border radius system for consistent rounded corners.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Border Radius Scale
 *
 * All available border radius values.
 */
export const BorderRadiusScale: Story = {
  render: () => ({
    setup() {
      const radii = [
        { name: 'NONE', value: '0', px: '0px', token: 'BORDER_RADIUS.NONE', use: 'Sharp edges' },
        {
          name: 'SM',
          value: '0.125rem',
          px: '2px',
          token: 'BORDER_RADIUS.SM',
          use: 'Subtle corners',
        },
        {
          name: 'BASE',
          value: '0.25rem',
          px: '4px',
          token: 'BORDER_RADIUS.BASE',
          use: 'Default rounding',
        },
        {
          name: 'MD',
          value: '0.375rem',
          px: '6px',
          token: 'BORDER_RADIUS.MD',
          use: 'Medium rounding',
        },
        {
          name: 'LG',
          value: '0.5rem',
          px: '8px',
          token: 'BORDER_RADIUS.LG',
          use: 'Large rounding',
        },
        { name: 'XL', value: '0.75rem', px: '12px', token: 'BORDER_RADIUS.XL', use: 'Extra large' },
        {
          name: '2XL',
          value: '1rem',
          px: '16px',
          token: 'BORDER_RADIUS["2XL"]',
          use: 'Very large',
        },
        {
          name: 'FULL',
          value: '9999px',
          px: '9999px',
          token: 'BORDER_RADIUS.FULL',
          use: 'Pills, circles',
        },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Border Radius Scale'
          ),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem',
              },
            },
            radii.map((radius) =>
              h(
                'div',
                {
                  key: radius.name,
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                  },
                },
                [
                  h('div', { style: { marginBottom: '1rem' } }, [
                    h(
                      'div',
                      { style: { fontSize: '1rem', fontWeight: '600', color: '#111827' } },
                      radius.name
                    ),
                    h(
                      'div',
                      { style: { fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' } },
                      `${radius.value} / ${radius.px}`
                    ),
                  ]),
                  h('div', {
                    style: {
                      width: '100px',
                      height: '100px',
                      margin: '0 auto 1rem',
                      backgroundColor: '#3b82f6',
                      borderRadius: radius.value,
                    },
                  }),
                  h(
                    'div',
                    { style: { fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.5rem' } },
                    radius.use
                  ),
                  h(
                    'code',
                    {
                      style: {
                        fontSize: '0.65rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                        display: 'block',
                        padding: '0.25rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '0.25rem',
                      },
                    },
                    radius.token
                  ),
                ]
              )
            )
          ),
        ]);
    },
  }),
};

/**
 * ## Component Examples
 *
 * Border radius applied to common UI components.
 */
export const ComponentExamples: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1200px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Component Examples'
          ),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              },
            },
            [
              // Button with MD radius
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                  },
                },
                [
                  h(
                    'div',
                    { style: { fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem' } },
                    'Button'
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      style: {
                        padding: '0.625rem 1.5rem',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                      },
                    },
                    'Click me'
                  ),
                  h(
                    'div',
                    {
                      style: {
                        marginTop: '1rem',
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                      },
                    },
                    'BORDER_RADIUS.MD'
                  ),
                ]
              ),
              // Card with LG radius
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                  },
                },
                [
                  h(
                    'div',
                    { style: { fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' } },
                    'Card'
                  ),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' } },
                    'Card with LG border radius.'
                  ),
                  h(
                    'div',
                    {
                      style: {
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                      },
                    },
                    'BORDER_RADIUS.LG'
                  ),
                ]
              ),
              // Badge with FULL radius
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                  },
                },
                [
                  h(
                    'div',
                    { style: { fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem' } },
                    'Badge'
                  ),
                  h(
                    'span',
                    {
                      style: {
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        borderRadius: '9999px',
                      },
                    },
                    'New'
                  ),
                  h(
                    'div',
                    {
                      style: {
                        marginTop: '1rem',
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                      },
                    },
                    'BORDER_RADIUS.FULL'
                  ),
                ]
              ),
            ]
          ),
        ]);
    },
  }),
};

/**
 * ## Avatar & Circle Examples
 *
 * FULL radius creates perfect circles and pills.
 */
export const CircleExamples: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Circle Examples'
          ),
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
              h(
                'h3',
                { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' } },
                'Avatars'
              ),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                  },
                },
                [40, 48, 56, 64].map((size) =>
                  h('div', {
                    key: size,
                    style: {
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: '#3b82f6',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                    },
                  })
                )
              ),
              h(
                'h3',
                { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' } },
                'Pills'
              ),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  },
                },
                ['Design', 'Development', 'Marketing', 'Sales'].map((tag) =>
                  h(
                    'span',
                    {
                      key: tag,
                      style: {
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        color: '#374151',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '9999px',
                      },
                    },
                    tag
                  )
                )
              ),
            ]
          ),
        ]);
    },
  }),
};

/**
 * ## Mixed Radius
 *
 * Combining different radius values for complex components.
 */
export const MixedRadius: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '600px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Mixed Radius'
          ),
          h(
            'div',
            {
              style: {
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              },
            },
            [
              h('div', {
                style: {
                  height: '150px',
                  backgroundColor: '#dbeafe',
                },
              }),
              h(
                'div',
                {
                  style: {
                    padding: '1.5rem',
                  },
                },
                [
                  h(
                    'h3',
                    { style: { fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' } },
                    'Card with Image'
                  ),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' } },
                    'Container has XL radius, but inner elements are square due to overflow hidden.'
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      style: {
                        padding: '0.625rem 1.25rem',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                      },
                    },
                    'Learn More'
                  ),
                ]
              ),
            ]
          ),
        ]);
    },
  }),
};
