module.exports = exports = {
  env: {
    jest: true,
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended", "react-app"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "no-console": [
      "error",
      {
        allow: ["info", "warn", "error"]
      }
    ]
  }
};
