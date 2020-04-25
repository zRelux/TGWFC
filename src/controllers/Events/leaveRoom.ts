import socketIO, { Socket } from 'socket.io';

import * as yup from 'yup';

import findRoom from '../../utils/findRoom';
import roomsdb, { RoomUser, Room } from '../../db';
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

    if (roomToClose.users.length === 0) {
      roomsdb.rooms = roomsdb.rooms.filter(room => room.id !== roomToClose.id);
    }

    if (user.host === true) {
      const nextHost = roomToClose.users[addWithBounds(index, roomToClose.users.length)];
      nextHost.host = true;

      return [roomToClose, user, nextHost];
    }

    return [roomToClose, user];
  } else {
    throw new Error('Room not found');
  }
};

const schema = yup.object().shape({
  room_id: yup.string()
});

export default (socket: Socket, io: socketIO.Server) => {
  socket.on('leaveRoom', async (payload: JoinPayload) => {
    try {
      await schema.validate(payload);

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
