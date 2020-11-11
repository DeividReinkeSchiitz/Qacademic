import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import colors from '../../colors';
import styles from './styles';

const Container: React.FC = (props: any) => {
  const headerHeight = useHeaderHeight();

  return (
    <View style={[styles.container, { marginTop: headerHeight }, props.style]}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.backgroundColor }}
      >
        {props.children}
      </SafeAreaView>
    </View>
  );
};
export default Container;
