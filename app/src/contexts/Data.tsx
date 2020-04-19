import React, { useEffect, useState } from 'react';
import fetchBff from '../utils/fetchBff';

type Pack = {
  id: string;
  name: string;
};

interface DataContext {
  roomId: string;
  username: string;
  packs: Pack[];
  // setRoomId: (newRoomId: string) => void;
  // setUsername: (newUsername: string) => void;
}

const DataContext = React.createContext<DataContext>({
  roomId: '',
  username: '',
  packs: []
  // setRoomId: () => void,
  // setUsername: () => void,
});

interface DataProviderProps {}

export const DataProvider: React.FunctionComponent<DataProviderProps> = ({ children }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('Test username');
  const [packs, setPacks] = useState<Pack[]>([]);

  const fetchPacks = async () => {
    const fetchedPacks = await fetchBff('/packs');

    setPacks(fetchedPacks.packs);
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  return <DataContext.Provider value={{ packs, roomId, username }}>{children}</DataContext.Provider>;
};

export default DataContext;
