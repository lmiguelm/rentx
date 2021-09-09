import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { CarDetails } from '../Screens/CarDetails';
import { Home } from '../Screens/Home';
import { Scheduling } from '../Screens/Scheduling';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { SchedulingComplete } from '../Screens/SchedulingComplete';

import { CarDTO } from '../dtos/CarDTO';

export interface SchedulingDetailsParams {
  car: CarDTO;
  dates: string[];
}

type RootParamList = {
  Home: undefined;
  CarDetails: CarDTO;
  Scheduling: CarDTO;
  SchedulingDetails: SchedulingDetailsParams;
  SchedulingComplete: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootParamList>;

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator<RootParamList>();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="CarDetails" component={CarDetails} />
        <Screen name="Scheduling" component={Scheduling} />
        <Screen name="SchedulingDetails" component={SchedulingDetails} />
        <Screen name="SchedulingComplete" component={SchedulingComplete} />
      </Navigator>
    </NavigationContainer>
  );
}
