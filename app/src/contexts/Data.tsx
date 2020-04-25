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

interface UpdateUser {
  new_id: string;
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
  const [packs, setPacks] = useState<Pack[]>([]);

  const { socket, id, setId, send, listen, socketAvailable } = useSocket();

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
    if (socketAvailable && socket) {
      listen('reconnect', () => {
        send('updateUserRef', {
          room_id: roomId,
          old_id: id,
          new_id: socket.id
        });
      });

      listen<UpdateUser>('updateUserRefReply', ({ new_id }) => {
        setId(new_id);
      });
    }
  }, [socketAvailable, roomId]);

  useEffect(() => {
    if (username !== '') saveUsername(username);
  }, [username, saveUsername]);

  useEffect(() => {
    if (socketAvailable) {
      listen<CreateRoomReplyPayload>('createRoomReply', ({ room }) => {
        setRoomId(room.id);
      });
    }
  }, [socketAvailable, listen, setRoomId]);

  useEffect(() => {
    fetchPacks();
    getSavedUsername();
  }, []);

  return (
    <DataContext.Provider value={{ packs, roomId, username, setUsername, setRoomId }}>{children}</DataContext.Provider>
  );
};

export default DataContext;
