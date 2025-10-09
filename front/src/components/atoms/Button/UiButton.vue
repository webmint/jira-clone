<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /**
   * Button label text.
   * Optional for icon-only buttons, but ariaLabel must be provided in that case.
   */
  label?: string;
  /** Visual style variant */
  variant?: 'filled' | 'outline' | 'text';
  /** Size variation */
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /**
   * ARIA label for accessibility.
   * REQUIRED when label is not provided (icon-only buttons) for WCAG 2.1 AAA compliance.
   */
  ariaLabel?: string;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  variant: 'filled',
  size: 'medium',
  disabled: false,
  loading: false,
  ariaLabel: undefined,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => {
  return ['btn', `btn-${props.variant}`, `btn-${props.size}`].join(' ');
});
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span v-if="loading || $slots['icon-left']" class="btn-icon-left">
      <svg
        v-if="loading"
        class="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <slot v-if="!loading" name="icon-left" />
    </span>
    <span v-if="$slots.default || label" class="btn-content">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="$slots['icon-right']" class="btn-icon-right">
      <slot name="icon-right" />
    </span>
  </button>
</template>

<style scoped>
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-duration-base) var(--transition-timing-ease-in-out);
  cursor: pointer;
  border: none;
  outline: none;
}

/* Variant: Filled */
.btn-filled {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
}

.btn-filled:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.btn-filled:active:not(:disabled) {
  background-color: var(--color-primary-700);
}

.btn-filled:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Variant: Outline */
.btn-outline {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.btn-outline:hover:not(:disabled) {
  background-color: var(--color-primary-50);
}

.btn-outline:active:not(:disabled) {
  background-color: var(--color-primary-100);
}

.btn-outline:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Variant: Text */
.btn-text {
  background-color: transparent;
  color: var(--color-primary-500);
}

.btn-text:hover:not(:disabled) {
  background-color: var(--color-primary-50);
}

.btn-text:active:not(:disabled) {
  background-color: var(--color-primary-100);
}

.btn-text:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Sizes */
.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  border-radius: var(--border-radius-sm);
}

.btn-small {
  padding: var(--spacing-1_5) var(--spacing-3);
  font-size: var(--font-size-sm);
  border-radius: var(--border-radius-md);
}

.btn-medium {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-lg);
}

.btn-large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
  border-radius: var(--border-radius-lg);
}

.btn-xl {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-xl);
  border-radius: var(--border-radius-xl);
}

/* Disabled state */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon spacing */
.btn-icon-left {
  display: inline-flex;
  margin-right: var(--spacing-2);
}

.btn-icon-right {
  display: inline-flex;
  margin-left: var(--spacing-2);
}

.btn-content {
  display: inline-flex;
  align-items: center;
}

/* Icon-only button (no text) */
.btn:has(.btn-icon-left):not(:has(.btn-content)),
.btn:has(.btn-icon-right):not(:has(.btn-content)) {
  padding: var(--spacing-2);
}
</style>
