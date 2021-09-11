import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';
import { NavigationProps } from '../../routes/app.routes';

import { CarList, Container, Header, HeaderContent, MyCarsButton, TotalCars } from './styles';

import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';

export function Home() {
  const { colors } = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCars();
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

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car onPress={() => handleNavigateToCarDetails(item)} key={item.id} data={item} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpemMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
