import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';

import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../../routes/app.routes';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { Alert } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
  startFormated: string;
  endFormated: string;
}

export function Scheduling() {
  const { params } = useRoute();
  const car = params as CarDTO;

  const { colors } = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const { navigate } = useNavigation<NavigationProps>();

  function handleConfirmRental() {
    if (!rentalPeriod.startFormated || !rentalPeriod.endFormated) {
      Alert.alert('Selecione o intervalo para alugar!');
    } else {
      navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleChangeDate(date: any) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormated: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyy'),
      endFormated: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyy'),
    });
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Header>
        <BackButton color={colors.shape} />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel {'\n'}
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormated}>
              {rentalPeriod.startFormated}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Ate</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormated}>{rentalPeriod.endFormated}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
