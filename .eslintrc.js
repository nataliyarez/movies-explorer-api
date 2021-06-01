module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
        'no-underscore-dangle': ['error', { allow: ['_id'] }],

    },
}
