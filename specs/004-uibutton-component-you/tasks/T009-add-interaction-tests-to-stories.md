# T009: Add interaction tests to stories

**Feature**: 004-uibutton-component-you
**Task ID**: T009
**Type**: Test
**Parallel**: No (sequential)
**Agent**: Testing Agent
**Priority**: P2 (Medium)
**Estimated Effort**: 1.5-2 hours

## Description

Add Storybook interaction tests using `@storybook/test` to automate validation of button behavior directly in Storybook. These tests complement unit tests and enable visual + behavioral testing in a single place.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.stories.ts` (add play functions)

## Dependencies

- T008 (All stories created)

## Interaction Tests to Add

### 1. Click Event Test

```typescript
import { expect, userEvent, within } from '@storybook/test';

export const ClickInteraction: Story = {
  args: {
    label: 'Click Me',
    variant: 'filled',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Click the button
    await userEvent.click(button);

    // Note: Storybook can't directly verify emits, but we can verify it's clickable
    await expect(button).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaction test verifying button is clickable and accessible.',
      },
    },
  },
};
```

### 2. Disabled Button Test

```typescript
export const DisabledInteraction: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'filled',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });

    // Verify button is disabled
    await expect(button).toBeDisabled();

    // Verify disabled attribute
    await expect(button).toHaveAttribute('disabled');
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies disabled buttons have correct attributes and are not interactive.',
      },
    },
  },
};
```

### 3. Keyboard Navigation Test

```typescript
export const KeyboardNavigation: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; gap: 16px;">
        <UiButton label="First Button" variant="filled" />
        <UiButton label="Second Button" variant="outline" />
        <UiButton label="Third Button" variant="text" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get all buttons
    const firstButton = canvas.getByRole('button', { name: /first button/i });
    const secondButton = canvas.getByRole('button', { name: /second button/i });

    // Tab to first button
    await userEvent.tab();
    await expect(firstButton).toHaveFocus();

    // Tab to second button
    await userEvent.tab();
    await expect(secondButton).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies keyboard navigation works correctly using Tab key.',
      },
    },
  },
};
```

### 4. Accessibility Attributes Test

```typescript
export const AccessibilityAttributes: Story = {
  render: () => ({
    components: { UiButton, SaveIcon },
    template: `
      <div style="display: flex; gap: 16px;">
        <UiButton label="Submit Form" type="submit" variant="filled" />
        <UiButton aria-label="Close dialog" variant="text">
          <template #icon-left><SaveIcon :size="20" /></template>
        </UiButton>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test submit button has correct type
    const submitButton = canvas.getByRole('button', { name: /submit form/i });
    await expect(submitButton).toHaveAttribute('type', 'submit');

    // Test icon-only button has aria-label
    const iconButton = canvas.getByRole('button', { name: /close dialog/i });
    await expect(iconButton).toHaveAttribute('aria-label', 'Close dialog');
  },
  parameters: {
    docs: {
      description: {
        story: 'Verifies ARIA attributes and button type attributes are correctly applied.',
      },
    },
  },
};
```

### 5. CSS Classes Test

```typescript
export const CSSClassesValidation: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <UiButton label="Filled" variant="filled" size="medium" />
        <UiButton label="Outline" variant="outline" size="small" />
        <UiButton label="Text" variant="text" size="large" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test filled variant classes
    const filledButton = canvas.getByRole('button', { name: /^filled$/i });
    await expect(filledButton).toHaveClass('btn');
    await expect(filledButton).toHaveClass('btn-filled');
    await expect(filledButton).toHaveClass('btn-medium');

    // Test outline variant classes
    const outlineButton = canvas.getByRole('button', { name: /^outline$/i });
    await expect(outlineButton).toHaveClass('btn-outline');
    await expect(outlineButton).toHaveClass('btn-small');

    // Test text variant classes
    const textButton = canvas.getByRole('button', { name: /^text$/i });
    await expect(textButton).toHaveClass('btn-text');
    await expect(textButton).toHaveClass('btn-large');
  },
  parameters: {
    docs: {
      description: {
        story: 'Validates CSS class names are correctly applied based on props.',
      },
    },
  },
};
```

### 6. Hover State Visual Test

```typescript
export const HoverStateTest: Story = {
  args: {
    label: 'Hover Over Me',
    variant: 'filled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /hover over me/i });

    // Hover over button
    await userEvent.hover(button);

    // Visual verification (manual) - hover state should be visible
    // Automated visual regression would require additional tooling
    await expect(button).toBeInTheDocument();

    // Unhover
    await userEvent.unhover(button);
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests hover interaction. Visual verification of hover state requires manual inspection or visual regression testing.',
      },
    },
  },
};
```

## Interaction Test Coverage

Tests should cover:

- ✅ Click events
- ✅ Disabled state prevents interaction
- ✅ Keyboard navigation (Tab, focus)
- ✅ ARIA attributes (aria-label, type)
- ✅ CSS class application
- ✅ Hover states (basic interaction)
- ⚠️ Event emissions (limited in Storybook - covered by unit tests)
- ⚠️ Visual appearance (requires visual regression tools)

## Setup Requirements

### Install Dependencies

```bash
npm install --save-dev @storybook/test
```

### Import Test Utilities

```typescript
import { expect, userEvent, within } from '@storybook/test';
```

## Acceptance Criteria

- [ ] @storybook/test dependency installed
- [ ] Six interaction test stories created
- [ ] Click interaction test works
- [ ] Disabled state test works
- [ ] Keyboard navigation test works
- [ ] Accessibility attributes test works
- [ ] CSS classes validation test works
- [ ] Hover state test works
- [ ] All interaction tests pass in Storybook
- [ ] Tests visible in "Interactions" panel
- [ ] Tests documented with clear descriptions
- [ ] TypeScript/ESLint passes

## Manual Testing

Test in Storybook:

1. Navigate to interaction test stories
2. View "Interactions" panel (bottom of Storybook UI)
3. Watch tests run automatically
4. Verify all assertions pass (green checkmarks)
5. Click "Rerun" to re-execute tests
6. Check console for any errors
7. Manually verify hover state visual changes

## Test Status After Completion

Expected results:

- ✅ All interaction tests pass
- ✅ Interactions panel shows successful test runs
- ✅ Tests complement unit tests (not duplicate)
- ✅ Visual + behavioral testing in one place

## Next Task

After completion: T010 (Update component JSDoc documentation)

## Notes

- Interaction tests run automatically when story loads
- Use `play` function for async test execution
- `within(canvasElement)` scopes queries to story canvas
- `userEvent` simulates real user interactions
- Tests are visible in Storybook UI (Interactions panel)
- Interaction tests are NOT replacements for unit tests
- Focus on user-facing behavior, not implementation details
- Visual regression testing (Chromatic, Percy) can be added later
