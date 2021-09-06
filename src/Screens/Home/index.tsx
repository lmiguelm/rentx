import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

export function Home() {
  const carDataOne = {
    thumbnail:
      'https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png',
    brand: 'Audio',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
  };

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }: any) => <Car key={item} data={carDataOne} />}
      />
    </Container>
  );
}
