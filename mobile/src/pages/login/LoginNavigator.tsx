import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();
const LoginStack = () => (
  <Stack.Screen
    name="LoginScreen"
    component={LoginScreen}
    options={{
      title: ' ',
      headerLeft: undefined,
      header: () => <></>,
    }}
  />
);

export default LoginStack;
