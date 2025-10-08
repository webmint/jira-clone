# Research: UI Button Component

**Feature**: 004-uibutton-component-you
**Date**: 2025-10-08
**Researcher**: Architecture Agent

## Executive Summary

The jira-clone project has a sophisticated 2D palette system (5 palettes × 2 modes = 10 variations) using CSS custom properties. An existing `UiButton` component exists but does NOT use design tokens and needs refactoring. This research informs the creation of a token-based button component that adapts to all palette variations.

---

## Decision 1: Component Structure and Location

**Decision**: Refactor existing button at `front/src/components/atoms/Button/UiButton.vue` to use design tokens

**Rationale**:

- Component already exists with basic structure
- Located in correct Atomic Design pattern (atoms/Button/)
- Has Storybook stories file (`UiButton.stories.ts`)
- Needs refactoring to align with design system

**Alternatives Considered**:

- Create new component in `front/src/designSystem/components/` - Rejected: would duplicate existing button
- Create separate folder per variant - Rejected: overcomplicated structure for single component

**Implementation**:

- Keep file location: `front/src/components/atoms/Button/UiButton.vue`
- Add test file: `front/src/components/atoms/Button/UiButton.spec.ts`
- Update stories: `front/src/components/atoms/Button/UiButton.stories.ts`

---

## Decision 2: Styling Approach - CSS Custom Properties vs Tailwind Classes

**Decision**: Use CSS custom properties (design tokens) in `<style scoped>` section, NOT Tailwind utility classes

**Rationale**:

- Design system uses 10 palette variations (5 palettes × 2 modes)
- Tokens defined in `tokens.css` using Tailwind 4.0 `@theme` directive
- CSS custom properties enable automatic adaptation to palette switching
- Current button uses hardcoded Tailwind classes (e.g., `bg-blue-600`) which don't adapt

**Alternatives Considered**:

- Tailwind utility classes - Rejected: hardcoded colors don't adapt to palette changes
- Inline styles with `computed()` - Rejected: less performant, harder to maintain
- CSS-in-JS - Rejected: not project pattern

**Key Token Mappings**:

| Button State       | Token                       | Adapts Automatically   |
| ------------------ | --------------------------- | ---------------------- |
| Primary background | `var(--color-primary-500)`  | ✅ Yes                 |
| Primary hover      | `var(--color-primary-600)`  | ✅ Yes                 |
| Primary active     | `var(--color-primary-700)`  | ✅ Yes                 |
| Button text        | `var(--color-text-inverse)` | ✅ Yes                 |
| Disabled state     | `opacity: 0.5`              | ✅ Yes (50% from spec) |
| Focus outline      | `var(--color-border-focus)` | ✅ Yes                 |

**Example**:

```css
/* ✅ CORRECT - uses tokens */
.btn-primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
}

/* ❌ WRONG - hardcoded (current implementation) */
.btn-primary {
  background-color: #3b82f6;
  color: white;
}
```

---

## Decision 3: Button Variants

**Decision**: Implement 3 variants as specified: filled, outline, text

**Rationale**:

- Specification clearly defines 3 variants
- Maps to semantic purposes (primary action, secondary action, tertiary action)
- Existing button has 4 variants (primary, secondary, danger, ghost) - will refactor

**Token Mapping**:

1. **Filled Variant** (equivalent to current "primary"):
   - Background: `var(--color-primary-500)`
   - Text: `var(--color-text-inverse)`
   - Hover: `var(--color-primary-600)`
   - Active: `var(--color-primary-700)`

2. **Outline Variant** (equivalent to current "secondary"):
   - Background: `transparent`
   - Text: `var(--color-text-primary)`
   - Border: `1px solid var(--color-border-default)`
   - Hover: `var(--color-surface-raised)`

3. **Text Variant** (equivalent to current "ghost"):
   - Background: `transparent`
   - Text: `var(--color-primary-500)`
   - Border: `none`
   - Hover: `var(--color-primary-50)`

**Alternatives Considered**:

- Keep 4 variants including "danger" - Rejected: not in specification
- Add more variants - Rejected: follow specification exactly

---

## Decision 4: Button Sizes

**Decision**: Implement 5 sizes: xs, small, medium, large, xl (from clarification session)

**Rationale**:

- User clarified 5 size options during `/clarify`
- Existing button has 3 sizes (sm, md, lg) - will expand to 5
- More granular control for different use cases

**Token Mapping**:

