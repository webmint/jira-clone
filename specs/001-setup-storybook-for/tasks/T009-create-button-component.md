# Task T009: Create Example Button Component

**Status**: Pending
**Priority**: P1-high
**Agent**: agent:frontend
**Parallel**: No
**Depends On**: T001-T006 complete

## Description

Create an example Button component demonstrating all design system patterns including variants, sizes, states, and Tailwind CSS styling.

## Files to Create/Modify

- `front/src/components/atoms/Button/Button.vue` - Create new component

## Dependencies

**Blocks**: T010 (stories need component to exist)
**Blocked By**: T001-T006 (needs Storybook configured)

## Acceptance Criteria

- [ ] Component created in atoms folder
- [ ] TypeScript props properly typed
- [ ] Variants: primary, secondary, danger, ghost
- [ ] Sizes: sm, md, lg
- [ ] States: default, disabled, loading
- [ ] Tailwind CSS only (no custom CSS)
- [ ] Accessible (proper button semantics)
- [ ] TypeScript compiles without errors

## Implementation Notes

```vue
<script setup lang="ts">
defineProps<{
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    :class="[
      'font-medium rounded-lg transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Variants
      variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
      variant === 'secondary' &&
        'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
      variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
      variant === 'ghost' && 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500',
      // Sizes
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2 text-base',
      size === 'lg' && 'px-6 py-3 text-lg',
    ]"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <span v-if="loading">Loading...</span>
    <span v-else>{{ label }}</span>
  </button>
</template>
```

## Testing Requirements

- [ ] Component renders in isolation
- [ ] All variants visually distinct
- [ ] Disabled state prevents clicks
- [ ] Loading state shows indicator
- [ ] TypeScript types work correctly

## GitHub Issue

**Issue**: #TBD

## Sub-branch

**Branch**: `spec/001-setup-storybook-for/T009-create-button-component`

## Approval

- [ ] ⚠️ User approval obtained
- [ ] PR created
- [ ] PR merged
