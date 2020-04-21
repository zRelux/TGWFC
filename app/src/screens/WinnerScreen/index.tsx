import React, { useState, useEffect } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { translate } from '../../translations';

import ScreenContainer from '../../components/ScreenContainer';

import { User } from '../../contexts/Participant';

import useSocket from '../../hooks/useSocket';
import useParticipant from '../../hooks/useParticipant';
import { GameButton, GameButtonText } from '../../components/Button';

import { WinnerContainer, WinnerText, WinnerUsernameText, IWonText, ExitButtonArea } from './styles';

interface WinnerScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Winner'>;
}

const WinnerScreen: React.FunctionComponent<WinnerScreenProps> = ({ navigation }) => {
  const [winnerUser, setWinnerUser] = useState<User | false>(false);
  const { id } = useSocket();
  const { participants } = useParticipant();

  useEffect(() => {
    setWinnerUser(
      participants.length > 0 &&
        participants.reduce((prev, current) => (+prev.points > +current.points ? prev : current))
    );
  }, []);

  const iAmWinner = winnerUser && winnerUser.userId === id;

  const leaveMatch = () => {
    navigation.navigate('Home');
  };

  return (
    <ScreenContainer>
      <WinnerContainer>
        {!iAmWinner ? (
          <>
            <WinnerText>{translate('WinnerScreen.winnerText')}</WinnerText>
            {winnerUser && <WinnerUsernameText>{winnerUser.username}</WinnerUsernameText>}
          </>
        ) : (
          <IWonText>{translate('WinnerScreen.iWonText')}</IWonText>
        )}
        <ExitButtonArea>
          <GameButton background="primary" onPress={leaveMatch}>
            <GameButtonText color="primaryText">{translate('WinnerScreen.exitButton')}</GameButtonText>
          </GameButton>
        </ExitButtonArea>
      </WinnerContainer>
    </ScreenContainer>
  );
};

export default WinnerScreen;
