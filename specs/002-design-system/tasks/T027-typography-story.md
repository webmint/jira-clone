# Task T027: Create Typography.stories.mdx with Roboto Showcase

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: Yes [P]
**Depends On**: T020, T021, T022

## Description

Create comprehensive Storybook documentation for typography showcasing the Roboto font family with all weights, sizes, and line heights with usage examples.

## Files to Create/Modify

- `src/design-system/Typography.stories.mdx` - Typography documentation

## Dependencies

**Blocks**: None (documentation task)
**Blocked By**: T020-T022 (CSS theme definitions with typography tokens must exist)

## Acceptance Criteria

- [ ] All font weights displayed (100-900)
- [ ] All font sizes showcased (XS to 5XL)
- [ ] Line height variations demonstrated
- [ ] Typography scale visualized
- [ ] Usage examples for headings, body text, captions
- [ ] Font family information (Roboto with fallbacks)
- [ ] Responsive typography considerations
- [ ] ESLint: 0 errors
- [ ] Storybook renders typography correctly

## Implementation Notes

**Typography Story** (`src/design-system/Typography.stories.mdx`):

````mdx
import { Meta, Typeset } from '@storybook/blocks';

<Meta title="Design System/Typography" />

# Typography

Our design system uses **Roboto** as the primary font family, providing a clean, modern, and highly readable typeface optimized for digital interfaces.

## Font Family

**Primary**: Roboto
**Fallbacks**: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
**Mono**: Roboto Mono, JetBrains Mono, ui-monospace, monospace

Roboto is loaded via Google Fonts CDN with weights: 100, 300, 400, 500, 700, 900.

## Font Weights

<div style="display: grid; gap: 1rem;">
  <div style="font-weight: 100; font-size: 2rem;">Thin (100) - Aa Bb Cc</div>
  <div style="font-weight: 300; font-size: 2rem;">Light (300) - Aa Bb Cc</div>
  <div style="font-weight: 400; font-size: 2rem;">Normal (400) - Aa Bb Cc</div>
  <div style="font-weight: 500; font-size: 2rem;">Medium (500) - Aa Bb Cc</div>
  <div style="font-weight: 700; font-size: 2rem;">Bold (700) - Aa Bb Cc</div>
  <div style="font-weight: 900; font-size: 2rem;">Black (900) - Aa Bb Cc</div>
</div>

## Font Size Scale

<Typeset
  fontSizes={[
    '0.75rem', // XS
    '0.875rem', // SM
    '1rem', // BASE
    '1.125rem', // LG
    '1.25rem', // XL
    '1.5rem', // 2XL
    '1.875rem', // 3XL
    '2.25rem', // 4XL
    '3rem', // 5XL
  ]}
  fontWeight={400}
  sampleText="The quick brown fox jumps over the lazy dog"
/>

### Size Reference

| Token       | Size     | px (16px base) | Usage               |
| ----------- | -------- | -------------- | ------------------- |
| `text-xs`   | 0.75rem  | 12px           | Captions, metadata  |
| `text-sm`   | 0.875rem | 14px           | Small text, labels  |
| `text-base` | 1rem     | 16px           | Body text (default) |
| `text-lg`   | 1.125rem | 18px           | Emphasized text     |
| `text-xl`   | 1.25rem  | 20px           | Subheadings         |
| `text-2xl`  | 1.5rem   | 24px           | H3 headings         |
| `text-3xl`  | 1.875rem | 30px           | H2 headings         |
| `text-4xl`  | 2.25rem  | 36px           | H1 headings         |
| `text-5xl`  | 3rem     | 48px           | Display headings    |

## Line Heights

<div style="display: grid; gap: 2rem;">
  <div>
    <h4>Tight (1.25)</h4>
    <p style="line-height: 1.25; font-size: 1.125rem; max-width: 40ch;">
      The quick brown fox jumps over the lazy dog. This text demonstrates tight line height, which is useful for headings and display text where compact spacing is desired.
    </p>
  </div>

<div>
  <h4>Normal (1.5)</h4>
  <p style="line-height: 1.5; font-size: 1rem; max-width: 60ch;">
    The quick brown fox jumps over the lazy dog. This text demonstrates normal line height, which is
    the default for body text and provides optimal readability for longer content.
  </p>
