import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';

import colors from '../../common/colors';
import AlertConnection from '../../common/components/alertConnection/AlertConnection';
import Container from '../../common/components/container/Container';
import { studentI } from '../../common/types';
import api from '../../services/api';
import { add } from '../../store/ducks/student';
import {
  GreenBallImage,
  Title,
  LoginContainer,
  WelcomeText,
  Login,
  Button,
  ButtonText,
  Fooder,
  FooderText,
  Loading,
  darkShadow,
  LastDataText,
  LastDataButton,
} from './styles';

const LoginPage: React.FC = (props) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [userValue, setUserValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const student = useSelector<{ student: studentI }>(
    (state) => state.student
  ) as studentI;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const passwordInputRef = useRef(null);

  const buttonClicked = async () => {
    if (!userValue || !passwordValue) return setUserExist(false);

    try {
      Keyboard.dismiss();
      setLoading(true);

      const { data } = await api.post('/students', {
        login: userValue,
        password: passwordValue,
      });

      if (data !== false) {
        dispatch(add(data));
        navigation.navigate('GradeScreen');
        setUserExist(true);
        setPasswordValue('');
        setUserValue('');
      } else {
        setUserExist(false);
      }

      setLoading(false);
    } catch (error) {
      throw new Error('invalid student');
    }
  };

  const userTextChanged = (value: string) => {
    !userExist && setUserExist(true);
    setUserValue(value);
  };

  const passwordTextChanged = (value: string) => {
    !userExist && setUserExist(true);
    setPasswordValue(value);
  };

  useEffect(() => {
    let checkConnection: any;

    const unsubscribe = NetInfo.addEventListener((state) => {
      setShowAlert(!state.isConnected);
      setMessage('Verifique sua conexão com a Internet');

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    });

    unsubscribe();
  }, []);

  const seeLastData = () => {
    if (student) {
      navigation.navigate('GradeScreen');
    } else {
      setShowAlert(true);
      setMessage('Você não possui dados cadastrados');

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };
  return (
    <Container>
      <AlertConnection show={showAlert} message={message} />
      <GreenBallImage
        source={require('../../../assets/images/GreenBallsLogin.png')}
        resizeMode="stretch"
      />
      <Title>Academic View</Title>
      <WelcomeText />
      <KeyboardAwareScrollView>
        <LoginContainer style={{ marginTop: 30 }} userExist={userExist}>
          <AntDesign
            name="user"
            size={28}
            color={userExist ? colors.Greenprimary : colors.error}
            style={{ marginBottom: 5, padding: 5 }}
          />
          <Login
            returnKeyType="next"
            value={userValue}
            placeholder="Usuario"
            onChangeText={userTextChanged}
            autoCapitalize="none"
            keyboardType="numeric"
            autoCorrect={false}
            onSubmitEditing={() => {
              const current: {
                focus: () => void;
              } = passwordInputRef?.current!;
              current.focus();
            }}
            blurOnSubmit={false}
            maxLength={20}
            autoCompleteType={undefined}
          />
        </LoginContainer>
        <LoginContainer userExist={userExist}>
          <AntDesign
            name="lock"
            size={28}
            color={userExist ? colors.Greenprimary : colors.error}
            style={{ marginBottom: 5, padding: 5 }}
          />
          <Login
            value={passwordValue}
            placeholder="Senha"
            onChangeText={passwordTextChanged}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!passwordVisible}
            ref={passwordInputRef}
            autoCompleteType={undefined}
          />
          <MaterialIcons
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={28}
            color={userExist ? colors.Greenprimary : colors.error}
            style={{ marginBottom: 5, padding: 5 }}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        </LoginContainer>
        <Button
          onPress={buttonClicked}
          underlayColor={colors.Greenlight}
          style={darkShadow}
          disabled={loading}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>

        <LastDataButton text="Ver ultimos dados" onPress={seeLastData} />
        {loading && (
          <Loading source={require('../../../assets/images/loading.gif')} />
        )}
      </KeyboardAwareScrollView>
      <Fooder>
        <FooderText>Desenvolvido por</FooderText>
        <FooderText>Allan Toledo & Deivid Reinke.</FooderText>
      </Fooder>
    </Container>
  );
};

export default LoginPage;
