import React from 'react';
import { FlatList } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../..';

import { GameButton, GameButtonText } from '../../components/Button';
import { MaterialIcons } from '@expo/vector-icons';

import ScreenContainer from '../../components/ScreenContainer';

import useParticipant from '../../hooks/useParticipant';
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
  BottomBar,
  NoParticipants,
  NoParticipantsText
} from './styles';

interface LobbyScreenProps {
  route: RouteProp<RootStackParamList, 'Lobby'>;
}

const LobbyScreen: React.FunctionComponent<LobbyScreenProps> = ({ route }) => {
  const hostUsername = route.params && route.params.username ? route.params.username : 'TestFra';
  const { participants } = useParticipant();

  const empty = participants.length === 0;

  return (
    <>
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
            <GameButton background="primaryText">
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
                <ParticipantCard>
                  <ParticipantCardText>{item.username}</ParticipantCardText>
                  <MaterialIcons name="close" size={32} color="#f2f2f2" />
                </ParticipantCard>
              )}
              keyExtractor={(pack) => pack.id}
            />
          )}
        </ParticipantSection>
      </ScreenContainer>
      <BottomBar>
        <GameButton background={empty ? 'tertiary' : 'primaryText'}>
          <GameButtonText color="primaryText">
            {empty ? translate('LobbyScreen.waitingButton') : translate('LobbyScreen.waitingButton')}
          </GameButtonText>
        </GameButton>
      </BottomBar>
    </>
  );
};

export default LobbyScreen;
