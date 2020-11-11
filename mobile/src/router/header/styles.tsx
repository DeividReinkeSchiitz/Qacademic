import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React from 'react';
import styled from 'styled-components/native';

import { colors, fonts, spacings } from '../../common/index';

export const HeaderContainer = styled.View`
  background-color: ${colors.backgroundColor};
  margin-top: ${Constants.statusBarHeight}px;
  padding-bottom: 10px;
`;

export const headerShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};

export const Icon = ({ name, size }: { name: string; size: number }) => (
  <Entypo
    name={name}
    size={size}
    color={colors.thinGray}
    style={{ margin: 5, marginLeft: -5 }}
  />
);

export const Button = styled.TouchableNativeFeedback``;
export const HeaderLeftView = styled.View`
  flex-direction: row;
  width: 80px;
  padding-left: 10px;
`;

export const HeaderLeftText = styled.Text`
  color: rgb(0, 0, 0);
  align-self: center;
  margin-left: -15px;
  font-size: 15px;
  margin-bottom: 2px;
`;

export const HeaderTitleView = styled.View`
  height: 60px;
  width: 40%;
  align-self: center;
  position: absolute;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  align-self: center;
  font-size: 30px;
  color: ${colors.regularGray};
  font-family: ${fonts.Roboto};
  margin-top: -4px;
`;
