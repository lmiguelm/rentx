import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { FooterAnimation } from '../../../components/FooterAnimation';
import { FormAnimation } from '../../../components/FormAnimation';
import { PasswordInput } from '../../../components/PasswordInput';

import { Container, Header, Steps, SubTitle, Title, Form, FormTitle } from './styles';

import { SignOutSecondStepParams } from '../../../routes/app.routes';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

export function SignOutSecondStep() {
  const { params } = useRoute();
  const { driverLicense, name, email } = params as SignOutSecondStepParams;

  const { navigate } = useNavigation();

  const { colors } = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSingOut() {
    setLoading(true);

    const schema = Yup.object().shape({
      password: Yup.string().required('Senha obrigatória'),
      confirmPassword: Yup.string().required('Confirmação de senha obrigatória'),
    });

    try {
      await schema.validate({ password, confirmPassword });

      if (password !== confirmPassword) {
        throw new Error('Senhas não são iguais!');
      }

      const data = {
        name,
        email,
        driver_license: driverLicense,
        password,
      };

      await api.post('/users', data);

      navigate('Confirmation', {
        title: 'Conta criada!',
        nextScreenRoute: 'SignIn',
      });
    } catch (error) {
      setLoading(false);

      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops!', error.message);
      } else {
        Alert.alert('Ops!', 'Não foi possível cadastrar');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <FormAnimation>
              <PasswordInput
                iconName="lock"
                placeholder="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={(value) => setPassword(value)}
                isFilled={password.trim().length > 0}
              />

              <PasswordInput
                iconName="lock"
                placeholder="Repetir senha"
                autoCapitalize="none"
                autoCorrect={false}
                value={confirmPassword}
                onChangeText={(value) => setConfirmPassword(value)}
                isFilled={confirmPassword.trim().length > 0}
              />
            </FormAnimation>
          </Form>

          <FooterAnimation>
            <Button
              title="Cadastrar"
              color={colors.succes}
              enabled={password.trim().length > 0 && confirmPassword.trim().length > 0}
              onPress={handleSingOut}
              loading={loading}
            />
          </FooterAnimation>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
