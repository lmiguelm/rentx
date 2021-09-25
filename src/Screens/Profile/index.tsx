import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';

import {
  BorderlessButton,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import * as ImagePicker from 'expo-image-picker';

import { BackButton } from '../../components/BackButton';

import {
  Avatar,
  AvatarContainer,
  ChangeAvatarButton,
  Container,
  Content,
  Header,
  HeaderWrapper,
  Menu,
  MenuItem,
  Form,
  Title,
  Footer,
} from './styles';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';
import { useNavigation } from '@react-navigation/core';

export function Profile() {
  const { colors } = useTheme();
  const { signOut, user, updateUser } = useAuth();
  const { navigate } = useNavigation();

  const opacity = useSharedValue(0);
  const position = useSharedValue(200);

  const formAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: position.value,
        },
      ],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    position.value = withTiming(0, { duration: 1000 });
  }, []);

  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [avatar, setAvatar] = useState(user.avatar);

  const [password, setPasword] = useState('');
  const [newPassword, setNewPasword] = useState('');
  const [confirmNewPassword, setConfirmNewPasword] = useState('');

  const [loading, setLoading] = useState(false);

  const [menu, setMenu] = useState<'data' | 'password'>('data');

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza ?',
      'Se você sair irá precisar de internet para conectar-se novamente',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await signOut();
            } catch {
              Alert.alert('Ops!', 'Não foi possível sair da aplicação');
            }
          },
        },
      ]
    );
  }

  function handleMenu(value: 'data' | 'password') {
    if (value === menu) return;

    opacity.value = withSequence(withTiming(0, { duration: 0 }), withTiming(1, { duration: 1000 }));

    position.value = withSequence(
      withTiming(200, { duration: 0 }),
      withTiming(0, { duration: 1000 })
    );

    setMenu(value);
  }

  async function handleChangePassword() {
    setLoading(true);
  }

  async function handleSelectAvatar() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      return alert('Desculpa, você precisar dar permissão para utilizar a camera');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateUser() {
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };

      await schema.validate(data);

      await updateUser({
        id: user.id,
        avatar,
        name,
        driver_license: driverLicense,
        email: user.email,
        user_id: user.user_id,
        token: user.token,
      });

      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops!', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil!');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={-100}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Header>
            <HeaderWrapper>
              <BackButton />

              <Title>Editar Perfil</Title>

              <BorderlessButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={colors.shape} />
              </BorderlessButton>
            </HeaderWrapper>

            <AvatarContainer>
              <Avatar
                source={{
                  uri:
                    avatar.length > 0
                      ? avatar
                      : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                }}
              />

              <ChangeAvatarButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={colors.shape} />
              </ChangeAvatarButton>
            </AvatarContainer>
          </Header>

          <Content>
            <Menu>
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleMenu('data')}>
                <MenuItem active={menu === 'data'}>Dados</MenuItem>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={() => handleMenu('password')}>
                <MenuItem active={menu === 'password'}>Trocar senha</MenuItem>
              </TouchableOpacity>
            </Menu>

            <Animated.View style={formAnimated}>
              {menu === 'data' ? (
                <Form>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    value={name}
                    onChangeText={(value) => setName(value)}
                    isFilled={name.trim().length > 0}
                  />

                  <Input
                    iconName="mail"
                    placeholder="E-mail"
                    value={user.email}
                    isFilled
                    editable={false}
                  />

                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    onChangeText={(value) => setDriverLicense(value)}
                    value={driverLicense}
                    isFilled={driverLicense.trim().length > 0}
                  />
                </Form>
              ) : (
                <Form>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                    value={password}
                    onChangeText={(value) => setPasword(value)}
                    isFilled={password.trim().length > 0}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha"
                    value={newPassword}
                    onChangeText={(value) => setNewPasword(value)}
                    isFilled={newPassword.trim().length > 0}
                  />

                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir"
                    value={confirmNewPassword}
                    onChangeText={(value) => setConfirmNewPasword(value)}
                    isFilled={confirmNewPassword.trim().length > 0}
                  />
                </Form>
              )}

              <Footer>
                <Button
                  title="Salvar alterações"
                  loading={loading}
                  onPress={menu === 'data' ? handleUpdateUser : handleChangePassword}
                  enabled={
                    (name.trim().length > 0 &&
                      driverLicense.trim().length > 0 &&
                      menu === 'data') ||
                    (password.trim().length > 0 &&
                      newPassword.trim().length > 0 &&
                      confirmNewPassword.trim().length > 0 &&
                      menu === 'password')
                  }
                />
              </Footer>
            </Animated.View>
          </Content>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}
