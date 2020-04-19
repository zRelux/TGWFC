import { AsyncStorage } from 'react-native';

export const saveUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('@AppStore:username', username);
  } catch (error) {
    console.error(error);
  }
};

export const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem('@AppStore:username');
    if (value !== null) {
      return value;
    }

    throw new Error('No username');
  } catch (error) {
    throw error;
  }
};
