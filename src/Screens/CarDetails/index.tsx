import React, { useState, useEffect } from 'react';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

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
  OfflineInfo,
} from './styles';

import { Button } from '../../components/Button';

import { useNavigation, useRoute } from '@react-navigation/native';

import { getAccessoryIcons } from '../../utils/getAccessoryIcons';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Car as ModelCar } from '../../database/models/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import { Car as ParamsCar } from '../../routes';

export function CarDetails() {
  const { navigate } = useNavigation();

  const netInfo = useNetInfo();

  const { params } = useRoute();
  const { car } = params as ParamsCar;

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }
    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleNavigateToSheduling() {
    navigate('Scheduling', carUpdated);
  }

  return (
    <Container>
      <StatusBar style="dark" backgroundColor="transparent" />

      <Animated.View style={[headerStyleAnimation, styles.header]}>
        <Header>
          <BackButton />
        </Header>

        <CarImages style={sliderCarsStyleAnimation}>
          <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </CarImages>
      </Animated.View>

      <Content onScroll={scrollHandler} scrollEventThrottle={16}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcons(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleNavigateToSheduling}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  back: {
    marginTop: 24,
  },
});
