import React, { Component } from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  style?: ViewStyle;
};

export default class ArticleLoading extends Component<Props> {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('./assets/article_loading.gif')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});
