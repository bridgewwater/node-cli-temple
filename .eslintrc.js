const process = require('process');
const javascriptSettings = {
  files: ['*.js'],
  env: {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    'ecmaVersion': 12
  },
  rules: {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'no-else-return': ['error', {allowElseIf: false}],
    'semi': [
      'error',
      'always'
    ]
  }
};

module.exports = {
  plugins: ['jest'],
  overrides: [
    javascriptSettings
  ]
};