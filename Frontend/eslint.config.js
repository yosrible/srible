import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import cssModules from 'eslint-plugin-css-modules'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'css-modules': cssModules,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // CSS Modules rules
      'css-modules/no-unused-class': ['warn', { camelCase: true }],
      'css-modules/no-undef-class': ['warn', { camelCase: true }],
    },
  },
  {
    files: ['**/*.css'],
    ...cssModules.configs.recommended,
  },
])
