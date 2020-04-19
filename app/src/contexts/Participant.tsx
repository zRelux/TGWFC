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

type JoinRoomPayload = {
  room_host: User;
  new_user: User;
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
  const { listen, socketAvailable } = useSocket();

  useEffect(() => {
    if (socketAvailable) {
      listen<JoinRoomPayload>('joinRoomReply', ({ room_host, new_user }) => {
        setHostUser(room_host);
        setParticipants((prevPartecipants) => [...prevPartecipants, new_user]);
      });

      listen<DisconnectedPayload>('kickUserReply', ({ user_left }) => {
        const tmpArr = [...participants];

        const index = tmpArr.findIndex((participant) => participant.userId === user_left.userId);

        setParticipants([...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)]);
      });

      listen<DisconnectedPayload>('leaveRoomReply', ({ new_host, user_left }) => {
        const tmpArr = [...participants];

        const index = tmpArr.findIndex((participant) => participant.userId === user_left.userId);

        if (new_host) {
          setHostUser(new_host);
        }

        setParticipants([...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)]);
      });

      listen<DisconnectedPayload>('userDisconnected', ({ user_left }) => {
        const tmpArr = [...participants];

        const index = tmpArr.findIndex((participant) => participant.userId === user_left.userId);

        setParticipants([...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)]);
      });
    }
  }, [socketAvailable]);

  return <ParticipantContext.Provider value={{ hostUser, participants }}>{children}</ParticipantContext.Provider>;
};

export default ParticipantContext;
