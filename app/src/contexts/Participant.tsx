import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

export type User = {
  userId: string;
  username: string;
  points: number;
  cards: string[];
  host: boolean;
};

type DisconnectedPayload = {
  user_left: User;
  new_host?: User;
};

export type JoinRoomPayload = {
  room_host: User;
  lobby_users: User[];
  error?: string;
};

interface ParticipantContext {
  hostUser: User;
  participants: User[];
}

const ParticipantContext = React.createContext<ParticipantContext>({
  participants: [],
  hostUser: {
    userId: '',
    username: '',
    points: 0,
    cards: [],
    host: false
  }
});

interface ParticipantProviderProps {}

export const ParticipantProvider: React.FunctionComponent<ParticipantProviderProps> = ({ children }) => {
  const [hostUser, setHostUser] = useState<User>({
    userId: '',
    username: '',
    points: 0,
    cards: [],
    host: false
  });
  const [participants, setParticipants] = useState<User[]>([]);
  const { id, listen, socketAvailable } = useSocket();

  useEffect(() => {
    if (socketAvailable) {
      listen<JoinRoomPayload>('joinRoomReply', ({ room_host, lobby_users }) => {
        if (room_host) {
          setHostUser(room_host);
        }

        if (lobby_users) {
          const newUsers = lobby_users.filter((lobbyUser) => lobbyUser.userId !== id);
          setParticipants(newUsers);
        }
      });

      listen<DisconnectedPayload>('kickUserReply', ({ user_left }) => {
        console.log('Kick user reply');

        setParticipants((oldParticipants) => {
          const tmpArr = [...oldParticipants];

          const index = tmpArr.findIndex((participant) => participant.userId === user_left.userId);
          return [...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)];
        });
      });

      listen<DisconnectedPayload>('leaveRoomReply', ({ new_host, user_left }) => {
        console.log('leaveRoomReply', user_left);

        if (new_host) {
          setHostUser(new_host);
        }

        setParticipants((oldParticipants) => {
          const tmpArr = [...oldParticipants];

          const index = tmpArr.findIndex((participant) => participant.userId === user_left.userId);

          return [...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)];
        });
      });

      listen<DisconnectedPayload>('userDisconnected', ({ user_left }) => {
        setParticipants((oldParticipants) => {
          const tmpArr = [...oldParticipants];

          const index = tmpArr.findIndex((participant) => participant.userId === user_left.userId);
          return [...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)];
        });
      });
    }
  }, [socketAvailable]);

  return <ParticipantContext.Provider value={{ hostUser, participants }}>{children}</ParticipantContext.Provider>;
};

export default ParticipantContext;
