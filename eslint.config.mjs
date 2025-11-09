import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default [
    ...next,
    ...nextCoreWebVitals,
    ...nextTypescript,
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
        ignores: [
            'src/payload-types.ts',
            'src/migrations/**',

            '**/*.json',
            '**/*.js',
            '**/*.cjs',
            '**/*.mjs',
            '.next/**/*',
        ],
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
    }
];
