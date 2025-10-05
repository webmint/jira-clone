module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  vueIndentScriptAndStyle: false,
  bracketSpacing: true,
  bracketSameLine: false,
  overrides: [
    {
      files: '*.vue',
      options: {
        parser: 'vue',
      },
    },
  ],
};
