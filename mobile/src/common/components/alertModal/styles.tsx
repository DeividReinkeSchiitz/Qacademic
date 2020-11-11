import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { colors, fonts } from '../../index';
const { height } = Dimensions.get('screen');

export const ModalContainer = styled.View`
  flex: 1;
  align-self: center;
  background-color: ${colors.backgroundColor};
  margin-top: ${height * 0.31}px;
  margin-bottom: ${height * 0.31}px;
  width: 80%;
  border-radius: 15px;
`;

export const ModalTitle = styled.Text`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-size: 15px;
  font-size: 25px;
  text-align: center;
  font-family: ${fonts.HKNova};
  background-color: ${colors.Greenprimary};
  padding: 7px;
  color: #fff;
`;

export const ModalInfo = styled.Text`
  padding: 15px;
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
`;

export const ModalButtonsContainers = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

/* Common Button Components */
const Touchable = styled.TouchableOpacity`
  flex: 1;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  padding: 13px;
  font-family: ${fonts.Segoe};
`;

type IButton = {
  onPress: () => void;
  text: string;
};

/* OKButton Enviroment */
const OKButtonView = styled.View`
  flex: 1;
  margin: 10px;
  background-color: #fff;
  border-radius: 3px;
  border-width: 0.1px;
`;
export const OKButton = (props: IButton) => (
  <Touchable onPress={props.onPress}>
    <OKButtonView>
      <ButtonText>{props.text}</ButtonText>
    </OKButtonView>
  </Touchable>
);

/* CancelButton Enviroment */
const CancelButtonView = styled.View`
  flex: 1;
  margin: 10px;
  border-radius: 3px;
  background-color: ${colors.Greenprimary};
`;
export const CancelButton = (props: IButton) => (
  <Touchable onPress={props.onPress}>
    <CancelButtonView>
      <ButtonText
        style={{
          color: '#fff',
        }}
      >
        {props.text}
      </ButtonText>
    </CancelButtonView>
  </Touchable>
);
