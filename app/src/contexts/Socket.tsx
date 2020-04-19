import React, { useEffect, useState } from 'react';
import { socketEndpoint } from '../utils/fetchBff';
import io from 'socket.io-client';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

interface SocketContext {
  socketAvailable: boolean;
  listen: <T extends object>(key: string, callback: (payload: T) => void) => object | void;
  send: <T extends object>(key: string, payload: T) => void;
}
const SocketContext = React.createContext<SocketContext>({
  socketAvailable: false,
  listen: () => {},
  send: () => {}
});

interface SocketProviderProps {}

export const SocketProvider: React.FunctionComponent<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [socketAvailable, setSocketAvailable] = useState(false);

  useEffect(() => {
    const socket = io(socketEndpoint, {
      transports: ['websocket'],
      jsonp: false
    });

    socket.connect();
    socket.on('connect', () => {
      setSocketAvailable(true);
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

  return <SocketContext.Provider value={{ socketAvailable, listen, send }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
