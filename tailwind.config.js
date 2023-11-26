const TAU = 2 * Math.PI;

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                pie: {
                    '0%': {'stroke-dasharray': `0 ${TAU}`},
                    '100%': {'stroke-dasharray': `${TAU} ${TAU}`},
                }
            },
            animation: {
                pie: 'pie linear'
            },
        },
    },
    plugins: [],
}
