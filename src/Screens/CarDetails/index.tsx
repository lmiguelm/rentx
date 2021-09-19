import React from 'react';
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
} from './styles';

import { Button } from '../../components/Button';

import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcons } from '../../utils/getAccessoryIcons';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export function CarDetails() {
  const { navigate } = useNavigation();

  const { params } = useRoute();
  const car = params as CarDTO;

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
    navigate('Scheduling', car);
  }

  return (
    <Container>
      <StatusBar style="dark" backgroundColor="transparent" />

      <Animated.View style={[headerStyleAnimation, styles.header]}>
        <Header>
          <BackButton />
        </Header>

        <CarImages style={sliderCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
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
            <Price>R$ {car.price}</Price>
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
