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

## Conclusion

Storybook 8 with Vue 3 + Vite provides an optimal solution for the design preview workflow. The recommended configuration:

- Supports all functional requirements from the spec
- Integrates seamlessly with existing tech stack
- Enables TDD workflow with interaction tests
- Enforces accessibility standards automatically
- Scales to hundreds of components
- Provides excellent developer experience

**All NEEDS CLARIFICATION items have been resolved.**

---

**References**:

- Storybook 8 Docs: https://storybook.js.org/docs
- Vue 3 Integration: https://storybook.js.org/docs/vue/get-started/introduction
- CSF3 Format: https://storybook.js.org/docs/api/csf
- Accessibility Addon: https://storybook.js.org/addons/@storybook/addon-a11y
