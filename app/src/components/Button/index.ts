import styled from 'styled-components/native';

interface ButtonProps {
  color: 'primary' | 'secondary' | 'tertiary';
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${({ theme }) => theme.spacing.multiple(4)};

  background: ${({ theme, color }) => theme.colors[color]};
  border-radius: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(8)};

  ${({ theme }) => theme.shadow};
`;

export const ButtonText = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

interface GameButtonProps {
  background: string;
}

export const GameButton = styled.TouchableOpacity<GameButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;

  height: ${({ theme }) => theme.spacing.multiple(6)};
  background: ${({ theme, background }) => theme.colors[background]};
  border-radius: ${({ theme }) => theme.spacing.double};
`;

interface GameButtonTextProps {
  color: string;
}

export const GameButtonText = styled.Text<GameButtonTextProps>`
  font-size: 20px;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-top: ${({ theme }) => theme.spacing.oneAndHalf};
  margin-bottom: ${({ theme }) => theme.spacing.oneAndHalf};
`;
