import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import rooms, { updateRooms } from '../../db';

type FinishPayload = {
  room_id: string;
};

const finishGame = (payload: FinishPayload) => {
  const roomToClose = findRoom(payload.room_id);

  if (roomToClose) {
    updateRooms(rooms.filter(room => room.id !== roomToClose.id));

    return roomToClose;
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

      room.users.forEach(user => {
        if (io.sockets.connected[user.id]) {
          io.sockets.connected[user.id].leave(room.id);
        }
      });
    } catch (error) {
      socket.emit('finishGameReply', {
        error: error.message
      });
    }
  });
};
