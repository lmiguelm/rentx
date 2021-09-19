import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../components/Button';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, SubTitle, Title, Footer, Form } from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FormAnimation } from '../../components/FormAnimation';
import { FooterAnimation } from '../../components/FooterAnimation';
import { useNavigation } from '@react-navigation/core';

export function SignIn() {
  const { colors } = useTheme();

  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);

    const schema = Yup.object().shape({
      email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      password: Yup.string().required('Senha obrigatória'),
    });

    try {
      await schema.validate({ email, password });
      Alert.alert('Tudo certo');
    } catch (error) {
      setLoading(false);

      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa!', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação!',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        );
      }
    }
  }

  function handleNewAccount() {
    navigate('SignOutFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar style="dark" translucent backgroundColor="transparent" />

          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>Faça seu login para começar{'\n'}uma experiência incrível.</SubTitle>
          </Header>

          <Form>
            <FormAnimation>
              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={(value) => setEmail(value)}
                isFilled={email.length > 0}
              />

              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={(value) => setPassword(value)}
                isFilled={password.length > 0}
              />
            </FormAnimation>
          </Form>

          <Footer>
            <FooterAnimation>
              <Button
                title="Login"
                onPress={handleSignIn}
                enabled={email.trim().length > 0 && password.trim().length > 0}
                loading={loading}
              />

              <Button
                color={colors.background_secondary}
                title="Criar conta gratuita"
                onPress={handleNewAccount}
                light
              />
            </FooterAnimation>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
