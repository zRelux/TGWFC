import React, { useState, useRef } from 'react';
import { registerRootComponent, AppLoading, Linking } from 'expo';
import { ThemeProvider } from 'styled-components/native';

import { NavigationContainer, useLinking, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from './theme';

import { SocketProvider } from './contexts/Socket';
import { ParticipantProvider } from './contexts/Participant';
import { DataProvider } from './contexts/Data';

import { User, Card } from './types/User';

import { getUsername } from './utils/storage';

import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import LobbyScreen from './screens/LobbyScreen';
import SettingsScreen from './screens/SettingsScreen';
import GameScreen from './screens/GameScreen';
import JoinScreen from './screens/JoinScreen';
import WinnerScreen from './screens/WinnerScreen';

export type RootStackParamList = {
  Home: { msg?: string };
  Start: undefined;
  Lobby: { username?: string; roomId?: string };
  Join: undefined;
  Game: { cardToShow: string; cards: Card[]; iAmChooser: boolean; round: number; chooser: User };
  Winner: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const prefix = Linking.makeUrl('/');

const config = {
  Home: 'home',
  Start: 'start',
  Join: 'join',
  Lobby: {
    path: 'lobby',
    parse: {
      roomId: String
    }
  },
  Game: 'game',
  Winner: 'winner',
  Settings: 'settings'
};

const App: React.FunctionComponent = () => {
  const [ready, setReady] = useState(false);
  const [initialState, setInitialState] = useState<any>();
  const [usernameInStore, setUsernameInStore] = useState('');

  const ref = useRef<NavigationContainerRef>(null);

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config
  });

  const appLoad = async () => {
    let savedUsername = '';
    try {
      savedUsername = await getUsername();
    } catch (error) {
      console.log(error);
    }

    setUsernameInStore(savedUsername);

    const state = await getInitialState();

    if (state !== undefined && savedUsername !== '') {
      setInitialState(state);
    } else {
    }
  };

  return !ready ? (
    <AppLoading
      startAsync={appLoad}
      onFinish={async () => {
        setReady(true);
      }}
    />
  ) : (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ParticipantProvider>
          <DataProvider>
            <NavigationContainer initialState={initialState} ref={ref}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: false
                }}
                initialRouteName={usernameInStore !== '' ? 'Home' : 'Settings'}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Join" component={JoinScreen} />
                <Stack.Screen name="Lobby" component={LobbyScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Winner" component={WinnerScreen} />
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
