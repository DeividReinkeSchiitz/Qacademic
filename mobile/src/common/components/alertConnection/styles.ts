import styled from 'styled-components/native';

import colors from '../../colors';
import fonts from '../../fonts';

interface IContainer {
  show?: boolean;
}
export const Container = styled.View`
  display: ${(props: IContainer) => (props.show ? 'flex' : 'none')};
  position: absolute;
  top: 0;

  width: 120%;
  height: auto;
  z-index: 2;
  margin-left: -10%;
  padding: 3.5%;
  elevation: 2;

  background-color: ${colors.alert};
`;

export const Message = styled.Text`
  display: ${(props: IContainer) => (props.show ? 'flex' : 'none')};

  color: #fff;
  font-family: ${fonts.Roboto};
  font-weight: bold;
  margin-top: 3px;
  align-self: center;
  justify-content: center;
`;
