import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import { translate } from '../../translations';

import ScreenContainer from '../../components/ScreenContainer';
import BottomSheet from '../../components/BottomSheet';
import { StartHeader } from '../StartScreen/styles';
import useData from '../../hooks/useData';

import { SettingsContent, UsernameInputText, UsernameInput, DisclaimerText, DisclaimerView } from './styles';

interface SettingsScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>;
}

const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = ({ navigation }) => {
  const { username, setUsername, openedLink, setOpenedLink } = useData();
  const empty = username === '';

  const onChangeUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const saveName = () => {
    if (!openedLink) {
      navigation.navigate('Home');
    } else {
      navigation.navigate(openedLink.goTo, openedLink.param);
      setOpenedLink(undefined);
    }
  };

  return (
    <ScreenContainer>
      <SettingsContent>
        <StartHeader>{translate('SettingsScreen.pageHeader')}</StartHeader>
        <UsernameInputText>{translate('SettingsScreen.inputHeader')}</UsernameInputText>
        <UsernameInput value={username} onChangeText={onChangeUsername} />
        <DisclaimerView>
          <DisclaimerText>{translate('SettingsScreen.disclaimer.first')}</DisclaimerText>
          <DisclaimerText bold>{translate('SettingsScreen.disclaimer.boldFirst')}</DisclaimerText>
          <DisclaimerText>{translate('SettingsScreen.disclaimer.second')}</DisclaimerText>
          <DisclaimerText bold>{translate('SettingsScreen.disclaimer.secondBold')}</DisclaimerText>
        </DisclaimerView>
      </SettingsContent>
      <BottomSheet
        goBackFalsy={empty}
        falsyAction={empty}
        callOnTruth={saveName}
        copy={{
          actionFalsy: translate('noSaveButton'),
          actionTruthy: translate('saveButton')
        }}
      />
    </ScreenContainer>
  );
};

export default SettingsScreen;
