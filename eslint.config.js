import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  js.configs.recommended,
  // standard,
  ...compat.extends('eslint-config-standard'),
  // import sort
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'import/first': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^next', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  // next
  ...compat.config({
    extends: ['next/core-web-vitals', 'next'],
    rules: {
      'react/destructuring-assignment': 'error',
      'react/function-component-definition': [
        2,
        { namedComponents: 'arrow-function' },
      ],
      'react/hook-use-state': 'error',
      'react/jsx-boolean-value': 2,
      'react/jsx-fragments': 2,
      'react/jsx-no-leaked-render': 1,
      'react/jsx-no-useless-fragment': 2,
      'react/jsx-sort-props': 2,
      'react/no-array-index-key': 2,
      'react/self-closing-comp': 2,

      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/click-events-have-key-events': 0,
    },
  }),
  // ESLint
  {
    name: 'baseRules',
    rules: {
      'array-callback-return': ['error', { checkForEach: true }],
      'no-await-in-loop': 'warn',
      'no-self-compare': 'warn',
      'no-unmodified-loop-condition': 'error',
      'no-use-before-define': 'error',
      'default-case-last': 'error',
      'default-param-last': 'off',
      eqeqeq: ['error', 'always'],
      'no-alert': 'warn',
      'no-console': 'warn',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-param-reassign': 'error',
      'no-unneeded-ternary': 'warn',
      'no-useless-concat': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'operator-assignment': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      yoda: 'error',
      'no-undef': 'off',
    },
  },
  // prettier
  eslintPluginPrettierRecommended,
]

export default eslintConfig
