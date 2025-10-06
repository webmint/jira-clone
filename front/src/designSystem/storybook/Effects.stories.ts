import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';

/**
 * # Effects System
 *
 * Visual effects including Z-Index (layering), Opacity (transparency), and Transitions (animations).
 * These properties work together to create polished, interactive interfaces.
 *
 * ## Categories
 *
 * - **Z-Index**: Stacking order for overlapping elements
 * - **Opacity**: Transparency levels
 * - **Transitions**: Animation timing and easing
 */
const meta = {
  title: 'Design System/Effects',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Visual effects system for layering, transparency, and smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Z-Index Scale
 *
 * Stacking order system for overlapping elements.
 */
export const ZIndexScale: Story = {
  render: () => ({
    setup() {
      const zIndices = [
        { name: 'HIDE', value: -1, token: 'Z_INDEX.HIDE', use: 'Hidden behind' },
        { name: 'BASE', value: 0, token: 'Z_INDEX.BASE', use: 'Base layer' },
        { name: 'DROPDOWN', value: 10, token: 'Z_INDEX.DROPDOWN', use: 'Dropdowns' },
        { name: 'STICKY', value: 20, token: 'Z_INDEX.STICKY', use: 'Sticky headers' },
        { name: 'FIXED', value: 30, token: 'Z_INDEX.FIXED', use: 'Fixed elements' },
        { name: 'MODAL_BACKDROP', value: 40, token: 'Z_INDEX.MODAL_BACKDROP', use: 'Modal overlays' },
        { name: 'MODAL', value: 50, token: 'Z_INDEX.MODAL', use: 'Modal dialogs' },
        { name: 'POPOVER', value: 60, token: 'Z_INDEX.POPOVER', use: 'Popovers' },
        { name: 'TOOLTIP', value: 70, token: 'Z_INDEX.TOOLTIP', use: 'Tooltips' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Z-Index Scale'),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
            zIndices.map((z) =>
              h(
                'div',
                {
                  key: z.name,
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                  },
                },
                [
                  h(
                    'div',
                    { style: { minWidth: '180px' } },
                    [
                      h('div', { style: { fontSize: '0.875rem', fontWeight: '600', color: '#111827' } }, z.name),
                      h('div', { style: { fontSize: '0.75rem', color: '#6b7280' } }, z.use),
                    ],
                  ),
                  h(
                    'div',
                    {
                      style: {
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                      },
                    },
                    z.value.toString(),
                  ),
                  h(
                    'code',
                    {
                      style: {
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                        marginLeft: 'auto',
                      },
                    },
                    z.token,
                  ),
                ],
              ),
            ),
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
                { style: { fontSize: '1rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.75rem' } },
                'Stacking Order',
              ),
              h(
                'p',
                { style: { fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' } },
                'Z-index values are spaced by 10 to allow for intermediate values when needed. Always use defined tokens rather than arbitrary values.',
              ),
            ],
          ),
        ]);
    },
  }),
};

/**
 * ## Z-Index Visual Demo
 *
 * Interactive demonstration of element stacking.
 */
export const ZIndexDemo: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '800px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Z-Index Stacking'),
          h(
            'div',
            {
              style: {
                position: 'relative',
                height: '300px',
                padding: '2rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
              },
            },
            [
              h('div', {
                style: {
                  position: 'absolute',
                  top: '40px',
                  left: '40px',
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#ef4444',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '600',
                  zIndex: 0,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
              }, 'z-index: 0'),
              h('div', {
                style: {
                  position: 'absolute',
                  top: '80px',
                  left: '100px',
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '600',
                  zIndex: 10,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
              }, 'z-index: 10'),
              h('div', {
                style: {
                  position: 'absolute',
                  top: '120px',
                  left: '160px',
                  width: '180px',
                  height: '180px',
                  backgroundColor: '#10b981',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '600',
                  zIndex: 20,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
              }, 'z-index: 20'),
            ],
          ),
        ]);
    },
  }),
};

/**
 * ## Opacity Scale
 *
 * Transparency levels from fully transparent to fully opaque.
 */
