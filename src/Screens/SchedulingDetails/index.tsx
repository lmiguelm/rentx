import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Button } from '../../components/Button';
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

import { useTheme } from 'styled-components';

import { useNavigation, useRoute } from '@react-navigation/core';
import { NavigationProps, SchedulingDetailsParams } from '../../routes/app.routes';

import { format } from 'date-fns';

import { getAccessoryIcons } from '../../utils/getAccessoryIcons';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface RentalPeriod {
  startFormated: string;
  endFormated: string;
}

export function SchedulingDetails() {
  const { params } = useRoute();
  const { car, dates } = params as SchedulingDetailsParams;

  const { colors } = useTheme();

  const { navigate } = useNavigation<NavigationProps>();

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const rentTotal = Number(dates.length * car.rent.price);

  useEffect(() => {
    setRentalPeriod({
      startFormated: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormated: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

  async function handleConfirmRental() {
    const shchedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [...shchedulesByCar.data.unavailable_dates, ...dates];

    try {
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });

      navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento!');
    }
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
              name={accessory.type}
              icon={getAccessoryIcons(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormated}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(24)} color={colors.text} />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormated}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar agora" color={colors.succes} onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
