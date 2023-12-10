import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: false,
        extend: {
            animation: {
                pie: 'pie linear',
            },
        },
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('ar-ls', '@media (min-aspect-ratio: 1/1)');

            addVariant(
                'sm',
                '@media (min-width: 640px) and (min-height: 360px)'
            );
            addVariant(
                'md',
                '@media (min-width: 768px) and (min-height: 432px)'
            );
            addVariant(
                'lg',
                '@media (min-width: 1024px) and (min-height: 576px)'
            );
            addVariant(
                'xl',
                '@media (min-width: 1280px) and (min-height: 720px)'
            );
            addVariant(
                '2xl',
                '@media (min-width: 1536px) and (min-height: 864px)'
            );
        }),
    ],
};
