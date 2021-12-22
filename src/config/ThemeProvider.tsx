import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';

import colors from './colors';
import colorsDark from './colorsDark';

export const ThemeContext = React.createContext<{
  colors: typeof colors;
  theme: 'light' | 'dark';
}>({
  colors: colors,
  theme: 'light',
});

type Props = {
  theme?: 'light' | 'dark';
};

const ThemeProvider: React.FC<Props> = ({ children, theme }) => {
  let systemColor = useColorScheme();
  let color = theme || systemColor || 'light';
  const co = color === 'dark' ? colorsDark : colors;
  return (
    <ThemeContext.Provider value={{ colors: co, theme: color }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default ThemeProvider;
