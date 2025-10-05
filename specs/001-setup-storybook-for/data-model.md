# Data Model: Storybook Setup for Design Preview

**Feature**: 001-setup-storybook-for
**Date**: 2025-10-05

## Overview

This feature does not introduce traditional database entities or data models. Storybook is a development tool for component documentation and preview. However, this document captures the configuration "entities" and their relationships.

## Configuration Entities

### 1. Storybook Configuration

**Location**: `front/.storybook/main.ts`

**Purpose**: Core Storybook configuration defining framework, addons, and build settings

**Key Properties**:

- `framework`: Defines Vue3-Vite integration
- `stories`: Glob patterns for story file locations
- `addons`: List of enabled Storybook addons
- `staticDirs`: Paths to static assets
- `viteFinal`: Custom Vite configuration overrides

**Example Structure**:

```typescript
{
  framework: '@storybook/vue3-vite',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes'
  ],
  staticDirs: ['../public']
}
```

### 2. Preview Configuration

**Location**: `front/.storybook/preview.ts`

**Purpose**: Global decorators, parameters, and styling for all stories

**Key Properties**:

- `parameters`: Global story parameters (viewport, backgrounds, themes)
- `decorators`: Wrapper components for all stories
- `globalTypes`: Custom toolbar controls

**Relationships**:

- Imports Tailwind CSS from `front/src/assets/main.css`
- Applies global styles to all stories
- Configures viewport sizes (mobile, tablet, desktop)

### 3. Story Files

**Location**: `front/src/components/**/*.stories.ts`

**Purpose**: Individual component story definitions

**Key Properties**:

- `meta`: Story metadata (title, component, tags, argTypes)
- `default export`: Meta object
- Named exports: Individual story variants

**Example Structure**:

```typescript
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    /* prop controls */
  },
} satisfies Meta<typeof Button>;

export default meta;
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
```

**Relationships**:

- One story file per Vue component
- Multiple story variants per component
- References the actual Vue component

### 4. Component Hierarchy

**Organization**: Atomic Design structure

**Levels**:

1. **Atoms** (`src/components/atoms/`)
   - Basic building blocks (Button, Input, Badge, Avatar)
   - No dependencies on other components
   - Story title: `Atoms/ComponentName`

2. **Molecules** (`src/components/molecules/`)
   - Combinations of atoms (FormField, SearchBar, Card)
   - May depend on atoms
   - Story title: `Molecules/ComponentName`

3. **Organisms** (`src/components/organisms/`)
   - Complex UI sections (IssueCard, KanbanColumn, Modal)
   - May depend on molecules and atoms
   - Story title: `Organisms/ComponentName`

**Relationships**:

- Atoms → standalone, no dependencies
- Molecules → compose atoms
- Organisms → compose molecules and atoms

## Story States and Variants

### Common Story Patterns

Each component story should demonstrate:

1. **Default State**: Basic usage with default props
2. **All Variants**: Different visual styles (primary, secondary, danger, etc.)
3. **All Sizes**: Size variations (small, medium, large)
4. **Interactive States**: Hover, focus, active, disabled
5. **Data States**: Loading, error, empty, success
6. **Responsive Behavior**: Mobile, tablet, desktop viewports

### Example: Button Component Stories

```typescript
export const Primary: Story = { args: { variant: 'primary', label: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', label: 'Secondary' } };
export const Danger: Story = { args: { variant: 'danger', label: 'Delete' } };
export const Ghost: Story = { args: { variant: 'ghost', label: 'Ghost' } };
export const Disabled: Story = { args: { variant: 'primary', label: 'Disabled', disabled: true } };
export const Loading: Story = { args: { variant: 'primary', label: 'Loading', loading: true } };
export const Small: Story = { args: { variant: 'primary', label: 'Small', size: 'sm' } };
export const Large: Story = { args: { variant: 'primary', label: 'Large', size: 'lg' } };
```

## Validation Rules

### Story File Requirements

- **Naming**: `ComponentName.stories.ts` (matches component filename)
- **Location**: Co-located with component file
- **Export**: Must have default export with meta object
- **TypeScript**: Must use `Meta<typeof Component>` and `StoryObj<typeof meta>`
- **Tags**: Include `['autodocs']` for automatic documentation generation

### Accessibility Requirements

All stories must pass:

- Color contrast ≥ 4.5:1 (enforced by addon-a11y)
- Keyboard navigation (tested via interaction tests)
- ARIA attributes (validated by axe-core)
- Semantic HTML (linter enforced)

## Configuration Relationships Diagram

```
┌─────────────────────────────────────────────────┐
│  front/.storybook/main.ts                       │
│  (Core Configuration)                           │
│  - Defines framework, addons, story patterns    │
└────────────────┬────────────────────────────────┘
                 │
                 ├─> Loads addons (a11y, interactions, themes)
                 │
                 ├─> Discovers stories via glob pattern
                 │
                 v
┌─────────────────────────────────────────────────┐
│  front/.storybook/preview.ts                    │
│  (Global Configuration)                         │
│  - Imports Tailwind CSS                         │
│  - Sets viewport configurations                 │
│  - Applies global decorators                    │
└────────────────┬────────────────────────────────┘
                 │
                 │ Applied to all stories
                 │
                 v
┌─────────────────────────────────────────────────┐
│  front/src/components/**/ComponentName.vue      │
│  (Vue Component)                                │
└────────────────┬────────────────────────────────┘
                 │
                 │ Documented by
                 │
                 v
┌─────────────────────────────────────────────────┐
│  front/src/components/**/ComponentName.stories.ts│
│  (Story File)                                   │
│  - Exports meta with component reference        │
│  - Exports multiple story variants              │
│  - Defines argTypes for controls                │
└─────────────────────────────────────────────────┘
```

## Design Agent Workflow

### Creating a New Component Story

1. Design agent creates Vue component in appropriate folder:
   - `front/src/components/atoms/Button/Button.vue`

2. Design agent creates story file in same folder:
   - `front/src/components/atoms/Button/Button.stories.ts`

3. Story file exports meta and variants:

   ```typescript
   // Define all visual states
   export const Primary: Story = { ... };
   export const Disabled: Story = { ... };
   export const Loading: Story = { ... };
   ```

4. Design agent runs `npm run storybook` in `front/` workspace

5. Component preview available at `http://localhost:6006`

6. Design agent iterates on component styling in `.vue` file

7. Storybook auto-reloads with changes (HMR)

8. When approved, frontend agent uses story as implementation reference

## No Database Entities

This feature does not interact with:

- Firestore collections
- Backend APIs
- Database models
- User data
- Persistent storage

All configuration is file-based and lives in the repository.

---

**Note**: While this isn't a traditional data model, documenting the configuration structure ensures consistency in how stories are created and organized throughout the project.
