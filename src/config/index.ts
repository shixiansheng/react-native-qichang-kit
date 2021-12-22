import ThemeProvider, { ThemeContext, useTheme } from './ThemeProvider';
import colors from './colors';
import colorsDark from './colorsDark';
import withTheme from './withTheme';

export type Theme = {
  colors: typeof colors;
  theme: 'light' | 'dark';
};

export type ThemeProps = {
  theme: Theme;
};

const ThemeConstants = {
  light: colors,
  dark: colorsDark,
};

export {
  ThemeProvider,
  useTheme,
  colors,
  colorsDark,
  withTheme,
  ThemeContext,
  ThemeConstants,
};
