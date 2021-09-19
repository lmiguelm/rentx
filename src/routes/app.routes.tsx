import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CarDetails } from '../Screens/CarDetails';
import { Splash } from '../Screens/Splash';
import { Home } from '../Screens/Home';
import { Scheduling } from '../Screens/Scheduling';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { Confirmation } from '../Screens/Confirmation';
import { MyCars } from '../Screens/MyCars';
import { SignIn } from '../Screens/SignIn';
import { SignOutFirstStep } from '../Screens/SignUp/SignOutFirstStep';
import { SignOutSecondStep } from '../Screens/SignUp/SignOutSecondStep';

import { CarDTO } from '../dtos/CarDTO';

export interface SchedulingDetailsParams {
  car: CarDTO;
  dates: string[];
}

export interface SignOutSecondStepParams {
  name: string;
  email: string;
  driverLicense: string;
}

export interface ConfirmationParams {
  title: string;
  message?: string;
  nextScreenRoute: string;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined;
      Home: undefined;
      CarDetails: CarDTO;
      Scheduling: CarDTO;
      SchedulingDetails: SchedulingDetailsParams;
      Feedback: undefined;
      MyCars: undefined;
      SignIn: undefined;
      SignOutFirstStep: undefined;
      SignOutSecondStep: SignOutSecondStepParams;
      Confirmation: ConfirmationParams;
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
        initialRouteName="Home"
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignOutFirstStep" component={SignOutFirstStep} />
        <Screen name="SignOutSecondStep" component={SignOutSecondStep} />
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
        <Screen name="Confirmation" component={Confirmation} />
        <Screen name="MyCars" component={MyCars} />
      </Navigator>
    </NavigationContainer>
  );
}
