import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = {
  disabledBackgroundColor?: string;
} & TouchableOpacityProps;

export default class Button extends Component<Props> {
  render() {
    const {
      style,
      disabled,
      disabledBackgroundColor = 'gray',
      children,
      ...otherProps
    } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          style,
          disabled && { backgroundColor: disabledBackgroundColor },
        ]}
        activeOpacity={0.8}
        {...otherProps}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
});
