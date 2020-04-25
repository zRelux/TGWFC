import socketIO, { Socket } from 'socket.io';

import * as yup from 'yup';

import findRoom from '../../utils/findRoom';
import { RoomUser, Room } from '../../db';

type JoinPayload = {
  room_id: string;
  old_id: string;
  new_id: string;
};

const updateUserRef = (payload: JoinPayload): [Room, RoomUser] => {
  const room = findRoom(payload.room_id);

  if (room) {
    if (room.users.find(user => user.id === payload.old_id)) {
      const index = room.users.findIndex(user => user.id === payload.old_id);
      const user = room.users[index];

      user.id = payload.new_id;

      user.cards = user.cards.map(card => {
        return {
          userId: payload.new_id,
          card: card.card
        };
      });

      return [room, user];
    }

    throw new Error('User not found');
  } else {
    throw new Error('Room not found');
  }
};

const schema = yup.object().shape({
  room_id: yup.string(),
  old_id: yup.string(),
  new_id: yup.string()
});

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('kickUser', async (payload: JoinPayload) => {
    try {
      await schema.validate(payload);

      const [room, user] = updateUserRef(payload);

      io.to(room.id).emit('updateUserRefReply', {
        new_id: user.id
      });
    } catch (error) {
      socket.emit('updateUserRefReply', {
        error: error.message
      });
    }
  });
};
