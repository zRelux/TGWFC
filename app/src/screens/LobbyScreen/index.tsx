import React from 'react';
import { FlatList } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { GameButton, GameButtonText } from '../../components/Button';
import BottomSheet from '../../components/BottomSheet';

import { MaterialIcons } from '@expo/vector-icons';

import ScreenContainer, { Content } from '../../components/ScreenContainer';

import useData from '../../hooks/useData';
import useSocket from '../../hooks/useSocket';
import useParticipant from '../../hooks/useParticipant';
import { User } from '../../contexts/Participant';

import { translate } from '../../translations';

import {
  HostCard,
  HostHeader,
  HostHeaderText,
  HostNameText,
  HostButtons,
  Separator,
  ParticipantSection,
  ParticipantSectionHeader,
  ParticipantCard,
  ParticipantCardText,
  NoParticipants,
  NoParticipantsText,
  RemoveUserButton
} from './styles';

interface LobbyScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Lobby'>;
  route: RouteProp<RootStackParamList, 'Lobby'>;
}

const LobbyScreen: React.FunctionComponent<LobbyScreenProps> = ({ navigation, route }) => {
  const { roomId } = useData();
  const { participants, hostUser } = useParticipant();
  const { send, id } = useSocket();

  const hostUsername = route.params && route.params.username ? route.params.username : hostUser.username;
  const iAmHost = hostUser && hostUser.userId === id;

  const empty = participants.length === 0;

  const kickUser = (userToKick: User) => () => {
    send('kickUser', {
      user_id: userToKick.userId,
      roomId
    });
  };

  const leaveMatch = () => {
    send('leaveRoom', {
      roomId
    });

    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Content>
        <HostCard>
          <HostHeader>
            <HostHeaderText>{translate('LobbyScreen.hostCardHeader')}</HostHeaderText>
            <HostNameText>{hostUsername}</HostNameText>
          </HostHeader>
          <HostButtons>
            <Separator />
            <GameButton background="primaryText">
              <GameButtonText color="primary">{translate('LobbyScreen.shareButton')}</GameButtonText>
            </GameButton>
            <Separator />
            <GameButton background="primaryText" onPress={leaveMatch}>
              <GameButtonText color="error">{translate('LobbyScreen.exitButton')}</GameButtonText>
            </GameButton>
          </HostButtons>
        </HostCard>
        <ParticipantSection>
          <ParticipantSectionHeader>{translate('LobbyScreen.participantHeader')}</ParticipantSectionHeader>
          <Separator />
          {empty ? (
            <NoParticipants>
              <NoParticipantsText>{translate('LobbyScreen.noParticipantsLoader')}</NoParticipantsText>
            </NoParticipants>
          ) : (
            <FlatList
              data={participants}
              renderItem={({ item }) => (
                <ParticipantCard key={item.userId}>
                  <ParticipantCardText>{item.username}</ParticipantCardText>
                  {iAmHost && (
                    <RemoveUserButton onPress={kickUser(item)}>
                      <MaterialIcons name="close" size={32} color="#f2f2f2" />
                    </RemoveUserButton>
                  )}
                </ParticipantCard>
              )}
              keyExtractor={(partecipant) => partecipant.userId}
            />
          )}
        </ParticipantSection>
      </Content>
      <BottomSheet
        goBack={false}
        falsyAction={empty}
        callOnTruth={() => {}}
        copy={{
          actionFalsy: translate('LobbyScreen.waitingButton'),
          actionTruthy: iAmHost ? translate('LobbyScreen.startButton') : translate('LobbyScreen.waitHostButton')
        }}
      />
    </ScreenContainer>
  );
};

export default LobbyScreen;
