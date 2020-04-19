import React, { useState, useEffect } from 'react';

import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import {
  Container,
  StartHeader,
  RoundSelector,
  RoundsText,
  Picker,
  PackContainer,
  PackItem,
  PackItemText,
  BottomSheetContainer,
  CtaButton,
  CtaText,
  BackButton,
  BackText
} from './styles';

import fetchBff from '../../utils/fetchBff';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';
import useSocket from '../../hooks/useSocket';

type Pack = {
  id: string;
  name: string;
};

interface StartScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Start'>;
}

const values = [
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
  ,
  {
    label: '20',
    value: 20
  },
  ,
  {
    label: '25',
    value: 25
  },
  ,
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
        number_of_rounds: 10,
        packs: selectedPacks
      });

      if (navigation) {
        navigation.navigate('Lobby');
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
                label: 'Select a number or add another...',
                value: null,
                color: 'red'
              }}
              items={values}
              onValueChange={(value) => {
                setSelectedValue(value);
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 10
                },
                placeholder: {
                  color: 'purple',
                  fontSize: 12,
                  fontWeight: 'bold'
                }
              }}
              value={selectedValue}
              Icon={() => {
                return (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      borderTopWidth: 10,
                      borderTopColor: 'gray',
                      borderRightWidth: 10,
                      borderRightColor: 'transparent',
                      borderLeftWidth: 10,
                      borderLeftColor: 'transparent',
                      width: 0,
                      height: 0
                    }}
                  />
                );
              }}
            />
          </RoundSelector>
          <PackContainer>
            <RoundsText>Card packs</RoundsText>
            <FlatList
              data={packs}
              renderItem={({ item }) => (
                <PackItem key={item.id} onPress={addPack(item.id)} selected={selectedPacks.includes(item.id)}>
                  <PackItemText selected={selectedPacks.includes(item.id)}>{item.name}</PackItemText>
                </PackItem>
              )}
              keyExtractor={(pack) => pack.id}
            />
          </PackContainer>
        </Container>
      </SafeAreaView>
      <BottomSheetContainer>
        <CtaButton empty={empty} onPress={createOnClick}>
          {empty ? <CtaText empty>Select at least a card pack</CtaText> : <CtaText>Create game</CtaText>}
        </CtaButton>
        <BackButton onPress={goBack}>
          <BackText>Go Back</BackText>
        </BackButton>
      </BottomSheetContainer>
    </>
  );
};

export default StartScreen;
