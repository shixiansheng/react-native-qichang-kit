import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

type Props = {
  theme: 'light' | 'dark';
  onPress?: () => void;
};

export default class NavigationBackComponent extends React.Component<Props> {
  render() {
    const source =
      this.props.theme === 'light'
        ? require('./navigation_arrows_black.png')
        : require('./navigation_arrows_white.png');

    const { onPress } = this.props;

    return onPress ? (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={source} style={styles.image} />
      </TouchableOpacity>
    ) : (
      <View style={styles.container}>
        <Image source={source} style={styles.image} />
      </View>
    );
  }
}

const imageWidth = 13;
const imageHeight = 20;

const paddingLeft = 14;

const styles = StyleSheet.create({
  image: {
    height: imageHeight,
    width: imageWidth,
    //backgroundColor:'yellow'
  },

  container: {
    //backgroundColor:'gray',
    paddingVertical: 10,
    ...Platform.select({
      ios: { paddingHorizontal: paddingLeft },
      android: {
        paddingLeft: paddingLeft - imageHeight,
        paddingRight: paddingLeft,
      },
      web: { paddingRight: paddingLeft },
    }),
  },
});
