import styled from 'styled-components/native';

import { spacings, fonts, colors } from '../../common';

export const ClassTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.Roboto};
  margin-bottom: 5px;
`;

export const sliderShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};

export const Slider = styled.View`
  margin: 20px -5px 20px -5px;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  min-height: 170px;
  flex: 1;
`;
export const ObsTitle = styled.Text`
  font-family: ${fonts.Pala};
  font-size: 15px;
  font-weight: bold;
`;
export const ObsText = styled.Text`
  font-family: ${fonts.Roboto};
  font-size: 14px;
  padding: 5px 0px 5px 0px;
  opacity: 0.7;
`;
export const PublicationData = styled.Text`
  font-family: ${fonts.Roboto};
  font-size: 14px;
  width: 100%;
  opacity: 0.7;
  padding: 5px 0px 0px 0px;
  text-align: right;
  color: ${colors.Greendark};
`;
export const Button = styled.TouchableOpacity`
  align-self: center;
  flex: 1;
  justify-content: flex-end;
`;

export const ButtonView = styled.View`
  align-self: center;
  flex: 1;
  justify-content: flex-end;
`;
export const ButtonText = styled.Text`
  background-color: ${colors.Greenprimary};
  width: 80%;
  padding: 8px 20px 8px 20px;
  border-radius: 7px;
  color: #fff;
`;

export const SliderHeader = styled.View`
  flex-direction: row;
`;
