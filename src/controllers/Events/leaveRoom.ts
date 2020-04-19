import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import { RoomUser, Room } from '../../db';

type JoinPayload = {
  room_id: string;
};

const leaveRoom = (payload: JoinPayload, socketId: string): [Room, RoomUser] => {
  const room = findRoom(payload.room_id);

  if (room) {
    const index = room.users.findIndex(user => user.userId === socketId);
    const user = room.users[index];

    room.users = [...room.users.slice(0, index), ...room.users.slice(index + 1)];

    return [room, user];
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('leaveRoom', (payload: JoinPayload) => {
    try {
      const [room, user] = leaveRoom(payload, socket.id);

      socket.leave(room.id);

      io.to(room.id).emit('leaveRoomReply', {
        user_left: user
      });
    } catch (error) {
      socket.emit('leaveRoomReply', {
        error: error.message
      });
    }
  });
};
