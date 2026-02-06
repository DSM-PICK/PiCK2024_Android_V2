import expo from "eslint-config-expo/flat.js";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  ...expo,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  configPrettier,
  {
    ignores: [
      ".expo/*",
      "node_modules/*",
      "babel.config.js",
      "metro.config.js",
      "react-native.config.js",
      "test-eslint.js",
    ],
  },
];
