import React, { useState } from 'react';

import { FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { GameButton, GameButtonText } from '../../components/Button';
import ScreenContainer from '../../components/ScreenContainer';

import { Entypo } from '@expo/vector-icons';

import useSocket from '../../hooks/useSocket';
import useData from '../../hooks/useData';

import { translate } from '../../translations';

import values from './data';

import {
  StartHeader,
  RoundSelector,
  RoundsText,
  Picker,
  PickerText,
  PackContainer,
  PackItem,
  PackItemText,
  BottomSheetContainer,
  BackButton,
  BackText
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

  const goBack = () => {
    navigation.goBack();
  };

  const createOnClick = () => {
    if (!empty) {
      send('createRoom', {
        username,
        number_of_rounds: selectedValue,
        packs: selectedPacks
      });

      if (navigation) {
        navigation.navigate('Lobby', { username });
      }
    }
  };

  return (
    <>
      <ScreenContainer>
        <StartHeader>{translate('StartScreen.setupHeader')}</StartHeader>
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
          <FlatList
            data={packs}
            renderItem={({ item }) => (
              <PackItem onPress={addPack(item.id)} selected={selectedPacks.includes(item.id)}>
                <PackItemText selected={selectedPacks.includes(item.id)}>{item.name}</PackItemText>
              </PackItem>
            )}
            keyExtractor={(pack) => pack.id}
          />
        </PackContainer>
      </ScreenContainer>
      <BottomSheetContainer>
        <GameButton background={empty ? 'tertiary' : 'primaryText'} onPress={createOnClick}>
          <GameButtonText color={empty ? 'primaryText' : 'primary'}>
            {empty ? translate('StartScreen.createRoomButtonEmpty') : translate('StartScreen.createRoomButton')}
          </GameButtonText>
        </GameButton>
        <BackButton onPress={goBack}>
          <BackText>{translate('StartScreen.goBackButton')}</BackText>
        </BackButton>
      </BottomSheetContainer>
    </>
  );
};

export default StartScreen;
