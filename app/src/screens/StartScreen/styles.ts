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
  justify-content: space-between;
  flex-direction: row;

  color: ${({ theme }) => theme.colors.primary};

  margin-top: ${({ theme }) => theme.spacing.multiple(7)};
`;

interface RoundsTextProps {
  bottom?: boolean;
}

export const RoundsText = styled.Text<RoundsTextProps>`
  font-size: ${({ theme }) => theme.spacing.triple};

  ${({ theme, bottom }) => bottom && `margin-bottom: ${theme.spacing.triple}`};
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

  padding-top: ${({ theme }) => theme.spacing.triple};

  box-shadow: 0px -3px 4px #00000066;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: ${({ theme }) => theme.spacing.triple};
`;

export const BackText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
`;
