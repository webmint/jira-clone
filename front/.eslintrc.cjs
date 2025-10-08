/* eslint-env node */
// eslint-disable-next-line
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'vue/multi-word-component-names': 'error',
    'vue/no-unused-vars': 'error',
    'vue/require-default-prop': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/define-emits-declaration': ['error', 'type-based'],
    'vue/define-props-declaration': ['error', 'type-based'],
    'vue/no-template-target-blank': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'always',
        tsx: 'never',
        vue: 'always',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.ts', '**/*.test.ts', '**/vite.config.ts'],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  /**
   * NAMING CONVENTIONS (Enforced via code review):
   * - Files and folders: camelCase (e.g., designSystem/, userService.ts)
   * - Vue components: PascalCase (e.g., UserCard.vue)
   * - Config files: any case (e.g., vite.config.ts)
   * - Type files: camelCase with .d.ts (e.g., types.d.ts)
   */
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        alias: {
          map: [
            ['@/', './src'],
            ['~@', './src'],
          ],
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      },
    },
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.js', '*.config.ts'],
};
