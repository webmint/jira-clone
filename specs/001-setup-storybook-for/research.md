# Research: Storybook Setup for Design Preview

**Feature**: 001-setup-storybook-for
**Date**: 2025-10-05
**Researcher**: Architecture Agent

## Overview

This document contains research findings for setting up Storybook in the Jira Clone project to support the design subagent workflow.

## Research Questions

1. Which Storybook version and framework integration is best for Vue 3 + Vite?
2. What addons are essential for design preview, accessibility testing, and responsive design?
3. How to configure Storybook to work with Tailwind CSS 4.0?
4. What story format (CSF2 vs CSF3) should be used?
5. How to structure stories for maximum reusability?
6. What testing strategies work best with Storybook?

## Research Findings

### 1. Storybook Version & Framework Integration

**Decision**: Use Storybook 8.x with @storybook/vue3-vite

**Rationale**:

- Storybook 8 is the latest stable version with improved performance and Vue 3 support
- `@storybook/vue3-vite` provides native Vite integration, matching our existing build tool
- Vite builder offers faster HMR and build times compared to Webpack
- Official Vue 3 support with TypeScript

**Alternatives Considered**:

- Storybook 7: Older version, less performant
- Webpack builder: Slower build times, inconsistent with our Vite setup
- Historie.dev: Newer alternative but less mature ecosystem

**Installation Command**:

```bash
npx storybook@latest init --type vue3
```

### 2. Essential Storybook Addons

**Decision**: Install the following addons

**Core Addons** (included by default):

- `@storybook/addon-essentials`: Controls, docs, actions, viewport, backgrounds, toolbars
- `@storybook/addon-links`: Link stories together

**Additional Addons** (to install):

- `@storybook/addon-a11y`: Accessibility testing with axe-core (WCAG 2.1 AA compliance)
- `@storybook/addon-interactions`: Test user interactions within stories
- `@storybook/test-runner`: Run stories as tests in CI/CD
- `@storybook/addon-themes`: Theme switching for light/dark mode

**Rationale**:

- **addon-a11y**: Required for constitutional accessibility compliance (Article IX)
- **addon-interactions**: Enables testing interactive components (buttons, forms, modals)
- **test-runner**: Provides automated testing of stories for CI/CD integration
- **addon-themes**: Supports future dark mode implementation

**Alternatives Considered**:

- `@storybook/addon-viewport`: Included in essentials, provides responsive testing
- `storybook-addon-designs`: For Figma integration, not needed for AI-driven design workflow
- `chromatic`: Visual regression testing SaaS, overkill for current needs

### 3. Tailwind CSS 4.0 Configuration

**Decision**: Configure Storybook to import Tailwind styles via preview.ts

**Approach**:

1. Import main Tailwind CSS file in `.storybook/preview.ts`
2. Ensure Tailwind PostCSS plugins are available to Storybook
3. Use Vite's built-in PostCSS processing

**Configuration**:

```typescript
// .storybook/preview.ts
import '../src/assets/main.css'; // Contains Tailwind directives

export const parameters = {
  // ... other parameters
};
```

**Rationale**:

- Tailwind CSS 4.0 uses PostCSS which Vite handles natively
- Importing the main CSS file ensures all Tailwind utilities are available in stories
- No additional Tailwind plugin needed for Storybook 8 + Vite

**Alternatives Considered**:

- `@storybook/addon-postcss`: Not needed with Vite, which handles PostCSS automatically
- Inline Tailwind config in Storybook: Creates config duplication, maintenance burden

### 4. Story Format (CSF2 vs CSF3)

**Decision**: Use Component Story Format 3 (CSF3) with TypeScript

**Format**:

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import MyButton from './MyButton.vue';

const meta = {
  title: 'Components/MyButton',
  component: MyButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
};
```

**Rationale**:

- CSF3 is more concise and type-safe than CSF2
- Better TypeScript inference and autocomplete
- Recommended format for Storybook 7+ and 8+
- `satisfies` keyword provides type checking while preserving literal types

**Alternatives Considered**:

- CSF2: More verbose, less type-safe
- MDX format: Good for documentation-heavy stories, but adds complexity

### 5. Story Organization Structure

**Decision**: Co-locate stories with components, organize by atomic design hierarchy

**Structure**:

```
src/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.vue
│   │   ├── Button.stories.ts
│   │   └── Button.spec.ts
│   └── Input/
│       ├── Input.vue
│       ├── Input.stories.ts
│       └── Input.spec.ts
├── molecules/
│   └── FormField/
│       ├── FormField.vue
│       ├── FormField.stories.ts
│       └── FormField.spec.ts
└── organisms/
    └── IssueCard/
        ├── IssueCard.vue
        ├── IssueCard.stories.ts
        └── IssueCard.spec.ts
