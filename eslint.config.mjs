import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default [
    eslint.configs.recommended,
    tsEslint.configs.eslintRecommended,
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.recommendedTypeChecked,

    {
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: 'tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    {
        ignores: ['**/*.json', '**/*.js', '**/*.cjs', '**/*.mjs', '.next/**/*'],
    },

    {
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/restrict-template-expressions': 'warn',
            '@typescript-eslint/no-unnecessary-template-expression': 'warn',
            '@typescript-eslint/no-unnecessary-condition': 'warn',
        },
    },

    {
        files: ['components/ui/**/*.*'],
        rules: {
            'react/prop-types': 'off',
        },
    },
];
