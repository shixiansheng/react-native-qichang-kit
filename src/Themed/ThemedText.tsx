import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { ThemeProps, withTheme } from '../config';

export enum TextType {
  headline = 'fontColorC1',
  big = 'fontColorC2',
  normal = 'fontColorC3',
  small = 'fontColorC4',
}

type Props = {
  style?: TextStyle;
  darkThemeColor?: string; //黑色主题颜色
  type?: TextType;
} & TextProps &
  ThemeProps;

const ThemedText: React.FC<Props> = ({
  style,
  children,
  darkThemeColor,
  type,
  theme: { colors, theme },
  ...otherStyles
}) => {
  let { color } = style || {};

  if (theme === 'dark') color = darkThemeColor || '#FFFFFF';
  if (theme === 'light' && color === undefined) color = 'black';

  if (type) color = colors[type];

  return (
    <Text style={[style, { color: color }]} {...otherStyles}>
      {children}
    </Text>
  );
};

export default withTheme(ThemedText);