```

**Story Titles**:

- Atoms: `Atoms/Button`
- Molecules: `Molecules/FormField`
- Organisms: `Organisms/IssueCard`

**Rationale**:

- Co-location keeps related files together (component, story, test)
- Atomic design hierarchy matches the design system philosophy
- Clear navigation in Storybook sidebar
- Easy to find and maintain stories

**Alternatives Considered**:

- Separate `/stories` directory: Breaks co-location, harder to maintain
- Flat structure: Doesn't scale beyond 20-30 components
- Feature-based organization: Less clear for design system components

### 6. Testing Strategy with Storybook

**Decision**: Multi-layer testing approach

**Testing Layers**:

1. **Interaction Tests** (in stories): Test user interactions using `@storybook/addon-interactions` and `@storybook/test`
2. **Accessibility Tests** (automatic): `@storybook/addon-a11y` runs axe-core on every story
3. **Visual Regression** (future): Chromatic or Percy for visual diffs (not in MVP)
4. **Component Tests** (Vitest): Traditional unit tests remain in `*.spec.ts` files

**Example Interaction Test**:

```typescript
export const Clicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(button).toHaveClass('active');
  },
};
```

**Rationale**:

- Interaction tests validate component behavior in realistic scenarios
- Accessibility tests enforce WCAG 2.1 AA compliance automatically
- Test runner allows running stories as tests in CI/CD
- Complements existing Vitest unit tests without replacing them

**Alternatives Considered**:

- Pure Vitest testing: Doesn't provide visual preview
- Playwright component testing: Adds another tool, Storybook test runner sufficient
- Manual testing only: Not scalable, misses regressions

## Implementation Recommendations

### Development Workflow

1. **Design Agent** creates component story with all states/variants
2. Story is viewable immediately at `http://localhost:6006`
3. **Design Agent** iterates on design in story until approved
4. **Frontend Agent** references approved story during implementation
5. Both agents run `npm run storybook` during their work

### Scripts to Add

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook"
  }
}
```

### CI/CD Integration

- Run `npm run build-storybook` in CI to catch build errors
- Run `npm run test-storybook` to execute interaction tests
- Optionally deploy built Storybook to GitHub Pages or Netlify for design reviews

### Viewport Configuration

**Default Viewports** (mobile-first):

```typescript
export const parameters = {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: { width: '375px', height: '667px' },
      },
      tablet: {
        name: 'Tablet',
        styles: { width: '768px', height: '1024px' },
      },
      desktop: {
        name: 'Desktop',
        styles: { width: '1440px', height: '900px' },
      },
    },
    defaultViewport: 'mobile', // Mobile-first
  },
};
```

## Dependencies to Install

### Production Dependencies

None - Storybook is a development tool

### Development Dependencies

```json
{
  "@storybook/vue3": "^8.0.0",
  "@storybook/vue3-vite": "^8.0.0",
  "@storybook/addon-essentials": "^8.0.0",
  "@storybook/addon-interactions": "^8.0.0",
  "@storybook/addon-links": "^8.0.0",
  "@storybook/addon-a11y": "^8.0.0",
  "@storybook/addon-themes": "^8.0.0",
  "@storybook/test": "^8.0.0",
  "@storybook/test-runner": "^0.17.0",
  "storybook": "^8.0.0"
}
```

## Configuration Files Required

1. **`.storybook/main.ts`**: Core Storybook configuration
2. **`.storybook/preview.ts`**: Global decorators, parameters, Tailwind import
3. **`.storybook/manager.ts`**: Storybook UI customization (optional)
4. **`.storybook/test-runner.ts`**: Test runner configuration (optional)

## Performance Considerations

- **Build time**: Expected <2s for initial Storybook start with Vite
- **HMR**: <100ms component reload time
- **Story count**: Performant up to 500+ stories with lazy loading
- **Bundle size**: Storybook build ~3-5MB (dev tool, not production)

## Accessibility Standards

All stories will be automatically tested against WCAG 2.1 AA using `@storybook/addon-a11y`:

- Color contrast ratios
- ARIA attributes
- Keyboard navigation
- Semantic HTML
- Focus management

## Design Token Documentation

### Decision: Use storybook-design-token addon with MDX for design system documentation

**Addon**: `storybook-design-token` (v3 for Storybook 8, v4 for Storybook 9+)

**Installation**:

```bash
npm install --save-dev storybook-design-token
```

**Configuration** (.storybook/main.ts):

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  framework: '@storybook/vue3-vite',
  addons: ['@storybook/addon-essentials', 'storybook-design-token'],
};

export default config;
```

