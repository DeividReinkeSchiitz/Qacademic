import styled from 'styled-components/native';

import { colors, fonts } from '../../common/index';

export const TabContainer = styled.View`
  height: 50px;
  background-color: ${colors.Greenprimary};
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  bottom: 0px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const ButtonOpacity = styled.TouchableOpacity`
  flex: 1;
`;
export const ButtonContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TabText = styled.Text`
  font-size: 20px;
  font-family: ${fonts.Segoe};
`;

export const styleShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.0,
  elevation: 24,
};
