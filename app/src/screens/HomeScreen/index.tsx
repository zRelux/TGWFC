import React, { useState, useEffect } from 'react';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { Button, ButtonText } from '../../components/Button';
import ScreenContainer, { Content } from '../../components/ScreenContainer';
import { ScreenHeader } from '../../components/ScreenHeader';

import { translate } from '../../translations';
import { Separator } from '../LobbyScreen/styles';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({ navigation, route }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (route.params && route.params.msg) {
      setError(route.params.msg);
      route.params.msg = undefined;
    }

    if (error !== '') {
      alert(error);
      setError('');
    }
  }, [route.params, error]);

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
        <Button color="secondary" onPress={goToScreen('Join')}>
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
