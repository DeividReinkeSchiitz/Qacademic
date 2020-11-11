import React from 'react';
import Modal from 'react-native-modal';
// import { Container } from './styles';

import { useSelector } from 'react-redux';

import { studentI } from '../../types';
import {
  ModalContainer,
  ModalTitle,
  ModalInfo,
  ModalButtonsContainers,
  OKButton,
  CancelButton,
} from './styles';

type IAlert = {
  isVisible: boolean;
  onOKButtonPressed: () => void;
  onCancelButtonPressed: () => void;
  onBackdropPressed: () => void;
};

const AlertModal = (props: IAlert) => {
  const name = useSelector<{ student: studentI }>(
    (state) => state.student.name
  );
  return (
    <Modal
      onBackdropPress={props.onBackdropPressed}
      isVisible={props.isVisible}
      useNativeDriver
      animationIn="zoomIn"
      animationOut="zoomOut"
      style={{
        flex: 1,
      }}
    >
      <ModalContainer>
        <ModalTitle>Sair</ModalTitle>
        <ModalInfo>
          Tem certeza que deseja sair da conta de usuario: {name} ?
        </ModalInfo>

        <ModalButtonsContainers>
          <OKButton text="OK" onPress={props.onOKButtonPressed} />
          <CancelButton text="Cancel" onPress={props.onCancelButtonPressed} />
        </ModalButtonsContainers>
      </ModalContainer>
    </Modal>
  );
};

export default AlertModal;
