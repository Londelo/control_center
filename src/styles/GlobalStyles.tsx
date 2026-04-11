/**
 * Global Styles
 * CSS reset and base styles
 */

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.fontFamily.body};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: 1.5;
    color: ${theme.colors.textPrimary};
    background-color: ${theme.colors.background};
    overflow-x: hidden;
  }

  /* Typography reset */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily.heading};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: 1.2;
  }

  /* Link reset */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Button reset */
  button {
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }

  /* Input reset */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    background: none;
    outline: none;
  }

  /* List reset */
  ul, ol {
    list-style: none;
  }

  /* Image reset */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.surfaceContainerLowest};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.surfaceContainerHighest};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.outline};
  }

  /* Selection */
  ::selection {
    background-color: ${theme.colors.secondaryContainer};
    color: ${theme.colors.textPrimary};
  }

  /* Focus visible */
  :focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 2px;
  }
`;
