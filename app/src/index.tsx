import React, { useState } from 'react';
import { registerRootComponent, AppLoading } from 'expo';
import { ThemeProvider } from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from './theme';

import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FunctionComponent = () => {
  const [ready, setReady] = useState(false);

  const appLoad = async () => {};

  if (!ready) {
    return <AppLoading startAsync={appLoad} onFinish={() => setReady(true)} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};
export default App;

registerRootComponent(App);
