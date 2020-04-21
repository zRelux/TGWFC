import React, { useEffect, useState } from 'react';
import { socketEndpoint } from '../utils/fetchBff';
import io from 'socket.io-client';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

(function () {
  const _warning = console.warn;

  console.warn = function (warnMessage: string, ...rest: any) {
    if (!warnMessage.startsWith('Unrecognized WebSocket connection option(s) `agent`,'))
      _warning.call(console, ...[warnMessage, rest]);
  };
})();

interface SocketContext {
  id?: string;
  socketAvailable: boolean;
  listen: <T extends object>(key: string, callback: (payload: T) => void) => object | void;
  send: <T extends object>(key: string, payload: T) => void;
}
const SocketContext = React.createContext<SocketContext>({
  id: '',
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

    return () => {
      socket.disconnect();
    };
  }, []);

  const send = <T extends object>(key: string, payload: T) => {
    if (socket) {
      socket.emit(key, payload);
    }
  };

  const listen = <T extends object>(key: string, callback: (payload: T) => void) => {
    if (socket) {
      socket.on(key, (payload: T) => {
        console.log(key, payload);

        callback(payload);
      });
    }
  };

  return (
    <SocketContext.Provider value={{ id: socket?.id, socketAvailable, listen, send }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
