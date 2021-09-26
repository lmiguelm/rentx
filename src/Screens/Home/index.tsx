import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import { api } from '../../services/api';

import { useNavigation } from '@react-navigation/core';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarAnimation } from '../../components/Car/CarAnimation';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car as ModelCar } from '../../database/models/Car';

export function Home() {
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { navigate } = useNavigation();

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  function handleNavigateToCarDetails(car: ModelCar) {
    navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      // servidor => app
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      // app => servidor
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        console.log(user);
        await api.post('/users/sync', user).catch(console.log);
      },
    });
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
