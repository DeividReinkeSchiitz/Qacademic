import React from 'react';
import { Dimensions } from 'react-native';
import Svg, {
  Ellipse,
  LinearGradient,
  Stop,
  Defs,
  Rect,
} from 'react-native-svg';
import styled from 'styled-components/native';

import { colors, fonts, spacings } from '../../common';

const { width, height } = Dimensions.get('screen');
export const MeanHeader = styled.View`
  height: auto;
  width: auto;
  padding: 20px 20px 0px 20px;
  margin-bottom: 20px;
  align-self: center;
  align-items: center;
  elevation: 9;
  margin-top: 10px;
  justify-content: center;
  background-color: ${colors.Greenprimary};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
export const LandingBackground = styled.View`
  margin-left: ${-spacings.paddingHorizontal}px;
  margin-right: ${-spacings.paddingHorizontal}px;
  position: absolute;
  background-color: ${colors.Greenprimary};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 70px;
  width: 120%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const GradientContainer = () => (
  <Svg
    style={{
      marginLeft: -spacings.paddingHorizontal,
      marginRight: -spacings.paddingHorizontal,
      position: 'absolute',
      elevation: 0,
      zIndex: 0,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    }}
    width={width}
    height={height * 2}
  >
    <Defs>
      <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
        <Stop offset="0" stopColor={colors.Greenlight} stopOpacity="1" />
        <Stop offset="1" stopColor={colors.Greenlight} stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Rect
      x="0"
      y="0"
      width={width}
      height={height / 2}
      fill="url(#grad)"
      clipPath="url(#clip)"
    />
  </Svg>
);

export const MeanText = styled.Text`
  font-family: ${fonts.Pala};
  font-weight: 600;
  font-size: 60px;
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.8);
`;
export const Description = styled.Text`
  font-family: ${fonts.Pala};
  font-size: 17px;
  margin-left: 5px;
  margin-top: -5px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.8);
`;

export const ClassName = styled.Text`
  font-family: ${fonts.Pala};
  flex: 1;
  font-size: 25px;
  color: rgba(255, 255, 255, 0.8);
  align-self: center;
  text-align: center;
  margin-left: 10px;
`;

export const GradeContainer = styled.View`
  flex-direction: column;
`;
export const TopHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
`;

// TABLE COMPONENTS
export const Table = styled.View`
  background-color: white;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 10px;
  height: auto;
  width: 90%;
  align-self: center;
`;

export const tableShadowStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};

export const TableTitle = styled.Text`
  font-family: ${fonts.Segoe};
  font-size: 25px;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export const TableRow = styled.View`
  background-color: ${(props: { gray: boolean }) =>
    props.gray ? '#ECECEC' : '#fff'};
  flex-direction: row;
  padding: 5px;
  border-radius: 3px;
  justify-content: space-between;
`;

export const TableAttrText = styled.Text`
  font-family: ${fonts.Segoe};
  font-size: 17px;
  padding-left: 7px;
`;
export const TableAttrValue = styled.Text`
  padding-right: 7px;
`;