| Size   | Padding                               | Font Size               | Border Radius             |
| ------ | ------------------------------------- | ----------------------- | ------------------------- |
| xs     | `var(--spacing-1) var(--spacing-2)`   | `var(--font-size-xs)`   | `var(--border-radius-sm)` |
| small  | `var(--spacing-1_5) var(--spacing-3)` | `var(--font-size-sm)`   | `var(--border-radius-md)` |
| medium | `var(--spacing-2) var(--spacing-4)`   | `var(--font-size-base)` | `var(--border-radius-lg)` |
| large  | `var(--spacing-3) var(--spacing-6)`   | `var(--font-size-lg)`   | `var(--border-radius-lg)` |
| xl     | `var(--spacing-4) var(--spacing-8)`   | `var(--font-size-xl)`   | `var(--border-radius-xl)` |

**Alternatives Considered**:

- Custom pixel values - Rejected: must use design tokens
- T-shirt sizes only (S/M/L/XL) - Rejected: specification includes xs

---

## Decision 5: Content Support (Icons + Text)

**Decision**: Support text only, icons only, and text + icons combinations using Vue slots

**Rationale**:

- User clarified flexible content combinations during `/clarify`
- Slots provide maximum flexibility
- Allows consumer to provide any icon library

**Implementation Pattern**:

```vue
<template>
  <button>
    <slot name="icon-left" />
    <span v-if="$slots.default || label"
      ><slot>{{ label }}</slot></span
    >
    <slot name="icon-right" />
  </button>
</template>
```

**Usage Examples**:

```vue
<!-- Text only -->
<UiButton>Save</UiButton>

<!-- Icon only -->
<UiButton><template #icon-left><SaveIcon /></template></UiButton>

<!-- Icon + text -->
<UiButton>
  <template #icon-left><SaveIcon /></template>
  Save Changes
</UiButton>
```

**Alternatives Considered**:

- Prop-based icon API - Rejected: locks into specific icon library
- Text-only component - Rejected: doesn't meet specification

---

## Decision 6: Accessibility Implementation (WCAG 2.1 Level AAA)

**Decision**: Target WCAG 2.1 Level AAA with 7:1 contrast for normal text, 4.5:1 for large text

**Rationale**:

- User specified WCAG 2.1 AAA during `/clarify`
- Stricter than project standard (WCAG 2.1 AA)
- Design tokens already provide AAA-compliant colors

**Implementation Requirements**:

1. **Semantic HTML**: Use native `<button>` element
2. **Keyboard Navigation**: Native browser support
3. **Focus Indicators**: Visible focus ring using `outline: 2px solid var(--color-border-focus)`
4. **ARIA**: Minimal needed (semantic button provides role automatically)
5. **Disabled State**: `disabled` attribute + visual indication (50% opacity)
6. **Screen Reader**: Label via slot content or `aria-label` prop

**Testing**:

- Storybook `@storybook/addon-a11y` for automated checks
- Manual keyboard testing (Tab, Enter, Space)
- Color contrast verification in all 10 palette variations

**Alternatives Considered**:

- WCAG AA only - Rejected: user specified AAA
- Custom focus styles - Rejected: browser defaults are accessible

---

## Decision 7: Disabled State Visual Treatment

**Decision**: 50% opacity for disabled buttons (from clarification session)

**Rationale**:

- User specified 50% opacity during `/clarify`
- Simple, universal approach
- Works across all variants and palettes
- Industry standard (Material Design uses 38-50%)

**Implementation**:

```css
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

**Alternatives Considered**:

- Reduced opacity (40% or 60%) - Rejected: user specified 50%
- Grayed out colors - Rejected: more complex, doesn't work with all palettes
- Different opacity per variant - Rejected: inconsistent UX

---

## Decision 8: Text Overflow Behavior

**Decision**: Expand button width to fit content (from clarification session)

**Rationale**:

- User specified expand behavior during `/clarify`
- Prevents text truncation
- Maintains readability
- Works well for action buttons

**Implementation**:

```css
.btn {
  display: inline-flex;
  white-space: nowrap;
  /* No max-width */
}
```

**Alternatives Considered**:

- Truncate with ellipsis - Rejected: user specified expand
- Wrap to multiple lines - Rejected: breaks button visual consistency

---

## Decision 9: Storybook Integration

**Decision**: Create comprehensive stories demonstrating all 15 variations × 10 palettes = 150 visual states

**Rationale**:

- Storybook configured with palette switching toolbar
- `@storybook/addon-a11y` available for accessibility testing
- Stories serve as visual documentation
- Required by specification (FR-015)

**Story Categories**:

1. **Variant Stories**: filled, outline, text
2. **Size Stories**: xs, small, medium, large, xl
3. **State Stories**: default, hover, active, focus, disabled
4. **Content Stories**: text only, icon only, icon + text
5. **Palette Demonstration**: all variants in single story with palette switcher
6. **Interaction Tests**: click, keyboard navigation, accessibility

**Testing Approach**:

```typescript
import { fn } from '@storybook/test';

