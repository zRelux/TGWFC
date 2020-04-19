import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../..';

import { GameButton, GameButtonText } from '../../components/Button';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
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

import useParticipant from '../../hooks/useParticipant';

interface LobbyScreenProps {
  route: RouteProp<RootStackParamList, 'Lobby'>;
}

const LobbyScreen: React.FunctionComponent<LobbyScreenProps> = ({ route }) => {
  const hostUsername = route.params && route.params.username ? route.params.username : 'TestFra';
  const { participants } = useParticipant();

  const empty = participants.length === 0;

  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
        <Container>
          <HostCard>
            <HostHeader>
              <HostHeaderText>Game host:</HostHeaderText>
              <HostNameText>{hostUsername}</HostNameText>
            </HostHeader>
            <HostButtons>
              <Separator />
              <GameButton background="primaryText">
                <GameButtonText color="primary">Share link to this match</GameButtonText>
              </GameButton>
              <Separator />
              <GameButton background="primaryText">
                <GameButtonText color="error">Leave the match</GameButtonText>
              </GameButton>
            </HostButtons>
          </HostCard>
          <ParticipantSection>
            <ParticipantSectionHeader>Participants</ParticipantSectionHeader>
            <Separator />
            {empty ? (
              <NoParticipants>
                <NoParticipantsText>There are no participants yet.</NoParticipantsText>
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
        </Container>
      </SafeAreaView>
      <BottomBar>
        <GameButton background={empty ? 'tertiary' : 'primaryText'}>
          {empty ? (
            <GameButtonText color="primaryText">Waiting for partecipants...</GameButtonText>
          ) : (
            <GameButtonText color="primary">Start the game!</GameButtonText>
          )}
        </GameButton>
      </BottomBar>
    </>
  );
};

export default LobbyScreen;
