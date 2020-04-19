import styled from 'styled-components/native';

export const SettingContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;

export const UsernameInputText = styled.Text``;

export const UsernameInput = styled.TextInput``;
