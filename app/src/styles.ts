import styled from 'styled-components/native';

export const AppView = styled.View`
  background-color: ${({ theme }) => theme.colors.active};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
