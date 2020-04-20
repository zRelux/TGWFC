import React, { useState, useEffect } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { JoinRoomPayload } from '../../contexts/Participant';

import { translate } from '../../translations';

import { Content } from '../../components/ScreenContainer';
import ScreenContainer from '../../components/ScreenContainer';
import BottomSheet from '../../components/BottomSheet';

import { StartHeader } from '../StartScreen/styles';

import { UsernameInputText, UsernameInput } from './styles';
import useSocket from '../../hooks/useSocket';
import useData from '../../hooks/useData';

interface JoinScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Join'>;
}

const JoinScreen: React.FunctionComponent<JoinScreenProps> = ({ navigation }) => {
  const [roomId, setRoomId] = useState('1');
  const { username } = useData();
  const { send, listen, socketAvailable } = useSocket();

  const empty = roomId === '';

  useEffect(() => {
    if (socketAvailable) {
      listen<JoinRoomPayload>('joinRoomReply', ({ error }) => {
        if (!error) {
          navigation.navigate('Lobby');
        } else {
          alert(error);
        }
      });
    }
  }, [socketAvailable]);

  const joinRoom = () => {
    send('joinRoom', {
      username,
      room_id: roomId
    });
  };

  const onChangeText = (room: string) => {
    setRoomId(room);
  };

  return (
    <ScreenContainer>
      <Content>
        <StartHeader>{translate('JoinScreen.pageHeader')}</StartHeader>
        <UsernameInputText>{translate('JoinScreen.inputHeader')}</UsernameInputText>
        <UsernameInput value={roomId} onChangeText={onChangeText} />
      </Content>
      <BottomSheet
        falsyAction={empty}
        callOnTruth={joinRoom}
        copy={{
          actionFalsy: translate('JoinScreen.noJoinButton'),
          actionTruthy: translate('JoinScreen.joinButton')
        }}
      />
    </ScreenContainer>
  );
};

export default JoinScreen;
