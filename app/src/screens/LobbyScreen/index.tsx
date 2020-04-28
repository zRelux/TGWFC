import React, { useEffect } from 'react';
import { FlatList, Share } from 'react-native';

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
import { translate } from '../../translations';

import { User } from '../../types/User';
import { GameReplyPayload, RoomUpdatePayload } from '../../types/Payloads';

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
  const { username, roomId, setRoomId } = useData();
  const { kickedUserId, participants, hostUser, setKickedUserId } = useParticipant();
  const { send, id, listen, socketAvailable } = useSocket();

  const hostUsername = route.params && route.params.username ? route.params.username : hostUser.username;
  const iAmHost = route.params && route.params.username ? true : hostUser && hostUser.id === id;

  const notEnoughParticipants = participants.length - 1 < 2 || participants.length > 10;
  const emptyRoom = participants.length - 1 <= 0;
  const lobbyParticipants = participants.filter((part) => part.id !== id);

  useEffect(() => {
    if (socketAvailable) {
      listen<RoomUpdatePayload>('joinRoomReply', (payload) => {
        if (payload.error) {
          navigation.navigate('Home', { msg: payload.error });
        }
      });

      listen<GameReplyPayload>('startGameReply', ({ error, card_to_show, cards, i_am_chooser, round, chooser }) => {
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
      });
    }
  }, [socketAvailable]);

  useEffect(() => {
    if (socketAvailable)
      if (route.params && route.params.roomId) {
        send('joinRoom', {
          username,
          room_id: route.params.roomId
        });

        listen<RoomUpdatePayload>('joinRoomReply', ({ error }) => {
          if (error) {
            navigation.navigate('Home', { msg: error });
          } else {
            if (route.params && route.params.roomId) {
              setRoomId(route.params.roomId);

              route.params.roomId = undefined;
            }
          }
        });
      }
  }, [route.params, socketAvailable]);

  useEffect(() => {
    if (kickedUserId !== '' && kickedUserId === id) {
      setKickedUserId('');
      navigation.navigate('Home', {
        msg: 'You got kicked!!'
      });
    }
  }, [kickedUserId]);

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'Join a match and play against me at ' +
          'https://thegamewithfunnycards.com/share/' +
          roomId +
          ' or enter this room id ' +
          roomId +
          ' in the participate section'
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const goToMatch = () => {
    if (iAmHost) {
      send('startGame', {
        room_id: roomId
      });
    }
  };

  const kickUser = (userToKick: User) => () => {
    send('kickUser', {
      user_id: userToKick.id,
      room_id: roomId
    });
  };

  const leaveMatch = () => {
    send('leaveRoom', {
      room_id: roomId
    });

    navigation.navigate('Home');
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
          <GameButton background="primaryText" onPress={onShare}>
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
              <ParticipantCard key={item.id}>
                <ParticipantCardText>{item.username}</ParticipantCardText>
                {iAmHost && (
                  <RemoveUserButton onPress={kickUser(item)}>
                    <MaterialIcons name="close" size={32} color="#f2f2f2" />
                  </RemoveUserButton>
                )}
              </ParticipantCard>
            )}
            keyExtractor={(partecipant) => partecipant.id}
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
