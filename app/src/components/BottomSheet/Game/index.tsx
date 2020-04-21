import React, { useContext } from 'react';

import { FlatList } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';

import { GameButton, GameButtonText } from '../../../components/Button';
import { translate } from '../../../translations';

import useParticipant from '../../../hooks/useParticipant';
import useSocket from '../../../hooks/useSocket';
import useData from '../../../hooks/useData';

import { User } from '../../../types/User';

import {
  BottomSheetHeader,
  PanelHandle,
  TextContainer,
  BottomSheetHeaderTopText,
  BottomSheetHeaderSecondText,
  BottomSheetContent,
  LeaderboardContainer,
  UserSection,
  Divider,
  UserSectionText,
  LeaveButtonSection
} from './styles';

interface GameProps {
  round: number;
  chooser: User;
}

const Game: React.FunctionComponent<GameProps> = ({ round, chooser }) => {
  const navigation = useContext(NavigationContext);

  const { roomId } = useData();
  const { participants } = useParticipant();
  const { send } = useSocket();

  const leaveMatch = () => {
    send('leaveRoom', {
      room_id: roomId
    });

    if (navigation) {
      navigation.navigate('Home');
    }
  };

  const renderHeader = () => {
    return (
      <BottomSheetHeader>
        <PanelHandle />
        <TextContainer>
          <BottomSheetHeaderTopText color="tertiary">
            {translate('GameScreen.GameBottomSheet.roundText')}
          </BottomSheetHeaderTopText>
          <BottomSheetHeaderTopText color="primaryText" marginOff>
            {round}
          </BottomSheetHeaderTopText>
        </TextContainer>
        <TextContainer>
          <BottomSheetHeaderSecondText color="tertiary">
            {translate('GameScreen.GameBottomSheet.czarText')}
          </BottomSheetHeaderSecondText>
          <BottomSheetHeaderSecondText color="primaryText" marginOff>
            {chooser.username}
          </BottomSheetHeaderSecondText>
        </TextContainer>
      </BottomSheetHeader>
    );
  };

  const renderContent = () => {
    return (
      <BottomSheetContent>
        <TextContainer>
          <BottomSheetHeaderTopText color="primaryText">
            {translate('GameScreen.GameBottomSheet.leaderboardText')}
          </BottomSheetHeaderTopText>
        </TextContainer>
        <LeaderboardContainer>
          <FlatList
            data={participants}
            renderItem={({ item }) => (
              <>
                <UserSection>
                  <UserSectionText>{item.username}</UserSectionText>
                  <UserSectionText>
                    {item.points} {translate('GameScreen.GameBottomSheet.ptMsg')}
                  </UserSectionText>
                </UserSection>
                <Divider />
              </>
            )}
            keyExtractor={(user) => user.id}
          />
        </LeaderboardContainer>
        <LeaveButtonSection>
          <GameButton background="primaryText" onPress={leaveMatch}>
            <GameButtonText color="error">{translate('GameScreen.GameBottomSheet.exitButton')}</GameButtonText>
          </GameButton>
        </LeaveButtonSection>
      </BottomSheetContent>
    );
  };

  return <BottomSheet snapPoints={[90, 490]} renderHeader={renderHeader} renderContent={renderContent} />;
};

export default Game;
