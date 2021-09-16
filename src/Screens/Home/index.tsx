import React, { useEffect, useState } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/core';
import { NavigationProps } from '../../routes/app.routes';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      // positionX.value = withSpring(0);
      // positionY.value = withSpring(0);
    },
  });

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
    };
  });

  const { colors } = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  async function fetchCars() {
    try {
      const { data } = await api.get<CarDTO[]>('/cars');
      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const { navigate } = useNavigation<NavigationProps>();

  function handleNavigateToCarDetails(car: CarDTO) {
    navigate('CarDetails', car);
  }

  function handleOpemMyCars() {
    navigate('MyCars');
  }

  if (loading) {
    return <LoadAnimation />;
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      <CarList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Car onPress={() => handleNavigateToCarDetails(item)} key={item.id} data={item} />
        )}
      />

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpemMyCars}
            style={[styles.button, { backgroundColor: colors.main }]}
          >
            <Ionicons name="ios-car-sport" size={32} color={colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
