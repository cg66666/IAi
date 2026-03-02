/*
 * @Description: file content
 * @Author: cg
 * @Date: 2026-02-18 00:54:03
 * @LastEditors: cg
 * @LastEditTime: 2026-03-02 11:31:09
 */
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactRefresh from 'eslint-plugin-react-refresh'

import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist']),
  prettierConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          // 📦 使用正则表达式定义分组
          groups: [
            // 侧边效应 imports (如 import 'polyfill')
            ['^\\u0000'],

            // React 相关（优先）
            ['^react', '^react-dom$'],

            // npm 包 (@开头或其他)
            ['^@?\\w'],

            // 内部模块 (@ 或特定目录)
            ['^(@|components|utils)(/.*|$)'],

            // 父级目录 (../)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // 当前目录子文件夹 (./folder/)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // 样式文件
            ['^.+\\.?(css|scss|less)$'],

            // 其他
            ['^']
          ]
        }
      ],
      'simple-import-sort/exports': 'error',
      // 'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off',
      // 'simple-import-sort/exports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off'
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
])
