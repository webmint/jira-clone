# Jira Clone Frontend

Vue 3 + TypeScript + Vite + Tailwind CSS frontend for the Jira Clone project.

## Tech Stack

- **Framework**: Vue 3.5 with `<script setup>` SFC format
- **Language**: TypeScript 5.2+ (strict mode)
- **Build Tool**: Vite 7.x
- **Styling**: Tailwind CSS 4.0
- **Component Development**: Storybook 8.x
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint (Airbnb config) + Prettier

## Quick Start

### Development Server

```bash
npm run dev
```

Runs the application at `http://localhost:5173`

### Storybook (Component Development)

```bash
npm run storybook
```

Runs Storybook at `http://localhost:6006` for component development and preview.

### Build

```bash
npm run build
```

Builds the application for production in `dist/`.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally.

## Storybook Usage Guide

Storybook is our primary tool for component development, design preview, and documentation. All UI components should have corresponding stories.

### Why Storybook?

- **Design-First Workflow**: Design agents create component previews before implementation
- **Isolated Development**: Develop components in isolation without running the full app
- **Automated Accessibility**: WCAG 2.1 AA compliance testing with axe-core
- **Interactive Testing**: Test user interactions within stories
- **Living Documentation**: Stories serve as executable component documentation
- **Responsive Design**: Test components across mobile, tablet, and desktop viewports

See [ADR 001: Storybook Adoption](../docs/adr/001-storybook-adoption.md) for architectural decision details.

### Running Storybook

Start the Storybook dev server:

```bash
npm run storybook
```

Build Storybook for static deployment:

```bash
npm run build-storybook
```

Run Storybook tests (interaction and accessibility):

```bash
npm run test-storybook
```

### Creating Stories

Stories are co-located with components following atomic design hierarchy:

```
src/components/
├── atoms/Button/
│   ├── Button.vue          # Component implementation
│   ├── Button.stories.ts   # Storybook stories
│   └── Button.spec.ts      # Unit tests
```

### Story File Structure (CSF3 Format)

Use Component Story Format 3 (CSF3) with TypeScript:

```typescript
import type { Meta, StoryObj } from '@storybook/vue3';
import MyButton from './MyButton.vue';

// 1. Define meta with component reference and configuration
const meta = {
  title: 'Atoms/MyButton', // Sidebar navigation path
  component: MyButton,
  tags: ['autodocs'], // Enable automatic documentation generation
  argTypes: {
    // Define controls for props
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 2. Export story variants
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    variant: 'primary',
    loading: true,
  },
};
```

### Story Naming Conventions

**Title Format**: `{Category}/{ComponentName}`

Categories follow atomic design:

- `Atoms/*` - Basic building blocks (Button, Input, Badge, Avatar)
- `Molecules/*` - Combinations of atoms (FormField, SearchBar, Card)
- `Organisms/*` - Complex UI sections (IssueCard, KanbanColumn, Modal)
- `Pages/*` - Full page compositions (optional, for complex layouts)

**Story Export Names**: PascalCase describing the variant or state

- Good: `Primary`, `Secondary`, `Disabled`, `Loading`, `WithIcon`
- Avoid: `story1`, `test`, `example`

### Documenting Components

Enable auto-documentation with the `autodocs` tag:

```typescript
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'], // ← Generates docs automatically
  // ...
} satisfies Meta<typeof Button>;
```

Add JSDoc comments to your component props for better documentation:

```vue
<script setup lang="ts">
interface Props {
  /** Button label text */
  label: string;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Size variation */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
}

defineProps<Props>();
</script>
```

### Testing Component Interactions

Add interaction tests using `@storybook/test`:

```typescript
import { within, userEvent, expect } from '@storybook/test';

export const Clicked: Story = {
  args: {
    label: 'Click Me',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test click interaction
    await userEvent.click(button);
    await expect(button).toHaveClass('active');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};
```

### Accessibility Testing

All stories are automatically tested for WCAG 2.1 AA compliance using the `@storybook/addon-a11y`.

**View accessibility results**:

1. Open story in Storybook
2. Click "Accessibility" tab in the bottom panel
3. Review violations and passes

**Common accessibility checks**:

- Color contrast ≥ 4.5:1
- ARIA labels present
- Keyboard navigation functional
- Semantic HTML usage
- Focus indicators visible

### Responsive Design Testing

Use viewport toolbar to test responsive behavior:

1. Open story in Storybook
2. Click viewport dropdown in top toolbar
3. Select viewport:
   - **Mobile**: 375px × 667px (default - mobile-first)
   - **Tablet**: 768px × 1024px
   - **Desktop**: 1440px × 900px

Stories default to mobile viewport (mobile-first approach).

### Best Practices

#### 1. Create Stories for All Component States

Each component should demonstrate:

