# T007: Create Storybook state stories

**Feature**: 004-uibutton-component-you
**Task ID**: T007
**Type**: Documentation
**Parallel**: No (sequential)
**Agent**: Design Agent
**Priority**: P2 (Medium)
**Estimated Effort**: 1-1.5 hours

## Description

Create Storybook stories demonstrating button interactive states (hover, focus, active, disabled). Include pseudo-class documentation and interaction examples.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.stories.ts` (add to existing file)

## Dependencies

- T005 (Variant stories)
- T006 (Size stories)

## Stories to Add

### Disabled State Story

```typescript
export const Disabled: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <UiButton label="Filled Disabled" variant="filled" disabled />
        <UiButton label="Outline Disabled" variant="outline" disabled />
        <UiButton label="Text Disabled" variant="text" disabled />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Disabled buttons show 50% opacity and are not interactive. Click events are not emitted.',
      },
    },
  },
};
```

### Disabled with Icons

```typescript
export const DisabledWithIcons: Story = {
  render: () => ({
    components: { UiButton, SaveIcon },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <UiButton label="Save" variant="filled" disabled>
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Save" variant="outline" disabled>
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
        <UiButton label="Save" variant="text" disabled>
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
      </div>
    `,
  }),
};
```

### Interactive States Documentation Story

```typescript
export const InteractiveStates: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600;">Hover State</h3>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Hover over buttons to see background color darken. Transition: 150ms.
          </p>
          <div style="display: flex; gap: 12px;">
            <UiButton label="Hover Me (Filled)" variant="filled" />
            <UiButton label="Hover Me (Outline)" variant="outline" />
            <UiButton label="Hover Me (Text)" variant="text" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600;">Focus State</h3>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Press Tab to focus buttons. 2px outline with 2px offset for visibility.
          </p>
          <div style="display: flex; gap: 12px;">
            <UiButton label="Tab to Focus (Filled)" variant="filled" />
            <UiButton label="Tab to Focus (Outline)" variant="outline" />
            <UiButton label="Tab to Focus (Text)" variant="text" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600;">Active State</h3>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Click and hold to see active state (darker background).
          </p>
          <div style="display: flex; gap: 12px;">
            <UiButton label="Click & Hold (Filled)" variant="filled" />
            <UiButton label="Click & Hold (Outline)" variant="outline" />
            <UiButton label="Click & Hold (Text)" variant="text" />
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-weight: 600;">Disabled State</h3>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Disabled buttons have 50% opacity and no hover/focus/click effects.
          </p>
          <div style="display: flex; gap: 12px;">
            <UiButton label="Disabled (Filled)" variant="filled" disabled />
            <UiButton label="Disabled (Outline)" variant="outline" disabled />
            <UiButton label="Disabled (Text)" variant="text" disabled />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive guide to all interactive states with testing instructions.',
      },
    },
  },
};
```

### State Comparison Matrix

```typescript
export const StateMatrix: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <!-- Headers -->
        <div style="font-weight: 600;">Variant</div>
        <div style="font-weight: 600;">Default</div>
        <div style="font-weight: 600;">Disabled</div>
        <div style="font-weight: 600;">Hover to Test</div>

        <!-- Filled -->
        <div style="display: flex; align-items: center;">Filled</div>
        <UiButton label="Default" variant="filled" size="small" />
        <UiButton label="Disabled" variant="filled" size="small" disabled />
        <UiButton label="Hover" variant="filled" size="small" />

        <!-- Outline -->
        <div style="display: flex; align-items: center;">Outline</div>
        <UiButton label="Default" variant="outline" size="small" />
        <UiButton label="Disabled" variant="outline" size="small" disabled />
        <UiButton label="Hover" variant="outline" size="small" />

        <!-- Text -->
        <div style="display: flex; align-items: center;">Text</div>
        <UiButton label="Default" variant="text" size="small" />
        <UiButton label="Disabled" variant="text" size="small" disabled />
        <UiButton label="Hover" variant="text" size="small" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of default vs disabled states across all variants.',
      },
    },
  },
};
```

### Loading State (Future Enhancement Note)

```typescript
export const LoadingStatePlaceholder: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; border: 2px dashed #ccc; border-radius: 8px; text-align: center;">
        <p style="color: #666; font-style: italic;">
          Loading state is not part of the current specification.
          <br />
          Future enhancement: Add loading spinner with disabled interaction.
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Placeholder for future loading state implementation (not in current scope).',
      },
    },
  },
};
```

## CSS Pseudo-Classes Summary

Document these in story descriptions:

### Hover State (`:hover`)

- **Filled**: Background darkens (500 → 600)
- **Outline**: Background fills with raised surface color
- **Text**: Background adds subtle primary tint (primary-50)
- **Transition**: 150ms ease-out

### Focus State (`:focus-visible`)

- **All variants**: 2px solid outline (border-focus color)
- **Offset**: 2px from edge
- **Keyboard only**: No outline on mouse click

### Active State (`:active`)

- **Filled**: Background darkens further (500 → 700)
- **Outline**: Same as hover (no additional darkening)
- **Text**: Same as hover

### Disabled State (`:disabled`)

- **Opacity**: 50%
- **Cursor**: not-allowed
- **Pointer events**: none (no hover/click)

## Acceptance Criteria

- [ ] Disabled story showing all variants
- [ ] DisabledWithIcons story
- [ ] InteractiveStates documentation story with instructions
- [ ] StateMatrix comparison grid
- [ ] LoadingStatePlaceholder with future note
- [ ] All pseudo-classes documented in story descriptions
- [ ] Stories interactive and testable by designers
- [ ] Focus state testable via keyboard (Tab key)
- [ ] Hover states visible on mouse hover
- [ ] TypeScript/ESLint passes

## Manual Testing

Test in Storybook:

1. View Disabled story → 50% opacity visible
2. Try clicking disabled button → no action
3. Tab through InteractiveStates story → focus outlines visible
4. Hover buttons → background colors change smoothly
5. Click and hold button → active state visible
6. Disabled button hover → no hover effect
7. Switch palettes → states adapt to new colors

## Test Status After Completion

Expected results:

- ✅ All state stories render correctly
- ✅ Interactive states testable manually
- ✅ Focus, hover, active, disabled all working
- ✅ Visual feedback meets design requirements

## Next Task

After completion: T008 (Create palette demonstration story)

## Notes

- Use `:focus-visible` (not `:focus`) for keyboard-only focus
- Disabled state uses `pointer-events: none` to prevent all interaction
- Transition applies to all properties for smooth palette switching
- Loading state excluded from MVP (noted for future)
- Grid layout for StateMatrix provides clear comparison
- Interactive documentation helps designers test states
