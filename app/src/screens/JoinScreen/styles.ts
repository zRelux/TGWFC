import styled from 'styled-components/native';

export const SettingContainer = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;

export const RoomIDInputText = styled.Text`
  font-size: 26px;

  margin-top: ${({ theme }) => theme.spacing.multiple(5)};

  color: ${({ theme }) => theme.colors.primary};
`;

export const RoomIDInput = styled.TextInput`
  margin-top: ${({ theme }) => theme.spacing.triple};
  padding: ${({ theme }) => theme.spacing.single};
  padding-left: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(8)};

  background: ${({ theme }) => theme.colors.primaryText};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.double};
`;

export const StartHeader = styled.Text`
  font-size: 34px;
  font-weight: bold;
  width: ${({ theme }) => theme.spacing.multiple(34)};

  margin-top: ${({ theme }) => theme.spacing.multiple(5)};
  color: ${({ theme }) => theme.colors.primary};
`;
