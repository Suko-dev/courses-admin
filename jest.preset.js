const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  transform: { '^.+\\.ts?$': ['@swc/jest'] },
  // testRegex: '.*\\..*spec\\.ts$',
};
