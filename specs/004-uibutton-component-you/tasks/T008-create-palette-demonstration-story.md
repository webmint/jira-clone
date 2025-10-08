# T008: Create palette demonstration story

**Feature**: 004-uibutton-component-you
**Task ID**: T008
**Type**: Documentation
**Parallel**: No (sequential)
**Agent**: Design Agent
**Priority**: P1 (High)
**Estimated Effort**: 1.5-2 hours

## Description

Create comprehensive Storybook story demonstrating button color adaptation across all 10 palette variations (5 palettes × 2 modes). This is the KEY validation story proving design system integration works correctly.

## Files to Edit

- `front/src/components/atoms/Button/UiButton.stories.ts` (add to existing file)

## Dependencies

- T007 (State stories completed)

## Critical Story: Palette Adaptation Demo

This story is the **most important** for validating the feature specification requirement: "Buttons must automatically adapt to palette switcher."

### Palette Adaptation Story

```typescript
export const PaletteAdaptation: Story = {
  render: () => ({
    components: { UiButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <!-- Instructions -->
        <div style="padding: 16px; background: #f0f7ff; border-radius: 8px; border-left: 4px solid #0066cc;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600;">🎨 Palette Switching Test</h3>
          <p style="margin: 0; font-size: 14px; line-height: 1.5;">
            Use the Palette Switcher component to change between palettes and observe automatic button color adaptation.
            <br />
            <strong>Expected behavior:</strong> All buttons update colors instantly without page reload.
          </p>
        </div>

        <!-- Filled Variant Showcase -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">Filled Variant (Primary Color Adaptation)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Save Changes" variant="filled" size="medium" />
            <UiButton label="Create Account" variant="filled" size="large" />
            <UiButton label="Submit" variant="filled" size="small" />
          </div>
          <p style="margin-top: 8px; color: #666; font-size: 14px;">
            Background color uses <code>var(--color-primary-500)</code> which changes per palette.
          </p>
        </div>

        <!-- Outline Variant Showcase -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">Outline Variant (Border & Surface Adaptation)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Cancel" variant="outline" size="medium" />
            <UiButton label="Learn More" variant="outline" size="large" />
            <UiButton label="Export" variant="outline" size="small" />
          </div>
          <p style="margin-top: 8px; color: #666; font-size: 14px;">
            Border uses <code>var(--color-border-default)</code>, hover uses <code>var(--color-surface-raised)</code>.
          </p>
        </div>

        <!-- Text Variant Showcase -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">Text Variant (Text Color Adaptation)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Skip" variant="text" size="medium" />
            <UiButton label="Dismiss" variant="text" size="large" />
            <UiButton label="Edit" variant="text" size="small" />
          </div>
          <p style="margin-top: 8px; color: #666; font-size: 14px;">
            Text color uses <code>var(--color-primary-500)</code>, hover uses <code>var(--color-primary-50)</code>.
          </p>
        </div>

        <!-- All Variants Together -->
        <div>
          <h3 style="margin-bottom: 12px; font-weight: 600;">All Variants (Side-by-Side Comparison)</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <UiButton label="Primary Action" variant="filled" />
            <UiButton label="Secondary Action" variant="outline" />
            <UiButton label="Tertiary Action" variant="text" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
## Palette Adaptation Testing

This story validates that buttons automatically adapt to all 10 palette variations without code changes.

### Test Procedure

1. Open the Palette Switcher component
2. Switch between these palettes and observe button color changes:
   - **Corporate Trust** (Blue tones)
   - **Creative Energy** (Purple tones)
   - **Natural Harmony** (Green tones)
   - **Warm Welcome** (Orange tones)
   - **Minimalist** (Gray tones)
3. Toggle between Light and Dark modes for each palette
4. Verify all buttons adapt instantly

### What Should Change

- **Filled buttons**: Background color changes to palette's primary-500
- **Outline buttons**: Border color adapts to palette's border-default
- **Text buttons**: Text color changes to palette's primary-500
- **All buttons**: Hover states adapt automatically

### Design Tokens Used

- Background: \`--color-primary-500\` → \`--color-primary-600\` (hover) → \`--color-primary-700\` (active)
- Text: \`--color-text-inverse\` (filled), \`--color-text-primary\` (outline), \`--color-primary-500\` (text)
- Border: \`--color-border-default\` (outline)
- Surface: \`--color-surface-raised\` (outline hover)

### Expected Result

✅ All buttons change colors smoothly when palette is switched.
        `,
      },
    },
  },
};
```

### Palette Testing Checklist Story

```typescript
export const PaletteTestingChecklist: Story = {
  render: () => ({
    template: `
      <div style="max-width: 800px;">
        <h2 style="margin-bottom: 16px;">10 Palette Variation Testing Checklist</h2>
        <p style="margin-bottom: 24px; color: #666;">
          Systematically test buttons across all palette combinations. Check off each as you verify.
        </p>

        <div style="display: grid; gap: 16px;">
          <!-- Corporate Trust -->
          <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #0066cc;">Corporate Trust (Blue)</h3>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" /> Light mode: Filled button is blue
            </label>
            <label style="display: block;">
              <input type="checkbox" /> Dark mode: Filled button is lighter blue
            </label>
          </div>

          <!-- Creative Energy -->
          <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #7c3aed;">Creative Energy (Purple)</h3>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" /> Light mode: Filled button is purple
            </label>
            <label style="display: block;">
              <input type="checkbox" /> Dark mode: Filled button is lighter purple
            </label>
          </div>

          <!-- Natural Harmony -->
          <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #059669;">Natural Harmony (Green)</h3>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" /> Light mode: Filled button is green
            </label>
            <label style="display: block;">
              <input type="checkbox" /> Dark mode: Filled button is lighter green
            </label>
          </div>

          <!-- Warm Welcome -->
          <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #ea580c;">Warm Welcome (Orange)</h3>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" /> Light mode: Filled button is orange
            </label>
            <label style="display: block;">
              <input type="checkbox" /> Dark mode: Filled button is lighter orange
            </label>
          </div>

          <!-- Minimalist -->
          <div style="padding: 16px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #64748b;">Minimalist (Gray)</h3>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" /> Light mode: Filled button is gray
            </label>
            <label style="display: block;">
              <input type="checkbox" /> Dark mode: Filled button is lighter gray
            </label>
          </div>
        </div>

        <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #059669;">
          <strong>✅ Success Criteria:</strong> All 10 checkboxes checked = Feature requirement satisfied
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive checklist for systematic cross-palette validation. Use this to verify all 10 palette variations work correctly.',
      },
    },
  },
};
```

## Validation Test Plan

### Manual Testing Procedure

1. **Open Storybook**: Navigate to Atoms/Button → PaletteAdaptation story
2. **Open Palette Switcher**: Find and open palette switcher component
3. **Test Corporate Trust (Blue)**:
   - Switch to Corporate Trust palette
   - Toggle light mode: Verify filled button is blue (#0066cc range)
   - Toggle dark mode: Verify filled button is lighter blue
   - Hover buttons: Verify colors darken smoothly
4. **Repeat for Creative Energy (Purple)**: Colors should be purple
5. **Repeat for Natural Harmony (Green)**: Colors should be green
6. **Repeat for Warm Welcome (Orange)**: Colors should be orange
7. **Repeat for Minimalist (Gray)**: Colors should be gray
8. **Check all variants**: Ensure outline and text variants also adapt

### Expected Behavior

✅ **Pass**: Button colors change instantly when palette is switched
❌ **Fail**: Button colors remain the same (indicates hardcoded colors not removed)

## Acceptance Criteria

- [ ] PaletteAdaptation story created with comprehensive examples
- [ ] PaletteTestingChecklist story created with interactive checkboxes
- [ ] Instructions clearly explain how to test
- [ ] Design tokens documented in story descriptions
- [ ] All 3 variants included (filled, outline, text)
- [ ] All 5 palettes referenced in checklist
- [ ] Story validates 10 palette variations (5 × 2 modes)
- [ ] Documentation explains expected behavior
- [ ] Stories render correctly in Storybook
- [ ] TypeScript/ESLint passes

## Manual Testing

Test in Storybook:

1. Navigate to PaletteAdaptation story
2. Use palette switcher to change palette
3. Verify buttons change color instantly
4. Test all 5 palettes in both modes (10 total)
5. Check filled variant changes most dramatically
6. Check outline/text variants also adapt
7. Use checklist story to systematically verify all 10

## Test Status After Completion

Expected results:

- ✅ Palette adaptation story renders
- ✅ All 10 palette variations testable
- ✅ Buttons adapt colors automatically
- ✅ Feature specification requirement SATISFIED

## Next Task

After completion: T009 (Add interaction tests to stories)

## Notes

- This story is CRITICAL for feature validation
- Must be manually tested (automated visual regression recommended later)
- Documents design token usage for developers
- Interactive checklist helps QA validate systematically
- If colors don't change, CSS custom properties not implemented correctly
- This story proves UiButton meets specification requirement #1
