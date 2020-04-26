import React, { useEffect, useState } from 'react';

import useSocket from '../hooks/useSocket';

import fetchBff from '../utils/fetchBff';
import { saveUsername, getUsername } from '../utils/storage';

import { OpenedLink } from '../types/OpenedLink';

type Pack = {
  id: string;
  name: string;
};

interface DataContext {
  openedLink?: OpenedLink;
  roomId: string;
  username: string;
  packs: Pack[];
  setUsername: (newUsername: string) => void;
  setRoomId: (newRoomId: string) => void;
  setOpenedLink: (newOpenedLink?: OpenedLink) => void;
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
  setRoomId: () => {},
  setOpenedLink: () => {}
});

interface DataProviderProps {
  openedLink?: OpenedLink;
}

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({ children, openedLink }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [packs, setPacks] = useState<Pack[]>([]);
  const [link, setLink] = useState(openedLink);

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
    <DataContext.Provider
      value={{ openedLink: link, setOpenedLink: setLink, packs, roomId, username, setUsername, setRoomId }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
