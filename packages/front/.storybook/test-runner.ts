import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    // Inject axe-core before each story visit for accessibility testing
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get story context
    const storyContext = await getStoryContext(page, context);

    // Run accessibility checks on each story
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // Axe configuration for WCAG 2.1 AA compliance
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        },
      },
    });

    // Log story name for debugging
    if (process.env.DEBUG) {
      console.log(`Tested story: ${storyContext.title} - ${storyContext.name}`);
    }
  },
};

export default config;
