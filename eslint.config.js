import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import tailwind from "eslint-plugin-tailwindcss";
import pluginRouter from '@tanstack/eslint-plugin-router'

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tailwind.configs["flat/recommended"], ...pluginRouter.configs['flat/recommended']],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["off", { allowConstantExport: true }],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/ban-ts-comment": "off",
			"object-curly-spacing": ["warn", "always"],
			"array-bracket-spacing": ["warn", "always"],
			"computed-property-spacing": ["warn", "always"],
			"space-in-parens": ["warn", "always"],
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"no-mixed-spaces-and-tabs": "off",
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": "warn",
			"@typescript-eslint/ban-types": "off",
			"func-style": ["warn", "expression"],
		},
	},
)
