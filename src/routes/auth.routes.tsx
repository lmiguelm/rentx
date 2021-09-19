import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../Screens/Splash';
import { Confirmation } from '../Screens/Confirmation';
import { SignIn } from '../Screens/SignIn';
import { SignOutFirstStep } from '../Screens/SignUp/SignOutFirstStep';
import { SignOutSecondStep } from '../Screens/SignUp/SignOutSecondStep';

export function AuthRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignOutFirstStep" component={SignOutFirstStep} />
      <Screen name="SignOutSecondStep" component={SignOutSecondStep} />
      <Screen name="Splash" component={Splash} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
