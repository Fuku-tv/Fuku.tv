/** @type {import("stylelint").Configuration } */
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules', 'stylelint-config-prettier'],
  rules: { 'max-nesting-depth': 4 },
};
