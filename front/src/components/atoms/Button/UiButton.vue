<script setup lang="ts">
import { computed, onMounted, useSlots } from 'vue';

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

const slots = useSlots();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => {
  return ['btn', `btn-${props.variant}`, `btn-${props.size}`].join(' ');
});

// Development-time accessibility validation
onMounted(() => {
  if (import.meta.env.DEV) {
    const hasTextContent = props.label || slots.default;
    const hasIconOnly = (slots['icon-left'] || slots['icon-right']) && !hasTextContent;

    if (hasIconOnly && !props.ariaLabel) {
      // eslint-disable-next-line no-console
      console.warn(
        '[UiButton] Icon-only buttons require ariaLabel prop for WCAG 2.1 AAA compliance. ' +
          'Please provide an aria-label describing the button action.'
      );
    }
  }
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
  line-height: 1.25; /* M3 typography - ~20px at 16px base */
  letter-spacing: 0.00625em; /* 0.1px - M3 Label Large */
  transition: all var(--transition-duration-base) var(--transition-timing-ease-in-out);
  cursor: pointer;
  border: none;
  outline: none;
  position: relative;
}

/* Variant: Filled */
.btn-filled {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  box-shadow: var(--elevation-1);
}

.btn-filled::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: currentColor;
  opacity: 0;
  transition: opacity var(--transition-duration-base);
  border-radius: inherit;
  pointer-events: none;
}

.btn-filled:hover:not(:disabled) {
  box-shadow: var(--elevation-2);
}

.btn-filled:hover:not(:disabled)::before {
  opacity: 0.08;
}

.btn-filled:active:not(:disabled) {
  box-shadow: var(--elevation-1);
}

.btn-filled:active:not(:disabled)::before {
  opacity: 0.1;
}

.btn-filled:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Variant: Outline */
.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
}

.btn-outline::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-primary-500);
  opacity: 0;
  transition: opacity var(--transition-duration-base);
  border-radius: inherit;
  pointer-events: none;
}

.btn-outline:hover:not(:disabled)::before {
  opacity: 0.08;
}

.btn-outline:active:not(:disabled)::before {
  opacity: 0.1;
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

.btn-text::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--color-primary-500);
  opacity: 0;
  transition: opacity var(--transition-duration-base);
  border-radius: inherit;
  pointer-events: none;
}

.btn-text:hover:not(:disabled)::before {
  opacity: 0.08;
}

.btn-text:active:not(:disabled)::before {
  opacity: 0.1;
}

.btn-text:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Sizes */
.btn-xs {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs); /* 12px - Custom compact */
  border-radius: 16px; /* M3 scaled for compact size */
}

.btn-small {
  padding: var(--spacing-1_5) var(--spacing-3);
  font-size: var(--font-size-sm); /* 14px - M3 Label Large ✅ */
  border-radius: 20px; /* M3 standard */
}

.btn-medium {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-base); /* 16px - Slightly larger for readability */
  border-radius: 20px; /* M3 standard */
}

.btn-large {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: 18px; /* Reduced from 20px for better M3 alignment */
  border-radius: 24px; /* M3 scaled for large size */
}

.btn-xl {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: 20px; /* Reduced from 24px for better M3 alignment */
  border-radius: 28px; /* M3 scaled for xl size */
}

/* Disabled state - M3 pattern: container 12%, label 38% */

/* Filled button disabled */
.btn-filled:disabled {
  background-color: var(--color-neutral-200);
  opacity: 0.12; /* Container 12% */
  color: var(--color-text-primary);
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none; /* Remove elevation */
}

.btn-filled:disabled .btn-content,
.btn-filled:disabled .btn-icon-left,
.btn-filled:disabled .btn-icon-right {
  opacity: 3.17; /* 38% ÷ 12% = 3.17 to achieve final 38% */
}

/* Outline button disabled */
.btn-outline:disabled {
  border-color: var(--color-neutral-300);
  opacity: 0.12; /* Container 12% */
  color: var(--color-text-primary);
  cursor: not-allowed;
  pointer-events: none;
}

.btn-outline:disabled .btn-content,
.btn-outline:disabled .btn-icon-left,
.btn-outline:disabled .btn-icon-right {
  opacity: 3.17; /* 38% ÷ 12% = 3.17 to achieve final 38% */
}

/* Text button disabled */
.btn-text:disabled {
  color: var(--color-text-primary);
  opacity: 0.38; /* Label only */
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon spacing */
.btn-icon-left {
  display: inline-flex;
  margin-right: var(--spacing-1);
}

.btn-icon-right {
  display: inline-flex;
  margin-left: var(--spacing-1);
}

.btn-content {
  display: inline-flex;
  align-items: center;
}

/* Icon-only button (no text)
 * Uses :has() pseudo-class for icon-only detection
 * Browser support: Chrome 105+, Safari 15.4+, Firefox 103+ (all modern browsers from 2022+)
 * Applies square padding and removes icon margins when button contains only icons without text content
 *
 * Fallback for older browsers: Icon-only buttons will have horizontal padding instead of square,
 * but functionality remains intact. Consider adding .btn-icon-only class for better support.
 */
.btn:has(.btn-icon-left):not(:has(.btn-content)),
.btn:has(.btn-icon-right):not(:has(.btn-content)) {
  padding: var(--spacing-2);
}

/* Remove icon margins for icon-only buttons to center the icon */
.btn:has(.btn-icon-left):not(:has(.btn-content)) .btn-icon-left,
.btn:has(.btn-icon-right):not(:has(.btn-content)) .btn-icon-right {
  margin: 0;
}
</style>
