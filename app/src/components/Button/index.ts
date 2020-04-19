import styled from 'styled-components/native';

interface ButtonProps {
  color: 'primary' | 'secondary' | 'tertiary';
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
  margin-bottom: ${({ theme }) => theme.spacing.multiple(4)};

  background: ${({ theme, color }) => theme.colors[color]};
  border-radius: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(8)};

  ${({ theme }) => theme.shadow};
`;

export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.spacing.multiple(3.5)};
  color: #f2f2f2;
  opacity: 1;
`;