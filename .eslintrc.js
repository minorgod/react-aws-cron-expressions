module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'arrow-parens': ['error', 'as-needed'],
    'padded-blocks': 0,
    'no-unused-vars': ['warn', {
      vars: 'all', args: 'after-used', ignoreRestSiblings: false
    }],
    'object-curly-spacing': 0,
    'object-curly-newline': ['warn', {
      ObjectExpression: {
        multiline: true, minProperties: 3, consistent: true
      },
      ObjectPattern: {
        multiline: true, minProperties: 3, consistent: true
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 3, consistent: true
      }
    }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': ['error', {
      max: 2, maxEOF: 0, maxBOF: 1
    }],
    'no-multi-spaces': 'warn',
    'key-spacing': 'warn',
    'import/order': ['warn', {
      alphabetize: {
        order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
        caseInsensitive: true /* ignore case. Options: [true, false] */
      }
    }],
    'sort-imports': ['warn', {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: false
    }]
  }
}
