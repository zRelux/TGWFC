import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';

type Participant = {
  id: string;
  username: string;
};

type User = {
  userId: string;
  username: string;
  points: number;
  cards: string[];
};

type DisconnectedPayload = {
  user_left: User;
};

type JoinRoomPayload = {
  new_user: Participant;
};

interface ParticipantContext {
  participants: Participant[];
}

const ParticipantContext = React.createContext<ParticipantContext>({
  participants: []
});

interface ParticipantProviderProps {}

export const ParticipantProvider: React.FunctionComponent<ParticipantProviderProps> = ({ children }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { listen, socketAvailable } = useSocket();

  useEffect(() => {
    listen<JoinRoomPayload>('joinRoomReply', ({ new_user }) => {
      setParticipants((prevPartecipants) => [...prevPartecipants, new_user]);
    });

    listen<DisconnectedPayload>('userDisconnected', ({ user_left }) => {
      const tmpArr = [...participants];

      const index = tmpArr.findIndex((participant) => participant.id === user_left.userId);

      setParticipants([...tmpArr.slice(0, index), ...tmpArr.slice(index + 1)]);
    });
  }, [socketAvailable]);

  return <ParticipantContext.Provider value={{ participants }}>{children}</ParticipantContext.Provider>;
};

export default ParticipantContext;
