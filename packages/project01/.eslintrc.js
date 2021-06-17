/*
 * @Author: linkenzone
 * @Date: 2021-05-29 14:50:05
 * @Descripttion: Do not edit
 */
// https://eslint.bootcss.com

// module.exports = {
//   root: true,
//   parser: 'babel-eslint',
//   extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
//   parserOptions: {
//     ecmaVersion: 9,
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true
//     }
//   },
//   plugins: ['prettier'],
//   env: {
//     browser: true,
//     node: true,
//     es6: true
//   }
// }

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
    '@typescript-eslint/consistent-type-imports': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/consistent-indexed-object-style': 0,
  },
  // root: true,
  // parser: "babel-eslint",
  // parserOptions: {
  //   ecmaVersion: 9,
  //   sourceType: "module",
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  // },
  // env: {
  //   browser: true,
  //   node: true,
  //   es6: true,
  // },
};
