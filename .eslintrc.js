module.exports = {
   env: {
      browser: true,
      es2021: true,
      jest: true,
      amd: true,
      node: true
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended'
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: [
      'react',
      '@typescript-eslint',
      'typescript-sort-keys',
      'unused-imports'
   ],
   rules: {
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
      'react/jsx-filename-extension': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/destructuring-assignment': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/require-default-props': 'off',
      indent: 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'no-nested-ternary': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-var-requires': 'warn'
   }
};
