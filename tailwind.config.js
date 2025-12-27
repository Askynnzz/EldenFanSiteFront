/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        elden: {
          bg: '#050505',        // Noir abyssal
          gold: '#C6A96E',      // Or terni
          pale: '#EAE6D8',      // Ossement
          accent: '#FFD700',    // Or divin (lumière)
          fog: '#1A1A1A',       // Gris brume
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)'],
        sans: ['var(--font-cormorant)'],
        
      },
      backgroundImage: {
        'vignette': 'radial-gradient(circle, transparent 0%, #050505 120%)',
      },
    },
  },
  plugins: [],
}