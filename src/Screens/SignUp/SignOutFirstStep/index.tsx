import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { FooterAnimation } from '../../../components/FooterAnimation';
import { FormAnimation } from '../../../components/FormAnimation';
import { Input } from '../../../components/Input';

import { Container, Header, Steps, SubTitle, Title, Form, FormTitle } from './styles';

export function SignOutFirstStep() {
  const { navigate } = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleToNextStep() {
    setLoading(false);

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
      driverLicense: Yup.number().required('CNH é obrigatório'),
    });

    try {
      await schema.validate({ name, email, driverLicense });
      navigate('SignOutSecondStep', {
        driverLicense,
        email,
        name,
      });
    } catch (error) {
      setLoading(false);
      Alert.alert('Ops!', error.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <FormAnimation>
              <Input
                iconName="user"
                placeholder="Nome"
                value={name}
                onChangeText={(value) => setName(value)}
                isFilled={name.trim().length > 0}
              />

              <Input
                iconName="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => setEmail(value)}
                isFilled={email.trim().length > 0}
              />

              <Input
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                value={driverLicense}
                onChangeText={(value) => setDriverLicense(value)}
                isFilled={driverLicense.trim().length > 0}
              />
            </FormAnimation>
          </Form>

          <FooterAnimation>
            <Button
              title="Próximo"
              onPress={handleToNextStep}
              enabled={
                name.trim().length > 0 && email.trim().length > 0 && driverLicense.trim().length > 0
              }
              loading={loading}
            />
          </FooterAnimation>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
