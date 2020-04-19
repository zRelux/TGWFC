import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { Button, ButtonText } from '../../components/Button';
import ScreenContainer from '../../components/ScreenContainer';

import { translate } from '../../translations';

import { GameHeader } from './styles';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const goToScreen = (screen: any) => () => {
    navigation.navigate(screen);
  };

  return (
    <ScreenContainer>
      <GameHeader>{translate('HomeScreen.header')}</GameHeader>
      <Button color="primary" onPress={goToScreen('Start')}>
        <ButtonText>{translate('HomeScreen.startButton')}</ButtonText>
      </Button>
      <Button color="secondary" onPress={() => alert('Bella')}>
        <ButtonText>{translate('HomeScreen.joinButton')}</ButtonText>
      </Button>
      <Button color="tertiary" onPress={goToScreen('Settings')}>
        <ButtonText>{translate('HomeScreen.settingsButton')}</ButtonText>
      </Button>
    </ScreenContainer>
  );
};

export default HomeScreen;
