import React, { useContext } from 'react';

import { NavigationContext } from '@react-navigation/core';

import { translate } from '../../translations';

import { GameButton, GameButtonText } from '../Button';

import { BackButton, BottomSheetContainer, BackText } from './styles';

interface BottomSheetProps {
  goBack?: boolean;
  goBackFalsy?: boolean;
  falsyAction?: boolean;
  callOnTruth: () => void;
  copy: {
    actionFalsy?: string;
    actionTruthy: string;
  };
}

const BottomSheet: React.FunctionComponent<BottomSheetProps> = ({
  goBack = true,
  goBackFalsy,
  falsyAction,
  callOnTruth,
  copy
}) => {
  const navigation = useContext(NavigationContext);

  const goBackMethod = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const onTruthy = () => {
    if (!falsyAction && callOnTruth) {
      callOnTruth();
    }
  };

  return (
    <BottomSheetContainer>
      <GameButton background={falsyAction ? 'tertiary' : 'primaryText'} onPress={onTruthy}>
        <GameButtonText color={falsyAction ? 'primaryText' : 'primary'}>
          {falsyAction ? copy.actionFalsy : copy.actionTruthy}
        </GameButtonText>
      </GameButton>
      {!goBackFalsy && goBack && (
        <BackButton onPress={goBackMethod}>
          <BackText>{translate('SettingsScreen.goBackButton')}</BackText>
        </BackButton>
      )}
    </BottomSheetContainer>
  );
};

export default BottomSheet;
