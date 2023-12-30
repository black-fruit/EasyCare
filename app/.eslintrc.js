module.exports = {
  "extends": [
    'alloy',
    'alloy/typescript',
  ],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "react/jsx-no-bind": 0,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-no-undef": 2,
    "react/no-did-mount-set-state": 0,
    "react/no-did-update-set-state": 2,
    "react/react-in-jsx-scope": 2,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/interface-name-prefix": ["warn", { "prefixWithI": "always" } ],
    // class 属性或方法没有控制权限描述符不报错
    "@typescript-eslint/explicit-member-accessibility": 0,
    // 类型声明作为类型使用、namespace导出类型不报错 https://github.com/typescript-eslint/typescript-eslint/issues/61
    "@typescript-eslint/no-unused-vars": 2,
    // 使用 type 声明不报错
    "@typescript-eslint/consistent-type-definitions": 0,
    // class中的方法声明不需要遵循public-protected-private顺序 https://github.com/typescript-eslint/typescript-eslint/blob/v2.24.0/packages/eslint-plugin/docs/rules/member-ordering.md
    "@typescript-eslint/member-ordering": 0,
    "@typescript-eslint/no-this-alias": 1,
    "@typescript-eslint/no-require-imports": 0,
    "no-var": 0,
    "@typescript-eslint/prefer-for-of": 0,
    // try-catch 内部不允许定义变量
    "no-inner-declarations": 0,
    "max-params": ["error", 6],
    // node端没有babel处理，不使用可选链
    "@typescript-eslint/prefer-optional-chain": 0,
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true
  },
  "globals": {
    MtaH5: "readonly",
    APP_PATH: "readonly",
    easicareStart: "readonly",
    log: "readonly",
    config: "readonly",
  }
}
