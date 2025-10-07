# Task T010: Configure Storybook Global Types

**Status**: Pending
**Priority**: P2
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T006-T009 (palette definitions should exist for testing)

## Description

Configure Storybook 8.x globalTypes to add two toolbar controls: a palette dropdown (5 options) and a mode toggle (light/dark). This allows developers to preview components in all 10 palette variations via Storybook's toolbar without modifying individual stories.

## Files to Create/Modify

- `front/.storybook/preview.ts` - Add globalTypes configuration for palette and mode

## Dependencies

**Blocks**: T011 (decorator depends on globalTypes configuration)
**Blocked By**: T006-T009 (palette definitions should exist, but not strictly required)

## Acceptance Criteria

- [ ] `globalTypes` object added to Storybook preview.ts
- [ ] Palette dropdown configured with 5 options (Corporate Trust, Creative Energy, Natural Harmony, Warm Welcome, Minimalist)
- [ ] Mode toggle configured with 2 options (Light, Dark)
- [ ] Palette dropdown shows paintbrush icon
- [ ] Mode toggle shows sun/moon icons
- [ ] Default values set (corporate-trust, light)
- [ ] Toolbar controls visible in Storybook UI
- [ ] Dynamic titles enabled for both controls
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

**globalTypes Configuration** (from `specs/003-palette-switcher/research.md`):

```typescript
// front/.storybook/preview.ts
import type { Preview } from '@storybook/vue3';

export const globalTypes = {
  palette: {
    name: 'Palette',
    description: 'Color palette',
    defaultValue: 'corporate-trust',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'corporate-trust', title: 'Corporate Trust (Blue)' },
        { value: 'creative-energy', title: 'Creative Energy (Purple)' },
        { value: 'natural-harmony', title: 'Natural Harmony (Green)' },
        { value: 'warm-welcome', title: 'Warm Welcome (Orange)' },
        { value: 'minimalist', title: 'Minimalist (Gray)' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  mode: {
    name: 'Mode',
    description: 'Light or dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  globalTypes,
  // ... existing preview configuration
};

export default preview;
```

**Integration Points**:

- This configuration creates two independent toolbar controls
- Values are accessible via `context.globals.palette` and `context.globals.mode`
- The decorator in T011 will use these values to apply CSS classes
- All stories automatically inherit these controls (no per-story configuration needed)

**Testing in Storybook**:

1. Start Storybook: `npm run storybook`
2. Open any story
3. Look for toolbar controls at the top
4. Click palette dropdown → should show 5 options
5. Click mode toggle → should toggle between light/dark
6. Select different combinations → decorator (T011) will apply classes

## Testing Requirements

- [ ] Run Storybook: `npm run storybook`
- [ ] Verify palette dropdown appears in toolbar with 5 options
- [ ] Verify mode toggle appears in toolbar with 2 options
- [ ] Verify icons display correctly (paintbrush, sun, moon)
- [ ] Verify default values: corporate-trust, light
- [ ] Verify dynamic titles update when changing selections

## GitHub Issue

**Issue**: #98
**Link**: https://github.com/webmint/jira-clone/issues/98

## Sub-branch

**Branch**: `spec/003-palette-switcher/T010-storybook-global-types`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
