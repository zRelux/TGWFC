import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import { RoomUser, Room } from '../../db';
import addWithBounds from '../../utils/addWithBounds';

type JoinPayload = {
  room_id: string;
};

const leaveRoom = (payload: JoinPayload, socketId: string): [Room, RoomUser, RoomUser?] => {
  const room = findRoom(payload.room_id);

  if (room) {
    const index = room.users.findIndex(user => user.userId === socketId);
    const user = room.users[index];

    room.users = [...room.users.slice(0, index), ...room.users.slice(index + 1)];

    if (user.host === true) {
      const nextHost = room.users[addWithBounds(index, room.users.length)];
      nextHost.host = true;

      return [room, user, nextHost];
    }

    return [room, user];
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('leaveRoom', (payload: JoinPayload) => {
    try {
      const [room, user, newHost] = leaveRoom(payload, socket.id);

      socket.leave(room.id);

      io.to(room.id).emit('leaveRoomReply', {
        new_host: newHost,
        user_left: user
      });
    } catch (error) {
      socket.emit('leaveRoomReply', {
        error: error.message
      });
    }
  });
};
