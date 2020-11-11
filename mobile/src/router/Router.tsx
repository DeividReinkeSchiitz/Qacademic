import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { fonts } from '../common';
import ClassMaterialNavigator from '../pages/classMaterial/ClassMaterialNavigator';
import EspecificGradeNavigator from '../pages/especificGrade/EspecificGradeNavigator';
import GradeNavigator from '../pages/grade/GradeNavigator';
import LoginNavigator from '../pages/login/LoginNavigator';
import Header from './header/Header';

const Stack = createStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={({ navigation, route }) => {
        return {
          headerTitleAlign: 'center',
          gestureEnabled: false,
          animationEnabled: false,
          headerTransparent: true,
          headerTitleStyle: {
            marginTop: 30,
            fontSize: 32,
            fontFamily: fonts.Segoe,
          },
          header: (props) => <Header stackProps={props} />,
        };
      }}
    >
      {GradeNavigator()}
      {LoginNavigator()}
      {EspecificGradeNavigator()}
      {ClassMaterialNavigator()}
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
