import styled from 'styled-components/native';

export const WinnerContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;

export const WinnerText = styled.Text`
  font-size: 35px;

  color: ${({ theme }) => theme.colors.primary};
`;

export const WinnerUsernameText = styled.Text`
  font-size: 45px;

  margin-bottom: ${({ theme }) => theme.spacing.multiple(5)};
  color: ${({ theme }) => theme.colors.primary};
`;

export const IWonText = styled.Text`
  font-size: 35px;

  margin-bottom: ${({ theme }) => theme.spacing.multiple(8)};
  color: ${({ theme }) => theme.colors.primary};
`;

export const ExitButtonArea = styled.View`
  width: 100%;

  padding-left: ${({ theme }) => theme.spacing.multiple(4)};
  padding-right: ${({ theme }) => theme.spacing.multiple(4)};
`;
