module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"], // enable ESLint defaults, Airbnb rules, and prettier
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // ❗ Allow identifiers like _id (common in MongoDB)
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
