import * as React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import {
  Avatar,
  DropdownArrow,
  ErrorComponent,
  Loading,
  // ArticleLoading,
  // LoadingComponent,
  NavigationBackComponent,
  NavigationBar,
  ThemedLineView,
  ThemedText,
  SafeTouch,
} from '@damoness/react-native-qichang-kit';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// const data = Array.from({ length: 6 }).map((item, index) => ({
//   id: index,
//   imageUrl: 'https://static.cnbetacdn.com/article/2020/10/749acf2189b964f.jpg',
//   title: 'title' + index,
//   subTitle: 'subTitle' + index,
// }));

const imageUrl =
  'https://static.cnbetacdn.com/article/2020/10/749acf2189b964f.jpg';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <SafeTouch
          activeOpacity={111}
          onPress={() => {
            console.log('123456');
          }}
        >
          <Text>123456</Text>
        </SafeTouch>
        <NavigationBackComponent theme="light" />
        <NavigationBackComponent theme="dark" />
        <Avatar url={imageUrl} size={40} />
        <Avatar url={imageUrl} size={100} />
        <Avatar url={imageUrl} size={200} />
        <Avatar url={imageUrl} size={300} />
        <ErrorComponent errorInfo={'111'} />
        <ErrorComponent errorInfo={'222'} />
        <DropdownArrow />
        <DropdownArrow theme="dark" />
        <DropdownArrow />
        <DropdownArrow />
        <Loading />
        {/* <LoadingComponent  /> */}
        <ThemedLineView style={styles.lineView} />
        {/* <ArticleLoading /> */}
        <NavigationBar />
        <ThemedLineView style={styles.lineView} />
        <ThemedText>{'111'}</ThemedText>
        <ThemedLineView style={styles.lineView} />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    //alignItems: 'center',
    marginTop: 50,
  },
  lineView: {
    marginVertical: 10,
  },
});
