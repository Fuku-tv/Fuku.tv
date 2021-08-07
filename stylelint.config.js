/** @type {import("stylelint").Configuration } */

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  rules: { 'max-nesting-depth': 1 },
};
