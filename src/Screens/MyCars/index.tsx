import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

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
import { CarAnimation } from '../../components/Car/CarAnimation';
import { Car as ModelCar } from '../../database/models/Car';
import { format, parseISO } from 'date-fns';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const { colors } = useTheme();

  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await api.get('/rentals');

      const dataFormated = response.data.map((data: DataProps) => ({
        car: data.car,
        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
      }));

      setCars(dataFormated);
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
            <CarAnimation>
              <CarWrapper>
                <Car key={item.id} data={item.car} />

                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            </CarAnimation>
          )}
        />
      </Content>
    </Container>
  );
}
