import React from 'react';
import Lottie from 'lottie-react-native';

import animation from '../../assets/load.json';

import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <Lottie source={animation} autoPlay loop resizeMode="contain" />
    </Container>
  );
}
