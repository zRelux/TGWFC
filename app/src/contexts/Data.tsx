import React, { useEffect, useState } from 'react';
import fetchBff from '../utils/fetchBff';
import useSocket from '../hooks/useSocket';
import { saveUsername, getUsername } from '../utils/storage';

type Pack = {
  id: string;
  name: string;
};

interface DataContext {
  roomId: string;
  username: string;
  packs: Pack[];
  setUsername: (newUsername: string) => void;
  setRoomId: (newRoomId: string) => void;
}

interface CreateRoomReplyPayload {
  room: {
    id: string;
    url: string;
  };
}

const DataContext = React.createContext<DataContext>({
  roomId: '',
  username: '',
  packs: [],
  setUsername: () => {},
  setRoomId: () => {}
});

interface DataProviderProps {}

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({ children }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [joinUrl, setJoinUrl] = useState('');
  const [packs, setPacks] = useState<Pack[]>([]);

  const { listen, socketAvailable } = useSocket();

  const fetchPacks = async () => {
    const fetchedPacks = await fetchBff('/packs');

    setPacks(fetchedPacks.packs);
  };

  const getSavedUsername = async () => {
    let savedUsername = '';
    try {
      savedUsername = await getUsername();
    } catch (error) {}

    setUsername(savedUsername);
  };

  useEffect(() => {
    if (username !== '') saveUsername(username);
  }, [username]);

  useEffect(() => {
    if (socketAvailable) {
      listen<CreateRoomReplyPayload>('createRoomReply', ({ room }) => {
        setRoomId(room.id);
      });
    }
  }, [socketAvailable]);

  useEffect(() => {
    fetchPacks();
    getSavedUsername();
  }, []);

  return (
    <DataContext.Provider value={{ packs, roomId, username, setUsername, setRoomId }}>{children}</DataContext.Provider>
  );
};

export default DataContext;