- ✅ All variants (primary, secondary, danger, etc.)
- ✅ All sizes (small, medium, large)
- ✅ Interactive states (hover, active, focus, disabled)
- ✅ Data states (loading, error, empty, success)
- ✅ Edge cases (long text, no data, etc.)

#### 2. Use Realistic Data

Avoid placeholder text like "Lorem ipsum". Use realistic content:

```typescript
// ❌ Bad
export const Default: Story = {
  args: {
    title: 'Lorem ipsum',
    description: 'Dolor sit amet',
  },
};

// ✅ Good
export const Default: Story = {
  args: {
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication with Firebase',
  },
};
```

#### 3. Test Interactions

Add `play` functions to test user interactions:

```typescript
export const WithInteraction: Story = {
  args: {
    /* ... */
  },
  play: async ({ canvasElement }) => {
    // Test interactions here
  },
};
```

#### 4. Keep Stories Simple

Each story should demonstrate one specific variant or state:

```typescript
// ✅ Good - focused stories
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Disabled: Story = { args: { disabled: true } };

// ❌ Bad - too many states in one story
export const AllVariants: Story = {
  render: () => ({
    // Don't create "kitchen sink" stories
  }),
};
```

#### 5. Co-locate Stories with Components

Always place story files next to component files:

```
✅ src/components/atoms/Button/Button.stories.ts
❌ src/stories/button.stories.ts
```

### Troubleshooting

#### Story Not Appearing in Storybook

**Check**:

- File naming: Must be `*.stories.ts` or `*.stories.tsx`
- File location: Must be under `src/`
- Default export: Must export meta object
- Glob pattern: Verify `main.ts` stories array includes your path

#### Tailwind Styles Not Working

**Check**:

- CSS import in `.storybook/preview.ts`
- Tailwind config includes Storybook files
- Vite PostCSS plugin configured

#### Accessibility Tab Empty

**Check**:

- `@storybook/addon-a11y` installed
- Addon listed in `.storybook/main.ts`
- Tab visible in bottom panel

#### Hot Module Replacement (HMR) Slow

**Check**:

- Vite cache: Delete `node_modules/.vite` and restart
- Story count: Consider lazy loading for 200+ stories
- File watchers: Ensure file watcher limits aren't exceeded

### Workflow Integration

#### Design Agent Workflow

1. Create component in appropriate folder (`atoms/`, `molecules/`, `organisms/`)
2. Create story file with all visual states and variants
3. Run `npm run storybook`
4. Iterate on component design in Storybook
5. Share Storybook URL for design review
6. After approval, hand off to frontend agent for integration

#### Frontend Agent Workflow

1. Review approved component story
2. Reference story for implementation details
3. Implement component integration in application
4. Update story if API changes
5. Add interaction tests to story
6. Verify accessibility tests pass

### CI/CD Integration

Storybook tests run automatically in CI/CD pipeline:

```bash
# Build Storybook
npm run build-storybook

# Run interaction and accessibility tests
npm run test-storybook
```

Tests must pass before PR can be merged.

### Learn More

- [Storybook 8 Documentation](https://storybook.js.org/docs)
- [Component Story Format 3.0](https://storybook.js.org/docs/api/csf)
- [Storybook Vue Integration](https://storybook.js.org/docs/vue/get-started/introduction)
- [Interaction Testing](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [ADR 001: Storybook Adoption](../docs/adr/001-storybook-adoption.md)

## Project Structure

```
front/
├── .storybook/           # Storybook configuration
│   ├── main.ts          # Core config (framework, addons, stories)
│   └── preview.ts       # Global decorators, parameters, viewports
├── src/
│   ├── components/      # Vue components (atomic design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── pages/           # Page components
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia state management
│   ├── services/        # API services
│   ├── composables/     # Vue composables
│   ├── types/           # TypeScript type definitions
│   └── assets/          # Static assets (CSS, images)
├── public/              # Static files
└── tests/               # Test files
```

## Code Style

- **Components**: PascalCase, multi-word names (`UserProfile.vue`, not `User.vue`)
- **Composables**: camelCase with `use` prefix (`useAuth.ts`)
- **Stores**: camelCase with `use` suffix and `Store` (`useUserStore.ts`)
- **Scripts**: Use `<script setup lang="ts">` with type-based props/emits
- **Styling**: Tailwind utility classes only (no custom CSS without approval)
- **TypeScript**: Strict mode, no `any` without justification

## Testing

Run unit tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## Linting & Formatting

Check linting errors:

```bash
npm run lint
```

Fix linting errors:

```bash
npm run lint:fix
```

Format code:

```bash
npm run format
```

## Type Checking

Run TypeScript type checking:

```bash
npm run type-check
```

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Storybook Documentation](https://storybook.js.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Project Constitution](../.specify/memory/constitution.md)
- [Workflow Guide](../docs/WORKFLOW.md)