**Design Token Story Structure**:

Create MDX files for design system foundations:

```
src/design-system/
├── Colors.stories.mdx
├── Typography.stories.mdx
├── Spacing.stories.mdx
└── tokens/
    ├── colors.css
    ├── typography.css
    └── spacing.css
```

**Color Palette Example** (Colors.stories.mdx):

```mdx
import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';
import { DesignTokenDocBlock } from 'storybook-design-token';

<Meta title="Design System/Colors" />

# Color Palette

## Brand Colors

<ColorPalette>
  <ColorItem
    title="Primary"
    subtitle="Main brand color"
    colors={{
      'primary-50': '#eff6ff',
      'primary-100': '#dbeafe',
      'primary-500': '#3b82f6',
      'primary-900': '#1e3a8a',
    }}
  />
  <ColorItem
    title="Secondary"
    subtitle="Supporting colors"
    colors={{
      'secondary-50': '#fdf4ff',
      'secondary-500': '#a855f7',
      'secondary-900': '#581c87',
    }}
  />
</ColorPalette>

## Design Tokens

<DesignTokenDocBlock categoryName="Colors" viewType="card" />
```

**Typography Example** (Typography.stories.mdx):

```mdx
import { Meta, Typeset } from '@storybook/blocks';

<Meta title="Design System/Typography" />

# Typography Scale

<Typeset
  fontSizes={[12, 14, 16, 20, 24, 32, 40, 48]}
  fontWeight={400}
  sampleText="The quick brown fox jumps over the lazy dog"
  fontFamily="Inter, system-ui, sans-serif"
/>

## Font Weights

<Typeset
  fontSizes={[16]}
  fontWeight={[300, 400, 500, 600, 700]}
  sampleText="Different font weights"
  fontFamily="Inter, system-ui, sans-serif"
/>
```

**Spacing Scale Example** (Spacing.stories.mdx):

```mdx
import { Meta } from '@storybook/blocks';
import { DesignTokenDocBlock } from 'storybook-design-token';

<Meta title="Design System/Spacing" />

# Spacing Scale

<DesignTokenDocBlock categoryName="Spacing" viewType="table" />

## Usage

- Use consistent spacing values from the scale
- Follow 4px/8px grid system
- Mobile: 16px (1rem) base spacing
- Desktop: 24px (1.5rem) base spacing
```

**Annotating CSS for Design Tokens**:

```css
/**
 * @tokens Colors
 * @presenter Color
 */

:root {
  --color-primary-50: #eff6ff; /* @presenter Color */
  --color-primary-100: #dbeafe; /* @presenter Color */
  --color-primary-500: #3b82f6; /* @presenter Color */
  --color-primary-900: #1e3a8a; /* @presenter Color */
}

/**
 * @tokens Spacing
 * @presenter Spacing
 */

:root {
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
}

/**
 * @tokens Typography
 * @presenter FontSize
 */

:root {
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
}
```

**Rationale**:

- Centralizes design system documentation
- Auto-generates token documentation from CSS variables
- Provides visual reference for designers and developers
- Integrates with Tailwind CSS 4.0's CSS variable approach
- Supports theme switching and dark mode

**Tailwind CSS 4.0 Integration**:

Tailwind CSS 4.0 uses CSS variables natively, making it compatible with the design token workflow:

```typescript
// .storybook/preview.ts
import '../src/assets/main.css'; // Tailwind + design tokens
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    designToken: {
      // Configure which files to parse for design tokens
      parsers: {
        css: { files: ['src/design-system/tokens/*.css'] },
      },
    },
  },
};

export default preview;
```

## Visual Regression Testing

### Decision: Use Chromatic for visual regression testing (optional, not in MVP)

