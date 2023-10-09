// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import("eslint").Linter.Config} */
const config = {
   overrides: [
      {
         files: ['*.ts', '*.tsx'],
         parserOptions: {
            project: path.join(__dirname, 'tsconfig.json'),
         },
      },
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      project: path.join(__dirname, 'tsconfig.json'),
   },
   plugins: ['@typescript-eslint'],
   extends: ['next/core-web-vitals'],
   rules: {
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'warn',
   },
};

module.exports = config;
