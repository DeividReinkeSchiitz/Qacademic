import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { fonts, spacings, colors } from '../../common';

export const EspecificGrade = styled.View`
  width: 100%;
  height: 60px;
  margin-bottom: 30px;
  padding: 5px;
`;

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const ClassTitle = styled.Text`
  flex: 1;
  font-size: 17px;
  padding-right: 10px;
  align-self: center;
  font-family: ${fonts.Pala};
`;
export const GradeText = styled.Text`
  font-family: ${fonts.Pala};
  font-size: 22px;
  margin-right: 10px;
  align-self: center;
`;

export const Button = styled.TouchableNativeFeedback``;

export const Icon = () => (
  <AntDesign
    name="doubleright"
    size={30}
    color={colors.thinGray}
    style={{
      alignSelf: 'center',
    }}
  />
);
export const GreenBar = styled.View`
  flex: 1;
  width: ${(props: { grade: number }) => props.grade * 10}%;
  border-radius: 8px;
  background-color: ${colors.Greenprimary};
`;

export const WhiteBar = styled.View`
  width: 100%;
  border-radius: 8px;
  height: 6px;
  border-width: 0.5px;
`;
