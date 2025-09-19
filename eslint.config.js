import js from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  js, // Flat config для JS
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: { "@typescript-eslint": typescriptPlugin },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      // ваши кастомные правила
    },
  },
];