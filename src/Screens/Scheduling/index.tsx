import React from 'react';
import { useTheme } from 'styled-components';

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
import { Calendar } from '../../components/Calendar';

import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/app.routes';

export function Scheduling() {
  const { colors } = useTheme();

  const { navigate } = useNavigation<NavigationProps>();

  function handleNavigateToSchedulingDetails() {
    navigate('SchedulingDetails');
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
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Ate</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleNavigateToSchedulingDetails} />
      </Footer>
    </Container>
  );
}
