import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';

import { Container, Header, HeaderContent, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';

export function Home() {
  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
}
