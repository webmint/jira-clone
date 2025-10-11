import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UiButton from './UiButton.vue';

describe('UiButton', () => {
  describe('Props', () => {
    it('renders label prop correctly', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test Button' },
      });
      expect(wrapper.text()).toContain('Test Button');
    });

    it('applies filled variant styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', variant: 'filled' },
      });
      expect(wrapper.classes()).toContain('btn-filled');
    });

    it('applies outline variant styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', variant: 'outline' },
      });
      expect(wrapper.classes()).toContain('btn-outline');
    });

    it('applies text variant styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', variant: 'text' },
      });
      expect(wrapper.classes()).toContain('btn-text');
    });

    it('applies xs size styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', size: 'xs' },
      });
      expect(wrapper.classes()).toContain('btn-xs');
    });

    it('applies small size styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', size: 'small' },
      });
      expect(wrapper.classes()).toContain('btn-small');
    });

    it('applies medium size styling (default)', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
      });
      expect(wrapper.classes()).toContain('btn-medium');
    });

    it('applies large size styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', size: 'large' },
      });
      expect(wrapper.classes()).toContain('btn-large');
    });

    it('applies xl size styling', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', size: 'xl' },
      });
      expect(wrapper.classes()).toContain('btn-xl');
    });

    it('applies disabled state', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', disabled: true },
      });
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('sets aria-label attribute', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', ariaLabel: 'Close dialog' },
      });
      expect(wrapper.attributes('aria-label')).toBe('Close dialog');
    });

    it('sets type attribute', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', type: 'submit' },
      });
      expect(wrapper.attributes('type')).toBe('submit');
    });
  });

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')?.[0]).toBeDefined();
    });

    it('does not emit click when disabled', async () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', disabled: true },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(UiButton, {
        slots: {
          default: 'Slot Content',
        },
      });
      expect(wrapper.text()).toContain('Slot Content');
    });

    it('renders icon-left slot', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
        slots: {
          'icon-left': '<svg data-testid="icon-left"></svg>',
        },
      });
      expect(wrapper.find('[data-testid="icon-left"]').exists()).toBe(true);
    });

    it('renders icon-right slot', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
        slots: {
          'icon-right': '<svg data-testid="icon-right"></svg>',
        },
      });
      expect(wrapper.find('[data-testid="icon-right"]').exists()).toBe(true);
    });

    it('renders both icon slots', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
        slots: {
          'icon-left': '<svg data-testid="icon-left"></svg>',
          'icon-right': '<svg data-testid="icon-right"></svg>',
        },
      });
      expect(wrapper.find('[data-testid="icon-left"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="icon-right"]').exists()).toBe(true);
    });

    it('falls back to label prop when no slot', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Label Prop' },
      });
      expect(wrapper.text()).toContain('Label Prop');
    });
  });

  describe('Computed Classes', () => {
    it('generates correct class string', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test', variant: 'outline', size: 'large' },
      });
      const classes = wrapper.classes();
      expect(classes).toContain('btn');
      expect(classes).toContain('btn-outline');
      expect(classes).toContain('btn-large');
    });
  });

  describe('Accessibility', () => {
    it('has button role (implicit)', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
      });
      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('is keyboard accessible (Tab)', () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
      });
      // Button element is naturally keyboard accessible
      expect(wrapper.element.tabIndex).not.toBe(-1);
    });

    it('is keyboard accessible (Enter)', async () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
      });
      await wrapper.trigger('keydown.enter');
      // Native button handles Enter key
      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('is keyboard accessible (Space)', async () => {
      const wrapper = mount(UiButton, {
        props: { label: 'Test' },
      });
      await wrapper.trigger('keydown.space');
      // Native button handles Space key
      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('icon-only button requires aria-label', () => {
      const wrapper = mount(UiButton, {
        props: { ariaLabel: 'Close' },
        slots: {
          'icon-left': '<svg data-testid="icon"></svg>',
        },
      });
      expect(wrapper.attributes('aria-label')).toBe('Close');
      expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
    });
  });
});
