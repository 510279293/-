module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', { code: 120 }],
    'linebreak-style': [0 ,"error", "windows"]
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@fe/startdt'],
  plugins: [
    'vue'
  ],
};
