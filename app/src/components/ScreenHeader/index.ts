import styled from 'styled-components/native';

interface ScreenHeaderProps {
  top?: number;
  bottom?: number;
}

export const ScreenHeader = styled.Text<ScreenHeaderProps>`
  font-size: 34px;
  font-weight: bold;

  width: ${({ theme }) => theme.spacing.multiple(34)};

  margin-top: ${({ theme, top }) => theme.spacing.multiple(top ? top : 5)};
  margin-bottom: ${({ theme, bottom }) => theme.spacing.multiple(bottom ? bottom : 0)};

  color: ${({ theme }) => theme.colors.primary};
`;
