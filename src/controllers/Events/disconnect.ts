import socketIO, { Socket } from 'socket.io';

import rooms from '../../db';

const findRoomToDisconnect = (socketId: string) => {
  const roomToLeave = rooms.find(roomToFind => roomToFind.users.find(user => user.userId === socketId));

  if (roomToLeave) {
    const leftUser = roomToLeave.users.find(user => user.userId === socketId);
    roomToLeave.users = roomToLeave.users.filter(user => user.userId !== socketId);

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
        userLeft: leftUser
      });
    } catch (error) {
      console.error(error);
    }
  });
};
