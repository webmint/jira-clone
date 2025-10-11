import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

/**
 * # Spacing System
 *
 * Consistent spacing scale based on the 8-point grid system (base unit: 0.5rem / 8px).
 * All spacing values are in rem units for better accessibility and scalability.
 *
 * ## Base Unit
 *
 * - **Base**: 0.5rem (8px) - Fundamental spacing unit
 * - **Scale**: 0 to 20 (0rem to 10rem)
 * - **Pattern**: Base-8 system for consistent rhythm
 */
const meta = {
  title: 'Design System/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comprehensive spacing system using 8-point grid with rem units for accessibility.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Spacing Scale
 *
 * Complete spacing scale from 0 to 20 with visual representations.
 */
export const SpacingScale: Story = {
  render: () => ({
    setup() {
      const spacings = [
        { name: 'NONE', value: '0', px: '0px', token: 'SPACING.NONE' },
        { name: '0.5', value: '0.25rem', px: '4px', token: 'SPACING["0_5"]' },
        { name: '1', value: '0.5rem', px: '8px', token: 'SPACING["1"]' },
        { name: '1.5', value: '0.75rem', px: '12px', token: 'SPACING["1_5"]' },
        { name: '2', value: '1rem', px: '16px', token: 'SPACING["2"]' },
        { name: '2.5', value: '1.25rem', px: '20px', token: 'SPACING["2_5"]' },
        { name: '3', value: '1.5rem', px: '24px', token: 'SPACING["3"]' },
        { name: '4', value: '2rem', px: '32px', token: 'SPACING["4"]' },
        { name: '5', value: '2.5rem', px: '40px', token: 'SPACING["5"]' },
        { name: '6', value: '3rem', px: '48px', token: 'SPACING["6"]' },
        { name: '7', value: '3.5rem', px: '56px', token: 'SPACING["7"]' },
        { name: '8', value: '4rem', px: '64px', token: 'SPACING["8"]' },
        { name: '10', value: '5rem', px: '80px', token: 'SPACING["10"]' },
        { name: '12', value: '6rem', px: '96px', token: 'SPACING["12"]' },
        { name: '16', value: '8rem', px: '128px', token: 'SPACING["16"]' },
        { name: '20', value: '10rem', px: '160px', token: 'SPACING["20"]' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Spacing Scale'
          ),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
            spacings.map((spacing) =>
              h(
                'div',
                {
                  key: spacing.name,
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                  },
                },
                [
                  h(
                    'div',
                    { style: { minWidth: '120px', display: 'flex', flexDirection: 'column' } },
                    [
                      h(
                        'span',
                        { style: { fontSize: '0.875rem', fontWeight: '600', color: '#111827' } },
                        spacing.name
                      ),
                      h(
                        'span',
                        { style: { fontSize: '0.75rem', color: '#6b7280' } },
                        `${spacing.value} / ${spacing.px}`
                      ),
                    ]
                  ),
                  h('div', {
                    style: {
                      width: spacing.value,
                      height: '2rem',
                      backgroundColor: '#3b82f6',
                      borderRadius: '0.25rem',
                      flexShrink: 0,
                    },
                  }),
                  h(
                    'code',
                    {
                      style: {
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        backgroundColor: '#ffffff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontFamily: "'Roboto Mono', monospace",
                        marginLeft: 'auto',
                      },
                    },
                    spacing.token
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
 * ## Padding Examples
 *
 * Visual examples of spacing used as padding in components.
 */
export const PaddingExamples: Story = {
  render: () => ({
    setup() {
      const examples = [
        { name: 'Compact', spacing: '0.5rem', token: 'SPACING["1"]', use: 'Dense UI, chips' },
        { name: 'Cozy', spacing: '1rem', token: 'SPACING["2"]', use: 'Buttons, inputs' },
        { name: 'Comfortable', spacing: '1.5rem', token: 'SPACING["3"]', use: 'Cards, modals' },
        { name: 'Spacious', spacing: '2rem', token: 'SPACING["4"]', use: 'Page sections' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Padding Examples'
          ),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              },
            },
            examples.map((example) =>
              h(
                'div',
                {
                  key: example.name,
                  style: {
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                  },
                },
                [
                  h(
                    'div',
                    {
                      style: {
                        padding: '1rem',
                        borderBottom: '1px solid #e5e7eb',
                      },
                    },
                    [
                      h(
                        'div',
                        { style: { fontSize: '0.875rem', fontWeight: '600', color: '#111827' } },
                        example.name
                      ),
                      h('div', { style: { fontSize: '0.75rem', color: '#6b7280' } }, example.use),
                    ]
                  ),
                  h(
                    'div',
                    {
                      style: {
                        padding: example.spacing,
                        backgroundColor: '#ffffff',
                      },
                    },
                    h(
                      'div',
                      {
                        style: {
                          backgroundColor: '#dbeafe',
                          border: '2px solid #3b82f6',
                          borderRadius: '0.25rem',
                          padding: '0.75rem',
                          fontSize: '0.875rem',
                          color: '#1e40af',
                        },
                      },
                      `Padding: ${example.spacing}`
                    )
                  ),
                  h(
                    'div',
                    {
                      style: {
                        padding: '0.75rem 1rem',
                        backgroundColor: '#f9fafb',
                        borderTop: '1px solid #e5e7eb',
                      },
                    },
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontFamily: "'Roboto Mono', monospace",
                        },
                      },
                      example.token
                    )
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
 * ## Gap/Margin Examples
 *
 * Visual examples of spacing used as gaps and margins between elements.
 */
export const GapExamples: Story = {
  render: () => ({
    setup() {
      const examples = [
        { name: 'Tight', spacing: '0.5rem', token: 'SPACING["1"]', use: 'Inline elements' },
        { name: 'Normal', spacing: '1rem', token: 'SPACING["2"]', use: 'List items, form fields' },
        { name: 'Relaxed', spacing: '1.5rem', token: 'SPACING["3"]', use: 'Card grids' },
        { name: 'Loose', spacing: '2rem', token: 'SPACING["4"]', use: 'Page sections' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Gap Examples'
          ),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '2rem' } },
            examples.map((example) =>
              h(
                'div',
                {
                  key: example.name,
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                  },
                },
                [
                  h('div', { style: { marginBottom: '1rem' } }, [
                    h(
                      'div',
                      { style: { fontSize: '0.875rem', fontWeight: '600', color: '#111827' } },
                      example.name
                    ),
                    h('div', { style: { fontSize: '0.75rem', color: '#6b7280' } }, example.use),
                  ]),
                  h(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: example.spacing,
                      },
                    },
                    Array.from({ length: 5 }, (_, i) =>
                      h('div', {
                        key: i,
                        style: {
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#3b82f6',
                          borderRadius: '0.5rem',
                          flexShrink: 0,
                        },
                      })
                    )
                  ),
                  h(
                    'div',
                    { style: { marginTop: '1rem' } },
                    h(
                      'code',
                      {
                        style: {
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontFamily: "'Roboto Mono', monospace",
                        },
                      },
                      `gap: ${example.spacing} (${example.token})`
                    )
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
 * ## Stack Layout
 *
 * Vertical spacing patterns for stacked content.
 */
export const StackLayout: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '600px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Stack Layout'
          ),
          h(
            'div',
            {
              style: {
                padding: '2rem',
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
              },
            },
            [
              h(
                'h3',
                { style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' } },
                'Card Title (gap: 1rem)'
              ),
              h(
                'p',
                {
                  style: {
                    fontSize: '1rem',
                    color: '#6b7280',
                    lineHeight: '1.5',
                    marginBottom: '1.5rem',
                  },
                },
                'Card description with normal spacing. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              ),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                  },
                },
                [
                  h(
                    'div',
                    {
                      style: {
                        padding: '0.75rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                      },
                    },
                    'List item 1 (gap: 0.75rem)'
                  ),
                  h(
                    'div',
                    {
                      style: {
                        padding: '0.75rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                      },
                    },
                    'List item 2'
                  ),
                  h(
                    'div',
                    {
                      style: {
                        padding: '0.75rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                      },
                    },
                    'List item 3'
                  ),
                ]
              ),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    gap: '0.75rem',
                  },
                },
                [
                  h(
                    'button',
                    {
                      type: 'button',
                      style: {
                        padding: '0.625rem 1.25rem',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                      },
                    },
                    'Primary'
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      style: {
                        padding: '0.625rem 1.25rem',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        border: 'none',
                        cursor: 'pointer',
                      },
                    },
                    'Secondary'
                  ),
                ]
              ),
            ]
          ),
          h(
            'div',
            {
              style: {
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
              },
            },
            [
              h('div', { style: { fontWeight: '500', marginBottom: '0.5rem' } }, 'Spacing used:'),
              h('ul', { style: { listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.75' } }, [
                h('li', {}, 'Title to description: 1rem (SPACING["2"])'),
                h('li', {}, 'Description to list: 1.5rem (SPACING["3"])'),
                h('li', {}, 'Between list items: 0.75rem (SPACING["1_5"])'),
                h('li', {}, 'List to buttons: 1.5rem (SPACING["3"])'),
                h('li', {}, 'Between buttons: 0.75rem (SPACING["1_5"])'),
              ]),
            ]
          ),
        ]);
    },
  }),
};

/**
 * ## Grid Layout
 *
 * Horizontal and vertical spacing in grid layouts.
 */
export const GridLayout: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Grid Layout'
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
            Array.from({ length: 6 }, (_, i) =>
              h(
                'div',
                {
                  key: i,
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                  },
                },
                [
                  h('div', {
                    style: {
                      width: '100%',
                      height: '120px',
                      backgroundColor: '#dbeafe',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                    },
                  }),
                  h(
                    'h4',
                    { style: { fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' } },
                    `Card ${i + 1}`
                  ),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' } },
                    'Card content with internal spacing.'
                  ),
                ]
              )
            )
          ),
          h(
            'div',
            {
              style: {
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
              },
            },
            [
              h(
                'code',
                { style: { fontFamily: "'Roboto Mono', monospace" } },
                'gap: 1.5rem (SPACING["3"])'
              ),
              h('span', { style: { marginLeft: '0.5rem' } }, '— Grid gap between cards'),
            ]
          ),
        ]);
    },
  }),
};

/**
 * ## Usage Guidelines
 *
 * Best practices for using the spacing system.
 */
export const UsageGuidelines: Story = {
  render: () => ({
    setup() {
      const guidelines = [
        {
          category: 'Micro Spacing',
          range: '0.5 - 1',
          values: '4px - 8px',
          use: 'Icon spacing, tight elements, inline gaps',
        },
        {
          category: 'Component Spacing',
          range: '1.5 - 3',
          values: '12px - 24px',
          use: 'Padding in buttons, inputs, cards, internal component spacing',
        },
        {
          category: 'Layout Spacing',
          range: '4 - 8',
          values: '32px - 64px',
          use: 'Section spacing, large component gaps, page margins',
        },
        {
          category: 'Macro Spacing',
          range: '10 - 20',
          values: '80px - 160px',
          use: 'Major page sections, hero spacing, large breakpoints',
        },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '900px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Usage Guidelines'
          ),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
            guidelines.map((guideline) =>
              h(
                'div',
                {
                  key: guideline.category,
                  style: {
                    padding: '1.5rem',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                  },
                },
                [
                  h(
                    'div',
                    {
                      style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                      },
                    },
                    [
                      h(
                        'h3',
                        { style: { fontSize: '1.125rem', fontWeight: '600', color: '#111827' } },
                        guideline.category
                      ),
                      h('div', { style: { fontSize: '0.875rem', color: '#6b7280' } }, [
                        h('span', { style: { fontWeight: '500' } }, guideline.range),
                        h('span', { style: { marginLeft: '0.5rem' } }, `(${guideline.values})`),
                      ]),
                    ]
                  ),
                  h(
                    'p',
                    { style: { fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' } },
                    guideline.use
                  ),
                ]
              )
            )
          ),
          h(
            'div',
            {
              style: {
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '0.75rem',
              },
            },
            [
              h(
                'h3',
                {
                  style: {
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e40af',
                    marginBottom: '0.75rem',
                  },
                },
                'Pro Tips'
              ),
              h(
                'ul',
                {
                  style: {
                    fontSize: '0.875rem',
                    color: '#1e40af',
                    lineHeight: '1.75',
                    paddingLeft: '1.25rem',
                  },
                },
                [
                  h('li', {}, 'Use consistent spacing from the scale rather than arbitrary values'),
                  h(
                    'li',
                    {},
                    'Prefer rem units for better accessibility and user font size preferences'
                  ),
                  h('li', {}, 'Follow the 8-point grid system for visual rhythm'),
                  h('li', {}, 'Use larger spacing for important content groupings'),
                  h('li', {}, 'Maintain consistent spacing within similar component types'),
                ]
              ),
            ]
          ),
        ]);
    },
  }),
};
