import '../src/style.css';
import '../src/designSystem/styles/tokens.css';

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

  // Apply palette and mode classes directly to document root for reactivity
  if (typeof document !== 'undefined') {
    const html = document.documentElement;

    // Remove all palette classes
    html.classList.remove('corporate-trust', 'creative-energy', 'natural-harmony', 'warm-welcome', 'minimalist');
    // Remove all mode classes
    html.classList.remove('light', 'dark');

    // Add current palette and mode
    html.classList.add(palette, mode);
  }

  return () =>
    h(
      'div',
      {
        style: {
          minHeight: '100vh',
          padding: '1rem',
        },
      },
      [h(story())]
    );
};

// Suppress harmless Storybook global state errors
// See: https://github.com/storybookjs/storybook/issues/20529
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('received storyRenderPhaseChanged but was unable to determine the source') ||
        message.includes('received storyFinished but was unable to determine the source'))
    ) {
      // Suppress these specific Storybook internal errors
      return;
    }
    originalError.apply(console, args);
  };
}

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
