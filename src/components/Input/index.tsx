import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText } from './styles';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  isFilled: boolean;
}

export function Input({ iconName, isFilled, ...props }: Props) {
  const { colors } = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          color={isFocused || isFilled ? colors.main : colors.text}
          size={24}
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        {...props}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
}
