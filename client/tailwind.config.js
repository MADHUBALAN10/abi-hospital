/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#e0f2fe',
                    DEFAULT: '#0ea5e9',
                    dark: '#0284c7',
                },
                glass: {
                    border: 'rgba(255, 255, 255, 0.9)',
                    surface: 'rgba(255, 255, 255, 0.65)',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
