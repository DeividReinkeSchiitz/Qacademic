import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';

import { Container, Message } from './styles';

interface Iprops {
  message: string;
  show: boolean;
}

const AlertConnection = (props: Iprops) => {
  const height = useHeaderHeight();
  return (
    <Container show={props.show} style={{ marginTop: height + 20 }}>
      <Message show={props.show}>{props.message}</Message>
    </Container>
  );
};

export default AlertConnection;
