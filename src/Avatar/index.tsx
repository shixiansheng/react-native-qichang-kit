import React from 'react';
import { Image, ImageStyle, StyleSheet, StyleProp } from 'react-native';
import { Theme, ThemeProps, withTheme } from '../config';

type Props = {
  url: string; //图片地址
  size: number; //大小
  style?: StyleProp<ImageStyle>;
} & ThemeProps;

/**
 * 圆形头像
 */
const Avatar: React.FC<Props> = ({ url, size, style, theme }) => (
  <Image
    source={{ uri: url }}
    style={[styles.imageSize(size), styles.image(theme), style]}
  />
);

const styles = {
  imageSize: (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: StyleSheet.hairlineWidth,
  }),
  image: (theme: Theme) => ({
    backgroundColor: 'gray',
    borderColor: theme.colors.lineColorC5,
  }),
};

export default withTheme(Avatar);
