import styled from 'styled-components/native';

export const StartHeader = styled.Text`
  font-size: 34px;
  font-weight: bold;
  width: ${({ theme }) => theme.spacing.multiple(34)};

  margin-top: ${({ theme }) => theme.spacing.multiple(5)};
  color: ${({ theme }) => theme.colors.primary};
`;

export const RoundSelector = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  color: ${({ theme }) => theme.colors.primary};
`;

interface RoundsTextProps {
  bottom?: boolean;
}

export const RoundsText = styled.Text<RoundsTextProps>`
  font-size: 26px;

  ${({ theme, bottom }) => bottom && `margin-bottom: ${theme.spacing.double}`};
`;

export const Picker = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.double};

  height: ${({ theme }) => theme.spacing.multiple(8)};
  width: 124px;

  ${({ theme }) => theme.shadow};
`;

export const PickerText = styled.Text`
  margin-right: ${({ theme }) => theme.spacing.double};
  font-size: 24px;
  color: white;
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

  font-size: 26px;
  color: ${({ theme, selected }) => (!selected ? theme.colors.primary : theme.colors.primaryText)};
`;

export const LoadingSpinner = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
