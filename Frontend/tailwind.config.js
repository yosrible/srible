/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000000',
        'primary-white': '#f8f8f5',
        'gray-light': '#f7f7fa',
        'gray-medium': '#e5e7eb',
        'gray-dark': '#666666',
        'accent': {
          DEFAULT: '#000000',
          light: '#333333',
          dark: '#000000'
        },
        'secondary': {
          DEFAULT: '#666666',
          light: '#999999',
          dark: '#333333'
        },
        'tertiary': {
          DEFAULT: '#000000',
          light: '#333333',
          dark: '#000000'
        }
      },
      borderRadius: {
        DEFAULT: '0.75rem'
      },
      transitionDuration: {
        DEFAULT: '0.22s'
      },
      fontFamily: {
        'sans': ['Inter', 'Arial', 'sans-serif'],
        'heading': ['Poppins', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}