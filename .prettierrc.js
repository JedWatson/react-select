module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '.changeset/pre.json',
      options: { parser: 'json-stringify' },
    },
  ],
};
