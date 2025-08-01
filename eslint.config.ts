import tseslint from "typescript-eslint";
import eslint from '@eslint/js';


export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2021,
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    tsx: true,
                },
                project: ["./tsconfig.json"],
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "indent": ["error", 4, { "SwitchCase": 1, }],
            "jsx-quotes": ["error", "prefer-single"],
            "quotes": ["error", "single", { "avoidEscape": true, }],
            "eqeqeq": 2,
            "semi": 1,
            "prefer-const": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "args": "all",
                    "argsIgnorePattern": "^_",
                    "caughtErrors": "all",
                    "caughtErrorsIgnorePattern": "^_",
                    "destructuredArrayIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "ignoreRestSiblings": true
                }
            ]
        },
        ignores: [
            './eslint.config.ts',
            './vite.config.ts'
        ]
    }
);