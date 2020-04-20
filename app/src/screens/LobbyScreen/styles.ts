import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${({ theme }) => theme.spacing.double};
  margin-right: ${({ theme }) => theme.spacing.double};
`;

export const HostCard = styled.View`
  margin-top: ${({ theme }) => theme.spacing.triple};
  width: 100%;
  height: ${({ theme }) => theme.spacing.multiple(27.5)};
  background: ${({ theme }) => theme.colors.primary};
  elevation: 3;
  box-shadow: 3px 3px 4px #00000065;
  border-radius: ${({ theme }) => theme.spacing.double};

  padding-bottom: ${({ theme }) => theme.spacing.double};
`;

export const HostHeader = styled.View``;

export const HostHeaderText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.double};
  margin-left: ${({ theme }) => theme.spacing.double};

  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const HostNameText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.half};
  margin-left: ${({ theme }) => theme.spacing.double};

  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const HostButtons = styled.View`
  margin-right: ${({ theme }) => theme.spacing.double};
  margin-left: ${({ theme }) => theme.spacing.double};
`;

export const Separator = styled.View`
  margin-top: ${({ theme }) => theme.spacing.double};
`;

export const ParticipantSection = styled.View`
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing.triple};
`;

export const ParticipantSectionHeader = styled.Text`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ParticipantCard = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: ${({ theme }) => theme.spacing.multiple(8)};
  background: #707070;
  elevation: 3;
  box-shadow: 3px 3px 4px #00000065;
  border-radius: ${({ theme }) => theme.spacing.double};

  margin-bottom: ${({ theme }) => theme.spacing.triple};

  padding-left: ${({ theme }) => theme.spacing.double};
  padding-right: ${({ theme }) => theme.spacing.double};
`;

export const ParticipantCardText = styled.Text`
  font-size: 26px;

  color: ${({ theme }) => theme.colors.primaryText};
`;

export const NoParticipants = styled.View`
  display: flex;
  flex: 1;
`;

export const NoParticipantsText = styled.Text`
  font-size: 20px;

  margin-top: ${({ theme }) => theme.spacing.multiple(8)};
  margin-left: auto;
  margin-right: auto;

  color: ${({ theme }) => theme.colors.primary};
`;

export const RemoveUserButton = styled.TouchableOpacity``;
