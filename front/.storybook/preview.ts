import '../src/style.css';

import type { Preview, Decorator } from '@storybook/vue3';
import { h } from 'vue';

/**
 * Global toolbar controls for palette and mode switching
 * Allows preview of components in all 10 palette variations (5 palettes × 2 modes)
 */
export const globalTypes = {
  palette: {
    name: 'Palette',
    description: 'Color palette',
    defaultValue: 'corporate-trust',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'corporate-trust', title: 'Corporate Trust (Blue)' },
        { value: 'creative-energy', title: 'Creative Energy (Purple)' },
        { value: 'natural-harmony', title: 'Natural Harmony (Green)' },
        { value: 'warm-welcome', title: 'Warm Welcome (Orange)' },
        { value: 'minimalist', title: 'Minimalist (Gray)' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  mode: {
    name: 'Mode',
    description: 'Light or dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

/**
 * Custom theme decorator for 2-dimensional palette switching
 * Applies both palette and mode classes to story wrapper
 */
const withTheme: Decorator = (story, context) => {
  const palette = context.globals.palette || 'corporate-trust';
  const mode = context.globals.mode || 'light';

  return () =>
    h(
      'div',
      {
        class: `${palette} ${mode}`,
        style: { minHeight: '100vh', padding: '1rem' },
      },
      [h(story())]
    );
};

const preview: Preview = {
  globalTypes,
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
          type: 'desktop',
        },
      },
      defaultViewport: 'mobile',
    },
  },
  decorators: [withTheme],
};

export default preview;
