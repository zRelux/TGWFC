import styled from 'styled-components/native';

export const SettingContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;

export const UsernameInputText = styled.Text`
  font-size: 26px;

  margin-top: ${({ theme }) => theme.spacing.multiple(5)};

  color: ${({ theme }) => theme.colors.primary};
`;

export const UsernameInput = styled.TextInput`
  margin-top: ${({ theme }) => theme.spacing.triple};
  padding: ${({ theme }) => theme.spacing.single};
  padding-left: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(8)};

  background: ${({ theme }) => theme.colors.primaryText};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.double};
`;

export const DisclaimerView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: auto;
  margin-right: ${({ theme }) => theme.spacing.double};
  margin-bottom: ${({ theme }) => theme.spacing.double};
`;

interface DisclaimerTextProps {
  bold?: boolean;
}

export const DisclaimerText = styled.Text<DisclaimerTextProps>`
  font-size: 18px;
  ${({ bold }) => bold && `font-weight: bold`};
`;