export const ClickInteraction: Story = {
  args: { label: 'Click Me', onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
```

**Alternatives Considered**:

- Minimal stories - Rejected: insufficient for design review
- Screenshot testing - Rejected: not configured in project

---

## Decision 10: TypeScript Props Interface

**Decision**: Use strict TypeScript interfaces with enums for variants and sizes

**Rationale**:

- Project uses TypeScript strict mode
- Type safety prevents invalid prop values
- Auto-completion in IDE
- Follows existing button pattern

**Interface Design**:

```typescript
interface Props {
  /** Button label (alternative to default slot) */
  label?: string;
  /** Visual variant */
  variant?: 'filled' | 'outline' | 'text';
  /** Size variation */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  /** Disabled state */
  disabled?: boolean;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'medium',
  disabled: false,
  type: 'button',
});
```

**Alternatives Considered**:

- String-based props - Rejected: no type safety
- Separate prop for each state - Rejected: too many props
- Runtime validation with Zod - Rejected: TypeScript sufficient for props

---

## Decision 11: Component Testing Strategy

**Decision**: Multi-layer testing with Vitest (unit) + Storybook (visual/interaction)

**Rationale**:

- Project uses Vitest for frontend testing
- Storybook provides visual regression testing
- Interaction tests verify behavior

**Test Coverage**:

1. **Unit Tests (Vitest)**:
   - Props rendering
   - Event emissions
   - Disabled state behavior
   - Slot content rendering
   - Computed class generation

2. **Component Tests (Vitest + @vue/test-utils)**:
   - Component mounting
   - Props validation
   - Emits validation
   - Accessibility attributes

3. **Visual Tests (Storybook)**:
   - All 15 variations
   - All 10 palette variations
   - Responsive behavior

4. **Interaction Tests (Storybook)**:
   - Click events
   - Keyboard navigation
   - Focus management
   - Disabled state prevents clicks

**Coverage Target**: 80% (frontend standard from constitution)

**Alternatives Considered**:

- E2E tests - Rejected: overkill for single component
- Manual testing only - Rejected: doesn't meet coverage targets

---

## Decision 12: Migration from Existing Button

**Decision**: Refactor in-place rather than create new component

**Rationale**:

- Existing component already integrated in app
- Avoids breaking changes
- Gradual migration path
- Same file location

**Migration Steps**:

1. Update props interface (add xs, xl sizes; change variant names)
2. Replace Tailwind classes with CSS custom properties
3. Add icon slot support
4. Update Storybook stories
5. Add unit tests
6. Verify accessibility

**Breaking Changes**:

- Variant names change: `primary` → `filled`, `secondary` → `outline`, `ghost` → `text`
- `danger` variant removed (not in specification)
- Size prop values change: add `xs` and `xl`

**Alternatives Considered**:

- Create new component - Rejected: duplication
- Keep both versions - Rejected: confusing for developers

---

## Key Files Referenced

| Category      | File                                                    | Purpose                                |
| ------------- | ------------------------------------------------------- | -------------------------------------- |
| **Tokens**    | `front/src/designSystem/styles/tokens.css`              | All 10 palette definitions (863 lines) |
| **Component** | `front/src/components/atoms/Button/UiButton.vue`        | Existing button (needs refactoring)    |
| **Stories**   | `front/src/components/atoms/Button/UiButton.stories.ts` | Storybook stories                      |
| **Docs**      | `front/src/designSystem/docs/palette-guide.md`          | Usage patterns (1090 lines)            |
| **Config**    | `front/.storybook/preview.ts`                           | Palette switching config               |

---

## Critical Findings

### ✅ Strengths

- Sophisticated 2D palette system (5 × 2 = 10 variations)
- Comprehensive design tokens (reference → system → component layers)
- Storybook fully configured with palette switching
- Accessibility tooling in place (`@storybook/addon-a11y`)
- Extensive documentation

### ❌ Issues

- **Existing button does NOT use design tokens** (uses hardcoded `bg-blue-600` etc.)
- **Button does NOT adapt to palette switching** (always blue/red/gray)
- **Needs complete refactoring** to align with design system

### 🎯 Action Required

Refactor `UiButton` component to:

1. Use CSS custom properties instead of Tailwind utility classes
2. Use semantic design tokens from `tokens.css`
3. Support 3 variants (filled, outline, text) × 5 sizes (xs-xl) = 15 variations
4. Adapt automatically to all 10 palette variations
5. Meet WCAG 2.1 AAA accessibility standards
6. Support flexible content (text, icons, or both)

---

## Next Steps

1. ✅ Research complete
2. → Create `data-model.md` (component props/events/slots model)
3. → Create `contracts/` (component API contract)
4. → Create `quickstart.md` (manual testing guide)
5. → Update `CLAUDE.md` with new design system knowledge
6. → Generate tasks in `/tasks` command

---

**Research completed**: 2025-10-08
**Status**: Ready for Phase 1 (Design & Contracts)
