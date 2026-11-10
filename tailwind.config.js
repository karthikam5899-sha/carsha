/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
    colors: { ink: '#19233b', muted: '#707b91', lime: '#c6ef73', paper: '#f5f6fb', primary: '#5148e5' },
    boxShadow: { soft: '0 16px 45px rgba(25,35,59,.08)' }
  }},
  plugins: []
}