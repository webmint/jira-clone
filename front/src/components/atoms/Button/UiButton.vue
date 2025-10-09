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
  variant: 'filled',
  size: 'medium',
  disabled: false,
  loading: false,
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
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  // TODO(T003): Replace with semantic CSS classes using design system tokens
  // These Tailwind utility classes are temporary placeholders
  const variantClasses = {
    filled: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
    outline:
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400',
    text: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
  };

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded',
    small: 'px-3 py-1.5 text-sm rounded-md',
    medium: 'px-4 py-2 text-base rounded-lg',
    large: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 py-4 text-xl rounded-xl',
  };

  return [baseClasses, variantClasses[props.variant], sizeClasses[props.size]].join(' ');
});
</script>

<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled || loading" :aria-label="ariaLabel" @click="handleClick">
    <svg
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin"
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
    {{ label }}
  </button>
</template>
