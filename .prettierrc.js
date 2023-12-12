/** @type {import('prettier').Config} */
const config = {
    tabWidth: 4,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: true,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    singleAttributePerLine: false,
    plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
