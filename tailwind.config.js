/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                pie: 'pie linear',
            },
        },
    },
    plugins: ['prettier-plugin-tailwindcss'],
};
