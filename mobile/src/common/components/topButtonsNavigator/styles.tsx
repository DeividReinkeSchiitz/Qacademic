import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';
import styled from 'styled-components/native';

import { colors, fonts, spacings } from '../../index';
const { width } = Dimensions.get('screen');

export const ContainerRow = styled.View`
  margin-left: ${-spacings.paddingHorizontal}px;
  margin-right: ${-spacings.paddingHorizontal}px;
  flex-direction: row;
  flex: 1;
`;

const View = styled.View`
  border-radius: 10px;
  width: 65%;
  height: 50px;
  align-self: center;
  align-items: center;
  margin-top: 25px;
  background-color: red;
`;

const ButtonText = styled.Text`
  padding: 10px;
  font-size: 22px;
  font-family: ${fonts.Segoe};
`;

const ButtonContainer = styled.TouchableOpacity`
  flex: 1;
`;

export const Button = (props: {
  text: string;
  onPress: any;
  myRoute: string;
  selected: string;
}) => (
  <ButtonContainer onPress={props.onPress}>
    <Svg style={{ flex: 1 }}>
      <Defs>
        <RadialGradient id="grad" gradientUnits="objectBoundingBox">
          <Stop offset="0" stopColor={colors.Greenprimary} stopOpacity="0.8" />
          <Stop
            offset={props.myRoute === props.selected ? '1' : '0'}
            stopColor={colors.backgroundColor}
            stopOpacity="0"
          />
        </RadialGradient>
      </Defs>
      <Ellipse cx={width * 0.25} cy="50" rx="90" ry="50" fill="url(#grad)" />

      <View
        style={{
          backgroundColor:
            props.myRoute === props.selected
              ? colors.Greenprimary
              : colors.backgroundColor,
        }}
      >
        <ButtonText
          style={{
            color:
              props.myRoute === props.selected
                ? colors.backgroundColor
                : colors.regularGray,
          }}
        >
          {props.text}
        </ButtonText>
      </View>
    </Svg>
  </ButtonContainer>
);
