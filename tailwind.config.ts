import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0f1117'
      },
      boxShadow: {
        rgb: '0 0 80px rgba(105, 118, 255, 0.25)',
        hotspot: '0 0 20px rgba(125, 177, 255, 0.5)'
      }
    }
  },
  plugins: []
};

export default config;
