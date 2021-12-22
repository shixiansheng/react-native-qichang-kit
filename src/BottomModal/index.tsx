import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  PropsWithChildren,
} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SlideModal } from 'beeshell';

const screenHeight = 'android'
  ? Dimensions.get('screen').height
  : Dimensions.get('window').height;

import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  backgroundColor?: string;
  fullScreen?: boolean;
  hideMask?: boolean; //隐藏遮罩
  onPressClose?: () => void;
};

export type BottomModalRefProps = {
  open(): void;
  close(): void;
};

const BottomModal = forwardRef<BottomModalRefProps, PropsWithChildren<Props>>(
  (props, ref) => {
    const {
      children,
      backgroundColor = 'white',
      hideMask = false,
      fullScreen = false,
    } = props;

    const [contentHeight, setContentHeight] = useState(screenHeight);

    const slideModalRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      // 暴露给父组件的方法
      open: open,
      close,
    }));

    const open = () => {
      slideModalRef.current && slideModalRef.current.open();
    };

    const close = () => {
      slideModalRef.current && slideModalRef.current.close();
    };

    const { width, height } = useWindowDimensions();

    return (
      <SlideModal
        fullScreenPatch={[true, true, true]}
        ref={slideModalRef}
        cancelable={true}
        screenHeight={height}
        screenWidth={width}
        styles={{
          backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
          container: {
            top: hideMask ? height - contentHeight : 0,
          },
          content: {
            width: '100%',
            height: fullScreen ? '95%' : undefined,
            backgroundColor: 'white',
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          },
        }}
      >
        <SafeAreaView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ backgroundColor: backgroundColor, flex: 1 }}
          edges={['bottom']}
          onLayout={(event) => {
            setContentHeight(event.nativeEvent.layout.height);
          }}
        >
          {children}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deleteButton}
            onPress={() => {
              if (props.onPressClose) {
                props.onPressClose();
              }
              close();
            }}
          >
            <Image source={require('./pop-upwindows_delete.png')} />
          </TouchableOpacity>
        </SafeAreaView>
      </SlideModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {},

  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingRight: 15,
    paddingTop: 20,
  },
});

export default BottomModal;

// class BottomModal_Deprecated extends Component<Props> {
//   state = {
//     contentHeight: screenHeight,
//   };

//   static defaultProps = {
//     fullScreen: false,
//   };

//   _slideModel: any;

//   open() {
//     this._slideModel.open();
//   }

//   close() {
//     this._slideModel.close();
//   }

//   render() {
//     const {
//       children,
//       backgroundColor = 'white',
//       hideMask = false,
//     } = this.props;

//     return (
//       <SlideModal
//         fullScreenPatch={[true, true, true]}
//         ref={(ref) => (this._slideModel = ref)}
//         cancelable={true}
//         screenHeight={screenHeight}
//         styles={{
//           root: { width: Dimensions.get('window').width },
//           backdrop: [{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }],
//           container: {
//             top: hideMask ? screenHeight - this.state.contentHeight : 0,
//           },
//           content: {
//             width: '100%',
//             height: this.props.fullScreen ? '95%' : undefined,
//             backgroundColor: 'white',
//             borderTopLeftRadius: 3,
//             borderTopRightRadius: 3,
//           },
//         }}
//       >
//         <SafeAreaView
//           style={{ backgroundColor: backgroundColor, flex: 1 }}
//           //forceInset={{ bottom: 'always', top: 'never' }}
//           edges={['bottom']}
//           onLayout={({
//             nativeEvent: {
//               layout: { height },
//             },
//           }) => {
//             this.setState({
//               contentHeight: height,
//             });
//           }}
//         >
//           {children}
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={{
//               position: 'absolute',
//               top: 0,
//               right: 0,
//               paddingRight: 15,
//               paddingTop: 20,
//             }}
//             onPress={() => {
//               if (this.props.onPressClose) {
//                 this.props.onPressClose();
//               }
//               this.close();
//             }}
//           >
//             <Image source={require('./pop-upwindows_delete.png')} />
//           </TouchableOpacity>
//         </SafeAreaView>
//       </SlideModal>
//     );
//   }
// }
