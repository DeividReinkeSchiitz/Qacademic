import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';

const Container: React.FC = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default Container;