**Chromatic vs Percy Comparison (2025)**:

| Feature                   | Chromatic                           | Percy                            |
| ------------------------- | ----------------------------------- | -------------------------------- |
| **Best For**              | Component libraries, design systems | Full-page testing, E2E flows     |
| **Storybook Integration** | Native (by Storybook maintainers)   | Third-party plugin               |
| **Pricing**               | Free tier: 5,000 snapshots/month    | Free tier: 5,000 snapshots/month |
| **Browser Support**       | Chrome only (multiple viewports)    | Chrome, Firefox, Edge            |
| **Collaboration**         | Built-in design review tools        | Code review focused              |
| **Setup Complexity**      | Minimal (1 addon)                   | Moderate (SDK + config)          |

**Recommendation**: Use Chromatic for component-level visual regression testing when needed post-MVP.

**Chromatic Setup**:

1. Install Visual Tests Addon:

```bash
npm install --save-dev @chromatic-com/storybook
```

2. Configure in .storybook/main.ts:

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
};

export default config;
```

3. GitHub Actions CI Configuration (.github/workflows/chromatic.yml):

```yaml
name: Chromatic Visual Tests

on: push

jobs:
  chromatic:
    name: Run Chromatic
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

**Features**:

- Every story becomes a visual test automatically
- Detects pixel-perfect UI changes
- Built-in design review workflow
- Integrates with PR checks
- Real-time feedback in Storybook UI

**When to Use Visual Regression Testing**:

- Post-MVP when component library is stable
- Before major refactors to catch unintended changes
- When multiple developers work on UI components
- For critical user-facing components (login, checkout, etc.)

## Accessibility Testing Configuration

### Enhanced Accessibility Testing Setup

**Default Configuration** (.storybook/preview.ts):

```typescript
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error', // Fail tests when violations are found
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
          {
            id: 'label',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
```

**Per-Story Accessibility Configuration**:

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import MyButton from './MyButton.vue';

