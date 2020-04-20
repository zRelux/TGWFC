import React, { useEffect } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { JoinRoomPayload } from '../../contexts/Participant';

import { translate } from '../../translations';

import { Content } from '../../components/ScreenContainer';
import ScreenContainer from '../../components/ScreenContainer';
import BottomSheet from '../../components/BottomSheet';

import { StartHeader } from '../StartScreen/styles';

import useSocket from '../../hooks/useSocket';
import useData from '../../hooks/useData';

import { RoomIDInputText, RoomIDInput } from './styles';

interface JoinScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Join'>;
}

const JoinScreen: React.FunctionComponent<JoinScreenProps> = ({ navigation }) => {
  const { username, roomId, setRoomId } = useData();
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
        <RoomIDInputText>{translate('JoinScreen.inputHeader')}</RoomIDInputText>
        <RoomIDInput value={roomId} onChangeText={onChangeText} />
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
