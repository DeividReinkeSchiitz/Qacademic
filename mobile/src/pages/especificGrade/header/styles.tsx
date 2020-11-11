import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React from 'react';
import styled from 'styled-components/native';

import { colors, fonts, spacings } from '../../../common/index';

export const HeaderContainer = styled.View`
  margin-top: ${Constants.statusBarHeight}px;
  width: 100%;
  z-index: 0;
  background-color: ${colors.Greenprimary};
  padding-bottom: 10px;
  padding-left: 15px;
`;

export const Icon = ({ name, size }: { name: string; size: number }) => (
  <Entypo
    name={name}
    size={size}
    color="#fff"
    style={{ margin: 5, marginLeft: -5 }}
  />
);

export const Button = styled.TouchableNativeFeedback``;
export const HeaderLeftView = styled.View`
  flex-direction: row;
  width: 80px;
`;

export const HeaderLeftText = styled.Text`
  color: #fff;
  align-self: center;
  margin-left: -15px;
  font-size: 15px;
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
  color: #fff;
  margin-top: -4px;
  font-family: ${fonts.Segoe};
`;
