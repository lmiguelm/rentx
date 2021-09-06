import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="chevron-left" color={color ? color : colors.text} size={24} />
    </Container>
  );
}
