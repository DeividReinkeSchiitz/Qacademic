import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { colors, fonts } from '../../common/index';

export const darkShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const GreenBallImage = styled.Image`
  margin-left: -30px;
  width: 100%;
  height: 200px;
`;

export const Title = styled.Text`
  align-self: center;
  font-family: ${fonts.HKNova};
  color: rgba(0, 0, 0, 0.7);
  font-size: 32px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  font-family: ${fonts.Segoe};
  color: ${colors.thinGray};
  line-height: 20px;
  font-size: 20px;
  text-align: center;
`;

const View = styled.View``;
export const WelcomeText = () => (
  <View>
    <Text>Bem vindo.</Text>
    <Text>Utilize suas credenciais</Text>
    <Text>do Q-Acadêmico para entrar.</Text>
  </View>
);

export const LoginContainer = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: ${(props: { userExist: boolean }) =>
    props.userExist ? colors.Greenprimary : colors.error};
  margin-bottom: 15px;
  flex-direction: row;
  border-radius: 10px;
`;

export const Login = styled.TextInput`
  font-family: ${fonts.Segoe};
  font-size: 18px;
  width: 75%;
  padding: 5px;
  padding-left: 15px;

  color: ${colors.regularGray};
`;

export const Button = styled.TouchableHighlight`
  background-color: ${colors.Greenprimary};
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  padding: 10px;
  text-align: center;
  font-size: 18px;
`;

export const FooderText = styled.Text`
  font-family: ${fonts.Segoe};
  color: #ccc;
  align-self: center;
`;

export const Fooder = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-self: center;
  position: absolute;
  margin-top: ${Dimensions.get('screen').height - 80}px;
`;

export const Loading = styled.Image`
  height: 100px;
  width: 100px;
  align-self: center;
  margin-top: 10px;
`;
export const ErrorMessage = styled.Text`
  color: ${colors.error};
  font-family: ${fonts.Segoe};
`;

// LAST BUTTON COMPONENT
export const NativeButton = styled.TouchableNativeFeedback``;
export const LastDataText = styled.Text`
  color: ${colors.thinGray};
  text-decoration: underline;
`;

interface LastButtonI {
  text: string;
  onPress: () => void;
}
export const LastDataButton = (props: LastButtonI) => (
  <View style={{ alignSelf: 'flex-end' }}>
    <NativeButton onPress={props.onPress}>
      <LastDataText>{props.text}</LastDataText>
    </NativeButton>
  </View>
);
