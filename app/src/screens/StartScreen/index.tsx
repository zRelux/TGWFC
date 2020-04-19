import React, { useState, useEffect } from 'react';

import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import {
  Container,
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

import fetchBff from '../../utils/fetchBff';

import { Entypo } from '@expo/vector-icons';
import useSocket from '../../hooks/useSocket';
import { GameButton, GameButtonText } from '../../components/Button';

type Pack = {
  id: string;
  name: string;
};

interface StartScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Start'>;
}

const values: { label: string; value: number }[] = [
  {
    label: '5',
    value: 5
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '15',
    value: 15
  },
  {
    label: '20',
    value: 20
  },
  {
    label: '25',
    value: 25
  },
  {
    label: '30',
    value: 30
  }
];

const StartScreen: React.FunctionComponent<StartScreenProps> = ({ navigation }) => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [selectedValue, setSelectedValue] = useState(5);
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);
  const { send } = useSocket();

  const empty = selectedPacks.length === 0;

  const fetchPacks = async () => {
    const fetchedPacks = await fetchBff('/packs');

    setPacks(fetchedPacks.packs);
  };

  useEffect(() => {
    fetchPacks();
  }, []);

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
        username: 'Test Username',
        number_of_rounds: selectedValue,
        packs: selectedPacks
      });

      if (navigation) {
        navigation.navigate('Lobby', { username: 'My new username' });
      }
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Container>
          <StartHeader>Setup your game</StartHeader>
          <RoundSelector>
            <RoundsText>Number of rounds</RoundsText>
            <RNPickerSelect
              placeholder={{
                label: 'Select the number of rounds',
                value: null,
                color: 'black'
              }}
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
            <RoundsText bottom>Card packs</RoundsText>
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
        </Container>
      </SafeAreaView>
      <BottomSheetContainer>
        <GameButton background={empty ? 'tertiary' : 'primaryText'} onPress={createOnClick}>
          {empty ? (
            <GameButtonText color="primaryText">Select at least a card pack</GameButtonText>
          ) : (
            <GameButtonText color="primary">Create game</GameButtonText>
          )}
        </GameButton>
        <BackButton onPress={goBack}>
          <BackText>Go Back</BackText>
        </BackButton>
      </BottomSheetContainer>
    </>
  );
};

export default StartScreen;
