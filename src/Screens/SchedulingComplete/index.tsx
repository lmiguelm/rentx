import React from 'react';
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Message, Title } from './styles';
import { StatusBar } from 'expo-status-bar';
import { ConfirmButton } from '../../components/ConfirmButton';
import { Footer } from './styles';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  return (
    <Container>
      <StatusBar style="light" />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg height={80} width={80} />
        <Title>Carro alugado</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" />
      </Footer>
    </Container>
  );
}
