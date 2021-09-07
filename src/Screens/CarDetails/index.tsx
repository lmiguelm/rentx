import React from 'react';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Header,
  Name,
  Period,
  Price,
  Rent,
  About,
  Accessories,
  Footer,
} from './styles';

import { Button } from '../../components/Button';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../../routes/app.routes';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcons } from '../../utils/getAccessoryIcons';

export function CarDetails() {
  const { navigate } = useNavigation<NavigationProps>();

  const { params } = useRoute();
  const car = params as CarDTO;

  function handleNavigateToSheduling() {
    navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcons(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleNavigateToSheduling} />
      </Footer>
    </Container>
  );
}
