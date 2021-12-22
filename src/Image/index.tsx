import React, { useState } from 'react';
import {
  View,
  ImageSourcePropType,
  StyleSheet,
  ImageStyle,
  Image as RNImage,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { ThemeProps, withTheme } from '../config';

export type ResizeMode = 'cover' | 'contain' | 'stretch' | 'center';

type Props = {
  defaultSource?: number;
  source: ImageSourcePropType;
  style?: ImageStyle;
  resizeMode?: ResizeMode;
} & ThemeProps;

const DefaultSource = {
  dark: require('./chexixiangqing_evening.png'),
  light: require('./chexixiangqing.png'),
};

const Image: React.FC<Props> = (props) => {
  let [downloading, setDownloading] = useState(true);

  const { source, style, resizeMode, defaultSource, children } = props;

  const resolvedSource = RNImage.resolveAssetSource(source);

  const { height, width, borderRadius, borderWidth } = style || {};

  const { lineColorC5 } = props.theme.colors;

  if (typeof source === 'number') {
    return <RNImage source={source} style={style} resizeMode={resizeMode} />;
  } else {
    const borderStyle = {
      borderColor: lineColorC5,
      borderWidth: StyleSheet.hairlineWidth,
    };

    return (
      <View style={[borderStyle, style, downloading && styles.defaultBorder]}>
        <FastImage
          style={[StyleSheet.absoluteFill]}
          source={resolvedSource}
          resizeMode={resizeMode}
          onLoad={() => {
            setDownloading(false);
          }}
        />
        {downloading && (
          <RNImage
            style={[
              borderStyle,
              { height, width, borderRadius, borderWidth },
              StyleSheet.absoluteFill,
            ]}
            resizeMode={'cover'}
            source={defaultSource || DefaultSource[props.theme.theme]}
          />
        )}
        {children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  defaultBorder: {
    borderWidth: 0,
  },
});

export default withTheme(Image);
