import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { studentI } from '../../common/types';
import TabBar from '../../router/TabBar/TabBar';
import ClassMaterialScreen from './ClassMaterialScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ClassMaterialsTab = () => {
  const student = useSelector<{ student: studentI }>(
    (state) => state.student
  ) as studentI;

  return (
    <Tab.Navigator tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      {Object.getOwnPropertyNames(student.grades)
        .reverse()
        .map((year, index) => (
          <Tab.Screen name={year} component={ClassMaterialScreen} key={index} />
        ))}
    </Tab.Navigator>
  );
};
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const ClassMaterialStack = () => (
  <Stack.Screen
    name="ClassMaterialScreen"
    component={ClassMaterialsTab}
    options={{
      title: 'Material',
    }}
  />
);

export default ClassMaterialStack;
