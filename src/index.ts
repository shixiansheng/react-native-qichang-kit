import Avatar from './Avatar';
import Button from './Button';
import Image from './Image';
import DropdownArrow from './DropdownArrow';
import NavigationBackComponent from './NavigationBackComponent';

import { Loading, LoadingComponent, ArticleLoading } from './Loading';
import ErrorComponent from './ErrorComponent';
import ThemedLineView from './Themed/ThemedLineView';
import ThemedText, { TextType as ThemedTextType } from './Themed/ThemedText';
import NavigationBar from './NavigationBar';
import Swiper from './Swiper';
import { SafeTouch } from './SafeTouch';

import BottomModal, { BottomModalRefProps } from './BottomModal';

import {
  ThemeProvider,
  ThemeContext,
  withTheme,
  ThemeConstants,
  ThemeProps,
  useTheme,
} from './config';

// import {
//   RefreshListView,
//   RefreshState,
//   PullDownRefreshAndPullUpLoadMoreListView,
// } from '@damoness/react-native-refresh';

export {
  withTheme,
  useTheme,
  ThemeProps,
  ThemeConstants,
  ThemeContext,
  Avatar,
  Button,
  Image,
  Loading,
  LoadingComponent,
  ArticleLoading,
  NavigationBackComponent,
  NavigationBar,
  ThemeProvider,
  ErrorComponent,
  DropdownArrow,
  ThemedLineView,
  ThemedText,
  ThemedTextType,
  Swiper,
  BottomModal,
  BottomModalRefProps,
  SafeTouch,
  // RefreshListView,
  // RefreshState,
  // PullDownRefreshAndPullUpLoadMoreListView,
};
