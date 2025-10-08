import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    ignores: [
      'node_modules/',
      'test-results/',
      'playwright-report/',
      'package-lock.json',
      '/playwright/.cache/',
    ],
    rules: {
      'no-unused-vars': 1,
    },
  },
]);
