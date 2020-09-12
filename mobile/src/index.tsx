import { useFonts } from '@expo-google-fonts/inter';
import React from 'react';
import { View } from 'react-native';

import Container from './common/components/container/Container';
import LoginPage from './pages/login/LoginPage';

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Segoe_UI: require('../assets/fonts/Segoe_UI.ttf'),
    Segoe_UI_Bold: require('../assets/fonts/Segoe_UI_Bold.ttf'),
    Palatino_Linotype: require('../assets/fonts/pala.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={{ backgroundColor: 'purple' }} />;
  }

  return (
    <Container>
      <LoginPage />
    </Container>
  );
};

export default Main;
