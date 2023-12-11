import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'primary-color': '#654EEE',
        'secondary-color': '#AC8BE0',
        'heavy-background':'#f5f7fd',
        'light-background': '#eef1fc'
      },
      textColor: {
        'custom-text-color': '#2E8B57',
      },
    },
  },
  plugins: [],
}
export default config
