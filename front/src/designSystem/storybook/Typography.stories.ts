import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

/**
 * # Typography System
 *
 * Comprehensive typography system using Roboto font family with multiple weights,
 * sizes, line heights, and letter spacing options.
 *
 * ## Font Family
 *
 * - **Primary**: Roboto (sans-serif) for all UI text
 * - **Monospace**: Roboto Mono for code and technical content
 *
 * ## Font Weights
 *
 * Roboto supports 6 weights: Thin (100), Light (300), Regular (400), Medium (500), Bold (700), Black (900)
 */
const meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography system with Roboto font family, multiple weights, sizes, and responsive line heights.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Font Family Showcase
 *
 * Display of primary (Roboto) and monospace (Roboto Mono) font families.
 */
export const FontFamilies: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Font Families'
          ),
          h(
            'div',
            {
              style: {
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
              },
            },
            [
              h(
                'div',
                {
                  style: {
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                  },
                },
                'Primary Font Family'
              ),
              h(
                'p',
                {
                  style: {
                    fontFamily:
                      "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: '1.25rem',
                    color: '#111827',
                  },
                },
                'Roboto: The quick brown fox jumps over the lazy dog'
              ),
              h(
                'p',
                {
                  style: {
                    fontFamily:
                      "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginTop: '0.5rem',
                  },
                },
                "Font: 'Roboto', sans-serif"
              ),
            ]
          ),
          h(
            'div',
            {
              style: {
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
              },
            },
            [
              h(
                'div',
                {
                  style: {
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                  },
                },
                'Monospace Font Family'
              ),
              h(
                'p',
                {
                  style: {
                    fontFamily: "'Roboto Mono', 'Courier New', monospace",
                    fontSize: '1.125rem',
                    color: '#111827',
                  },
                },
                'Roboto Mono: const example = "code";'
              ),
              h(
                'p',
                {
                  style: {
                    fontFamily: "'Roboto Mono', 'Courier New', monospace",
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginTop: '0.5rem',
                  },
                },
                "Font: 'Roboto Mono', monospace"
              ),
            ]
          ),
        ]);
    },
  }),
};

/**
 * ## Font Weights
 *
 * All available font weights from Roboto (100 to 900).
 */
export const FontWeights: Story = {
  render: () => ({
    setup() {
      const weights = [
        { name: 'Thin', value: 100, token: 'FONT_WEIGHT.THIN' },
        { name: 'Light', value: 300, token: 'FONT_WEIGHT.LIGHT' },
        { name: 'Regular', value: 400, token: 'FONT_WEIGHT.REGULAR' },
        { name: 'Medium', value: 500, token: 'FONT_WEIGHT.MEDIUM' },
        { name: 'Bold', value: 700, token: 'FONT_WEIGHT.BOLD' },
        { name: 'Black', value: 900, token: 'FONT_WEIGHT.BLACK' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Font Weights'
          ),
          ...weights.map((weight) =>
            h(
              'div',
              {
                key: weight.value,
                style: {
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                },
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    },
                  },
                  [
                    h(
                      'span',
                      { style: { fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' } },
                      weight.name
                    ),
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
                        },
                      },
                      weight.token
                    ),
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: weight.value.toString(),
                      color: '#111827',
                    },
                  },
                  `The quick brown fox jumps over the lazy dog (${weight.value})`
                ),
              ]
            )
          ),
        ]);
    },
  }),
};

/**
 * ## Font Sizes
 *
 * Complete font size scale from XS (0.75rem) to 4XL (3rem).
 */
export const FontSizes: Story = {
  render: () => ({
    setup() {
      const sizes = [
        { name: 'XS', value: '0.75rem', token: 'FONT_SIZE.XS', px: '12px' },
        { name: 'SM', value: '0.875rem', token: 'FONT_SIZE.SM', px: '14px' },
        { name: 'BASE', value: '1rem', token: 'FONT_SIZE.BASE', px: '16px' },
        { name: 'MD', value: '1.125rem', token: 'FONT_SIZE.MD', px: '18px' },
        { name: 'LG', value: '1.25rem', token: 'FONT_SIZE.LG', px: '20px' },
        { name: 'XL', value: '1.5rem', token: 'FONT_SIZE.XL', px: '24px' },
        { name: '2XL', value: '1.875rem', token: 'FONT_SIZE.2XL', px: '30px' },
        { name: '3XL', value: '2.25rem', token: 'FONT_SIZE.3XL', px: '36px' },
        { name: '4XL', value: '3rem', token: 'FONT_SIZE.4XL', px: '48px' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Font Sizes'
          ),
          ...sizes.map((size) =>
            h(
              'div',
              {
                key: size.name,
                style: {
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                },
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    },
                  },
                  [
                    h('div', { style: { display: 'flex', gap: '0.75rem', alignItems: 'center' } }, [
                      h(
                        'span',
                        { style: { fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' } },
                        size.name
                      ),
                      h(
                        'span',
                        { style: { fontSize: '0.75rem', color: '#9ca3af' } },
                        `${size.value} / ${size.px}`
                      ),
                    ]),
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
                        },
                      },
                      size.token
                    ),
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: size.value,
                      color: '#111827',
                    },
                  },
                  'The quick brown fox jumps'
                ),
              ]
            )
          ),
        ]);
    },
  }),
};

