import React from 'react';
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Message, Title } from './styles';
import { StatusBar } from 'expo-status-bar';
import { ConfirmButton } from '../../components/ConfirmButton';
import { Footer } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmationParams } from '../../routes/app.routes';

export function Confirmation() {
  const { params } = useRoute();
  const { message, title, nextScreenRoute } = params as ConfirmationParams;

  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

  function handleNavigate() {
    navigate(nextScreenRoute as any);
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg height={80} width={80} />
        <Title>{title}</Title>

        {message && <Message>{message}</Message>}
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleNavigate} />
      </Footer>
    </Container>
  );
}
