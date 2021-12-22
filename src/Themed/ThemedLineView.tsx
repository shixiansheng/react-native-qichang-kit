import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../config';

const LINE_COLOR = {
  light: '#E8E8E8',
  dark: '#33363F',
};

type Props = {
  style?: ViewStyle;
};

const ThemedLineView: React.FC<Props> = ({ style }) => {
  let theme = useTheme().theme;
  return (
    <View
      style={[styles.lineView, { backgroundColor: LINE_COLOR[theme] }, style]}
    />
  );
};

const styles = StyleSheet.create({
  lineView: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
  },
});

export default ThemedLineView;
