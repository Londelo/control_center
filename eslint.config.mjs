import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */

const basicSettings = {files: [ '**/*.{js,mjs,cjs,ts,tsx}' ],
  languageOptions: {
    globals: {
      ...globals.jest,
      ...globals.commonjs,
      ...globals.node,
      ...globals.browser
    },
    parser: tsParser,
    sourceType: 'module' // needed for imports / exports
  }};

const basicJsRules = {name: 'basicJsRules',
  rules: {
    // 🔹 General JavaScript & TypeScript rules
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',

    // 🔹 General JavaScript rules
    'array-callback-return': 'error',
    'complexity': [ 'error', 10 ],
    'consistent-return': 'off',
    'curly': 'error',
    'dot-notation': 'error',
    'id-length': [ 'error', {min: 2,
      exceptions: [ '_', 't', 'x', 'y' ]} ],
    'max-lines': [ 'error', 200 ],
    'max-depth': [ 'error', 2 ],
    'no-await-in-loop': 'error',
    // 'no-console': [ 'warn' ],
    'no-else-return': 'error',
    'no-delete-var': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-lone-blocks': 'error',
    'no-nested-ternary': 'error',
    'no-return-await': 'error',
    'no-param-reassign': [ 'error', { props: false } ],
    'no-plusplus': 'off',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': [ 'error', { allowTernary: true } ],
    'no-unreachable': 'error',
    'no-useless-constructor': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error'
  }};

const basicTsRules = {
  name: 'basicTsRules',
  plugins: { '@typescript-eslint': ts },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-empty-object-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-unsafe-function-type': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-wrapper-object-types': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/triple-slash-reference': 'error'
  }
};

const formattingRules = {
  name: 'formattingRules',
  plugins: { '@stylistic': stylistic },
  rules: {
    '@stylistic/indent': [ 'error', 2 ],
    '@stylistic/max-len': [ 'error', { 'code': 200 } ],
    '@stylistic/semi': [ 'error', 'always' ],
    '@stylistic/quotes': [ 'error', 'single' ],
    '@stylistic/no-extra-parens': 'error',
    '@stylistic/no-extra-semi': 'error',
    '@stylistic/comma-dangle': [ 'error', 'never' ],
    '@stylistic/arrow-parens': [ 'error', 'always' ],
    '@stylistic/comma-style': [ 'error', 'last' ],
    '@stylistic/computed-property-spacing': [ 'error', 'never', { 'enforceForClassMembers': true } ],
    // '@stylistic/curly-newline': [ 'error', 'always' ],
    '@stylistic/brace-style': [ 'error', '1tbs', { 'allowSingleLine': true } ],
    '@stylistic/block-spacing': [ 'error', 'always' ],
    '@stylistic/function-call-spacing': [ 'error', 'never' ],
    // '@stylistic/implicit-arrow-linebreak': [ 'error', 'beside' ],
    '@stylistic/lines-around-comment': [ 'error', { 'beforeBlockComment': true } ],
    // '@stylistic/object-curly-newline': [ 'error', { 'minProperties': 3 } ],
    // '@stylistic/object-property-newline': 'error',
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/space-before-function-paren': [ 'error', 'never' ],
    '@stylistic/space-in-parens': [ 'error', 'always' ],
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/spaced-comment': [ 'error', 'always' ],
    '@stylistic/arrow-spacing': [ 'error', {'before': true, 'after': true} ],
    '@stylistic/array-bracket-spacing': [ 'error', 'always', {objectsInArrays: true, arraysInArrays: true} ]
  }
};

const customRules = {
  name: 'customRules',
  plugins: {'@typescript-eslint': ts},
  rules: {
    '@typescript-eslint/no-shadow': 'error',
    'no-iterator': 'error',
    'no-restricted-syntax': [
      'error',
      'DoWhileStatement',
      'ForStatement',
      'ForInStatement',
      'ForOfStatement',
      'SwitchCase',
      'SwitchStatement',
      'WhileStatement',
      'WithStatement',
      'UnaryExpression[operator=\'delete\']'
    ]
  }
};

export default [
  basicSettings,
  basicJsRules,
  basicTsRules,
  formattingRules,
  customRules
];
