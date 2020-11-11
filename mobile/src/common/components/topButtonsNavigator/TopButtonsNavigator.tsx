import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated } from 'react-native';

import { ContainerRow, Button } from './styles';

const TopNavigator = (props: {
  selected: 'GradeScreen' | 'ClassMaterialScreen';
  scrollY: any;
}) => {
  const navigation = useNavigation();

  const navigate = (route: string) => () => navigation.navigate(route);

  return (
    <Animated.View
      style={{
        height: 100,
        transform: [{ translateY: props.scrollY }],
        position: 'absolute',
        width: '100%',
        zIndex: 100,
        elevation: 100,
      }}
    >
      <ContainerRow>
        <Button
          text="Notas"
          onPress={navigate('GradeScreen')}
          myRoute="GradeScreen"
          selected={props.selected}
        />
        <Button
          text="Materiais"
          onPress={navigate('ClassMaterialScreen')}
          myRoute="ClassMaterialScreen"
          selected={props.selected}
        />
      </ContainerRow>
    </Animated.View>
  );
};

export default TopNavigator;
