import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import { studentI } from '../../common/types';
import TabBar from '../../router/TabBar/TabBar';
import GradeScreen from './GradeScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const GradesTab = () => {
  const student = useSelector<{ student: studentI }>(
    (state) => state.student
  ) as studentI;

  const __renderYears = () => {
    const years = Object.getOwnPropertyNames(student.grades);

    return years
      .reverse()
      .map((year) => (
        <Tab.Screen name={year} component={GradeScreen} key={year} />
      ));
  };

  return (
    <Tab.Navigator tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      {__renderYears() ? __renderYears() : <></>}
    </Tab.Navigator>
  );
};

const GradeStack = () => (
  <Stack.Screen
    name="GradeScreen"
    component={GradesTab}
    options={{
      title: 'Notas',
    }}
  />
);

export default GradeStack;
