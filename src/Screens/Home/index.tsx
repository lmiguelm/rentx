import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/core';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';
import { CarAnimation } from '../../components/Car/CarAnimation';
import { RFValue } from 'react-native-responsive-fontsize';

export function Home() {
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

  const { navigate } = useNavigation();

  function handleNavigateToCarDetails(car: CarDTO) {
    navigate('CarDetails', car);
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
          <CarAnimation>
            <Car onPress={() => handleNavigateToCarDetails(item)} key={item.id} data={item} />
          </CarAnimation>
        )}
      />
    </Container>
  );
}
