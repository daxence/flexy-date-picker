import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import unicorn from 'eslint-plugin-unicorn';
import importX from 'eslint-plugin-import-x';
import prettier from 'eslint-config-prettier';

const files = ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'];
const testFiles = ['**/*.{test,spec}.{ts,tsx}', '**/*.stories.{ts,tsx}', 'src/demo/**/*.tsx'];

export default [
  {
    ignores: ['dist/**', 'coverage/**', 'storybook-static/**', 'node_modules/**'],
  },
  {
    files,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'],
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  prettier,
  {
    files,
    plugins: {
      unicorn,
      'import-x': importX,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'import-x/no-duplicates': 'error',
      'import-x/no-useless-path-segments': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react-hooks/refs': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: testFiles,
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/no-unknown-property': 'error',
    },
  },
];