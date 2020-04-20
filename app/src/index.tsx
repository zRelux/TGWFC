import React, { useState } from 'react';
import { registerRootComponent, AppLoading } from 'expo';
import { ThemeProvider } from 'styled-components/native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from './theme';

import { SocketProvider } from './contexts/Socket';
import { ParticipantProvider, User } from './contexts/Participant';
import { DataProvider } from './contexts/Data';

import { getUsername } from './utils/storage';

import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LobbyScreen from './screens/LobbyScreen';
import SettingsScreen from './screens/SettingsScreen';
import GameScreen from './screens/GameScreen';
import JoinScreen from './screens/JoinScreen';

export type RootStackParamList = {
  Home: { msg?: string };
  Start: undefined;
  Lobby: { username?: string };
  Join: undefined;
  Game: { cardToShow: string; cards: string[]; iAmChooser: boolean; round: number; chooser: User };
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FunctionComponent = () => {
  const [ready, setReady] = useState(false);
  const [usernameInStore, setUsernameInStore] = useState('');

  const appLoad = async () => {};

  if (!ready) {
    return (
      <AppLoading
        startAsync={appLoad}
        onFinish={async () => {
          let savedUsername = '';
          try {
            savedUsername = await getUsername();
          } catch (error) {}

          setUsernameInStore(savedUsername);
          setReady(true);
        }}
      />
    );
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
                initialRouteName={usernameInStore !== '' ? 'Home' : 'Settings'}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Join" component={JoinScreen} />
                <Stack.Screen name="Lobby" component={LobbyScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
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
