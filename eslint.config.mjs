import jest from 'eslint-plugin-jest';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    plugins: {
      jest,
    }
  },
  ...compat.extends('eslint:recommended', 'plugin:jest/recommended').map((config) => ({
    ...config,
    files: ['**/*.js']
  })),
  {
    files: ['**/*.js'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs
      },

      ecmaVersion: 12,
      sourceType: 'script'
    },

    rules: {
      'indent': [
        'error',
        2,
      ],
      'quotes': [
        'error',
        'single',
      ],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
      'semi': [
        'error',
        'always',
      ],
    },
  }
];
