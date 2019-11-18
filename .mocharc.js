module.exports = {
  spec: 'test/**/*.test.*',
  require: ['ts-node/register/transpile-only', './test/setup.ts'],
  extension: 'ts',
  ui: 'tdd',
};
