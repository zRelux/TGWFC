import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
  padding-bottom: ${({ theme }) => theme.spacing.multiple(25)};
`;

export const StartHeader = styled.Text`
  font-size: ${({ theme }) => theme.spacing.triple};
  width: ${({ theme }) => theme.spacing.multiple(34)};

  margin-top: ${({ theme }) => theme.spacing.multiple(5)};

  font-size: ${({ theme }) => theme.spacing.multiple(4)};
  color: ${({ theme }) => theme.colors.primary};
`;

export const RoundSelector = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;

  color: ${({ theme }) => theme.colors.primary};

  margin-top: ${({ theme }) => theme.spacing.multiple(7)};
`;

export const RoundsText = styled.Text`
  font-size: ${({ theme }) => theme.spacing.triple};
  margin-right: ${({ theme }) => theme.spacing.multiple(5)};

  margin-bottom: ${({ theme }) => theme.spacing.triple};
`;

export const Picker = styled.Picker`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(8)};
  width: 123px;

  ${({ theme }) => theme.shadow};
`;

export const PackContainer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.multiple(4)};
`;

interface PackItemProps {
  selected?: boolean;
}

export const PackItem = styled.TouchableOpacity<PackItemProps>`
  display: flex;
  justify-content: center;

  margin-bottom: ${({ theme }) => theme.spacing.triple};

  background: ${({ theme, selected }) => (!selected ? theme.colors.primaryText : theme.colors.primary)};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  border-radius: ${({ theme }) => theme.spacing.double};
  height: ${({ theme }) => theme.spacing.multiple(8)};
`;

export const PackItemText = styled.Text<PackItemProps>`
  margin-left: ${({ theme }) => theme.spacing.double};

  font-size: ${({ theme }) => theme.spacing.triple};
  color: ${({ theme, selected }) => (!selected ? theme.colors.primary : theme.colors.primaryText)};
`;

export const BottomSheetContainer = styled.View`
  display: flex;
  align-items: center;

  height: ${({ theme }) => theme.spacing.multiple(20)};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.double};

  padding-left: ${({ theme }) => theme.spacing.multiple(4)};
  padding-right: ${({ theme }) => theme.spacing.multiple(4)};

  box-shadow: 0px -3px 4px #00000066;
`;

interface CtaButtonProps {
  empty?: boolean;
}

export const CtaButton = styled.TouchableOpacity<CtaButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;

  height: ${({ theme }) => theme.spacing.multiple(6)};
  background: ${({ theme, empty }) => (empty ? theme.colors.tertiary : theme.colors.primaryText)};
  border-radius: ${({ theme }) => theme.spacing.double};

  margin-top: ${({ theme }) => theme.spacing.triple};
`;

export const CtaText = styled.Text<CtaButtonProps>`
  font-size: 20px;
  color: ${({ theme, empty }) => (empty ? theme.colors.primaryText : theme.colors.primary)};
  margin-top: ${({ theme }) => theme.spacing.oneAndHalf};
  margin-bottom: ${({ theme }) => theme.spacing.oneAndHalf};
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${({ theme }) => theme.spacing.triple};
`;

export const BackText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
`;
