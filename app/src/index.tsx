import React, { useState } from 'react';
import { registerRootComponent, AppLoading } from 'expo';
import { ThemeProvider } from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from './theme';

import { SocketProvider } from './contexts/Socket';
import { ParticipantProvider } from './contexts/Participant';
import { DataProvider } from './contexts/Data';

import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LobbyScreen from './screens/LobbyScreen';
import SettingsScreen from './screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Start: undefined;
  Lobby: { username?: string };
  Settings: undefined;
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
      <SocketProvider>
        <ParticipantProvider>
          <DataProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Lobby" component={LobbyScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </DataProvider>
        </ParticipantProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};
export default App;

registerRootComponent(App);
