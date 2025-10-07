# Task T029: Create Additional Style Category Stories (Shadows, BorderRadius, ZIndex, Opacity, Transitions)

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T020, T021, T022

## Description

Create Storybook documentation for additional style categories including shadows (5 levels), border radius (7 values), z-index (layering scale), opacity (8 steps), and transitions (duration + timing) with visual examples and usage guidance.

## Files to Create/Modify

- `src/design-system/Shadows.stories.mdx` - Shadow elevation documentation
- `src/design-system/BorderRadius.stories.mdx` - Border radius documentation
- `src/design-system/ZIndex.stories.mdx` - Z-index layering documentation
- `src/design-system/Opacity.stories.mdx` - Opacity values documentation
- `src/design-system/Transitions.stories.mdx` - Transition timing documentation

## Dependencies

**Blocks**: None (documentation task)
**Blocked By**: T020-T022 (CSS theme definitions with all tokens must exist)

## Acceptance Criteria

- [ ] Shadows story shows all 5 elevation levels with visual examples
- [ ] BorderRadius story demonstrates all 7 radius values
- [ ] ZIndex story explains layering hierarchy
- [ ] Opacity story shows all 8 opacity levels
- [ ] Transitions story demonstrates duration and timing functions
- [ ] Each story includes usage examples
- [ ] Visual demonstrations for each category
- [ ] ESLint: 0 errors
- [ ] All stories render correctly in Storybook

## Implementation Notes

### Shadows.stories.mdx

````mdx
import { Meta } from '@storybook/blocks';

<Meta title="Design System/Shadows" />

# Shadows

Shadow elevations provide visual depth and layering. We use 5 levels from subtle (SM) to prominent (XL).

## Shadow Scale

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 2rem;">
  {['sm', 'base', 'md', 'lg', 'xl'].map((size) => (
    <div key={size}>
      <h4>shadow-{size}</h4>
      <div
        style={`
        background: var(--color-surface);
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-${size});
      `}
      >
        Elevation: {size.toUpperCase()}
      </div>
    </div>
  ))}
</div>

## Usage

| Token         | CSS Value                  | Usage               |
| ------------- | -------------------------- | ------------------- |
| `shadow-sm`   | 0 1px 2px rgba(0,0,0,0.05) | Subtle hover states |
| `shadow-base` | Multi-layer subtle         | Default cards       |
| `shadow-md`   | 4-6px offset               | Dropdowns, tooltips |
| `shadow-lg`   | 10-15px offset             | Modals, dialogs     |
| `shadow-xl`   | 20-25px offset             | Maximum elevation   |

```vue
<div class="shadow-[--shadow-base]">Card</div>
```
````

````

### BorderRadius.stories.mdx

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Design System/Border Radius" />

# Border Radius

Border radius values from sharp (NONE) to pill-shaped (FULL).

## Radius Scale

<div style="display: grid; gap: 1.5rem; margin-top: 2rem;">
  {[
    { name: 'none', value: '0px', label: 'None (Sharp)' },
    { name: 'sm', value: '0.125rem', label: 'Small (2px)' },
    { name: 'base', value: '0.25rem', label: 'Base (4px)' },
    { name: 'md', value: '0.375rem', label: 'Medium (6px)' },
    { name: 'lg', value: '0.5rem', label: 'Large (8px)' },
    { name: 'xl', value: '0.75rem', label: 'Extra Large (12px)' },
    { name: 'full', value: '9999px', label: 'Full (Pill)' },
  ].map(({ name, value, label }) => (
    <div key={name} style="display: flex; align-items: center; gap: 1rem;">
      <div style="width: 8rem; font-weight: 500;">radius-{name}</div>
      <div style={`
        width: 8rem;
        height: 4rem;
        background: var(--color-primary-500);
        border-radius: var(--radius-${name});
      `}></div>
      <div style="color: var(--color-text-secondary);">{label} - {value}</div>
    </div>
  ))}
</div>

## Usage

