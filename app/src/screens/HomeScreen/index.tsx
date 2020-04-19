import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { GameHeader } from './styles';

import { Button, ButtonText } from '../../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const goToStart = () => {
    navigation.navigate('Start');
  };

  return (
    <SafeAreaView>
      <GameHeader>The game with Funny Cards</GameHeader>
      <Button color="primary" onPress={goToStart}>
        <ButtonText>Start a game</ButtonText>
      </Button>
      <Button color="secondary" onPress={() => alert('Bella')}>
        <ButtonText>Partecipate</ButtonText>
      </Button>
      <Button color="tertiary" onPress={() => alert('Bella')}>
        <ButtonText>Settings</ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
