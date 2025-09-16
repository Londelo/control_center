
import type { Config } from "tailwindcss"

const PAGES_PATH = './pages/**/*.{ts,tsx}'
const COMPONENTS_PATH = './components/**/*.{ts,tsx}'
const APP_PATH = './app/**/*.{ts,tsx}'
const SRC_PATH = './src/**/*.{ts,tsx}'
const DARK_MODE_CLASS = 'class'
const CONTAINER_PADDING = '2rem'
const CONTAINER_SCREEN_2XL = '1400px'
const RADIUS = 'var(--radius)'
const RADIUS_MD = 'calc(var(--radius) - 2px)'
const RADIUS_SM = 'calc(var(--radius) - 4px)'
const ACCORDION_DOWN = 'accordion-down'
const ACCORDION_UP = 'accordion-up'
const ACCORDION_DOWN_ANIMATION = 'accordion-down 0.2s ease-out'
const ACCORDION_UP_ANIMATION = 'accordion-up 0.2s ease-out'

const getTailwindConfig = (): Config => ({
  darkMode: DARK_MODE_CLASS,
  content: [PAGES_PATH, COMPONENTS_PATH, APP_PATH, SRC_PATH],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: CONTAINER_PADDING,
      screens: {
        '2xl': CONTAINER_SCREEN_2XL,
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: RADIUS,
        md: RADIUS_MD,
        sm: RADIUS_SM,
      },
      keyframes: {
        [ACCORDION_DOWN]: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        [ACCORDION_UP]: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        [ACCORDION_DOWN]: ACCORDION_DOWN_ANIMATION,
        [ACCORDION_UP]: ACCORDION_UP_ANIMATION,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
})

const tailwindConfig = getTailwindConfig()

export default tailwindConfig
