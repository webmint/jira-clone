# Task T003: Configure Tailwind CSS 4.0 with @theme Directive

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T002

## Description

Configure Tailwind CSS 4.0 to use the new `@theme` directive for CSS-first configuration. This enables design tokens to be defined as CSS variables and automatically generates Tailwind utility classes.

## Files to Create/Modify

- `tailwind.config.ts` - Update to Tailwind CSS 4.0 configuration format
- `src/assets/styles/tailwind.css` - Main Tailwind entry file with @theme imports
- `vite.config.ts` - Verify PostCSS configuration for Tailwind 4.0

## Dependencies

**Blocks**: T020 (tokens.css creation depends on Tailwind config)
**Blocked By**: T002 (Tailwind CSS 4.0 must be installed)

## Acceptance Criteria

- [ ] `tailwind.config.ts` uses Tailwind CSS 4.0 configuration syntax
- [ ] `@theme` directive is properly configured
- [ ] CSS variable-based utility class generation works
- [ ] Existing Tailwind utilities still function
- [ ] Build succeeds with new configuration
- [ ] Hot module replacement (HMR) works with Tailwind 4.0
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts successfully
- [ ] ESLint: 0 errors
- [ ] TypeScript: 0 type errors

## Implementation Notes

**Tailwind CSS 4.0 Key Changes**:

- Use `@import "tailwindcss"` instead of @tailwind directives
- Define design tokens using `@theme` directive
- CSS variables are automatically generated
- Utility classes reference CSS variables

**Example Configuration**:

```typescript
// tailwind.config.ts (Tailwind CSS 4.0)
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
};

export default config;
```

```css
/* src/assets/styles/tailwind.css */
@import 'tailwindcss';

/* Design tokens will be imported here after T020 */
@import './tokens.css';
```

**Migration Notes**:

- Remove old @tailwind base, @tailwind components, @tailwind utilities
- Keep existing content paths
- Verify autoprefixer and PostCSS setup in vite.config.ts

## Testing Requirements

- [ ] Test that `class="bg-primary-500"` will work (after tokens are defined in T020)
- [ ] Verify CSS variable fallback in DevTools
- [ ] Check that Tailwind IntelliSense works in VS Code
- [ ] Test dark mode class switching (`.dark`)

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T003-configure-tailwind`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
