import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// import { Container } from './styles';
import AlertModal from '../../common/components/alertModal/AlertModal';
import { remove } from '../../store/ducks/student';
import {
  HeaderLeftView,
  Button,
  HeaderLeftText,
  HeaderContainer,
  HeaderTitle,
  Icon,
  HeaderTitleView,
} from './styles';

interface IHeaderProps {
  stackProps: StackHeaderProps;
}

const Header = ({ stackProps }: IHeaderProps) => {
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const myCurrentRoute = useRoute().name;

  const openAlertModal = () => setExitModalVisible(true);
  const dispatch = useDispatch();

  const toggleUser = () => {
    setExitModalVisible(false);
    dispatch(remove());

    stackProps.navigation.navigate('LoginScreen');
  };

  return (
    <HeaderContainer>
      <AlertModal
        isVisible={exitModalVisible}
        onCancelButtonPressed={() => setExitModalVisible(false)}
        onOKButtonPressed={toggleUser}
        onBackdropPressed={() => setExitModalVisible(false)}
      />

      <Button background={Button.Ripple('#ccc', true)} onPress={openAlertModal}>
        <HeaderLeftView>
          <Icon name="chevron-thin-left" size={35} />
          <HeaderLeftText>sair</HeaderLeftText>
        </HeaderLeftView>
      </Button>

      <HeaderTitleView>
        <HeaderTitle>
          {myCurrentRoute === 'GradeScreen' ? 'Notas' : 'Materiais'}
        </HeaderTitle>
      </HeaderTitleView>
    </HeaderContainer>
  );
};

export default Header;