```vue
<button class="rounded-[--radius-base]">Button</button>
<div class="rounded-[--radius-full]">Badge</div>
````

````

### ZIndex.stories.mdx

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Design System/Z-Index" />

# Z-Index Scale

Semantic layering system prevents z-index conflicts.

## Layering Hierarchy

| Token | Value | Layer | Usage |
|-------|-------|-------|-------|
| `z-hide` | -1 | Hidden | Below normal flow |
| `z-base` | 0 | Base | Default layer |
| `z-dropdown` | 1000 | UI Layer 1 | Dropdowns, selects |
| `z-sticky` | 1020 | UI Layer 2 | Sticky headers |
| `z-fixed` | 1030 | UI Layer 3 | Fixed position |
| `z-modal-backdrop` | 1040 | Overlay 1 | Modal backdrops |
| `z-modal` | 1050 | Overlay 2 | Modal dialogs |
| `z-popover` | 1060 | Overlay 3 | Popovers, context menus |
| `z-tooltip` | 1070 | Top | Tooltips (always visible) |

## Visual Demo

<div style="position: relative; height: 400px; background: var(--color-surface-variant); border-radius: var(--radius-md); padding: var(--spacing-md);">
  <div style="position: absolute; bottom: 40%; left: 20%; z-index: var(--z-base); background: var(--color-surface); padding: var(--spacing-md); border-radius: var(--radius-base); box-shadow: var(--shadow-base);">
    z-base (0)
  </div>
  <div style="position: absolute; bottom: 35%; left: 25%; z-index: var(--z-dropdown); background: var(--color-surface); padding: var(--spacing-md); border-radius: var(--radius-base); box-shadow: var(--shadow-md);">
    z-dropdown (1000)
  </div>
  <div style="position: absolute; bottom: 30%; left: 30%; z-index: var(--z-modal); background: var(--color-primary-500); color: white; padding: var(--spacing-md); border-radius: var(--radius-base); box-shadow: var(--shadow-lg);">
    z-modal (1050)
  </div>
</div>

````

### Opacity.stories.mdx

````mdx
import { Meta } from '@storybook/blocks';

<Meta title="Design System/Opacity" />

# Opacity Scale

8 opacity levels from transparent (0) to opaque (100).

## Opacity Values

<div style="display: grid; gap: 1rem; margin-top: 2rem;">
  {[0, 5, 10, 20, 40, 60, 80, 100].map((value) => (
    <div key={value} style="display: flex; align-items: center; gap: 1rem;">
      <div style="width: 6rem; font-weight: 500;">opacity-{value}</div>
      <div
        style={`
        width: 12rem;
        height: 3rem;
        background: var(--color-primary-500);
        opacity: var(--opacity-${value});
        border-radius: var(--radius-base);
      `}
      ></div>
      <div style="color: var(--color-text-secondary);">
        {value}% ({value / 100})
      </div>
    </div>
  ))}
</div>

## Usage

```vue
<div :style="{ opacity: 'var(--opacity-40)' }">Disabled</div>
<div class="bg-black/40">Backdrop</div>
```
````

````

### Transitions.stories.mdx

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Design System/Transitions" />

# Transitions

Duration and timing functions for smooth animations.

## Duration

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Quick feedback (hover) |
| `duration-base` | 200ms | Standard transitions |
| `duration-slow` | 300ms | Emphasized transitions |

## Timing Functions

| Token | Value | Curve | Usage |
|-------|-------|-------|-------|
| `ease-linear` | linear | Constant speed | Loading spinners |
| `ease-in` | cubic-bezier(0.4,0,1,1) | Slow start | Element entrances |
| `ease-out` | cubic-bezier(0,0,0.2,1) | Fast start | Element exits (most common) |
| `ease-in-out` | cubic-bezier(0.4,0,0.2,1) | Smooth both ends | In-view movement |
| `ease-fluid` | cubic-bezier(0.3,0,0,1) | Natural movement | Material Design style |

## Interactive Demo

<button
  style="
    background: var(--color-primary-500);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-base);
    border: none;
    cursor: pointer;
    transition: all var(--duration-base) var(--ease-out);
  "
  onMouseEnter="this.style.transform = 'scale(1.05)'"
  onMouseLeave="this.style.transform = 'scale(1)'"
>
  Hover Me (base + ease-out)
</button>

## Usage

```vue
<div :style="{
  transition: 'opacity var(--duration-fast) var(--ease-out)'
}">
  Fade in/out
</div>
````

```

## Testing Requirements

- [ ] Verify all shadow levels render with correct elevation
- [ ] Test border radius values on different shapes
- [ ] Check z-index visual stacking demo
- [ ] Verify opacity levels are visible
- [ ] Test transition demos are interactive
- [ ] Visual inspection of all examples
- [ ] Test in both light and dark Storybook themes

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T029-additional-styles-stories`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
