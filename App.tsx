import React from 'react';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';

import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';

import { Home } from './src/Screens/Home';
import { CarDetails } from './src/Screens/CarDetails';
import { Scheduling } from './src/Screens/Scheduling';
import { SchedulesDetails } from './src/Screens/ScheduleDetails';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Home /> */}
      {/* <CarDetails /> */}
      {/* <Scheduling /> */}
      <SchedulesDetails />
    </ThemeProvider>
  );
}
