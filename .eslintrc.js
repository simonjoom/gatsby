/*module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  }
}
*/
module.exports = {
  env: {
    browser: true,
    es6: true,
    "react-native/react-native": true
  },
  extends: [
    "standard",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
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
