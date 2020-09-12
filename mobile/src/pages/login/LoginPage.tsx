import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableHighlight, TextInput } from 'react-native';

import styles from './styles';

interface Ianimation {
  play: () => unknown;
  reset: () => unknown;
}
let loadingAnimation: Ianimation | null;

const LoginPage: React.FC = () => {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    loadingAnimation?.play();
  }, []);

  const buttonClicked = () => {};

  return (
    <View>
      <Image
        source={require('../../../assets/images/GreenBallsLogin.png')}
        resizeMode="stretch"
        style={{
          width: `100%`,
          height: 230,
          marginLeft: -10,
        }}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Academic View</Text>
        <Text style={styles.welcome}>Bem vindo.</Text>
        <Text style={styles.welcome}>Utilize suas credenciais</Text>
        <Text style={{ ...styles.welcome, marginBottom: 22 }}>
          do Q-Acadêmico para entrar.
        </Text>

        <View style={styles.inputContainer}>
          <AntDesign name="user" size={32} color="black" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLoginValue(text)}
            value={loginValue}
            placeholder="Usuario"
            keyboardType="numeric"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={32} color="black" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPasswordValue(text)}
            value={passwordValue}
            autoCorrect={false}
            placeholder="Senha"
            secureTextEntry
            returnKeyType="go"
          />
        </View>

        <TouchableHighlight
          onPress={buttonClicked}
          underlayColor="#009423"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        <LottieView
          ref={(animation) => {
            loadingAnimation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#eee',
          }}
          source={require('../../../assets/Animations/loading.json')}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />

        <View
          style={{
            height: '23%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={styles.textReference}>Desenvolvido por</Text>
          <Text style={styles.textReference}>Allan Toledo & Deivid Reinke</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
