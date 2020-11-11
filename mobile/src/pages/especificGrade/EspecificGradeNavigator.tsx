import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import EspecificGradeScreen from './EspecificGradeScreen';
import Header from './header/Header';

const Stack = createStackNavigator();

const GradeStack = () => (
  <Stack.Screen
    name="EspecificGradeScreen"
    component={EspecificGradeScreen}
    options={{
      gestureEnabled: true,
      gestureDirection: 'vertical',
      header: () => <Header />,
      headerTintColor: 'transparent',
    }}
  />
);

export default GradeStack;
