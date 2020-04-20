import styled from 'styled-components/native';

export const CardToFill = styled.View`
  height: ${({ theme }) => theme.spacing.multiple(27.5)};
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 3px 3px 4px #00000065;
  border-radius: ${({ theme }) => theme.spacing.double};
`;

export const CardToFillText = styled.Text`
  font-size: 28px;
  margin-top: ${({ theme }) => theme.spacing.double};
  margin-left: ${({ theme }) => theme.spacing.double};

  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ChooseSection = styled.View``;

export const ChooseSectionText = styled.Text`
  font-size: 24px;

  margin-top: ${({ theme }) => theme.spacing.triple};
`;

interface ChooseCardProps {
  screenWidth: number;
}

export const ChooseCard = styled.View<ChooseCardProps>`
  display: flex;

  width: ${({ screenWidth }) => screenWidth - 32 + 'px'};

  margin-top: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(27.5)};
  background: ${({ theme }) => theme.colors.primaryText};
  box-shadow: 3px 3px 4px #00000065;
  border-radius: ${({ theme }) => theme.spacing.double};
`;

export const ChooseCardText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.oneAndHalf};
  margin-left: ${({ theme }) => theme.spacing.oneAndHalf};

  font-size: 28px;
`;

interface ChooseCardButtonProps {
  selected: boolean;
}

export const ChooseCardButton = styled.TouchableOpacity<ChooseCardButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: auto;
  margin-left: auto;

  margin-right: ${({ theme }) => theme.spacing.oneAndHalf};
  margin-bottom: ${({ theme }) => theme.spacing.oneAndHalf};

  padding: ${({ theme }) => theme.spacing.oneAndHalf} ${({ theme }) => theme.spacing.multiple(4)};

  height: ${({ theme }) => theme.spacing.multiple(6)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.double};
  opacity: 1;

  background: ${({ theme, selected }) => (!selected ? theme.colors.primaryText : theme.colors.primary)};
`;

export const ChooseCardButtonText = styled.Text<ChooseCardButtonProps>`
  font-size: 20px;

  color: ${({ theme, selected }) => (!selected ? theme.colors.primary : theme.colors.primaryText)};
`;

export const ChooserTextSection = styled.View`
  height: ${({ theme }) => theme.spacing.multiple(27.5)};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChooserText = styled.Text`
  width: ${({ theme }) => theme.spacing.multiple(29)};
  font-size: 45px;
`;
