/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        blueLight: '#05B2DC',
        blueStrong: '#087CA7',
      },
      fontFamily: {
        Brisbane: ['brisbane', 'sans-serif'],
        Teko: ['teko', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
