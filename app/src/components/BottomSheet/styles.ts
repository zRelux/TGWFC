import styled from 'styled-components/native';

export const BottomSheetContainer = styled.View`
  display: flex;
  align-items: center;

  margin-top: auto;

  background: ${({ theme }) => theme.colors.primary};

  border-top-left-radius: ${({ theme }) => theme.spacing.double};
  border-top-right-radius: ${({ theme }) => theme.spacing.double};

  padding: ${({ theme }) => theme.spacing.multiple(4)};

  padding-top: ${({ theme }) => theme.spacing.triple};

  elevation: 3;
  box-shadow: 0px -3px 4px #00000066;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${({ theme }) => theme.spacing.triple};
`;

export const BackText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
`;
