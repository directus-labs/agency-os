import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const defaultRules = {
	// No console statements in production
	'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	// No debugger statements in production
	'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	// Enforce prettier formatting
	'prettier/prettier': 'error',
	'padding-line-between-statements': [
		'error',
		{
			blankLine: 'always',
			prev: [
				'block',
				'block-like',
				'cjs-export',
				'class',
				'export',
				'import',
				'multiline-block-like',
				'multiline-const',
				'multiline-expression',
				'multiline-let',
				'multiline-var',
			],
			next: '*',
		},
		{
			blankLine: 'always',
			prev: ['const', 'let'],
			next: ['block', 'block-like', 'cjs-export', 'class', 'export', 'import'],
		},
		{
			blankLine: 'always',
			prev: '*',
			next: ['multiline-block-like', 'multiline-const', 'multiline-expression', 'multiline-let', 'multiline-var'],
		},
		{ blankLine: 'any', prev: ['export', 'import'], next: ['export', 'import'] },
	],
	'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
	'no-nested-ternary': 'error',
	curly: ['error', 'multi-line'],
};

export default tseslint.config(
	{ ignores: ['.nuxt/', '.output/', 'dist/', 'coverage/', 'node_modules/', '**/*.d.ts'] },
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: { prettier: prettierPlugin },
		extends: [js.configs.recommended, prettierConfig],
		rules: defaultRules,
	},
	{
		files: ['**/*.ts', '**/*.vue'],
		extends: [...tseslint.configs.recommended, ...vue.configs['flat/recommended'], prettierConfig],
		languageOptions: {
			parserOptions: { parser: tseslint.parser },
		},
		rules: {
			...defaultRules,
			'vue/multi-word-component-names': 'off',
			'vue/require-default-prop': 'off',
			// It's recommended to turn off this rule on TypeScript projects
			'no-undef': 'off',
			// Allow ts-directive comments (used to suppress TypeScript compiler errors)
			'@typescript-eslint/ban-ts-comment': 'off',
			// Allow usage of the any type (consider to enable this rule later on)
			'@typescript-eslint/no-explicit-any': 'off',
			// Allow usage of require statements (consider to enable this rule later on)
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			// Allow non-null assertions for now (consider to enable this rule later on)
			'@typescript-eslint/no-non-null-assertion': 'off',
			// Allow unused arguments and variables when they begin with an underscore
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		},
	},
);
