import js from "@eslint/js";
import globals from "globals";

import tseslint from "typescript-eslint";

import eslintPluginAstro from "eslint-plugin-astro";
import eslintAstroParser from "astro-eslint-parser";

import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    ignores: ["./node_modules", ".prettierrc.cjs"],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: eslintAstroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        project: true,
        globals: { ...globals.browser, ...globals.node },
      },
    },
  },
  eslintConfigPrettier,
]);
