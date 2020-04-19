import React, { useEffect, useState } from 'react';
import { socketEndpoint } from '../utils/fetchBff';
import io from 'socket.io-client';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

interface SocketContext {
  listen: (key: string, callback: () => void) => object | void;
  send: (key: string, payload: object) => void;
}
const SocketContext = React.createContext<SocketContext>({
  listen: () => {},
  send: () => {}
});

interface SocketProviderProps {}

export const SocketProvider: React.FunctionComponent<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  useEffect(() => {
    const socket = io(socketEndpoint, {
      transports: ['websocket']
    });

    setSocket(socket);
  }, []);

  const send = <T extends object>(key: string, payload: T) => {
    if (socket) {
      socket.emit(key, payload);
    }
  };

  const listen = <T extends object>(key: string, callback: (payload: T) => void) => {
    if (socket) {
      socket.on(key, callback);
    }
  };

  return <SocketContext.Provider value={{ listen, send }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
