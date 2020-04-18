import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';

type JoinPayload = {
  username: string;
  roomId: string;
};

const joinRoom = (payload: JoinPayload, socketId: string) => {
  const room = findRoom(payload.roomId);

  if (room) {
    room.users.push({
      username: payload.username,
      userId: socketId,
      points: 0,
      cards: []
    });
  } else {
    throw new Error('Room not found');
  }

  return room;
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('joinRoom', (payload: JoinPayload) => {
    try {
      const room = joinRoom(payload, socket.id);

      socket.join(room.id);

      io.to(room.id).emit('joinRoomReply', {
        newUser: {
          id: socket.id,
          username: payload.username
        }
      });
    } catch (error) {
      socket.emit('joinRoomReply', {
        error: error.message
      });
    }
  });
};