const meta = {
  component: MyButton,
  parameters: {
    a11y: {
      test: 'error', // Enforce accessibility
    },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Accessible button example
export const Primary: Story = {
  args: {
    label: 'Click me',
    ariaLabel: 'Primary action button',
  },
};

// Intentionally disabled for decorative elements
export const Decorative: Story = {
  parameters: {
    a11y: {
      test: 'off', // Disable for this story
    },
  },
};
```

**Automated Accessibility Testing in CI**:

The test runner includes accessibility tests when `@storybook/addon-a11y` is installed:

```json
{
  "scripts": {
    "test-storybook": "test-storybook",
    "test-storybook:ci": "test-storybook --url http://localhost:6006"
  }
}
```

**Accessibility Coverage**:

- WCAG 2.1 AA compliance (57% automated coverage)
- Color contrast validation
- ARIA attributes verification
- Keyboard navigation testing
- Semantic HTML validation
- Focus management checks

## Automated Testing Strategy (Extended)

### Test Runner Configuration

**Installation**:

```bash
npm install --save-dev @storybook/test-runner
```

**Configuration** (.storybook/test-runner.ts):

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postRender(page, context) {
    // Run accessibility tests
    const elementHandler = await page.$('#storybook-root');
    const innerHTML = await elementHandler?.innerHTML();
    expect(innerHTML).toBeTruthy();
  },
};

export default config;
```

**CI/CD Integration** (.github/workflows/test.yml):

```yaml
name: Storybook Tests

on: [push, pull_request]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook --quiet

      - name: Serve Storybook and run tests
        run: |
          npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
            "npx http-server storybook-static --port 6006 --silent" \
            "npx wait-on tcp:6006 && npm run test-storybook"
```

### Component Test Coverage

**Interaction Tests Example**:

```typescript
import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import LoginForm from './LoginForm.vue';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessfulLogin: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill in the form
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');

    // Submit the form
    await userEvent.click(canvas.getByRole('button', { name: /log in/i }));

    // Assert loading state
    await expect(canvas.getByText('Logging in...')).toBeInTheDocument();
  },
};

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Submit without filling
    await userEvent.click(canvas.getByRole('button', { name: /log in/i }));

    // Assert validation errors
    await expect(canvas.getByText('Email is required')).toBeInTheDocument();
    await expect(canvas.getByText('Password is required')).toBeInTheDocument();
  },
};
```

## Storybook Configuration Files (Complete)

### 1. Main Configuration (.storybook/main.ts)

```typescript
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta', // Better prop extraction for Vue 3
    },
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-design-token',
  ],
  docs: {
    autodocs: 'tag', // Generate docs for stories with 'autodocs' tag
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // Custom Vite config for Storybook
      resolve: {
        alias: {
          '@': '/src',
        },
      },
    });
  },
};

export default config;
```

### 2. Preview Configuration (.storybook/preview.ts)

```typescript
import { setup } from '@storybook/vue3';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/vue3';

// Import global styles (includes Tailwind)
import '../src/assets/main.css';

// Vue 3 global setup (plugins, directives, etc.)
setup((app) => {
  // Add global plugins here if needed
  // app.use(YourPlugin);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
      defaultViewport: 'mobile',
    },
    a11y: {
      test: 'error', // Fail accessibility tests by default
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-required-attr', enabled: true },
          { id: 'label', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
```

### 3. Manager Configuration (.storybook/manager.ts)

```typescript
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Jira Clone Design System',
    brandUrl: 'https://github.com/your-org/jira-clone',
    brandImage: '/logo.svg',
    brandTarget: '_self',
  }),
});
```

## Vue 3 Component Story Examples (Extended)

### Complex Component with Slots and Events

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import Modal from './Modal.vue';
import Button from '../Button/Button.vue';

const meta = {
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    onClose: { action: 'close' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Confirm Action',
    isOpen: true,
    size: 'md',
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #content>
          <p>Are you sure you want to proceed?</p>
        </template>
        <template #footer>
          <Button variant="ghost" @click="args.onClose">Cancel</Button>
          <Button variant="primary" @click="args.onClose">Confirm</Button>
        </template>
      </Modal>
    `,
  }),
};

export const WithForm: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const handleSubmit = () => {
        alert('Form submitted!');
      };
      return { args, handleSubmit };
    },
    template: `
      <Modal v-bind="args">
        <template #content>
          <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Enter name" />
          </form>
        </template>
        <template #footer>
          <Button variant="primary" @click="handleSubmit">Submit</Button>
        </template>
      </Modal>
    `,
  }),
};
```

## Performance Optimization

### Lazy Loading Stories

For large Storybook instances (100+ components), enable lazy loading:

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: [
    {
      directory: '../src/components',
      titlePrefix: 'Components',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
    },
  ],
  features: {
    storyStoreV7: true, // Enable lazy loading
  },
};
```

### Build Optimization

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['vue'],
            },
          },
        },
      },
    });
  },
};
```

**Expected Performance**:

- Initial dev server start: <2s
- HMR updates: <100ms
- Story isolation: <50ms
- Build time (100 stories): <30s

## Conclusion

Storybook 8 with Vue 3 + Vite provides an optimal solution for the design preview workflow. The recommended configuration:

- Supports all functional requirements from the spec
- Integrates seamlessly with existing tech stack (Vue 3, Vite, Tailwind CSS 4.0)
- Enables TDD workflow with interaction tests
- Enforces accessibility standards automatically (WCAG 2.1 AA)
- Scales to hundreds of components
- Provides excellent developer experience
- Supports design token documentation and visual testing
- Offers comprehensive automated testing capabilities

**Key Additions from Extended Research**:

- Design token documentation using storybook-design-token addon
- Visual regression testing with Chromatic (optional, post-MVP)
- Enhanced accessibility testing configuration
- Comprehensive automated testing strategy
- Complete configuration file examples
- Performance optimization guidelines
- Tailwind CSS 4.0 integration details

**All NEEDS CLARIFICATION items have been resolved.**

---

**References**:

- Storybook 8 Docs: https://storybook.js.org/docs
- Vue 3 Integration: https://storybook.js.org/docs/get-started/frameworks/vue3-vite
- CSF3 Format: https://storybook.js.org/docs/api/csf
- Accessibility Addon: https://storybook.js.org/addons/@storybook/addon-a11y
- Design Token Addon: https://storybook.js.org/addons/storybook-design-token
- Visual Tests Addon: https://www.chromatic.com/docs/visual-tests-addon/
- Test Runner: https://storybook.js.org/docs/writing-tests/integrations/test-runner
- Tailwind CSS Integration: https://storybook.js.org/recipes/tailwindcss
- Component Meta: https://storybook.js.org/docs/configure/integration/typescript
