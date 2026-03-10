/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts,scss}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B0F19',
                surface: '#1A2235',
                primary: '#3B82F6',
                secondary: '#8B5CF6',
                accent: '#10B981'
            }
        },
    },
    plugins: [],
}
