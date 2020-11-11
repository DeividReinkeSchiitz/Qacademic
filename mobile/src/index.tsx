import { useFonts } from '@expo-google-fonts/inter';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import colors from './common/colors';
import Router from './router/Router';
import { persistor, store } from './store/index';

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    HKNova: require('../assets/fonts/HKNova.ttf'),
    Segoe_UI: require('../assets/fonts/Segoe_UI.ttf'),
    Pala: require('../assets/fonts/pala.ttf'),
    Roboto: require('../assets/fonts/Roboto_Regular.ttf'),
    Roboto_Thin: require('../assets/fonts/Roboto-Thin.ttf'),
  });

  if (!fontsLoaded)
    return <View style={{ flex: 1, backgroundColor: colors.Greenprimary }} />;

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, backgroundColor: colors.Greenprimary }} />
        }
        persistor={persistor}
      >
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default Main;
