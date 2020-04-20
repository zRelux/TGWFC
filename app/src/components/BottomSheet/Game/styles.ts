import styled from 'styled-components/native';

export const BottomSheetHeader = styled.View`
  height: 90px;

  padding-top: ${({ theme }) => theme.spacing.half};

  background: ${({ theme }) => theme.colors.primary};

  border-top-left-radius: ${({ theme }) => theme.spacing.double};
  border-top-right-radius: ${({ theme }) => theme.spacing.double};
`;

export const PanelHandle = styled.View`
  margin-left: auto;
  margin-right: auto;

  width: ${({ theme }) => theme.spacing.multiple(5)};
  height: ${({ theme }) => theme.spacing.single};
  border-radius: ${({ theme }) => theme.spacing.half};
  background: #ffffff40;
`;

interface TextProps {
  color: string;
  marginOff?: boolean;
}

export const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const BottomSheetHeaderTopText = styled.Text<TextProps>`
  font-size: 20px;
  color: ${({ theme, color }) => theme.colors[color]};

  margin-top: ${({ theme }) => theme.spacing.single};
  margin-left: ${({ theme, marginOff }) => (marginOff ? theme.spacing.half : theme.spacing.double)};
`;

export const BottomSheetHeaderSecondText = styled.Text<TextProps>`
  font-size: 20px;
  color: ${({ theme, color }) => theme.colors[color]};

  margin-top: ${({ theme }) => theme.spacing.single};
  margin-left: ${({ theme, marginOff }) => (marginOff ? theme.spacing.half : theme.spacing.double)};
`;

export const BottomSheetContent = styled.View`
  height: 400px;
  background: ${({ theme }) => theme.colors.primary};
`;

export const LeaderboardContainer = styled.View`
  height: 268px;

  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;

export const Divider = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.primaryText};

  margin-top: ${({ theme }) => theme.spacing.double};
`;

export const UserSection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserSectionText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.double};

  font-size: 26px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const LeaveButtonSection = styled.View`
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spacing.multiple(4)};
  padding-left: ${({ theme }) => theme.spacing.multiple(4)};
  padding-right: ${({ theme }) => theme.spacing.multiple(4)};
`;
