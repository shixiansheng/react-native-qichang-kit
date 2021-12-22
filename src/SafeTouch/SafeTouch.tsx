import React, { Component } from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = TouchableOpacityProps;

function debounce(fn: Function, delay: number = 200) {
  let timeout: any;

  return function (...args: any) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default class SafeTouch extends Component<Props> {
  onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <TouchableOpacity {...otherProps} onPress={debounce(this.onPress, 200)}>
        {children}
      </TouchableOpacity>
    );
  }
}
