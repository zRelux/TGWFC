import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
  padding-bottom: 0;
`;
