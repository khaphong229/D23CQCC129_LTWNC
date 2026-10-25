import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import storybook from 'eslint-plugin-storybook';

export default antfu(
  {
    react: true,
    typescript: true,
    lessOpinionated: true,
    isInEditor: false,
    stylistic: {
      semi: true,
    },
    formatters: {
      css: true,
    },
    ignores: [
      'migrations/**/*',
      'plans/**/*',
      '**/*.d.ts',
    ],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  jsxA11y.flatConfigs.recommended,
  {
    files: [
      '**/*.test.ts?(x)',
    ],
    ...jestDom.configs['flat/recommended'],
  },
  {
    files: [
      '**/*.spec.ts',
      '**/*.e2e.ts',
    ],
    ...playwright.configs['flat/recommended'],
  },
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'antfu/no-top-level-await': 'off',
      'style/brace-style': ['error', '1tbs'],
      'ts/consistent-type-definitions': 'off',
      'react/prefer-destructuring-assignment': 'off',
      'node/prefer-global/process': 'off',
      'test/padding-around-all': 'error',
      'test/prefer-lowercase-title': 'off',
      'eslint no-console': 'off',
      '@stylistic/no-tabs': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
      'react-refresh/only-export-components': 'off',
      'react/no-array-index-key': 'off',
    },
  },
);