/**
 * ## Line Heights
 *
 * Four line height options for different content types.
 */
export const LineHeights: Story = {
  render: () => ({
    setup() {
      const lineHeights = [
        { name: 'Tight', value: 1.25, token: 'LINE_HEIGHT.TIGHT', use: 'Headings' },
        { name: 'Normal', value: 1.5, token: 'LINE_HEIGHT.NORMAL', use: 'Body text' },
        { name: 'Relaxed', value: 1.75, token: 'LINE_HEIGHT.RELAXED', use: 'Long-form content' },
        { name: 'Loose', value: 2, token: 'LINE_HEIGHT.LOOSE', use: 'Poetry, code' },
      ];

      const sampleText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.';

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Line Heights'
          ),
          ...lineHeights.map((lh) =>
            h(
              'div',
              {
                key: lh.name,
                style: {
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                },
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    },
                  },
                  [
                    h('div', {}, [
                      h(
                        'div',
                        { style: { fontSize: '0.875rem', color: '#111827', fontWeight: '500' } },
                        lh.name
                      ),
                      h(
                        'div',
                        { style: { fontSize: '0.75rem', color: '#9ca3af' } },
                        `${lh.value} • ${lh.use}`
                      ),
                    ]),
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
                        },
                      },
                      lh.token
                    ),
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: '1rem',
                      lineHeight: lh.value.toString(),
                      color: '#111827',
                    },
                  },
                  sampleText
                ),
              ]
            )
          ),
        ]);
    },
  }),
};

/**
 * ## Letter Spacing
 *
 * Four letter spacing options for fine-tuning text appearance.
 */
export const LetterSpacing: Story = {
  render: () => ({
    setup() {
      const spacings = [
        { name: 'Tight', value: '-0.025em', token: 'LETTER_SPACING.TIGHT', use: 'Large headings' },
        { name: 'Normal', value: '0em', token: 'LETTER_SPACING.NORMAL', use: 'Body text' },
        { name: 'Wide', value: '0.025em', token: 'LETTER_SPACING.WIDE', use: 'Buttons, labels' },
        { name: 'Wider', value: '0.05em', token: 'LETTER_SPACING.WIDER', use: 'All caps text' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Letter Spacing'
          ),
          ...spacings.map((spacing) =>
            h(
              'div',
              {
                key: spacing.name,
                style: {
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                },
              },
              [
                h(
                  'div',
                  {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    },
                  },
                  [
                    h('div', {}, [
                      h(
                        'div',
                        { style: { fontSize: '0.875rem', color: '#111827', fontWeight: '500' } },
                        spacing.name
                      ),
                      h(
                        'div',
                        { style: { fontSize: '0.75rem', color: '#9ca3af' } },
                        `${spacing.value} • ${spacing.use}`
                      ),
                    ]),
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
                        },
                      },
                      spacing.token
                    ),
                  ]
                ),
                h(
                  'p',
                  {
                    style: {
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: '1.125rem',
                      letterSpacing: spacing.value,
                      color: '#111827',
                    },
                  },
                  'The quick brown fox jumps over the lazy dog'
                ),
              ]
            )
          ),
        ]);
    },
  }),
};

/**
 * ## Typography Scale Examples
 *
 * Real-world examples of typography combinations for common UI patterns.
 */
export const TypographyScale: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h(
            'h2',
            { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } },
            'Typography Scale'
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
                'h1',
                {
                  style: {
                    fontSize: '3rem',
                    fontWeight: '700',
                    lineHeight: '1.25',
                    marginBottom: '1rem',
                  },
                },
                'Page Heading (4XL Bold)'
              ),
              h(
                'h2',
                {
                  style: {
                    fontSize: '2.25rem',
                    fontWeight: '600',
                    lineHeight: '1.25',
                    marginBottom: '1rem',
                  },
                },
                'Section Heading (3XL Semibold)'
              ),
              h(
                'h3',
                {
                  style: {
                    fontSize: '1.875rem',
                    fontWeight: '600',
                    lineHeight: '1.25',
                    marginBottom: '1rem',
                  },
                },
                'Subsection Heading (2XL Semibold)'
              ),
              h(
                'h4',
                {
                  style: {
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    lineHeight: '1.25',
                    marginBottom: '1rem',
                  },
                },
                'Card Heading (XL Medium)'
              ),
              h(
                'p',
                {
                  style: {
                    fontSize: '1rem',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: '#374151',
                    marginBottom: '1rem',
                  },
                },
                'Body text (BASE Regular): Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              ),
              h(
                'p',
                {
                  style: {
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: '#6b7280',
                  },
                },
                'Secondary text (SM Regular): Supporting information or metadata goes here.'
              ),
            ]
          ),
        ]);
    },
  }),
};
