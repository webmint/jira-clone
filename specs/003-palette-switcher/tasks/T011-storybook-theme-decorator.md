# Task T011: Create Storybook Theme Decorator

**Status**: Pending
**Priority**: P2
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T010

## Description

Create a Storybook decorator that reads the palette and mode values from globalTypes (configured in T010) and applies the corresponding CSS classes to the story preview container. This decorator enables instant theme switching for all components in Storybook.

## Files to Create/Modify

- `front/.storybook/preview.ts` - Add withTheme decorator and export in decorators array

## Dependencies

**Blocks**: T014 (examples will use this decorator)
**Blocked By**: T010 (decorator uses globalTypes values)

## Acceptance Criteria

- [ ] `withTheme` decorator function created
- [ ] Decorator reads `context.globals.palette` value
- [ ] Decorator reads `context.globals.mode` value
- [ ] Decorator applies both classes to wrapper div
- [ ] Decorator wraps story component correctly
- [ ] Decorator exported in `decorators` array
- [ ] Theme switching works instantly when changing toolbar controls
- [ ] All stories automatically get theme switching capability
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 errors

## Implementation Notes

**Decorator Implementation** (from `specs/003-palette-switcher/research.md`):

```typescript
// front/.storybook/preview.ts
import type { Preview, Decorator } from '@storybook/vue3';
import { h } from 'vue';

// ... globalTypes from T010 ...

const withTheme: Decorator = (story, context) => {
  const palette = context.globals.palette || 'corporate-trust';
  const mode = context.globals.mode || 'light';

  return {
    components: { story },
    setup() {
      return { palette, mode };
    },
    template: `
      <div class="${palette} ${mode}" style="min-height: 100vh; padding: 1rem;">
        <story />
      </div>
    `,
  };
};

const preview: Preview = {
  globalTypes,
  decorators: [withTheme],
  // ... existing preview configuration
};

export default preview;
```

**Alternative Implementation** (using Vue 3 composition):

```typescript
const withTheme: Decorator = (story, context) => {
  const palette = context.globals.palette || 'corporate-trust';
  const mode = context.globals.mode || 'light';

  return () =>
    h(
      'div',
      {
        class: `${palette} ${mode}`,
        style: { minHeight: '100vh', padding: '1rem' },
      },
      [h(story())]
    );
};
```

**Key Features**:

1. **Wrapper div**: Applies palette and mode classes to container
2. **Fallback values**: Defaults to corporate-trust light if globals not set
3. **Automatic application**: All stories inherit decorator without modification
4. **Reactive**: Updates immediately when toolbar controls change
5. **Styling**: Adds padding and min-height for better preview appearance

**Integration with tokens.css**:

- The decorator applies classes like `.creative-energy.dark`
- These match the selectors defined in T006-T009
- CSS custom properties cascade to all child components
- Components using semantic tokens automatically reflect theme changes

## Testing Requirements

- [ ] Run Storybook: `npm run storybook`
- [ ] Open any component story (e.g., Button)
- [ ] Change palette dropdown → component colors should update instantly
- [ ] Change mode toggle → background/text colors should switch
- [ ] Test all 10 combinations (5 palettes × 2 modes)
- [ ] Verify no layout shifts or flickering
- [ ] Verify components remain functional in all themes

## GitHub Issue

**Issue**: #99
**Link**: https://github.com/webmint/jira-clone/issues/99

## Sub-branch

**Branch**: `spec/003-palette-switcher/T011-storybook-theme-decorator`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
