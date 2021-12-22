import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ViewStyle,
} from 'react-native';
import { ThemeProps, withTheme } from '../config';

type Props = {
  style?: ViewStyle;
  errorInfo?: string;
  onPress?: () => void;
} & ThemeProps;

class ErrorComponent extends Component<Props> {
  static defaultProps = {
    errorInfo: '网络不给力，请点击屏幕重试',
  };

  render() {
    const { backgroundColorC20, fontColorC4 } = this.props.theme.colors;
    const { style, onPress, errorInfo } = this.props;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: backgroundColorC20 },
          style,
        ]}
      >
        <TouchableOpacity
          activeOpacity={onPress ? 0.8 : 1}
          style={styles.buttonContainer}
          onPress={onPress}
        >
          <Image source={require('./assets/Network_anomalies.png')} />
          <Text style={[styles.text, { color: fontColorC4 }]}>{errorInfo}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withTheme(ErrorComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    bottom: 37,
    right: 0,
    left: 0,
  },
  buttonContainer: {},
});
