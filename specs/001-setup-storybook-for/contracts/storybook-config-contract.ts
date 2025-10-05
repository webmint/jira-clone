/**
 * Storybook Configuration Contract
 *
 * This file defines the expected structure and types for Storybook configuration files.
 * It serves as a contract for what the setup should produce.
 */

/**
 * Main Storybook Configuration
 * Location: front/.storybook/main.ts
 */
export interface StorybookMainConfig {
  /** Stories glob patterns */
  stories: string[];

  /** Storybook addons */
  addons: string[];

  /** Framework configuration */
  framework: {
    name: '@storybook/vue3-vite';
    options: Record<string, unknown>;
  };

  /** Directories containing static assets */
  staticDirs?: string[];

  /** Documentation configuration */
  docs?: {
    autodocs: 'tag' | boolean;
  };

  /** TypeScript configuration */
  typescript?: {
    check: boolean;
    reactDocgen: false;
  };
}

/**
 * Preview Configuration
 * Location: front/.storybook/preview.ts
 */
export interface StorybookPreviewConfig {
  /** Global parameters for all stories */
  parameters: {
    /** Action event handlers */
    actions?: {
      argTypesRegex?: string;
    };

    /** Control types configuration */
    controls?: {
      matchers?: {
        color?: RegExp;
        date?: RegExp;
      };
    };

    /** Viewport configurations */
    viewport?: {
      viewports: Record<string, ViewportConfig>;
      defaultViewport?: string;
    };

    /** Background color options */
    backgrounds?: {
      default: string;
      values: Array<{
        name: string;
        value: string;
      }>;
    };
  };

  /** Global decorators */
  decorators?: Array<(story: () => unknown) => unknown>;

  /** Global types for toolbar */
  globalTypes?: Record<string, GlobalType>;
}

/**
 * Viewport Configuration
 */
export interface ViewportConfig {
  name: string;
  styles: {
    width: string;
    height: string;
  };
  type?: 'desktop' | 'mobile' | 'tablet';
}

/**
 * Global Type for Toolbar
 */
export interface GlobalType {
  description: string;
  defaultValue: string | number | boolean;
  toolbar: {
    title: string;
    icon?: string;
    items: Array<{
      value: string | number | boolean;
      title: string;
      icon?: string;
    }>;
    dynamicTitle?: boolean;
  };
}

/**
 * Component Story Meta
 * Used in *.stories.ts files
 */
export interface StoryMeta<TComponent> {
  /** Story title (appears in sidebar) */
  title: string;

  /** Vue component reference */
  component: TComponent;

  /** Tags for auto-docs and organization */
  tags?: string[];

  /** Arg type definitions for controls */
  argTypes?: Record<string, ArgType>;

  /** Default args for all stories */
  args?: Record<string, unknown>;

  /** Parameters override for this component */
  parameters?: Partial<StorybookPreviewConfig['parameters']>;

  /** Decorators specific to this component */
  decorators?: Array<(story: () => unknown) => unknown>;
}

/**
 * Arg Type Definition
 */
export interface ArgType {
  /** Control type */
  control?:
    | 'text'
    | 'number'
    | 'boolean'
    | 'color'
    | 'date'
    | 'select'
    | 'radio'
    | 'inline-radio'
    | 'check'
    | 'inline-check'
    | 'object'
    | 'array';

  /** Options for select/radio/check controls */
  options?: Array<string | number>;

  /** Description shown in docs */
  description?: string;

  /** Default value */
  defaultValue?: unknown;

  /** Table configuration */
  table?: {
    category?: string;
    defaultValue?: { summary: string };
    type?: { summary: string };
  };
}

/**
 * Individual Story
 */
export interface Story<TArgs = Record<string, unknown>> {
  /** Story arguments (props) */
  args?: TArgs;

  /** Story-specific parameters */
  parameters?: Partial<StorybookPreviewConfig['parameters']>;

  /** Interaction test using @storybook/test */
  play?: (context: PlayFunctionContext<TArgs>) => Promise<void>;

  /** Custom render function */
  render?: (args: TArgs) => unknown;
}

/**
 * Play Function Context
 */
export interface PlayFunctionContext<TArgs = Record<string, unknown>> {
  args: TArgs;
  canvasElement: HTMLElement;
  step: (name: string, fn: () => Promise<void>) => Promise<void>;
}

/**
 * Required Addons
 * These must be installed for the feature to work correctly
 */
export const REQUIRED_ADDONS = [
  '@storybook/addon-essentials', // Controls, docs, actions, viewport, backgrounds
  '@storybook/addon-links', // Link stories together
  '@storybook/addon-a11y', // Accessibility testing (WCAG 2.1 AA)
  '@storybook/addon-interactions', // Interaction testing
  '@storybook/addon-themes', // Theme switching support
] as const;

/**
 * Required Dev Dependencies
 */
export const REQUIRED_DEV_DEPENDENCIES = [
  '@storybook/vue3',
  '@storybook/vue3-vite',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-links',
  '@storybook/addon-a11y',
  '@storybook/addon-themes',
  '@storybook/test',
  '@storybook/test-runner',
  'storybook',
] as const;

/**
 * Expected Viewport Configurations
 */
export const EXPECTED_VIEWPORTS: Record<string, ViewportConfig> = {
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
};

/**
 * Story Naming Conventions
 */
export const STORY_NAMING = {
  /** File naming pattern */
  filePattern: '*.stories.ts',

  /** Component folder structure */
  folders: ['atoms', 'molecules', 'organisms'],

  /** Title format by folder */
  titleFormat: {
    atoms: 'Atoms/ComponentName',
    molecules: 'Molecules/ComponentName',
    organisms: 'Organisms/ComponentName',
  },

  /** Required tags */
  requiredTags: ['autodocs'],
} as const;

/**
 * Accessibility Testing Requirements
 */
export const ACCESSIBILITY_REQUIREMENTS = {
  /** Minimum color contrast ratio */
  contrastRatio: 4.5,

  /** Required WCAG level */
  wcagLevel: 'AA' as const,

  /** Required axe-core rules */
  rules: [
    'color-contrast',
    'label',
    'button-name',
    'link-name',
    'aria-valid-attr',
    'aria-required-attr',
    'keyboard-navigable',
  ],
} as const;

/**
 * Performance Budgets for Storybook
 */
export const PERFORMANCE_BUDGETS = {
  /** Initial build time (ms) */
  initialBuild: 2000,

  /** Story load time (ms) */
  storyLoad: 500,

  /** HMR update time (ms) */
  hmrUpdate: 100,

  /** Frame rate for interactions */
  fps: 60,
} as const;

/**
 * Validation: Check if Storybook is properly configured
 */
export interface StorybookValidation {
  /** Are required addons installed? */
  addonsInstalled: boolean;

  /** Is main.ts configured correctly? */
  mainConfigValid: boolean;

  /** Is preview.ts configured correctly? */
  previewConfigValid: boolean;

  /** Are viewports configured? */
  viewportsConfigured: boolean;

  /** Is Tailwind CSS imported? */
  tailwindImported: boolean;

  /** Is accessibility addon active? */
  a11yAddonActive: boolean;

  /** Error messages if validation fails */
  errors: string[];
}
