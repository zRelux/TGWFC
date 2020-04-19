import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import { Room, RoomUser } from '../../db';

type JoinPayload = {
  username: string;
  roomId: string;
};

const joinRoom = (payload: JoinPayload, socketId: string): [Room, RoomUser] => {
  const room = findRoom(payload.roomId);

  if (room) {
    room.users.push({
      username: payload.username,
      userId: socketId,
      points: 0,
      cards: [],
      host: false
    });

    const index = room.users.findIndex(user => user.host === true);
    const user = room.users[index];

    return [room, user];
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('joinRoom', (payload: JoinPayload) => {
    try {
      const [room, user] = joinRoom(payload, socket.id);

      socket.join(room.id);

      io.to(room.id).emit('joinRoomReply', {
        room_host: user,
        new_user: {
          id: socket.id,
          username: payload.username,
          points: 0,
          cards: []
        }
      });
    } catch (error) {
      socket.emit('joinRoomReply', {
        error: error.message
      });
    }
  });
};
