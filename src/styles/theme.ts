/**
 * Design System Theme
 * Single source of truth for all visual design properties
 *
 * Extracted from Material Design color palette and dashboard mockups
 */

export const theme = {
  colors: {
    // Background colors
    background: '#131313',
    backgroundAlt: '#1a1a1a',

    // Surface colors
    surface: '#131313',
    surfaceDim: '#131313',
    surfaceBright: '#393939',
    surfaceContainer: '#20201f',
    surfaceContainerLow: '#1c1b1b',
    surfaceContainerHigh: '#2a2a2a',
    surfaceContainerHighest: '#353535',
    surfaceContainerLowest: '#0e0e0e',
    surfaceVariant: '#353535',

    // Primary colors
    primary: '#c9c6c5',
    primaryDark: '#5f5e5e',
    primaryContainer: '#1a1a1a',
    primaryFixed: '#e5e2e1',
    primaryFixedDim: '#c9c6c5',
    onPrimary: '#313030',
    onPrimaryContainer: '#848282',
    onPrimaryFixed: '#1c1b1b',
    onPrimaryFixedVariant: '#474646',
    inversePrimary: '#5f5e5e',

    // Secondary colors (blue)
    secondary: '#b8c3ff',
    secondaryContainer: '#0043eb',
    secondaryFixed: '#dde1ff',
    secondaryFixedDim: '#b8c3ff',
    onSecondary: '#002388',
    onSecondaryContainer: '#c6ceff',
    onSecondaryFixed: '#001356',
    onSecondaryFixedVariant: '#0035be',

    // Tertiary colors (gold/accent)
    tertiary: '#e9c349',
    tertiaryContainer: '#cca730',
    tertiaryFixed: '#ffe088',
    tertiaryFixedDim: '#e9c349',
    onTertiary: '#3c2f00',
    onTertiaryContainer: '#4f3e00',
    onTertiaryFixed: '#241a00',
    onTertiaryFixedVariant: '#574500',

    // Error colors
    error: '#ffb4ab',
    errorContainer: '#93000a',
    onError: '#690005',
    onErrorContainer: '#ffdad6',

    // Success and warning (custom additions)
    success: '#4ade80',
    warning: '#facc15',

    // Text colors
    textPrimary: '#e5e2e1',
    textSecondary: '#c4c7c7',
    textTertiary: '#8e9192',
    onSurface: '#e5e2e1',
    onSurfaceVariant: '#c4c7c7',
    onBackground: '#e5e2e1',
    inverseSurface: '#e5e2e1',
    inverseOnSurface: '#313030',

    // Border colors
    border: '#444748',
    borderSubtle: 'rgba(142, 145, 146, 0.1)',
    outline: '#8e9192',
    outlineVariant: '#444748',

    // Surface tint
    surfaceTint: '#c9c6c5',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  typography: {
    fontFamily: {
      body: 'Inter, sans-serif',
      heading: 'Space Grotesk, sans-serif',
      label: 'Space Grotesk, sans-serif',
      mono: 'Space Grotesk, monospace',
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
      xxxxl: '48px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.2em',
      wider: '0.3em',
      widest: '0.4em',
    },
  },

  sizing: {
    buttonHeight: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    inputHeight: {
      sm: '32px',
      md: '40px',
    },
    iconSize: {
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '48px',
      xxl: '64px',
    },
    nodeSize: {
      level0: '96px',
      level1: '48px',
      level2: '32px',
      level3: '24px',
      level4: '16px',
      level5: '12px',
    },
  },

  borderRadius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.3)',
    glow: {
      gold: '0 0 60px rgba(233, 195, 73, 0.3)',
      blue: '0 0 40px rgba(184, 195, 255, 0.2)',
      tertiary: '0 0 20px rgba(233, 195, 73, 0.2)',
    },
  },

  effects: {
    blur: {
      glass: 'blur(12px)',
      atmospheric: 'blur(120px)',
    },
    backdrop: {
      glass: 'rgba(0, 0, 0, 0.8)',
      overlay: 'rgba(0, 0, 0, 0.6)',
    },
    transition: {
      fast: '150ms ease-out',
      base: '300ms ease-out',
      slow: '500ms ease-out',
    },
  },
} as const;

export type Theme = typeof theme;
