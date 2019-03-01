module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'semi': [ 'error', 'always' ],
    'no-unused-vars': [ 'error', { 'args': 'none' } ],
    'no-undef': 'error',
    'no-var': 'error',
    'no-const-assign': 'error',
    'comma-dangle': [ 'error', 'never' ],
    'require-await': 'error',
    'no-return-await': 'error',
    'prefer-const': 'error',
    'no-extra-semi': 'error',
    'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
    'key-spacing': [ 'error', { 'beforeColon': false, 'afterColon': true } ],
    'space-in-parens': [ 'error', 'never' ],
    'block-spacing': [ 'error', 'never' ],
    'no-mixed-spaces-and-tabs': 'error',
    'array-bracket-spacing': [ 'error', 'never' ],
    'no-trailing-spaces': 'error',
    'computed-property-spacing': [ 'error', 'never' ],
    'rest-spread-spacing': [ 'error', 'never' ],
    'space-before-function-paren': [ 'error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'always' ],
    'no-multi-spaces': 'error',
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ]
  }
};
