import socketIO, { Socket } from 'socket.io';

import rooms, { updateRooms } from '../../db';

const findRoomToDisconnect = (socketId: string) => {
  const roomToLeave = rooms.find(roomToFind => roomToFind.users.find(user => user.id === socketId));

  if (roomToLeave) {
    const leftUser = roomToLeave.users.find(user => user.id === socketId);
    roomToLeave.users = roomToLeave.users.filter(user => user.id !== socketId);

    if (roomToLeave.users.length === 0) {
      updateRooms(rooms.filter(room => room.id !== roomToLeave.id));
    }

    return { leftUser, roomToLeave };
  } else {
    throw new Error('Room not found');
  }
};

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('disconnect', () => {
    try {
      const { leftUser, roomToLeave } = findRoomToDisconnect(socket.id);

      io.to(roomToLeave.id).emit('userDisconnected', {
        user_left: leftUser
      });
    } catch (error) {
      return;
    }
  });
};
