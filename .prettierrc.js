module.exports = {
  trailingComma: 'es5',
  singleQuote: true,
  overrides: [
    {
      files: 'src/**/*.js',
      options: {
        trailingComma: 'all',
      },
    },
  ],
};
