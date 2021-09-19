import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CarDetails } from '../Screens/CarDetails';
import { Splash } from '../Screens/Splash';
import { Home } from '../Screens/Home';
import { Scheduling } from '../Screens/Scheduling';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { SchedulingComplete } from '../Screens/SchedulingComplete';
import { MyCars } from '../Screens/MyCars';
import { SignIn } from '../Screens/SignIn';

import { CarDTO } from '../dtos/CarDTO';

export interface SchedulingDetailsParams {
  car: CarDTO;
  dates: string[];
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined;
      Home: undefined;
      CarDetails: CarDTO;
      Scheduling: CarDTO;
      SchedulingDetails: SchedulingDetailsParams;
      SchedulingComplete: undefined;
      MyCars: undefined;
      SignIn: undefined;
    }
  }
}

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SignIn"
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="Splash" component={Splash} />
        <Screen
          name="Home"
          component={Home}
          options={{
            gestureEnabled: false,
          }}
        />
        <Screen name="CarDetails" component={CarDetails} />
        <Screen name="Scheduling" component={Scheduling} />
        <Screen name="SchedulingDetails" component={SchedulingDetails} />
        <Screen name="SchedulingComplete" component={SchedulingComplete} />
        <Screen name="MyCars" component={MyCars} />
      </Navigator>
    </NavigationContainer>
  );
}
