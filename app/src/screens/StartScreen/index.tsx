import React, { useState } from 'react';

import { FlatList, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import ScreenContainer, { Content } from '../../components/ScreenContainer';
import BottomSheet from '../../components/BottomSheet';
import { ScreenHeader } from '../../components/ScreenHeader';

import { Entypo } from '@expo/vector-icons';

import useSocket from '../../hooks/useSocket';
import useData from '../../hooks/useData';

import { translate } from '../../translations';

import values from './data';

import {
  RoundSelector,
  RoundsText,
  Picker,
  PickerText,
  PackContainer,
  PackItem,
  PackItemText,
  LoadingSpinner
} from './styles';

interface StartScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Start'>;
}

const StartScreen: React.FunctionComponent<StartScreenProps> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(5);
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const { username, packs } = useData();
  const { send } = useSocket();

  const empty = selectedPacks.length === 0;

  const addPack = (packId: string) => () => {
    const tmpArr = [...selectedPacks];

    if (tmpArr.includes(packId)) {
      const index = tmpArr.indexOf(packId);
      tmpArr.splice(index, 1);
    } else {
      tmpArr.push(packId);
    }

    setSelectedPacks(tmpArr);
  };

  const createOnClick = () => {
    send('createRoom', {
      username,
      number_of_rounds: selectedValue,
      packs: selectedPacks
    });

    if (navigation) {
      navigation.navigate('Lobby', { username });
    }
  };

  return (
    <ScreenContainer>
      <Content>
        <ScreenHeader bottom={5}>{translate('StartScreen.setupHeader')}</ScreenHeader>
        <RoundSelector>
          <RoundsText>{translate('StartScreen.roundsHeader')}</RoundsText>
          <RNPickerSelect
            placeholder={{}}
            items={values}
            onValueChange={(value) => {
              setSelectedValue(value);
            }}
          >
            <Picker>
              <PickerText>{selectedValue}</PickerText>
              <Entypo name="chevron-down" color="white" size={32}></Entypo>
            </Picker>
          </RNPickerSelect>
        </RoundSelector>
        <PackContainer>
          <RoundsText bottom>{translate('StartScreen.packsHeader')}</RoundsText>
          {packs.length === 0 ? (
            <LoadingSpinner>
              <ActivityIndicator />
            </LoadingSpinner>
          ) : (
            <FlatList
              data={packs}
              renderItem={({ item }) => (
                <PackItem onPress={addPack(item.id)} selected={selectedPacks.includes(item.id)}>
                  <PackItemText selected={selectedPacks.includes(item.id)}>{item.name}</PackItemText>
                </PackItem>
              )}
              keyExtractor={(pack) => pack.id}
            />
          )}
        </PackContainer>
      </Content>
      <BottomSheet
        falsyAction={empty}
        callOnTruth={createOnClick}
        copy={{
          actionFalsy: translate('StartScreen.createRoomButtonEmpty'),
          actionTruthy: translate('StartScreen.createRoomButton')
        }}
      />
    </ScreenContainer>
  );
};

export default StartScreen;
