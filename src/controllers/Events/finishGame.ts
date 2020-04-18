import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';

type FinishPayload = {
  roomId: string;
};

const finishGame = (payload: FinishPayload) => {
  const room = findRoom(payload.roomId);

  if (room) {
    return room;
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('finishGame', (payload: FinishPayload) => {
    try {
      const room = finishGame(payload);

      let winner: any = {};

      for (let i = 0; i < room.users.length; i++) {
        if (winner) {
          if (room.users[i].points > winner.points) {
            winner = room.users[i];
          }
        } else {
          winner = room.users[i];
        }
      }

      io.to(room.id).emit('finishGameReply', {
        winner
      });
    } catch (error) {
      socket.emit('finishGameReply', {
        error: error.message
      });
    }
  });
};
