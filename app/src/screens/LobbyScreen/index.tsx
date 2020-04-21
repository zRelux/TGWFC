import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { GameButton, GameButtonText } from '../../components/Button';
import BottomSheet from '../../components/BottomSheet';

import { MaterialIcons } from '@expo/vector-icons';

import ScreenContainer from '../../components/ScreenContainer';

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

export type StartGameReplyPayload = {
  card_to_show: string;
  cards: string[];
  i_am_chooser: boolean;
  round: number;
  chooser: User;
  error?: string;
  round_winner?: User;
  game_finished: boolean;
};

const LobbyScreen: React.FunctionComponent<LobbyScreenProps> = ({ navigation, route }) => {
  const { roomId } = useData();
  const { kickedUserId, participants, hostUser, setKickedUserId } = useParticipant();
  const { send, id, listen, socketAvailable } = useSocket();

  const hostUsername = route.params && route.params.username ? route.params.username : hostUser.username;
  const iAmHost = route.params && route.params.username ? true : hostUser && hostUser.userId === id;

  const notEnoughParticipants = participants.length - 1 < 2 || participants.length > 10;
  const emptyRoom = participants.length - 1 <= 0;
  const lobbyParticipants = participants.filter((part) => part.userId !== id);

  useEffect(() => {
    if (socketAvailable) {
      listen<StartGameReplyPayload>(
        'startGameReply',
        ({ error, card_to_show, cards, i_am_chooser, round, chooser }) => {
          console.log({ error, card_to_show, cards, i_am_chooser, round, chooser });

          if (!error) {
            navigation.navigate('Game', {
              cardToShow: card_to_show,
              cards,
              iAmChooser: i_am_chooser,
              round,
              chooser
            });
          } else {
            alert(error);
          }
        }
      );
    }
  }, [socketAvailable]);

  useEffect(() => {
    if (kickedUserId === id) {
      setKickedUserId('');
      navigation.navigate('Home', {
        msg: 'You got kicked!!'
      });
    }
  }, [kickedUserId]);

  const goToMatch = () => {
    if (iAmHost) {
      send('startGame', {
        room_id: roomId
      });
    }
  };

  const kickUser = (userToKick: User) => () => {
    send('kickUser', {
      user_id: userToKick.userId,
      room_id: roomId
    });
  };

  const leaveMatch = () => {
    send('leaveRoom', {
      room_id: roomId
    });

    navigation.goBack();
  };

  return (
    <ScreenContainer>
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
        {emptyRoom ? (
          <NoParticipants>
            <NoParticipantsText>{translate('LobbyScreen.noParticipantsLoader')}</NoParticipantsText>
          </NoParticipants>
        ) : (
          <FlatList
            data={lobbyParticipants}
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
      <BottomSheet
        goBack={false}
        falsyAction={notEnoughParticipants}
        callOnTruth={goToMatch}
        copy={{
          actionFalsy: translate('LobbyScreen.waitingButton'),
          actionTruthy: iAmHost ? translate('LobbyScreen.startButton') : translate('LobbyScreen.waitHostButton')
        }}
      />
    </ScreenContainer>
  );
};

export default LobbyScreen;
