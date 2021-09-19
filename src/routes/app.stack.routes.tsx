import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CarDetails } from '../Screens/CarDetails';
import { Splash } from '../Screens/Splash';
import { Home } from '../Screens/Home';
import { Scheduling } from '../Screens/Scheduling';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { Confirmation } from '../Screens/Confirmation';
import { MyCars } from '../Screens/MyCars';

export function AppStackRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
