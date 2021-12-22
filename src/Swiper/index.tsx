/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { ThemedLineView, ThemedText, Image, ThemeConstants } from '../';

const itemLeftRightPadding = 15;
const loopClonesPerSide = 1;

let WINDOW_WIDTH = Dimensions.get('window').width;
let ITEM_WIDTH = WINDOW_WIDTH - 2 * itemLeftRightPadding;

type Item = {
  id?: number;
  imageUrl: string;
  title: string;
  subTitle: string;
};

type Props<T> = {
  data: Array<T>;
  onPressItem: (item: T, index: number) => void;
};
export default class Swiper<T extends Item> extends Component<Props<T>> {
  state = {
    currentIndex: 0,
  };

  scrollView: ScrollView | null = null;

  intervalId?: number;

  startX =
    this.props.data.length * loopClonesPerSide * ITEM_WIDTH -
    itemLeftRightPadding;

  constructor(props: Props<T>) {
    super(props);
  }

  componentDidMount() {
    this.startShuffling();

    Dimensions.addEventListener('change', (e) => {
      const { width } = e.window;
      WINDOW_WIDTH = width;
      ITEM_WIDTH = WINDOW_WIDTH - 2 * itemLeftRightPadding;
      this.startX =
        this.props.data.length * loopClonesPerSide * ITEM_WIDTH -
        itemLeftRightPadding;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.endShuffling();
  }

  componentDidUpdate() {
    //Dimensions.get("window")
  }

  startShuffling = () => {
    //@ts-ignore
    this.intervalId = setInterval(() => {
      const { currentIndex } = this.state;

      const nextIndex = currentIndex + 1;

      const x = nextIndex * ITEM_WIDTH + this.startX;

      this.scrollView &&
        this.scrollView.scrollTo({ y: 0, x: x, animated: true });
    }, 3000);
  };

  endShuffling = () => {
    this.intervalId && clearInterval(this.intervalId);
  };

  renderItems = (i: number) => {
    const { data } = this.props;

    const itemWidth = ITEM_WIDTH;
    const imageWidth = ITEM_WIDTH - 5 * 2;

    return data.map((item, index) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          key={i + '-' + index}
          onPress={() => this.props.onPressItem(item, index)}
        >
          <View style={{ width: itemWidth, paddingHorizontal: 5 }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ ...styles.image, width: imageWidth }}
            />
            {/* 指示点 */}
            <View
              style={{
                marginTop: 15,
                marginBottom: 12,
                justifyContent: 'center',
                flexDirection: 'row',
                position: 'absolute',
                bottom: 70,
                width: '100%',
              }}
            >
              {data.map((_, j) => {
                return (
                  <View
                    key={j}
                    style={[
                      { height: 3, marginHorizontal: 2.5, borderRadius: 1 },
                      index === j
                        ? { backgroundColor: 'white', width: 9 }
                        : {
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            width: 6,
                          },
                    ]}
                  />
                );
              })}
            </View>
            {/* 下部文字 */}
            <View style={styles.titleContainer}>
              <ThemedText style={styles.title} numberOfLines={1}>
                {item.title}
              </ThemedText>
              <ThemedText
                style={styles.subTitle}
                numberOfLines={1}
                darkThemeColor={ThemeConstants.dark.fontColorC4}
              >
                {item.subTitle}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const { data } = this.props;

    return (
      <View style={{ marginTop: 15 }}>
        <ScrollView
          contentOffset={{ x: this.startX, y: 0 }}
          scrollIndicatorInsets={{ right: 1 }}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          snapToAlignment={'center'}
          ref={(ref) => (this.scrollView = ref)}
          horizontal={true}
          //pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => {
            //console.log('onScrollBeginDrag');
            this.endShuffling();
          }}
          onScrollEndDrag={() => {
            console.log('onScrollEndDrag');
            this.startShuffling();
          }}
          onMomentumScrollBegin={() => {
            //console.log('onMomentumScrollBegin');
          }}
          onMomentumScrollEnd={(event) => {
            //console.log('onMomentumScrollEnd');

            const offsetX = event.nativeEvent.contentOffset.x;

            let currentIndex = Math.round((offsetX - this.startX) / ITEM_WIDTH);

            //console.log("currentIndex",currentIndex);

            if (currentIndex < 0) {
              currentIndex = data.length - 1;
              this.scrollView &&
                this.scrollView.scrollTo({
                  y: 0,
                  x: currentIndex * ITEM_WIDTH + this.startX,
                  animated: false,
                });
            }
            if (currentIndex > data.length - 1) {
              currentIndex = currentIndex % data.length;
              this.scrollView &&
                this.scrollView.scrollTo({
                  y: 0,
                  x: currentIndex * ITEM_WIDTH + this.startX,
                  animated: false,
                });
            }

            this.setState({
              currentIndex: currentIndex,
            });
          }}
        >
          {Array.from({ length: loopClonesPerSide * 2 + 1 }).map((_, index) => {
            return this.renderItems(index);
          })}
        </ScrollView>

        <ThemedLineView
          style={{ height: StyleSheet.hairlineWidth, marginHorizontal: 15 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    //height:200,
    aspectRatio: 16 / 9,
    borderRadius: 5,
    overflow: 'hidden',
    //marginHorizontal:15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'gray',
    alignItems: 'center',
    height: 74,
    paddingHorizontal: 15,
  },
  titleContainer: {
    width: '100%',
    marginTop: 17,
    marginBottom: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#191919',
    paddingRight: 5,
  },
  subTitle: {
    marginTop: 7,
    fontSize: 12,
    color: '#888888',
  },
  currentIndex: {
    fontSize: 20,
    color: '#191919',
  },
  totalIndex: {
    fontSize: 12,
    color: '#888888',
  },
});