</div>

  <div>
    <h4>Relaxed (1.75)</h4>
    <p style="line-height: 1.75; font-size: 1rem; max-width: 60ch;">
      The quick brown fox jumps over the lazy dog. This text demonstrates relaxed line height, which provides generous spacing for improved scannability in documentation or marketing content.
    </p>
  </div>
</div>

## Typography Patterns

### Headings

<div style="display: grid; gap: 1rem;">
  <h1 style="font-size: var(--text-4xl); font-weight: 700; line-height: var(--leading-tight);">
    Heading 1 (4XL Bold Tight)
  </h1>
  <h2 style="font-size: var(--text-3xl); font-weight: 700; line-height: var(--leading-tight);">
    Heading 2 (3XL Bold Tight)
  </h2>
  <h3 style="font-size: var(--text-2xl); font-weight: 600; line-height: var(--leading-tight);">
    Heading 3 (2XL Semibold Tight)
  </h3>
  <h4 style="font-size: var(--text-xl); font-weight: 600; line-height: var(--leading-normal);">
    Heading 4 (XL Semibold Normal)
  </h4>
</div>

### Body Text

<div style="display: grid; gap: 1rem; max-width: 60ch;">
  <p style="font-size: var(--text-base); line-height: var(--leading-normal); color: var(--color-text-primary);">
    <strong>Primary Body Text (BASE Normal)</strong><br/>
    This is the default body text style. It uses base font size (1rem / 16px) with normal line height (1.5) and primary text color for optimal readability.
  </p>

<p style="font-size: var(--text-base); line-height: var(--leading-normal); color: var(--color-text-secondary);">
  <strong>Secondary Body Text (BASE Normal)</strong>
  <br />
  This is secondary text with reduced emphasis. It uses the same size but secondary text color for
  less important information.
</p>

  <p style="font-size: var(--text-sm); line-height: var(--leading-normal); color: var(--color-text-tertiary);">
    <strong>Tertiary / Caption Text (SM Normal)</strong><br/>
    This is tertiary text or captions. It uses a smaller font size (0.875rem / 14px) with tertiary color for metadata and annotations.
  </p>
</div>

## Usage

### In Templates (Tailwind Classes)

```vue
<template>
  <h1 class="text-4xl font-bold leading-tight">Page Heading</h1>
  <p class="text-base leading-normal text-[--color-text-primary]">Body text content</p>
  <span class="text-sm text-[--color-text-tertiary]">Metadata</span>
</template>
```
````

### In Templates (CSS Variables)

```vue
<template>
  <h1
    :style="{
      fontSize: 'var(--text-4xl)',
      fontWeight: 'var(--font-bold)',
      lineHeight: 'var(--leading-tight)',
    }"
  >
    Page Heading
  </h1>
</template>
```

### Typography Utility Classes (Generated from @theme)

```html
<!-- Font sizes -->
<p class="text-xs">Extra small</p>
<p class="text-base">Base size</p>
<p class="text-4xl">Display heading</p>

<!-- Font weights -->
<span class="font-light">Light</span>
<span class="font-normal">Normal</span>
<span class="font-bold">Bold</span>

<!-- Line heights -->
<p class="leading-tight">Tight spacing</p>
<p class="leading-normal">Normal spacing</p>
<p class="leading-relaxed">Relaxed spacing</p>
```

## Accessibility

- Base font size: 16px (1rem) - Respects user browser settings
- Rem units: All sizes scale with user preferences
- Line height: Minimum 1.5 for body text (WCAG 2.1 AA)
- Contrast: All text meets WCAG AAA standards (7:1)
- Readability: Optimal line length 60-75 characters

## Best Practices

1. **Use semantic HTML**: Use `<h1>-<h6>` for headings, `<p>` for paragraphs
2. **Maintain hierarchy**: Don't skip heading levels
3. **Optimize line length**: 60-75 characters for body text
4. **Choose appropriate weights**: Reserve bold (700+) for emphasis
5. **Use rem units**: Allow users to adjust font sizes

```

## Testing Requirements

- [ ] Verify all font weights render correctly
- [ ] Test font size scale displays
- [ ] Check line height variations
- [ ] Verify typography tokens work in examples
- [ ] Test in both light and dark Storybook themes
- [ ] Check Roboto font loads from Google Fonts
- [ ] Visual inspection of typography hierarchy

## GitHub Issue

**Issue**: #[issue-number]
**Link**: [GitHub issue URL]

## Sub-branch

**Branch**: `spec/002-design-system/T027-typography-story`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
```
