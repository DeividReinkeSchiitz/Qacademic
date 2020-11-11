import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { useDispatch } from 'react-redux';

// import { Container } from './styles';
import {
  HeaderLeftView,
  Button,
  HeaderContainer,
  HeaderTitle,
  Icon,
  HeaderTitleView,
  HeaderLeftText,
} from './styles';

const Header = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <HeaderContainer>
        <HeaderTitleView>
          <HeaderTitle>Notas</HeaderTitle>
        </HeaderTitleView>
        <Button background={Button.Ripple('#ccc', true)} onPress={goBack}>
          <HeaderLeftView>
            <Icon name="chevron-thin-left" size={35} />
            <HeaderLeftText>Voltar</HeaderLeftText>
          </HeaderLeftView>
        </Button>
      </HeaderContainer>
    </>
  );
};

export default Header;
