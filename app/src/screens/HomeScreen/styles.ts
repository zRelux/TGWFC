import styled from 'styled-components/native';

export const GameHeader = styled.Text`
  width: ${({ theme }) => theme.spacing.multiple(36)};
  font-size: 34px;

  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.multiple(8)};
  margin-bottom: ${({ theme }) => theme.spacing.multiple(10)};
  margin-left: ${({ theme }) => theme.spacing.double};
`;
