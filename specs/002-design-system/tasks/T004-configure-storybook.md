# Task T004: Configure Storybook 8.x with Design Token Addon

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T003

## Description

Configure Storybook 8.x with design token addon for showcasing design tokens and theme switching capabilities. This establishes the documentation and visual testing infrastructure for the design system.

## Files to Create/Modify

- `.storybook/main.ts` - Storybook configuration with addons
- `.storybook/preview.ts` - Global decorators and theme configuration
- `.storybook/manager.ts` - Storybook UI customization (optional)

## Dependencies

**Blocks**: T005-T011 (token definitions can start after), T012-T016 (palette creation can start after), T026-T029 (Storybook stories require this configuration)
**Blocked By**: T003 (Tailwind CSS configuration must be complete)

## Acceptance Criteria

- [ ] Storybook 8.x starts without errors (`npm run storybook`)
- [ ] Design token addon installed and configured (storybook-design-token)
- [ ] Theme switching addon configured for light/dark mode testing
- [ ] Accessibility addon (a11y) configured for WCAG validation
- [ ] Global decorators apply design system styles to all stories
- [ ] Tailwind CSS 4.0 styles load correctly in Storybook
- [ ] Hot module replacement works for style changes
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors
- [ ] Storybook builds successfully

## Implementation Notes

**Required Addons**:

```bash
npm install --save-dev storybook-design-token @storybook/addon-a11y @storybook/addon-themes
```

**Main Configuration** (`.storybook/main.ts`):

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  framework: '@storybook/vue3-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook-design-token',
  ],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

**Preview Configuration** (`.storybook/preview.ts`):

```typescript
import type { Preview } from '@storybook/vue3';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/assets/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f1419' },
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

**Integration Points**:

- Import Tailwind CSS in preview.ts to ensure styles are available
- Configure theme decorator to add/remove `.dark` class on `<html>`
- Set up a11y addon with WCAG 2.1 AAA rules
- Configure design token addon to auto-discover CSS variables

## Testing Requirements

- [ ] Run `npm run storybook` and verify it starts on port 6006
- [ ] Verify theme switcher appears in Storybook toolbar
- [ ] Test switching between light and dark themes
- [ ] Verify a11y addon shows in Storybook panel
- [ ] Check that Tailwind utilities work in test stories
- [ ] Verify hot reload works when editing styles

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T004-configure-storybook`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
