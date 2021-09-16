import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Appointments,
  Content,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const { colors } = useTheme();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await api.get('/schedules_byuser?user_id=1');
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadAnimation />;
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <BackButton color={colors.shape} />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui {'\n'}
        </Title>

        <Subtitle>Conforto segurança e praticidade.</Subtitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CarWrapper>
              <Car key={item.id} data={item.car} />

              <CarFooter>
                <CarFooterTitle>Periodo</CarFooterTitle>

                <CarFooterPeriod>
                  <CarFooterDate>{item.startDate}</CarFooterDate>

                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={colors.title}
                    style={{ marginHorizontal: 10 }}
                  />

                  <CarFooterDate>{item.endDate}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          )}
        />
      </Content>
    </Container>
  );
}
