module.exports = {
    parser: "@typescript-eslint/parser", // perei 11:00
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: ["react", "prettier", "@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ["node_modules/", "_explicacoes/"],
    rules: {},
};
