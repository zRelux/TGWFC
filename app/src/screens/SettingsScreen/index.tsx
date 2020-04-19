import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText } from '../../components/Button';

import { translate } from '../../translations';

import { SettingContainer, UsernameInputText, UsernameInput } from './styles';

interface SettingsScreenProps {}

const SettingsScreen: React.FunctionComponent<SettingsScreenProps> = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
      <SettingContainer>
        <UsernameInputText>{translate('SettingsScreen.inputHeader')}</UsernameInputText>
        <UsernameInput placeholder={translate('SettingsScreen.inputPlaceholder')} />
        <Button color="primary">
          <ButtonText>{translate('SettingsScreen.saveButton')}</ButtonText>
        </Button>
      </SettingContainer>
    </SafeAreaView>
  );
};

export default SettingsScreen;
