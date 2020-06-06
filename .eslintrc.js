module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
