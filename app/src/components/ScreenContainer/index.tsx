import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Container, Content } from './styles';

interface ScreenContainerProps {}

const ScreenContainer: React.FunctionComponent<ScreenContainerProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 0 }}>
      <Container>{children}</Container>
    </SafeAreaView>
  );
};

export { Content };
export default ScreenContainer;
