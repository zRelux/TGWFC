import socketIO, { Socket } from 'socket.io';

import findRoom from '../../utils/findRoom';
import rooms, { RoomUser, Room, updateRooms } from '../../db';
import addWithBounds from '../../utils/addWithBounds';

type JoinPayload = {
  room_id: string;
};

const leaveRoom = (payload: JoinPayload, socketId: string): [Room, RoomUser, RoomUser?] => {
  const roomToClose = findRoom(payload.room_id);

  if (roomToClose) {
    const index = roomToClose.users.findIndex(user => user.id === socketId);
    const user = roomToClose.users[index];

    roomToClose.users = [...roomToClose.users.slice(0, index), ...roomToClose.users.slice(index + 1)];

    if (user.host === true) {
      const nextHost = roomToClose.users[addWithBounds(index, roomToClose.users.length)];
      nextHost.host = true;

      if (roomToClose.users.length === 0) {
        updateRooms(rooms.filter(room => room.id !== roomToClose.id));
      }

      return [roomToClose, user, nextHost];
    }

    return [roomToClose, user];
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
