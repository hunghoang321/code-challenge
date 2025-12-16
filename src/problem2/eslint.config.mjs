import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore auto-generated shadcn/ui components
    "components/ui/**",
  ]),
  {
    rules: {
      // Disallow explicit 'any' type
      "@typescript-eslint/no-explicit-any": "error",

      // Disallow 'type' keyword in imports - enforce inline types
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "no-type-imports", // Disallow separate type imports
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
]);

export default eslintConfig;
