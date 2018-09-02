module.exports = {
  env: {
    browser: true,
    es6: true,
    "react-native/react-native": true
  },
  extends: [
    "standard", 
    "prettier",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard", 
    "plugin:react-native/all"
  ],
  "globals": {
    "graphql": false,
    "__PATH_PREFIX__": true
  },
  plugins: ["flowtype", "react","react-native", "prettier", "standard"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: { 
  "no-use-before-define":0,
    "camelcase":0,
  "no-unused-vars":0,
  "no-unused-expressions":0,
  "eqeqeq":"warn",
  "import/no-duplicates":"warn",
  "react-native/no-unused-styles":"warn",
  "no-unneeded-ternary":"warn",
    "spaced-comment":"warn",
    "react/no-string-refs":"warn",
    "no-extra-bind":"warn",
    "react/prop-types":"warn",
     "prettier/prettier":"warn",
     "react-native/no-color-literals":"warn",
    "react-native/no-inline-styles":"warn",
  "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
  },

  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "16.0", // React version, default to the latest React stable release
      flowVersion: "0.53" // Flow version
    }
  }
};
