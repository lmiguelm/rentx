import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';

import { Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  isFilled: boolean;
}

export function PasswordInput({ iconName, isFilled, ...props }: Props) {
  const { colors } = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((oldstate) => !oldstate);
  }

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
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <IconContainer isFocused={isFocused}>
        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          {isPasswordVisible ? (
            <Feather name="eye" color={colors.text} size={24} />
          ) : (
            <Feather name="eye-off" color={colors.main} size={24} />
          )}
        </BorderlessButton>
      </IconContainer>
    </Container>
  );
}
