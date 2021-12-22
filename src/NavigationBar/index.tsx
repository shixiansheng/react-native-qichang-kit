import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  StyleSheet,
  Animated,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type NavigationBarStyle = 'transparent' | 'white' | 'black';

type Props = {
  barStyle?: NavigationBarStyle; //风格
  style?: StyleProp<ViewStyle>; //
  onPressBack?: () => void;
  title?: string; //标题
  headerRight?: React.ReactElement<any> | null;
};

// import DeviceInfo from 'react-native-device-info'
// let topHeight = 20 //
// if (DeviceInfo.hasNotch()) {
//     if (Platform.OS == 'android') topHeight = StatusBar.currentHeight || 0
//     if (Platform.OS == 'ios') topHeight = 44
// }

const NavigationBar: React.FC<Props> = (props) => {
  const { title, headerRight, onPressBack, style, barStyle = 'white' } = props;
  const tintColor = barStyle === 'black' ? 'black' : 'white';
  const backgroundColor =
    barStyle === 'black'
      ? '#F4F5F6'
      : barStyle === 'transparent'
      ? 'transparent'
      : '#FF7500';

  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={[
        {
          paddingTop: insets.top,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      <View style={styles.barContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backButton}
          onPress={onPressBack}
        >
          <Animated.Image
            source={require('./navigation_arrows_white.png')}
            style={{ tintColor }}
          />
        </TouchableOpacity>

        <Animated.Text
          style={[
            styles.titleText,
            {
              color: tintColor,
            },
          ]}
        >
          {title}
        </Animated.Text>

        <View style={styles.headerRightContainer}>{headerRight}</View>
      </View>
    </Animated.View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  barContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    paddingHorizontal: 15,
    //zIndex: 101,
    position: 'absolute',
    left: 0,
  },

  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  headerRightContainer: {
    position: 'absolute',
    right: 0,
  },
});
