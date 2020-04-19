import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-bottom: 0;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;
