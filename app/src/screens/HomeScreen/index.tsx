import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { Button, ButtonText } from '../../components/Button';
import ScreenContainer, { Content } from '../../components/ScreenContainer';
import { ScreenHeader } from '../../components/ScreenHeader';

import { translate } from '../../translations';
import { Separator } from '../LobbyScreen/styles';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({ navigation }) => {
  const goToScreen = (screen: any) => () => {
    navigation.navigate(screen);
  };

  return (
    <ScreenContainer>
      <Content>
        <ScreenHeader bottom={9.5}>{translate('HomeScreen.header')}</ScreenHeader>
        <Separator />
        <Button color="primary" onPress={goToScreen('Start')}>
          <ButtonText>{translate('HomeScreen.startButton')}</ButtonText>
        </Button>
        <Button color="secondary" onPress={() => alert('Bella')}>
          <ButtonText>{translate('HomeScreen.joinButton')}</ButtonText>
        </Button>
        <Button color="tertiary" onPress={goToScreen('Settings')}>
          <ButtonText>{translate('HomeScreen.settingsButton')}</ButtonText>
        </Button>
      </Content>
    </ScreenContainer>
  );
};

export default HomeScreen;
