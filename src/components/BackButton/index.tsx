import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';

interface Props {
  color?: string;
}

export function BackButton({ color }: Props) {
  const { colors } = useTheme();

  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <Container onPress={handleGoBack} style={{ height: 24, width: 24 }}>
      <MaterialIcons name="chevron-left" color={color ? color : colors.text} size={24} />
    </Container>
  );
}
