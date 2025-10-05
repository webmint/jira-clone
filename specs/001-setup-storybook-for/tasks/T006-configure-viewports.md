# Task T006: Configure Viewport Configurations

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:design
**Parallel**: No
**Depends On**: T003

## Description

Add mobile-first viewport configurations to `preview.ts` for testing responsive designs at different screen sizes (mobile, tablet, desktop).

## Files to Create/Modify

- `front/.storybook/preview.ts` - Add viewport parameters

## Dependencies

**Blocks**: None
**Blocked By**: T003 (modifies same file)

## Acceptance Criteria

- [ ] Mobile viewport (375px x 667px) configured
- [ ] Tablet viewport (768px x 1024px) configured
- [ ] Desktop viewport (1440px x 900px) configured
- [ ] Default viewport set to 'mobile' (mobile-first approach)
- [ ] Viewport switcher works in Storybook toolbar

## Implementation Notes

Add to parameters in `front/.storybook/preview.ts`:

```typescript
const preview: Preview = {
  parameters: {
    // ... existing parameters
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
          type: 'desktop',
        },
      },
      defaultViewport: 'mobile',
    },
  },
};
```

## Testing Requirements

- [ ] Viewport dropdown appears in Storybook toolbar
- [ ] All three viewports selectable
- [ ] Canvas resizes correctly
- [ ] Default viewport is mobile

## GitHub Issue

**Issue**: #TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T006-configure-viewports`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