export const OpacityScale: Story = {
  render: () => ({
    setup() {
      const opacities = [
        { name: '0', value: 0, token: 'OPACITY["0"]', use: 'Invisible' },
        { name: '5', value: 0.05, token: 'OPACITY["5"]', use: 'Subtle tint' },
        { name: '10', value: 0.1, token: 'OPACITY["10"]', use: 'Very light' },
        { name: '20', value: 0.2, token: 'OPACITY["20"]', use: 'Light' },
        { name: '30', value: 0.3, token: 'OPACITY["30"]', use: 'Disabled state' },
        { name: '50', value: 0.5, token: 'OPACITY["50"]', use: 'Overlay' },
        { name: '60', value: 0.6, token: 'OPACITY["60"]', use: 'Hover overlay' },
        { name: '75', value: 0.75, token: 'OPACITY["75"]', use: 'Frosted glass' },
        { name: '90', value: 0.9, token: 'OPACITY["90"]', use: 'Nearly opaque' },
        { name: '100', value: 1, token: 'OPACITY["100"]', use: 'Fully opaque' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Opacity Scale'),
          h(
            'div',
            {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '1.5rem',
                padding: '2rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
              },
            },
            opacities.map((opacity) =>
              h(
                'div',
                {
                  key: opacity.name,
                  style: {
                    textAlign: 'center',
                  },
                },
                [
                  h('div', {
                    style: {
                      width: '100px',
                      height: '100px',
                      margin: '0 auto 0.75rem',
                      backgroundColor: '#3b82f6',
                      borderRadius: '0.5rem',
                      opacity: opacity.value.toString(),
                    },
                  }),
                  h('div', { style: { fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' } }, opacity.name),
                  h('div', { style: { fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' } }, opacity.use),
                  h(
                    'code',
                    {
                      style: {
                        fontSize: '0.65rem',
                        color: '#6b7280',
                        fontFamily: "'Roboto Mono', monospace",
                      },
                    },
                    opacity.token,
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
 * ## Transition Timing
 *
 * Animation duration and easing functions.
 */
export const TransitionTiming: Story = {
  render: () => ({
    setup() {
      const durations = [
        { name: 'INSTANT', value: '0ms', token: 'TRANSITION_DURATION.INSTANT' },
        { name: 'FAST', value: '150ms', token: 'TRANSITION_DURATION.FAST' },
        { name: 'BASE', value: '200ms', token: 'TRANSITION_DURATION.BASE' },
        { name: 'MEDIUM', value: '300ms', token: 'TRANSITION_DURATION.MEDIUM' },
        { name: 'SLOW', value: '500ms', token: 'TRANSITION_DURATION.SLOW' },
      ];

      const easings = [
        { name: 'LINEAR', value: 'linear', token: 'TRANSITION_TIMING.LINEAR' },
        { name: 'EASE_IN', value: 'cubic-bezier(0.4, 0, 1, 1)', token: 'TRANSITION_TIMING.EASE_IN' },
        { name: 'EASE_OUT', value: 'cubic-bezier(0, 0, 0.2, 1)', token: 'TRANSITION_TIMING.EASE_OUT' },
        { name: 'EASE_IN_OUT', value: 'cubic-bezier(0.4, 0, 0.2, 1)', token: 'TRANSITION_TIMING.EASE_IN_OUT' },
        { name: 'EASE', value: 'ease', token: 'TRANSITION_TIMING.EASE' },
      ];

      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '1000px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Transition Timing'),

          h('h3', { style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' } }, 'Duration'),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' } },
            durations.map((duration) =>
              h(
                'div',
                {
                  key: duration.name,
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      },
                    },
                    [
                      h(
                        'div',
                        {},
                        [
                          h('div', { style: { fontSize: '0.875rem', fontWeight: '600' } }, duration.name),
                          h('div', { style: { fontSize: '0.75rem', color: '#6b7280' } }, duration.value),
                        ],
                      ),
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            fontFamily: "'Roboto Mono', monospace",
                          },
                        },
                        duration.token,
                      ),
                    ],
                  ),
                  h(
                    'div',
                    {
                      style: {
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '0.5rem',
                        transition: `transform ${duration.value} ease-out`,
                        cursor: 'pointer',
                      },
                      onMouseenter: (e: MouseEvent) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(200px)';
                      },
                      onMouseleave: (e: MouseEvent) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                      },
                    },
                  ),
                ],
              ),
            ),
          ),

          h('h3', { style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' } }, 'Easing Functions'),
          h(
            'div',
            { style: { display: 'flex', flexDirection: 'column', gap: '1rem' } },
            easings.map((easing) =>
              h(
                'div',
                {
                  key: easing.name,
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                      },
                    },
                    [
                      h('div', { style: { fontSize: '0.875rem', fontWeight: '600' } }, easing.name),
                      h(
                        'code',
                        {
                          style: {
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            fontFamily: "'Roboto Mono', monospace",
                          },
                        },
                        easing.token,
                      ),
                    ],
                  ),
                  h(
                    'div',
                    {
                      style: {
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '0.5rem',
                        transition: `transform 300ms ${easing.value}`,
                        cursor: 'pointer',
                      },
                      onMouseenter: (e: MouseEvent) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(200px)';
                      },
                      onMouseleave: (e: MouseEvent) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                      },
                    },
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
 * ## Combined Effects
 *
 * Multiple effects working together in a real component.
 */
export const CombinedEffects: Story = {
  render: () => ({
    setup() {
      return () =>
        h('div', { style: { padding: '2rem', maxWidth: '600px' } }, [
          h('h2', { style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' } }, 'Combined Effects'),
          h(
            'div',
            {
              style: {
                position: 'relative',
                padding: '2rem',
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                transition: 'all 200ms cubic-bezier(0, 0, 0.2, 1)',
                cursor: 'pointer',
                zIndex: 10,
              },
              onMouseenter: (e: MouseEvent) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)';
              },
              onMouseleave: (e: MouseEvent) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
              },
            },
            [
              h('h3', { style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' } }, 'Interactive Card'),
              h(
                'p',
                { style: { fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' } },
                'Hover to see shadow elevation, transform, and smooth transitions working together.',
              ),
            ],
          ),
          h(
            'div',
            {
              style: {
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280',
              },
            },
            [
              h('div', { style: { fontWeight: '500', marginBottom: '0.5rem' } }, 'Effects used:'),
              h('ul', { style: { listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.75' } }, [
                h('li', {}, 'Shadow: BASE → LG on hover'),
                h('li', {}, 'Transform: translateY(-4px)'),
                h('li', {}, 'Transition: 200ms ease-out'),
                h('li', {}, 'Z-Index: DROPDOWN (10)'),
              ]),
            ],
          ),
        ]);
    },
  }),
};
