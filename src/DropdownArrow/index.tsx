import { Image, StyleSheet } from 'react-native';
import React, { Component } from 'react';

type Props = {
  theme: 'light' | 'dark';
};

class DropdownArrow extends Component<Props> {
  static defaultProps = {
    theme: 'light',
  };

  render() {
    const { theme } = this.props;

    return theme === 'light' ? (
      <Image
        source={require('./zhaoche_dropdown_arrow_black.png')}
        style={styles.imageSize}
      />
    ) : (
      <Image
        source={require('./zhaoche-dropdown-arrow.png')}
        style={styles.imageSize}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageSize: { height: 4, width: 6 },
});

export default DropdownArrow;
