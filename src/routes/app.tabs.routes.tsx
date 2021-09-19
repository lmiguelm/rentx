import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';

import { Home } from '../Screens/Home';
import { MyCars } from '../Screens/MyCars';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

export function AppTabRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.text_details,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => <HomeSvg width={24} height={24} fill={color} />,
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => <CarSvg width={24} height={24} fill={color} />,
        }}
      />

      <Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <PeopleSvg width={24} height={24} fill={color} />,
        }}
      />
    </Navigator>
  );
}
