import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

import { User } from '../types/User';
import { LeavePayload, RoomUpdatePayload } from '../types/Payloads';

interface ParticipantContext {
  hostUser: User;
  participants: User[];
  kickedUserId: string;
  setKickedUserId: (kickedUserId: string) => void;
}

const ParticipantContext = React.createContext<ParticipantContext>({
  participants: [],
  kickedUserId: '',
  setKickedUserId: () => {},
  hostUser: {
    id: '',
    username: '',
    points: 0,
    cards: [],
    host: false
  }
});

interface ParticipantProviderProps {}

export const ParticipantProvider: React.FunctionComponent<ParticipantProviderProps> = ({ children }) => {
  const [hostUser, setHostUser] = useState<User>({
    id: '',
    username: '',
    points: 0,
    cards: [],
    host: false
  });
  const [participants, setParticipants] = useState<User[]>([]);
  const [kickedUserId, setKickedUserId] = useState<string>('');
  const { listen, socketAvailable } = useSocket();

  useEffect(() => {
    if (socketAvailable) {
      listen<RoomUpdatePayload>('joinRoomReply', ({ room_host, lobby_users }) => {
        if (room_host) {
          setHostUser(room_host);
        }

        if (lobby_users) {
          setParticipants(lobby_users);
        }
      });

      listen<RoomUpdatePayload>('updatedRoomReply', ({ room_host, lobby_users }) => {
        if (room_host) {
          setHostUser(room_host);
        }

        if (lobby_users) {
          setParticipants(lobby_users);
        }
      });

      listen<LeavePayload>('kickUserReply', ({ user_left }) => {
        setKickedUserId(user_left.id);
        setParticipants((oldParticipants) => {
          const tmpArr = [...oldParticipants];

          const index = tmpArr.findIndex((participant) => participant.id === user_left.id);
          return [...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)];
        });
      });

      listen<LeavePayload>('leaveRoomReply', ({ new_host, user_left }) => {
        if (new_host) {
          setHostUser(new_host);
        }

        setParticipants((oldParticipants) => {
          const tmpArr = [...oldParticipants];

          const index = tmpArr.findIndex((participant) => participant.id === user_left.id);

          return [...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)];
        });
      });

      listen<LeavePayload>('userDisconnected', ({ user_left }) => {
        setParticipants((oldParticipants) => {
          const tmpArr = [...oldParticipants];

          const index = tmpArr.findIndex((participant) => participant.id === user_left.id);
          return [...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)];
        });
      });
    }
  }, [socketAvailable]);

  return (
    <ParticipantContext.Provider value={{ kickedUserId, setKickedUserId, hostUser, participants }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export default ParticipantContext;
