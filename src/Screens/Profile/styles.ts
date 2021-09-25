import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface MenuItemProps {
  active?: boolean;
}

export const Container = styled.ScrollView`
  /* flex: 1; */
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};

  padding-left: 19px;
  padding-right: 19px;
  padding-top: ${getStatusBarHeight() + 30}px;

  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: 227px;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;
`;

export const AvatarContainer = styled.View`
  align-self: center;
  margin-bottom: -90px;
`;

export const Avatar = styled.Image`
  height: 180px;
  width: 180px;

  border-radius: 90px;
`;

export const ChangeAvatarButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main};

  width: 40px;
  height: 40px;

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0;
  right: 5px;
`;

export const Content = styled.View`
  margin: 0 24px;
  margin-top: 122px;
`;

export const Menu = styled.View`
  flex-direction: row;
  justify-content: center;

  border-bottom-width: 0.5px;
  border-bottom-color: ${({ theme }) => theme.colors.text_details};
`;

export const MenuItem = styled.Text<MenuItemProps>`
  margin-left: 24px;

  padding-bottom: 16px;

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_details};

  ${({ theme, active }) =>
    active &&
    css`
      font-family: ${({ theme }) => theme.fonts.primary_500};
      color: ${({ theme }) => theme.colors.title};
      border-bottom-width: 2px;
      border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const Footer = styled.View`
  margin-bottom: 56px;
`;
