import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CarDTO } from '../dtos/CarDTO';
import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tabs.routes';
import { AuthRoutes } from './auth.routes';

import { Car } from '../database/models/Car';
import { LoadAnimation } from '../components/LoadAnimation';

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
      CarDetails: Car;
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

export function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadAnimation />;
  } else {
    return <NavigationContainer>{user.id ? <AppTabRoutes /> : <AuthRoutes />}</NavigationContainer>;
  }
}
