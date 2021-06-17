/*
 * @Author: linkenzone
 * @Date: 2021-06-17 17:15:56
 * @Descripttion: Do not edit
 */

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/naming-convention': 0,
    'react-hooks/exhaustive-deps': 0,
  },
};
