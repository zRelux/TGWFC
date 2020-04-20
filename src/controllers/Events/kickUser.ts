import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import { RoomUser, Room } from '../../db';

type JoinPayload = {
  user_id: string;
  room_id: string;
};

const kickUser = (payload: JoinPayload): [Room, RoomUser] => {
  const room = findRoom(payload.room_id);

  if (room) {
    if (room.users.find(user => user.userId === payload.user_id)) {
      const index = room.users.findIndex(user => user.userId === payload.user_id);
      const user = room.users[index];

      room.users = [...room.users.slice(0, index), ...room.users.slice(index + 1)];

      return [room, user];
    }

    throw new Error('User not found');
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('kickUser', (payload: JoinPayload) => {
    try {
      const [room, user] = kickUser(payload);

      io.to(room.id).emit('kickUserReply', {
        user_left: user
      });
    } catch (error) {
      socket.emit('kickUserReply', {
        error: error.message
      });
    }
  });
};
