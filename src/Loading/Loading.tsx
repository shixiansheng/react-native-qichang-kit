import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemeProps, withTheme } from '../config';

type Props = {
  style?: ViewStyle;
} & ThemeProps;

class Loading extends React.Component<Props> {
  render() {
    const { backgroundColorC11 } = this.props.theme.colors;

    let source =
      this.props.theme.theme === 'dark'
        ? require('./assets/qichang_logo_loading_dark.gif')
        : require('./assets/qichang_logo_loading_light.gif');

    const style = this.props.style;

    return (
      <View
        style={[
          styles.loadingView,
          { backgroundColor: backgroundColorC11 },
          style,
        ]}
      >
        <Image style={styles.image} source={source} />
      </View>
    );
  }
}

export default withTheme(Loading);

let styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 127, height: 56 },
});
