import 'react-native-gesture-handler';
import './src/config/statusBarConfig';

import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';

import Main from './src/index';

export default () => {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync(); // depende da sua estratégia
      }
    }
    updateApp();
  }, []);
  return <Main />;
};
